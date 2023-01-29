import Block from 'core/Block';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import * as emptyAvatar from 'assets/avatar.png';
import {getChatUsers} from "../../services/chatsService";

interface ChatItemProps {
    title?: string;
    avatar?: string;
    unread_count?: number;
    active?: boolean;
    time?: string;
    content?: string;
    events?: unknown;
}

export class ChatItem extends Block<ChatItemProps> {
    static componentName = "ChatItem";
    constructor({avatar, ...props}: ChatItemProps) {
        super({avatar, ...props});
        this.setProps({
            events: {
                click: this.onClickChat
            }
        })
    }

    async onClickChat(e: FocusEvent) {
        console.log('Click on chat')
        const chatItem: HTMLElement | null = (e.target as HTMLElement).closest('.chat__user-list_item');
        if (chatItem) {
            const id = chatItem.dataset.id;
            await window.store.dispatch(getChatUsers, id);
            const chats = window.store.getState().chats;
            // debugger
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
            <div>
                <div class="chat__user-list_item {{#if this.active}}active{{/if}}" data-id="{{id}}">
                    <img src=${this.props.avatar || emptyAvatar} alt="photo" class="chat__user-list_item_img">
                    <div class="chat__user-list_item_body-wrapper">
                        <div class="chat__user-list_item_body-wrapper_name-wrapper">
                            <div class="chat__user-list_item_body-wrapper_name-wrapper_name">{{this.title}}</div>
                            <div class="chat__user-list_item_body-wrapper_name-wrapper_time">{{this.time}}</div>
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
