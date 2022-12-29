import Block from 'core/Block';
import * as avatar from 'assets/avatar.png';
import * as menuProfile from 'assets/menu-profile.png';
import * as addIcon from 'assets/add-icon.png';
import * as delIcon from 'assets/del-icon.png';
import * as menuMessage from 'assets/menu-message.svg';
import * as photoIcon from 'assets/photo-icon.png';
import * as fileIcon from 'assets/file-icon.png';
import * as locationIcon from 'assets/location-icon.png';
import {validateForm} from "../../helpers/validateForm";
import {messagesData} from "../../data/messagesData";

interface MessageType {
    text: string;
    time: string;
    position: string;
}
interface MessageBlockPropsType {
    messagesData?: Array<MessageType>;
}

export class MessagesBlock extends Block {
    static componentName = "MessagesBlock";
    constructor(props: MessageBlockPropsType) {
        super({...props});
        this.setProps({
            onSubmit: () => this.onSubmit(),
            onBlur: (e: FocusEvent) => this.onBlur(e),
            onFocus: (e: FocusEvent) => this.onFocus(e),
            messagesData,
            messageErrorText: ''
        })
    }
    onBlur(e: FocusEvent) {
        const
            messageEl = e.target as HTMLInputElement,
            errorMessage = validateForm(messageEl);
        this.refs[`${messageEl.name}ErrorRef`].textContent = errorMessage;
    }

    onFocus(e: FocusEvent) {
        const messageEl = e.target as HTMLInputElement;
        this.refs[`${messageEl.name}ErrorRef`].textContent = '';
    }

    onSubmit() {
        const
            messageEl = this._element?.querySelector('input[name="message"]') as HTMLInputElement,
            messageErrorText = validateForm(messageEl);
        if (messageErrorText) {
            this.setProps({
                messageErrorText
            })
        } else {
            const submitObj = {
                [messageEl.name]: messageEl.value
            };
            console.log(JSON.stringify(submitObj, null, 2));
        }
    }
    protected render(): string {
        // language=hbs
        return `
            <div class="chat__messages-block">
                <div class="chat__messages-block_header">
                    <img src=${avatar} alt="photo" class="chat__messages-block_header_photo" alt="Photo">
                    <div class="chat__messages-block_header_name">{{chatName}}</div>
                    <img src=${menuProfile} alt="Menu" class="chat__messages-block_header_menu">
                    <div class="chat__modal-menu chat__modal-menu_header-menu ">
                        <div class="chat__modal-menu_wrapper">
                            <img src=${addIcon} alt="Add" class="chat__modal-menu_icon">
                            <div class="chat__modal-menu_text">Add user</div>
                        </div>
                        <div class="chat__modal-menu_wrapper">
                            <img src=${delIcon} alt="Del" class="chat__modal-menu_icon">
                            <div class="chat__modal-menu_text">Del user</div>
                        </div>
                    </div>
                </div>

                <div class="chat__separator"></div>

                <div class="chat__messages-block_body">
                    {{#each this.messagesData }}
                        {{{Message
                                text=text
                                time=time
                                position=position}}}
                    {{/each }}
                </div>

                <div class="chat__separator"></div>

                <form class="chat__messages-block_send-message">
                    <label class="modal__label_upload-file" for="upload-file">
                        <a href="/upload-file">
                            <img src=${menuMessage} alt="Add file" class="chat__messages-block_send-message_menu">
                        </a>
                    </label>
                    <input class="modal__input_upload-file" type="file" name="file" id="upload-file"/>

                    {{{Input name="message" type="search" placeholder="Message" addClass="chat__search-form_input" onFocus=onFocus
                             onBlur=onBlur}}}
                    {{{Error ref="messageErrorRef" addClass="modal__error_text_message" errorMessage=messageErrorText}}}
                    {{{Button text="->" addClass="chat__messages-block_send-message_send-btn" onClick=onSubmit}}}

                    <div class="chat__modal-menu ">
                        <div class="chat__modal-menu_wrapper">
                            <img class="chat__modal-menu_icon" src=${photoIcon} alt="Add photo">
                            <div class="chat__modal-menu_text">Photo and video</div>
                        </div>
                        <div class="chat__modal-menu_wrapper">
                            <img class="chat__modal-menu_icon" src=${fileIcon} alt="Add file">
                            <div class="chat__modal-menu_text">File</div>
                        </div>
                        <div class="chat__modal-menu_wrapper">
                            <img class="chat__modal-menu_icon" src=${locationIcon} alt="Add location">
                            <div class="chat__modal-menu_text">Location</div>
                        </div>
                    </div>
                </form>
            </div>
        `;
    }
}
