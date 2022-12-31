import Block from 'core/Block';
import * as back from 'assets/back.png';
import * as avatar from 'assets/avatar.png';
import {validateForm} from "../../helpers/validateForm";

export class ChangeData extends Block {
    constructor() {
        super();
        this.setProps({
            onSubmit: (e: FocusEvent) => this.onSubmit(e),
            onBlur: (e: FocusEvent) => this.onBlur(e),
            onFocus: (e: FocusEvent) => this.onFocus(e),
            emailErrorText: '',
            loginErrorText: '',
            first_nameErrorText: '',
            second_nameErrorText: '',
            display_nameErrorText: '',
            phoneErrorText: '',
            generalFormError: ''
        })
    }

    onBlur(e: FocusEvent) {
        const
            inputEl = e.target as HTMLInputElement,
            errorMessage = validateForm(inputEl);
        this.refs[`${inputEl.name}ErrorRef`].textContent = errorMessage;
    }

    onFocus(e: FocusEvent) {
        const inputEl = e.target as HTMLInputElement;
        this.refs[`${inputEl.name}ErrorRef`].textContent = '';
    }
    onSubmit(e: FocusEvent) {
        const
            emailEl = this._element?.querySelector('input[name="email"]') as HTMLInputElement,
            loginEl = this._element?.querySelector('input[name="login"]') as HTMLInputElement,
            first_nameEl = this._element?.querySelector('input[name="first_name"]') as HTMLInputElement,
            second_nameEl = this._element?.querySelector('input[name="second_name"]') as HTMLInputElement,
            display_nameEl = this._element?.querySelector('input[name="display_name"]') as HTMLInputElement,
            phoneEl = this._element?.querySelector('input[name="phone"]') as HTMLInputElement,
            emailErrorText = validateForm(emailEl),
            loginErrorText = validateForm(loginEl),
            first_nameErrorText = validateForm(first_nameEl),
            second_nameErrorText = validateForm(second_nameEl),
            display_nameErrorText = validateForm(display_nameEl),
            phoneErrorText = validateForm(phoneEl);
        if (emailErrorText || loginErrorText || first_nameErrorText || second_nameErrorText || display_nameErrorText || phoneErrorText) {
            this.setProps({
                emailErrorText,
                loginErrorText,
                first_nameErrorText,
                second_nameErrorText,
                display_nameErrorText,
                phoneErrorText
            })
        } else {
            const submitObj = {
                [emailEl.name]: emailEl.value,
                [loginEl.name]: loginEl.value,
                [first_nameEl.name]: first_nameEl.value,
                [second_nameEl.name]: second_nameEl.value,
                [display_nameEl.name]: display_nameEl.value,
                [phoneEl.name]: phoneEl.value,
            };
            console.log(JSON.stringify(submitObj, null, 2));
        }
        e.preventDefault();
    }
    render() {
        // language=hbs
        return `
            <main class="profile__wrapper">
                <div class="profile__back">
                    <a class="profile__back_btn" href="/profile"><img src=${back} alt="Back"></a>
                </div>
                <div class="profile__container">
                    <div class="profile__photo-container">
                        <img src=${avatar} alt="photo" class="profile__photo-container_photo">
                    </div>
                    <form class="profile__info">
                        <div class="profile__options">
                            <label class="profile__options_title">Email</label>
                            {{{Input name="email" type="email" addClass="profile__options_descr" placeholder="pochta@yandex.ru" onFocus=onFocus onBlur=onBlur }}}
                            {{{Error ref="emailErrorRef" errorMessage=emailErrorText addClass="modal__error_text_bottom"}}}
                        </div>
                        <div class="profile__separator"></div>
                        <div class="profile__options">
                            <label class="profile__options_title">Login</label>
                            {{{Input name="login" type="text" addClass="profile__options_descr" placeholder="ivanivanov" onFocus=onFocus onBlur=onBlur }}}
                            {{{Error ref="loginErrorRef" errorMessage=loginErrorText addClass="modal__error_text_bottom"}}}
                        </div>
                        <div class="profile__separator"></div>
                        <div class="profile__options">
                            <label class="profile__options_title">Name</label>
                            {{{Input name="first_name" type="text" addClass="profile__options_descr" placeholder="Ivan" onFocus=onFocus onBlur=onBlur }}}
                            {{{Error ref="first_nameErrorRef" errorMessage=first_nameErrorText addClass="modal__error_text_bottom"}}}
                        </div>
                        <div class="profile__separator"></div>
                        <div class="profile__options">
                            <label class="profile__options_title">Surname</label>
                            {{{Input name="second_name" type="text" addClass="profile__options_descr" placeholder="Ivanov" onFocus=onFocus onBlur=onBlur }}}
                            {{{Error ref="second_nameErrorRef" errorMessage=second_nameErrorText addClass="modal__error_text_bottom"}}}
                        </div>
                        <div class="profile__separator"></div>
                        <div class="profile__options">
                            <label class="profile__options_title">Username</label>
                            {{{Input name="display_name" type="text" addClass="profile__options_descr" placeholder="Ivan" onFocus=onFocus onBlur=onBlur }}}
                            {{{Error ref="display_nameErrorRef" errorMessage=display_nameErrorText addClass="modal__error_text_bottom"}}}
                        </div>
                        <div class="profile__separator"></div>
                        <div class="profile__options">
                            <label class="profile__options_title">Phone</label>
                            {{{Input name="phone" type="tel" addClass="profile__options_descr" placeholder="+79991112233" onFocus=onFocus onBlur=onBlur }}}
                            {{{Error ref="phoneErrorRef" errorMessage=phoneErrorText addClass="modal__error_text_bottom"}}}
                        </div>
                        <div class="profile__links">
                            {{{Button text="Save" addClass="profile__links_btn" onClick=onSubmit}}}
                            {{{Error ref="generalErrorRef" addClass="modal__general_error" errorMessage=generalFormError}}}
                        </div>
                    </form>
                </div>
            </main>
        `;
    }
}
