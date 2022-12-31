import Block from 'core/Block';

interface UserItemProps {
    photo?: string;
    chatName?: string;
    message?: string;
    time?: string;
    unread?: string
}

export class UserItem extends Block {
    static componentName = "UserItem";
    constructor(props: UserItemProps) {
        super({...props});
    }

    protected render(): string {
        // language=hbs
        return `
            <div>
                <div class="chat__user-list_item">
                    <img src={{photo}} alt="photo" class="chat__user-list_item_img">
                    <div class="chat__user-list_item_body-wrapper">
                        <div class="chat__user-list_item_body-wrapper_name-wrapper">
                            <div class="chat__user-list_item_body-wrapper_name-wrapper_name">{{chatName}}</div>
                            <div class="chat__user-list_item_body-wrapper_name-wrapper_time">{{time}}</div>
                        </div>
                        <div class="chat__user-list_item_body-wrapper_message-wrapper">
                            <div class="chat__user-list_item_body-wrapper_message-wrapper_message">{{message}}</div>
                            <div class="chat__user-list_item_body-wrapper_message-wrapper_unread">{{unread}}</div>
                        </div>
                    </div>
                </div>
                <div class="chat__separator"></div>
            </div>
        `;
    }
}
