import Block from 'core/Block';
import * as avatar from 'assets/avatar.png';
import * as menuProfile from 'assets/menu-profile.png';
import * as addIcon from 'assets/add-icon.png';
import * as delIcon from 'assets/del-icon.png';
import * as menuMessage from 'assets/menu-message.svg';
import * as photoIcon from 'assets/photo-icon.png';
import * as fileIcon from 'assets/file-icon.png';
import * as locationIcon from 'assets/location-icon.png';
import { validateForm } from '../../helpers/validateForm';
import { sendMessage } from '../../services/chatsService';

type MessageType = {
  text: string;
  time: string;
  position: string;
};
type MessageBlockPropsType = {
  onSubmit: (e: FocusEvent) => void;
  onBlur: (e: FocusEvent) => void;
  onFocus: (e: FocusEvent) => void;
  user?: UserData | null;
  userAvatar?: () => string;
  messageErrorText: string;
  messages?: MessageType[];
  activeChat?: string | number | null;
};

export class MessagesBlock extends Block<MessageBlockPropsType> {
  static componentName = 'MessagesBlock';

  constructor({ ...props }: MessageBlockPropsType) {
    super({ ...props });
    this.setProps({
      activeChat: window.store.getState().activeChat,
      messageErrorText: '',
      onBlur: (e: FocusEvent) => this.onBlur(e),
      onFocus: (e: FocusEvent) => this.onFocus(e),
      onSubmit: (e: FocusEvent) => this.onSubmit(e),
    });
    if (window.store.getState().activeChat && window.store.getState().messages) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      this.setProps({ messages: window.store.getState().messages[window.store.getState().activeChat] });
    }
  }

  onBlur(e: FocusEvent) {
    const messageEl = e.target as HTMLInputElement;
    // @ts-ignore
    this.refs[`${messageEl.name}ErrorRef`].textContent = validateForm(messageEl);
  }

  onFocus(e: FocusEvent) {
    const messageEl = e.target as HTMLInputElement;
    this.refs[`${messageEl.name}ErrorRef`].textContent = '';
  }

  onSubmit(e: FocusEvent) {
    const
      messageEl = this._element?.querySelector('input[name="message"]') as HTMLInputElement;
    const messageErrorText = validateForm(messageEl);
    if (messageErrorText) {
      this.setProps({
        messageErrorText,
      });
    } else {
      const submitObj = {
        [messageEl.name]: messageEl.value,
      };
      console.log(JSON.stringify(submitObj, null, 2));
      window.store.dispatch(sendMessage, submitObj);
    }
    e.preventDefault();
  }

  protected render(): string {
    // language=hbs
    return `
            <div class="chat__messages-block">
                <div class="chat__messages-block_header">
                    <img src=${this.props.userAvatar && this.props.userAvatar() || avatar} alt="photo" class="chat__messages-block_header_photo" alt="Photo">
                    <div class="chat__messages-block_header_name">{{this.user.firstName}} (id: {{this.user.id}})</div>
                    
                    <form class="chat__search-form form_to_left">
                        {{{Input
                                name="create_chat"
                                type="text"
                                addClass="chat__search-form_input"
                                placeholder="Add user ..."}}}
                        {{{Button
                                text="+"
                                addClass="chat__messages-block_send-message_send-btn"
                                onClick=addUser}}}
                    </form>
                    
                    <!--<img src=${menuProfile} alt="Menu" class="chat__messages-block_header_menu">
                    <div class="chat__modal-menu chat__modal-menu_header-menu ">
                        <div class="chat__modal-menu_wrapper">
                            <img src=${addIcon} alt="Add" class="chat__modal-menu_icon">
                            <div class="chat__modal-menu_text">Add user</div>
                        </div>
                        <div class="chat__modal-menu_wrapper">
                            <img src=${delIcon} alt="Del" class="chat__modal-menu_icon">
                            <div class="chat__modal-menu_text">Del user</div>
                        </div>
                    </div>-->
                </div>

                <div class="chat__separator"></div>

                <div class="chat__messages-block_body">
                    {{#each this.messages}}
                        {{{Message
                                content=content
                                time=time
                                from_me=from_me
                        }}}
                    {{/each}}
                </div>

                <div class="chat__separator"></div>

                <form class="chat__messages-block_send-message">
                    <!--
                    <label class="modal__label_upload-file" for="upload-file">
                        <a>
                            <img src=${menuMessage} alt="Add file" class="chat__messages-block_send-message_menu">
                        </a>
                    </label>
                    
                    <input class="modal__input_upload-file" type="file" name="file" id="upload-file"/>
                    -->
                    {{{Input
                            name="message"
                            type="search"
                            placeholder="Message"
                            addClass="chat__search-form_input"
                            onFocus=onFocus
                            onBlur=onBlur
                    }}}
                    
                    {{{Error
                            ref="messageErrorRef" addClass="modal__error_text_message" errorMessage=messageErrorText}}}
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
