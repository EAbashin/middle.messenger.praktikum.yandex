import Block from 'core/Block';
import { validateForm } from 'helpers/validateForm';

export class AddUserPage extends Block<object> {
  constructor() {
    super();
    this.setProps({
      onSubmit: (e: FocusEvent) => this.onSubmit(e),
      onBlur: (e: FocusEvent) => this.onBlur(e),
      onFocus: (e: FocusEvent) => this.onFocus(e),
      loginErrorText: '',
      generalFormError: '',
    });
  }

  onBlur(e: FocusEvent) {
    const
      inputEl = e.target as HTMLInputElement;
    const errorMessage = validateForm(inputEl);
    this.refs[`${inputEl.name}ErrorRef`].textContent = <string>errorMessage;
  }

  onFocus(e: FocusEvent) {
    const inputEl = e.target as HTMLInputElement;
    this.refs[`${inputEl.name}ErrorRef`].textContent = '';
  }

  onSubmit(e: FocusEvent) {
    const
      loginEl = this._element?.querySelector('input[name="sign-in"]') as HTMLInputElement;
    const loginErrorText = validateForm(loginEl);
    if (loginErrorText) {
      this.setProps({
        loginErrorText,
      });
    } else {
      const submitObj = {
        [loginEl.name]: loginEl.value,
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
                    <h2 class="modal__title">Add user</h2>
                    <form class="modal__inputs">
                        <div class="modal__input_wrapper">
                            {{{Input name="sign-in" type="text" addClass=loginAddClass onFocus=onFocus onBlur=onBlur }}}
                            <span class="modal__description">Login</span>
                            {{{Error ref="loginErrorRef" errorMessage=loginErrorText}}}
                        </div>
                        {{{Error ref="generalErrorRef" addClass="modal__general_error" errorMessage=generalFormError}}}
                        <div class="modal__btns">
                            {{{Button text="Enter" onClick=onSubmit}}}
                            {{{Link class="modal__link" to="/messenger" text="Back to messenger"}}}
                        </div>
                    </form>
                </main>
            </div>
        `;
  }
}
