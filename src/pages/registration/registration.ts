import Block from 'core/Block';
import {validateForm} from "helpers/validateForm";

export class RegistrationPage extends Block {
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
            phoneErrorText: '',
            passwordErrorText: '',
            generalFormError: ''
        })
    }

    onBlur(e: FocusEvent) {
        const
            inputEl = e.target as HTMLInputElement,
            errorMessage = validateForm(inputEl),
            passwordEl = this._element?.querySelector('input[name="password"]') as HTMLInputElement,
            repeat_passwordEl = this._element?.querySelector('input[name="repeat_password"]') as HTMLInputElement;
        if (inputEl.name === 'repeat_password') {
            passwordEl.value !== repeat_passwordEl.value
                ? this.refs.generalErrorRef.textContent = 'Passwords mismatch'
                : this.refs.generalErrorRef.textContent = ''
        } else {
            this.refs[`${inputEl.name}ErrorRef`].textContent = errorMessage;
        }
    }

    onFocus(e: FocusEvent) {
        const inputEl = e.target as HTMLInputElement;
        if (inputEl.name === 'repeat_password' || inputEl.name === 'password') {
            this.refs.generalErrorRef.textContent = '';
        } else {
            this.refs[`${inputEl.name}ErrorRef`].textContent = '';
        }
    }

    onSubmit() {
        const
            emailEl = this._element?.querySelector('input[name="email"]') as HTMLInputElement,
            loginEl = this._element?.querySelector('input[name="login"]') as HTMLInputElement,
            nameEl = this._element?.querySelector('input[name="name"]') as HTMLInputElement,
            surnameEl = this._element?.querySelector('input[name="surname"]') as HTMLInputElement,
            phoneEl = this._element?.querySelector('input[name="phone"]') as HTMLInputElement,
            passwordEl = this._element?.querySelector('input[name="password"]') as HTMLInputElement,
            repeat_passwordEl = this._element?.querySelector('input[name="repeat_password"]') as HTMLInputElement;
        const
            emailErrorText = validateForm(emailEl),
            loginErrorText = validateForm(loginEl),
            nameErrorText = validateForm(nameEl),
            surnameErrorText = validateForm(surnameEl),
            phoneErrorText = validateForm(phoneEl),
            passwordErrorText = validateForm(passwordEl),
            generalFormError = passwordEl.value !== repeat_passwordEl.value ? 'Passwords mismatch' : '';
        if (emailErrorText
            || loginErrorText
            || nameErrorText
            || surnameErrorText
            || phoneErrorText
            || passwordErrorText
            || generalFormError) {
            this.setProps({
                emailErrorText,
                loginErrorText,
                nameErrorText,
                surnameErrorText,
                phoneErrorText,
                passwordErrorText,
                generalFormError
            })
        } else {
            const submitObj = {
                [emailEl.name]: emailEl.value,
                [loginEl.name]: loginEl.value,
                [nameEl.name]: nameEl.value,
                [surnameEl.name]: surnameEl.value,
                [phoneEl.name]: phoneEl.value,
                [passwordEl.name]: passwordEl.value
            };
            console.log(JSON.stringify(submitObj, null, 2));
        }
    }

    render() {
        // language=hbs
        return `
            <div class="modal__wrapper">
                <div class="modal__window">
                    <h2 class="modal__title">Registration</h2>
                    <form class="modal__inputs">
                        <div class="modal__input_wrapper">
                            {{{Input name="email" type="email" onFocus=onFocus onBlur=onBlur }}}
                            <span class="modal__description">Email</span>
                            {{{Error ref="emailErrorRef" errorMessage=emailErrorText}}}
                        </div>
                        <div class="modal__input_wrapper">
                            {{{Input name="login" type="text" onFocus=onFocus onBlur=onBlur }}}
                            <span class="modal__description">Login</span>
                            {{{Error ref="loginErrorRef" errorMessage=loginErrorText}}}
                        </div>
                        <div class="modal__input_wrapper">
                            {{{Input name="name" type="text" onFocus=onFocus onBlur=onBlur }}}
                            <span class="modal__description">Name</span>
                            {{{Error ref="nameErrorRef" errorMessage=nameErrorText}}}
                        </div>
                        <div class="modal__input_wrapper">
                            {{{Input name="surname" type="text" onFocus=onFocus onBlur=onBlur }}}
                            <span class="modal__description">Surname</span>
                            {{{Error ref="surnameErrorRef" errorMessage=surnameErrorText}}}
                        </div>
                        <div class="modal__input_wrapper">
                            {{{Input name="phone" type="tel" onFocus=onFocus onBlur=onBlur }}}
                            <span class="modal__description">Phone</span>
                            {{{Error ref="phoneErrorRef" errorMessage=phoneErrorText}}}
                        </div>
                        <div class="modal__input_wrapper">
                            {{{Input name="password" type="password" onFocus=onFocus onBlur=onBlur }}}
                            <span class="modal__description">Password</span>
                            {{{Error ref="passwordErrorRef" errorMessage=passwordErrorText}}}
                        </div>
                        <div class="modal__input_wrapper">
                            {{{Input name="repeat_password" type="password" onFocus=onFocus onBlur=onBlur }}}
                            <span class="modal__description">Password (once more)</span>
                        </div>
                        {{{Error ref="generalErrorRef" addClass="modal__general_error" errorMessage=generalFormError}}}
                    </form>
                    <div class="modal__btns">
                        {{{Button text="Registration" onClick=onSubmit}}}
                        {{{Link class="modal__link" to="/login" text="Login"}}}
                    </div>
                </div>
            </div>
        `;
    }
}
