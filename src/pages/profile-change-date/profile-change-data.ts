import Block from 'core/Block';
import * as back from 'assets/back.png';
import * as avatar from 'assets/avatar.png';
import {validateForm} from "../../helpers/validateForm";

export class ProfileChangeData extends Block {
    constructor() {
        super();
        this.setProps({
            onSubmit: () => this.onSubmit(),
            onBlur: (e: FocusEvent) => this.onBlur(e),
            onFocus: (e: FocusEvent) => this.onFocus(e),
            emailErrorText: '',
            loginErrorText: '',
            nameErrorText: '',
            surnameErrorText: '',
            usernameErrorText: '',
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
    onSubmit() {
        const
            emailEl = this._element?.querySelector('input[name="email"]') as HTMLInputElement,
            loginEl = this._element?.querySelector('input[name="login"]') as HTMLInputElement,
            nameEl = this._element?.querySelector('input[name="name"]') as HTMLInputElement,
            surnameEl = this._element?.querySelector('input[name="surname"]') as HTMLInputElement,
            usernameEl = this._element?.querySelector('input[name="username"]') as HTMLInputElement,
            phoneEl = this._element?.querySelector('input[name="phone"]') as HTMLInputElement,
            emailErrorText = validateForm(emailEl),
            loginErrorText = validateForm(loginEl),
            nameErrorText = validateForm(nameEl),
            surnameErrorText = validateForm(surnameEl),
            usernameErrorText = validateForm(usernameEl),
            phoneErrorText = validateForm(phoneEl);
        if (emailErrorText || loginErrorText || nameErrorText || surnameErrorText || usernameErrorText || phoneErrorText) {
            this.setProps({
                emailErrorText,
                loginErrorText,
                nameErrorText,
                surnameErrorText,
                usernameErrorText,
                phoneErrorText
            })
        } else {
            const submitObj = {
                [emailEl.name]: emailEl.value,
                [loginEl.name]: loginEl.value,
                [nameEl.name]: nameEl.value,
                [surnameEl.name]: surnameEl.value,
                [usernameEl.name]: usernameEl.value,
                [phoneEl.name]: phoneEl.value,
            };
            console.log(JSON.stringify(submitObj, null, 2));
        }
    }
    render() {
        // language=hbs
        return `
            <div class="profile__wrapper">
                <div class="profile__back">
                    <a class="profile__back_btn" href="/profile"><img src=${back} alt="Back"></a>
                </div>
                <div class="profile__container">
                    <div class="profile__photo-container">
                        <img src=${avatar} alt="photo" class="profile__photo-container_photo">
                    </div>
                    <div class="profile__info">
                        <div class="profile__options">
                            <div class="profile__options_title">Email</div>
                            {{{Input name="email" type="email" addClass="profile__options_descr" placeholder="pochta@yandex.ru" onFocus=onFocus onBlur=onBlur }}}
                            {{{Error ref="emailErrorRef" errorMessage=emailErrorText addClass="modal__error_text_bottom"}}}
                        </div>
                        <div class="profile__separator"></div>
                        <div class="profile__options">
                            <div class="profile__options_title">Login</div>
                            {{{Input name="login" type="text" addClass="profile__options_descr" placeholder="ivanivanov" onFocus=onFocus onBlur=onBlur }}}
                            {{{Error ref="loginErrorRef" errorMessage=loginErrorText addClass="modal__error_text_bottom"}}}
                        </div>
                        <div class="profile__separator"></div>
                        <div class="profile__options">
                            <div class="profile__options_title">Name</div>
                            {{{Input name="name" type="text" addClass="profile__options_descr" placeholder="Ivan" onFocus=onFocus onBlur=onBlur }}}
                            {{{Error ref="nameErrorRef" errorMessage=nameErrorText addClass="modal__error_text_bottom"}}}
                        </div>
                        <div class="profile__separator"></div>
                        <div class="profile__options">
                            <div class="profile__options_title">Surname</div>
                            {{{Input name="surname" type="text" addClass="profile__options_descr" placeholder="Ivanov" onFocus=onFocus onBlur=onBlur }}}
                            {{{Error ref="surnameErrorRef" errorMessage=surnameErrorText addClass="modal__error_text_bottom"}}}
                        </div>
                        <div class="profile__separator"></div>
                        <div class="profile__options">
                            <div class="profile__options_title">Username</div>
                            {{{Input name="username" type="text" addClass="profile__options_descr" placeholder="Ivan" onFocus=onFocus onBlur=onBlur }}}
                            {{{Error ref="usernameErrorRef" errorMessage=usernameErrorText addClass="modal__error_text_bottom"}}}
                        </div>
                        <div class="profile__separator"></div>
                        <div class="profile__options">
                            <div class="profile__options_title">Phone</div>
                            {{{Input name="phone" type="tel" addClass="profile__options_descr" placeholder="+79991112233" onFocus=onFocus onBlur=onBlur }}}
                            {{{Error ref="phoneErrorRef" errorMessage=phoneErrorText addClass="modal__error_text_bottom"}}}
                        </div>
                    </div>
                    <div class="profile__links">
                        {{{Error ref="generalErrorRef" addClass="modal__general_error" errorMessage=generalFormError}}}
                        {{{Button text="Save" addClass="profile__links_btn" onClick=onSubmit}}}
                    </div>
                </div>
            </div>
        `;
    }
}
