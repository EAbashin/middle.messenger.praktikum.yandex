import type {Dispatch} from 'core';
import {chatsAPI} from "../api/chatsAPI";
import {apiHasError} from "../utils";
import {Socket} from "./socket";

interface ChatProps {
  title: string,
}

export const getChats: DispatchStateHandler<undefined> = async (dispatch: Dispatch<AppState>) => {
  const response = await chatsAPI.getChats().then(r => JSON.parse(r.responseText)).catch(err => console.log(err));
  if (apiHasError(response)) {
    return;
  }
  dispatch({chats: response});
};

export const createChat: DispatchStateHandler<ChatProps> = async (dispatch, _state, action) => {
  const chat = await chatsAPI.createChat(action).then(r => JSON.parse(r.responseText)).catch(err => console.log(err));
  if (apiHasError(chat)) {
    return;
  }
  dispatch(getChats);
};

export const deleteChat: DispatchStateHandler<{ chatId: number }> = async (dispatch, _state, action) => {
  const response = await chatsAPI.deleteChat(JSON.stringify(action)).then(r => JSON.parse(r.responseText)).catch(err => console.log(err));
  if (apiHasError(response)) {
    return;
  }
  await dispatch(getChats);
};

export const addUserChat: DispatchStateHandler<{ chatId: number | string, userId: number | string }> = async (_dispatch, _state, action) => {
  await chatsAPI.addUsersToChat(action).then(r => console.log(r)).catch(err => console.log(err));
};

export const deleteUserChat: DispatchStateHandler<{ chatId: number | string, userId: number | string }> = async (_dispatch, _state, action) => {
  await chatsAPI.addUsersToChat(action).then(r => console.log(r)).catch(err => console.log(err));
};

export const getChatUsers: DispatchStateHandler<string> = async (dispatch, _state, action) => {
  const response = await chatsAPI.getChatUsers(action).then(r => JSON.parse(r.responseText)).catch(err => console.log(err));
  if (apiHasError(response)) {
    return;
  }
  dispatch({isSelectedChat: true})
  const userId = window.store.getState().user?.id ?? null;
  const socket = Socket.open(action, `wss://ya-praktikum.tech/ws/chats/${userId}/${action}/${response.token}`)
  Socket.events(action, socket);
  setInterval(() => {
    Socket.send(action, JSON.stringify({
      type: "ping"
    }))
  }, 10000)
}

export const sendMessage: DispatchStateHandler<{ message: string }> = async (_dispatch, _state, action) => {
  const chatId = window.store.getState().activeChat;
  Socket.send(`${chatId}`, JSON.stringify({
    type: 'message',
    content: action.message
  }));
}