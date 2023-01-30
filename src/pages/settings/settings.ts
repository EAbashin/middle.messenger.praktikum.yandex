import Block from 'core/Block';
import * as avatar from 'assets/avatar.png';
import * as editImage from 'assets/edit-image.png';
import {validateForm} from "../../helpers/validateForm";
import {CoreRouter, Store} from "../../core";
import {withRouter, withStore} from "../../utils";
import {logout} from "../../services/authService";
import {changeAvatar} from "../../services/resourcesService";
import {changeUserProfile} from "../../services/usersService";

type SettingsPageProps = {
    router: CoreRouter;
    store: Store<AppState>;
    goToMessenger: (e: FocusEvent) => void;
    logout: () => void;
    onSubmit: (e: FocusEvent) => void;
    onBlur: (e: FocusEvent) => void;
    onFocus: (e: FocusEvent) => void;
    emailErrorText: string;
    loginErrorText: string;
    first_nameErrorText: string;
    second_nameErrorText: string;
    display_nameErrorText: string;
    phoneErrorText: string;
    formError: string | null | (() => string | null);
    userAvatar: () => string;
    onChangeAvatar: () => void;
    user?: User | null;
};

export class SettingsPage extends Block<SettingsPageProps> {
    constructor(props: SettingsPageProps) {
        super(props);
        this.setProps({
            user: this.props.store.getState().user,
            userAvatar: () => `${process.env.API_ENDPOINT}/resources${this.props.store.getState().user?.avatar}`,
            onBlur: (e: FocusEvent) => this.onBlur(e),
            onSubmit: (e: FocusEvent) => this.onSubmit(e),
            onFocus: (e: FocusEvent) => this.onFocus(e),
            goToMessenger: (e: FocusEvent) => this.goToMessenger(e),
            logout: () => this.logout(),
            onChangeAvatar: () => this.onChangeAvatar(),
            loginErrorText: '',
            emailErrorText: '',
            first_nameErrorText: '',
            second_nameErrorText: '',
            display_nameErrorText: '',
            phoneErrorText: '',
            formError: () => this.props.store.getState().formError
        })
    }

    onChangeAvatar() {
        const avatarField = document.querySelector(`[name=avatar]`) as HTMLInputElement;
        if (avatarField && avatarField.files) {
            const formData = new FormData();
            formData.append('avatar', avatarField.files[0]);
            window.store.dispatch(changeAvatar, formData);
        }
    }

    goToMessenger(e: FocusEvent) {
        e.preventDefault();
        this.props.router.go('/messenger');
    }

    logout() {
        this.props.store.dispatch(logout);
    }

    onBlur(e: FocusEvent) {
        const
            inputEl = e.target as HTMLInputElement;
        this.refs[`${inputEl.name}ErrorRef`].textContent = validateForm(inputEl);
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
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        if (emailErrorText || loginErrorText || first_nameErrorText || second_nameErrorText || display_nameErrorText || phoneErrorText || this.props.formError()) {
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
            this.props.store.dispatch(changeUserProfile, submitObj);
        }
        e.preventDefault();
    }

    render() {
        // language=hbs
        return `
            <main class="profile__wrapper">
                <div class="profile__container">
                    <div class="profile__photo-container">
                        {{#if this.user}}
                            <img src="${this.props.userAvatar && this.props.userAvatar()}" alt="photo" class="profile__photo-container_photo">
                        {{else}}
                            <img src=${avatar} alt="photo" class="profile__photo-container_photo">
                        {{/if}}
                        <div class="profile__photo-container_edit-photo">
                            <img src=${editImage} alt="photo" class="profile__photo-container_edit-photo_img">
                            {{{Input
                                    type="file"
                                    addClass="modal__input_upload-file"
                                    accept=".jpg, .jpeg, .png"
                                    name="avatar"
                                    onInput=onChangeAvatar
                            }}}
                        </div>
                    </div>
                    <form class="profile__info">
                        <div class="profile__options">
                            <label class="profile__options_title">Email</label>
                            {{{Input name="email" type="email" addClass="profile__options_descr" placeholder="pochta@yandex.ru"
                                     value=store.state.user.email onFocus=onFocus onBlur=onBlur }}}
                            {{{Error ref="emailErrorRef" errorMessage=emailErrorText addClass="modal__error_text_bottom"}}}
                        </div>
                        <div class="profile__separator"></div>
                        <div class="profile__options">
                            <label class="profile__options_title">Login</label>
                            {{{Input name="login" type="text" addClass="profile__options_descr" placeholder="ivanivanov"
                                     value=store.state.user.login onFocus=onFocus onBlur=onBlur }}}
                            {{{Error ref="loginErrorRef" errorMessage=loginErrorText addClass="modal__error_text_bottom"}}}
                        </div>
                        <div class="profile__separator"></div>
                        <div class="profile__options">
                            <label class="profile__options_title">Name</label>
                            {{{Input name="first_name" type="text" addClass="profile__options_descr" placeholder="Ivan"
                                     value=store.state.user.firstName onFocus=onFocus onBlur=onBlur }}}
                            {{{Error ref="first_nameErrorRef" errorMessage=first_nameErrorText addClass="modal__error_text_bottom"}}}
                        </div>
                        <div class="profile__separator"></div>
                        <div class="profile__options">
                            <label class="profile__options_title">Surname</label>
                            {{{Input name="second_name" type="text" addClass="profile__options_descr" placeholder="Ivanov"
                                     value=store.state.user.secondName onFocus=onFocus onBlur=onBlur }}}
                            {{{Error ref="second_nameErrorRef" errorMessage=second_nameErrorText addClass="modal__error_text_bottom"}}}
                        </div>
                        <div class="profile__separator"></div>
                        <div class="profile__options">
                            <label class="profile__options_title">Display name</label>
                            {{{Input name="display_name" type="text" addClass="profile__options_descr" placeholder="Ivan"
                                     value=store.state.user.displayName onFocus=onFocus onBlur=onBlur }}}
                            {{{Error ref="display_nameErrorRef" errorMessage=display_nameErrorText addClass="modal__error_text_bottom"}}}
                        </div>
                        <div class="profile__separator"></div>
                        <div class="profile__options">
                            <label class="profile__options_title">Phone</label>
                            {{{Input name="phone" type="tel" addClass="profile__options_descr" placeholder="+79991112233"
                                     value=store.state.user.phone onFocus=onFocus onBlur=onBlur }}}
                            {{{Error ref="phoneErrorRef" errorMessage=phoneErrorText addClass="modal__error_text_bottom"}}}
                        </div>
                        <div class="profile__links">
                            {{{Error ref="generalErrorRef" addClass="modal__general_error" errorMessage=this.props.formError}}}
                            {{{Button
                                    text="Save" addClass="profile__links_btn" onClick=onSubmit}}}
                            {{{Link
                                    to=""
                                    text="Back to messeger"
                                    onClick=goToMessenger
                            }}}
                            {{{Link
                                    addClass="red bold"
                                    to=""
                                    text="Logout"
                                    onClick=logout
                            }}}
                        </div>
                    </form>
                </div>
            </main>
        `;
    }
}

export default withRouter(withStore(SettingsPage));
