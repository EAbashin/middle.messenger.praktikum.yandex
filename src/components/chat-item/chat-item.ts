import Block from 'core/Block';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import * as emptyAvatar from 'assets/avatar.png';
import {deleteUserChat, getChatUsers} from "../../services/chatsService";

interface ChatItemProps {
    title?: string;
    avatar?: string;
    unread_count?: number;
    active?: boolean;
    time?: string;
    content?: string;
    events?: unknown;
    delChat: (e: FocusEvent) => void,
}

export class ChatItem extends Block<ChatItemProps> {
    static componentName = "ChatItem";
    constructor({avatar, ...props}: ChatItemProps) {
        super({avatar, ...props});
        this.setProps({
            delChat: (e) => this.delChat(e),
            events: {
                click: this.onClickChat
            }
        })
    }

    async delChat(e: FocusEvent) {
        console.log('Click on removeChat');
        e.preventDefault();
        e.stopPropagation();
        const chat = (e.target as HTMLButtonElement).closest('.chat') as HTMLElement;
        if (chat.dataset.id) {
            const id = parseInt(chat.dataset.id);
            // eslint-disable-next-line @typescript-eslint/no-empty-function
            await deleteUserChat(() => {
            }, {} as AppState, {chatId: id, item: chat});
        }
        return;
    }

    async onClickChat(e: FocusEvent) {
        console.log('Click on onClickChat')
        const chatItem: HTMLElement | null = (e.target as HTMLElement).closest('.chat');
        if (chatItem) {
            const id = chatItem.dataset.id;
            await window.store.dispatch(getChatUsers, id);
            const chats = window.store.getState().chats;
            window.store.set({'activeChat': id});
            chats?.map((chat) => {
                chat.active = chat.id === parseInt(`${id}`);
                return chat;
            })
        }
    }

    protected render(): string {
        // language=hbs
        return `
            <div class="chat" data-id="{{id}}">
                {{{Button
                        text="-"
                        type="button"
                        addClass="empty-btn"
                        onClick=this.delChat}}}
                <div class="chat__user-list_item {{#if this.active}}active{{/if}}">
                    <img src=${this.props.avatar ? `${process.env.API_ENDPOINT}/resources${this.props.avatar}` : emptyAvatar} alt="photo"
                         class="chat__user-list_item_img">
                    <div class="chat__user-list_item_body-wrapper">
                        <div class="chat__user-list_item_body-wrapper_name-wrapper">
                            <div class="chat__user-list_item_body-wrapper_name-wrapper_name">{{this.title}}</div>
                            <div>
                                <div class="chat__user-list_item_body-wrapper_name-wrapper_time">{{this.time}}</div>
                            </div>
                        </div>
                        <div class="chat__user-list_item_body-wrapper_message-wrapper">
                            <div class="chat__user-list_item_body-wrapper_message-wrapper_message">{{this.content}}</div>
                            {{#if this.unread_count}}
                                <div class="chat__user-list_item_body-wrapper_message-wrapper_unread">{{this.unread_count}}</div>
                            {{/if}}
                        </div>
                    </div>
                </div>
                <div class="chat__separator"></div>
            </div>
        `;
    }
}
