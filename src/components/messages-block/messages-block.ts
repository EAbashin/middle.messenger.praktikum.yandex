import Block from 'core/Block';

interface MessageType {
    text: string;
    time: string;
    position: string;
}
interface MessageBlockPropsType {
    messagesData?: Array<MessageType>;
}

export class MessagesBlock extends Block {
    constructor(props: MessageBlockPropsType) {
        super({...props});
    }
    protected render(): string {
        // language=hbs
        return `
            <div class="chat__messages-block">
                <div class="chat__messages-block_header">
                    <img src="../assets/avatar.png" alt="photo" class="chat__messages-block_header_photo">
                    <div class="chat__messages-block_header_name">{{chatName}}</div>
                    <img src="../assets/menu-profile.png" alt="Menu" class="chat__messages-block_header_menu">
                    <div class="chat__modal-menu chat__modal-menu_header-menu active">
                        <div class="chat__modal-menu_wrapper">
                            <img src="../assets/add-icon.png" alt="Add" class="chat__modal-menu_icon">
                            <div class="chat__modal-menu_text">Add user</div>
                        </div>
                        <div class="chat__modal-menu_wrapper">
                            <img src="../assets/del-icon.png" alt="Del" class="chat__modal-menu_icon">
                            <div class="chat__modal-menu_text">Del user</div>
                        </div>
                    </div>
                </div>

                <div class="chat__separator"></div>

                <div class="chat__messages-block_body">
                    {{#each this.messagesData }}
                        {{Message
                                text=this.text
                                time=this.time
                                position=this.position}}
                    {{/each }}
                </div>

                <div class="chat__separator"></div>

                <form class="chat__messages-block_send-message">
                    <a href="#"><img src="../assets/menu-message.svg" alt="Add file" class="chat__messages-block_send-message_menu"></a>
                    <input class="chat__search-form_input" type="search" placeholder="Message">
                    <button class="chat__messages-block_send-message_send-btn">
                        <img src="../assets/forward.png" alt="Send" class="chat__messages-block_send-message_send-btn_img">
                    </button>
                    <div class="chat__modal-menu active">
                        <div class="chat__modal-menu_wrapper">
                            <img class="chat__modal-menu_icon" src="../assets/photo-icon.png" alt="Add photo">
                            <div class="chat__modal-menu_text">Photo and video</div>
                        </div>
                        <div class="chat__modal-menu_wrapper">
                            <img class="chat__modal-menu_icon" src="../assets/file-icon.png" alt="Add file">
                            <div class="chat__modal-menu_text">File</div>
                        </div>
                        <div class="chat__modal-menu_wrapper">
                            <img class="chat__modal-menu_icon" src="../assets/location-icon.png" alt="Add location">
                            <div class="chat__modal-menu_text">Location</div>
                        </div>
                    </div>
                </form>
            </div>

        `;
    }
}
