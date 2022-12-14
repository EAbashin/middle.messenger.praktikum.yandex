import Block from 'core/Block';
import * as back from 'assets/back.png';
import * as avatar from 'assets/avatar.png';
import * as editImage from 'assets/edit-image.png';

export class Profile extends Block {
    render() {
        // language=hbs
        return `
            <main class="profile__wrapper">
                <div class="profile__back">
                    <a class="profile__back_btn" href="./chat"><img src=${back} alt="Back"></a>
                </div>
                <div class="profile__container">
                    <div class="profile__photo-container">
                        <img src=${avatar} alt="photo" class="profile__photo-container_photo">
                        <div class="profile__photo-container_edit-photo">
                            <img src=${editImage} alt="photo">
                        </div>
                    </div>
                    <h2 class="profile__name">Ivan</h2>
                    <div class="profile__info">
                        <div class="profile__options">
                            <h3 class="profile__options_title">Email</h3>
                            <p class="profile__options_descr">pochta@yandex.ru</p>
                        </div>
                        <div class="profile__separator"></div>
                        <div class="profile__options">
                            <h3 class="profile__options_title">Login</h3>
                            <p class="profile__options_descr">ivanivanov</p>
                        </div>
                        <div class="profile__separator"></div>
                        <div class="profile__options">
                            <h3 class="profile__options_title">Name</h3>
                            <p class="profile__options_descr">Ivan</p>
                        </div>
                        <div class="profile__separator"></div>
                        <div class="profile__options">
                            <h3 class="profile__options_title">Surname</h3>
                            <p class="profile__options_descr">Ivanov</p>
                        </div>
                        <div class="profile__separator"></div>
                        <div class="profile__options">
                            <h3 class="profile__options_title">Name in chat</h3>
                            <p class="profile__options_descr">Ivan</p>
                        </div>
                        <div class="profile__separator"></div>
                        <div class="profile__options">
                            <h3 class="profile__options_title">Phone</h3>
                            <p class="profile__options_descr">+7 (909) 967 30 30</p>
                        </div>
                    </div>
                    <div class="profile__links">
                        <a href="./change-data" class="profile__links_link">Change data</a>
                        <div class="profile__separator"></div>
                        <a href="./change-password" class="profile__links_link">Change password</a>
                        <div class="profile__separator"></div>
                        <a href="./" class="profile__links_link red">Exit</a>
                    </div>
                </div>
            </main>
        `;
    }
}
