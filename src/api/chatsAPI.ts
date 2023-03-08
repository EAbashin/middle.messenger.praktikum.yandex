import Fetch from '../core/Fetch';

interface CreateChatProps {
  title: string,
}

export const chatsAPI = {
  getChats(): Promise<XMLHttpRequest> {
    return Fetch.get('chats', {});
  },
  createChat(data: CreateChatProps): Promise<XMLHttpRequest> {
    return Fetch.post('chats', {
      data: JSON.stringify(data),
      headers: { 'Content-Type': 'application/json' },
    });
  },
  deleteChat(data: string): Promise<XMLHttpRequest> {
    return Fetch.delete('chats', {
      data,
      headers: { 'Content-Type': 'application/json' },
    });
  },
  getChatUsers(chatID: string): Promise<XMLHttpRequest> {
    return Fetch.post(`chats/token/${chatID}`, {});
  },
  addUsersToChat(data: { chatId: number | string, userId: number | string }): Promise<XMLHttpRequest> {
    return Fetch.put('chats/users', {
      data: JSON.stringify({
        users: [data.userId],
        chatId: data.chatId,
      }),
      headers: { 'Content-Type': 'application/json' },
    });
  },
  deleteUsersFromChat(data: { chatId: number | string, userId: number | string }): Promise<XMLHttpRequest> {
    return Fetch.delete('chats/users', {
      data: JSON.stringify({
        users: [data.userId],
        chatId: data.chatId,
      }),
      headers: { 'Content-Type': 'application/json' },
    });
  },
};
