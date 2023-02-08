import Block from 'core/Block';
import { validateForm } from 'helpers/validateForm';

export class ChangePasswordPage extends Block {
  constructor() {
    super();
    this.setProps({
      onSubmit: (e: FocusEvent) => this.onSubmit(e),
      onBlur: (e: FocusEvent) => this.onBlur(e),
      onFocus: (e: FocusEvent) => this.onFocus(e),
      oldPasswordErrorText: '',
      passwordErrorText: '',
      generalFormError: '',
    });
  }

  onBlur(e: FocusEvent) {
    const
      inputEl = e.target as HTMLInputElement;
    const errorMessage = validateForm(inputEl);
    const passwordEl = this._element?.querySelector('input[name="password"]') as HTMLInputElement;
    const repeat_passwordEl = this._element?.querySelector('input[name="repeat_password"]') as HTMLInputElement;
    if (inputEl.name === 'repeat_password') {
      passwordEl.value !== repeat_passwordEl.value
        ? this.refs.generalErrorRef.textContent = 'Passwords mismatch'
        : this.refs.generalErrorRef.textContent = '';
    } else {
      this.refs[`${inputEl.name}ErrorRef`].textContent = <string>errorMessage;
    }
  }

  onFocus(e: FocusEvent) {
    const inputEl = e.target as HTMLInputElement;
    if (inputEl.name === 'repeat_password' || inputEl.name === 'password') {
      this.refs.generalErrorRef.textContent = '';
    }
    if (inputEl.name !== 'repeat_password') {
      this.refs[`${inputEl.name}ErrorRef`].textContent = '';
    }
  }

  onSubmit(e: FocusEvent) {
    const

      oldPasswordEl = this._element?.querySelector('input[name="old_password"]') as HTMLInputElement;
    const passwordEl = this._element?.querySelector('input[name="password"]') as HTMLInputElement;
    const repeat_passwordEl = this._element?.querySelector('input[name="repeat_password"]') as HTMLInputElement;
    const
      oldPasswordErrorText = validateForm(oldPasswordEl);
    const passwordErrorText = validateForm(passwordEl);
    const generalFormError = passwordEl.value !== repeat_passwordEl.value ? 'Passwords mismatch' : '';
    if (oldPasswordErrorText
            || passwordErrorText
            || generalFormError) {
      this.setProps({
        oldPasswordErrorText,
        passwordErrorText,
        generalFormError,
      });
    } else {
      const submitObj = {
        [passwordEl.name]: passwordEl.value,
      };
      console.log(JSON.stringify(submitObj, null, 2));
    }
    e.preventDefault();
  }

  render() {
    // language=hbs
    return `
            <div class="modal__wrapper">
                <main class="modal__window">
                    <h2 class="modal__title">Change password</h2>
                    <form class="modal__inputs">
                        <div class="modal__input_wrapper">
                            {{{Input name="old_password" type="password" onFocus=onFocus onBlur=onBlur }}}
                            <span class="modal__description">Old password</span>
                            {{{Error ref="old_passwordErrorRef" errorMessage=oldPasswordErrorText}}}
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
                        <div class="modal__btns">
                            {{{Button text="Save" onClick=onSubmit}}}
                            {{{Link class="modal__link" to="/profile" text="Back to profile"}}}
                        </div>
                    </form>
                </main>
            </div>
        `;
  }
}
