import {Screens} from "../src/utils";

declare global {
  export type Nullable<T> = T | null;

  export type Keys<T extends Record<string, unknown>> = keyof T;
  export type Values<T extends Record<string, unknown>> = T[Keys<T>];

  export type Indexed = { [key: string]: any };
  export type DispatchStateHandler<T> = (dispatch: Dispatch<AppState>, state: AppState, action: T) => Promise<void>

  export type User = {
    id: number;
    login: string;
    firstName: string;
    secondName: string;
    displayName: string;
    avatar: string;
    phone: string;
    email: string;
  };
  export type UserData = {
    id: number;
    login: string;
    first_name: string;
    second_name: string;
    display_name: string;
    avatar: string;
    phone: string;
    email: string;
    password?: string;
  };
  export type Message = {
    chat_id: number;
    time: string;
    type: string;
    user_id: string;
    content: string;
    file?: {
      id: number,
      user_id: number,
      path: string,
      filename: string,
      content_type: string,
      content_size: number,
      upload_date: string,
    }
  };
  export type ChatData = {
    id: number;
    title: string;
    avatar: string;
    unread_count: number;
    active: boolean;
    last_message: {
      user: UserData,
      time: string,
      content: string,
    }
  };
  export type MessageData = {
    chat_id: number;
    time: string;
    type: string;
    user_id: string;
    content: string;
    file?: {
      id: number,
      user_id: number,
      path: string,
      filename: string,
      content_type: string,
      content_size: number,
      upload_date: string,
    }
  };
  export type AppState = {
    appIsInited: boolean;
    screen: Screens | null;
    formError: string | null;
    user: User | null;
    chats: ChatData[] | null;
    isSelectedChat: boolean;
    activeChat: string | number | null;
    messages: { [chatId: string]: MessageData[] } | nul;
  };
}

export {};
