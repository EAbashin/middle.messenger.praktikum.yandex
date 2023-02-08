import Block from 'core/Block';
import { validateForm } from 'helpers/validateForm';
import { CoreRouter, Store } from '../../core';
import { withRouter, withStore } from '../../utils';
import { singin } from '../../services/authService';

type SignInPageProps = {
  router: CoreRouter;
  store: Store<AppState>;
  onSubmit?: (e: FocusEvent) => void;
  onBlur?: (e: FocusEvent) => void;
  onFocus?: (e: FocusEvent) => void;
  onNavigateNext?: (e: FocusEvent) => void;
  loginErrorText?: string;
  passwordErrorText?: string;
  formError?: () => void;
};

export class SignInPage extends Block<SignInPageProps> {
  static componentName = 'SignInPage';

  constructor(props: SignInPageProps) {
    super(props);
    this.setProps({
      onSubmit: (e: FocusEvent) => this.onSubmit(e),
      onBlur: (e: FocusEvent) => this.onBlur(e),
      onFocus: (e: FocusEvent) => this.onFocus(e),
      onNavigateNext: (e: FocusEvent) => this.onNavigateNext(e),
      loginErrorText: '',
      passwordErrorText: '',
      formError: () => this.props.store.getState().formError,
    });
  }

  onNavigateNext(e: FocusEvent) {
    e.preventDefault();
    this.props.router.go('/sign-up');
  }

  onBlur(e: FocusEvent) {
    const inputEl = e.target as HTMLInputElement;
    this.refs[`${inputEl.name}ErrorRef`].textContent = <string>validateForm(inputEl);
  }

  onFocus(e: FocusEvent) {
    const inputEl = e.target as HTMLInputElement;
    this.refs[`${inputEl.name}ErrorRef`].textContent = '';
  }

  onSubmit(e: FocusEvent) {
    const
      loginEl = this._element?.querySelector('input[name="login"]') as HTMLInputElement;
    const passwordEl = this._element?.querySelector('input[name="password"]') as HTMLInputElement;
    const loginErrorText = validateForm(loginEl);
    const passwordErrorText = validateForm(passwordEl);
    if (loginErrorText || passwordErrorText) {
      this.setProps({
        loginErrorText,
        passwordErrorText,
      });
    } else {
      const loginData = {
        login: loginEl.value,
        password: passwordEl.value,
      };

      this.props.store.dispatch(singin, loginData);

      console.log(JSON.stringify(loginData, null, 2));
    }
    e.preventDefault();
  }

  render() {
    // language=hbs
    return `
            <div class="modal__wrapper">
                <div class="modal__window">
                    <h2 class="modal__title">Login</h2>
                    <form class="modal__inputs">
                        <div class="modal__input_wrapper">
                            {{{Input
                                    name="login"
                                    type="text"
                                    addClass=loginAddClass
                                    onFocus=onFocus
                                    onBlur=onBlur
                            }}}
                            <span class="modal__description">Login</span>
                            {{{Error
                                    ref="loginErrorRef"
                                    errorMessage=loginErrorText
                            }}}
                        </div>

                        <div class="modal__input_wrapper">
                            {{{Input
                                    name="password"
                                    type="password"
                                    addClass=passwordAddClass
                                    onFocus=onFocus
                                    onBlur=onBlur
                            }}}
                            <span class="modal__description">Password</span>
                            {{{Error
                                    ref="passwordErrorRef"
                                    errorMessage=passwordErrorText
                            }}}
                        </div>

                        {{{Error
                                ref="generalErrorRef"
                                addClass="modal__general_error"
                                errorMessage=formError
                        }}}

                        <div class="modal__btns">
                            {{{Button
                                    text="Enter"
                                    onClick=onSubmit
                                    dataTestId="sign_in-buttons"
                            }}}
                            {{{Link
                                    class="modal__link"
                                    to=""
                                    text="Sign-up"
                                    onClick=onNavigateNext
                            }}}
                        </div>

                    </form>
                </div>
            </div>
        `;
  }
}

export default withRouter(withStore(SignInPage));
