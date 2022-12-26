import {renderDOM, registerComponent} from './core';

import Button from './components/button';
import Link from './components/link';
import Input from './components/input';
import Error from "./components/error";

import RegistrationPage from "./pages/registration";
import LoginPage from "./pages/login";
import AddUserPage from "./pages/add-user";
import Page404 from "./pages/page-404";
import Page500 from "./pages/page-500";
import ChangePasswordPage from "./pages/change-password";
import Profile from "./pages/profile";

registerComponent(Button);
registerComponent(Link);
registerComponent(Input);
registerComponent(Error);

document.addEventListener("DOMContentLoaded", () => {
    const pathName = window.location.pathname;
    switch (true) {
        case pathName === "/profile":
            renderDOM(new Profile());
            break;
        case pathName === "/login":
            renderDOM(new LoginPage());
            break;
        case pathName === "/registration":
            renderDOM(new RegistrationPage());
            break;
        case pathName === "/change-password":
            renderDOM(new ChangePasswordPage());
            break;
        case pathName === "/add-user":
            renderDOM(new AddUserPage());
            break;
        case pathName === "/page-404":
            renderDOM(new Page404());
            break;
        case pathName === "/page-500":
            renderDOM(new Page500());
            break;
    }
    // if (pathName === "/login") {
    //     renderDOM(new FormLogin({text: "Авторизация"}));
    // } else if (pathName === "/registration") {
    //     renderDOM(new FormRegistration({text: "Регистрация"}));
    // } else if (pathName === "/404") {
    //     renderDOM(new page-404({}));
    // } else if (pathName === "/500") {
    //     renderDOM(new Error500({}));
    // } else if (pathName === "/chat-empty") {
    //     renderDOM(new ChatEmpty({
    //         "profiles": [
    //             {
    //                 "name": "Вася",
    //                 "messages": {
    //                     text: "Lorem Ipsum is simply dummy text of the p",
    //                     time: "12:33",
    //                     count: 0
    //                 }
    //             },
    //             {
    //                 "name": "Петр",
    //                 "messages": {
    //                     text: "text message 2",
    //                     time: "10:12",
    //                     count: 2
    //                 }
    //             },
    //             {
    //                 "name": "Алёна",
    //                 "messages": {
    //                     text: "text message 3",
    //                     time: "14:16",
    //                     count: 0
    //                 }
    //             }
    //         ]
    //     }));
    // } else if (pathName === "/chat-active") {
    //     renderDOM(new ChatActive({
    //         "profiles": [
    //             {
    //                 "name": "Вася",
    //                 active: true,
    //                 "messages": {
    //                     text: "Lorem Ipsum is simply dummy text of the p",
    //                     time: "12:33",
    //                     count: 0
    //                 }
    //             },
    //             {
    //                 "name": "Петр",
    //                 "messages": {
    //                     text: "text message 2",
    //                     time: "10:12",
    //                     count: 2
    //                 }
    //             },
    //             {
    //                 "name": "Алёна",
    //                 "messages": {
    //                     text: "text message 3",
    //                     time: "14:16",
    //                     count: 0
    //                 }
    //             }
    //         ]
    //     }));
    // } else if (pathName === "/settings") {
    //     renderDOM(new ProfileInfo({}));
    // }
});
