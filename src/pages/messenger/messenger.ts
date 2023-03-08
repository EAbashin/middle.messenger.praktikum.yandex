import * as search from 'assets/search.svg';
import { withStore, withRouter } from 'utils';
import { CoreRouter, Store, Block } from 'core';
import { createChat } from '../../services/chatsService';

type MessengerPageProps = {
  router: CoreRouter;
  store: Store<AppState>;
  isLoading: boolean;
  onToggleAppLoading?: () => void;
  goToSettingsPage: (e: FocusEvent) => void;
  user: User | null;
  chats: ChatData[] | null;
  userAvatar: () => string;
  createChat: () => void;
  isSelectedChat: () => void;
};

export class MessengerPage extends Block<MessengerPageProps> {
  constructor({ ...props }: MessengerPageProps) {
    super({ ...props });
    this.setProps({
      user: this.props.store.getState().user,
      chats: this.props.store.getState().chats,
      isSelectedChat: () => this.props.store.getState().isSelectedChat,
      userAvatar: () => `${process.env.API_ENDPOINT}/resources${this.props.user?.avatar}`,
      createChat: () => this.createChat(),
      goToSettingsPage: (e: FocusEvent) => this.goToSettingsPage(e),
    });
  }

  goToSettingsPage(e: FocusEvent) {
    e.preventDefault();
    this.props.router.go('/settings');
  }

  async createChat() {
    const chatName: string = (document.querySelector('[name=create_chat]') as HTMLInputElement).value as string;
    await this.props.store.dispatch(createChat, { title: `${chatName}` });
    setTimeout(() => {
      this.setProps({
        chats: this.props.store.getState().chats,
      });
    }, 0);
  }

  render() {
    // language=hbs
    return `
            <main class="chat__wrapper">
                <div class="chat__user-list">
                    {{{Link
                            addClass="chat__user-list_profile-link"
                            to=""
                            text="Settings >"
                            onClick=goToSettingsPage
                    }}}

                    <form class="chat__search-form">
                        {{{Input
                                name="create_chat"
                                type="text"
                                addClass="chat__search-form_input"
                                placeholder="Add chat ..."}}}
                        <img src=${search} alt="search" class="chat__search-form_img">
                        {{{Button
                                text="+"
                                addClass="chat__messages-block_send-message_send-btn"
                                onClick=createChat}}}
                    </form>

                    <div class="chat__separator"></div>

                    <div class="chat__items-wrapper">
                        {{#each this.chats }}
                            {{{ChatItem
                                    id=id
                                    title=title
                                    avatar=avatar
                                    unread_count=unread_count
                                    active=active
                                    time=last_message.time
                                    content=last_message.content
                            }}}
                        {{/each }}
                    </div>
                </div>
                {{#if ${this.props.isSelectedChat && this.props.isSelectedChat()}}}
                    {{{MessagesBlock
                            user=this.user
                            userAvatar=this.userAvatar
                            messages=this.messages
                    }}}
                {{else}}
                    {{{EmptyMessageBlock}}}
                {{/if}}
            </main>
        `;
  }
}

export default withRouter(withStore(MessengerPage));
