import Block from 'core/Block';
import {usersData} from "data/usersData";
import * as search from 'assets/search.svg';


export class ChatEmptyPage extends Block<object> {
    constructor() {
        super();
        this.setProps({
            usersData: usersData,
            onInput: () => this.onInput(),
        })
    }

    onInput() {
        const searchEl = this._element?.querySelector('input[name="search"]') as HTMLInputElement;
        console.log(searchEl.value);
    }

    render() {
        // language=hbs
        return `
            <main class="chat__wrapper">
                <div class="chat__user-list">
                    <a href="./profile" class="chat__user-list_profile-link">Profile ></a>
                    <form class="chat__search-form">
                        {{{Input name="search" type="search" addClass="chat__search-form_input" placeholder="Search" onInput=onInput}}}
                        <img src=${search} alt="search" class="chat__search-form_img">
                    </form>
                    <div class="chat__separator"></div>
                    <div class="chat__items-wrapper">
                        {{#each this.usersData}}
                            {{{UserItem
                                    photo=photo
                                    chatName=chatName
                                    time=time
                                    message=message
                                    unread=unread
                            }}}
                        {{/each}}
                    </div>
                </div>
                {{{EmptyMessageBlock}}}
            </main>
        `;
    }
}
