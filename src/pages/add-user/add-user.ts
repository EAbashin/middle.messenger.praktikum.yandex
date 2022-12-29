import Block from 'core/Block';
import {validateForm} from "helpers/validateForm";


export class AddUserPage extends Block<object> {
    constructor() {
        super();
        this.setProps({
            onSubmit: () => this.onSubmit(),
            onBlur: (e: FocusEvent) => this.onBlur(e),
            onFocus: (e: FocusEvent) => this.onFocus(e),
            loginErrorText: '',
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
            loginEl = this._element?.querySelector('input[name="login"]') as HTMLInputElement,
            loginErrorText = validateForm(loginEl);
        if (loginErrorText) {
            this.setProps({
                loginErrorText
            })
        } else {
            const submitObj = {
                [loginEl.name]: loginEl.value
            };
            console.log(JSON.stringify(submitObj, null, 2));
        }
    }

    render() {
        // language=hbs
        return `
            <div class="modal__wrapper">
                <div class="modal__window">
                    <h2 class="modal__title">Add user</h2>
                    <form class="modal__inputs">
                        <div class="modal__input_wrapper">
                            {{{Input name="login" type="text" addClass=loginAddClass onFocus=onFocus onBlur=onBlur }}}
                            <span class="modal__description">Login</span>
                            {{{Error ref="loginErrorRef" errorMessage=loginErrorText}}}
                        </div>
                        {{{Error ref="generalErrorRef" addClass="modal__general_error" errorMessage=generalFormError}}}
                    </form>
                    <div class="modal__btns">
                        {{{Button text="Enter" onClick=onSubmit}}}
                        {{{Link class="modal__link" to="/chat" text="Back to chat"}}}
                    </div>
                </div>
            </div>
        `;
    }
}
