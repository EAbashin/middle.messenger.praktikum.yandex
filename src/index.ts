import {renderDOM, registerComponent} from './core';

import Button from './components/button';
import Link from './components/link';
import Input from './components/input';
import Error from "./components/error";
import UserItem from "./components/user-item";
import MessageBlock from "./components/messages-block";
import EmptyMessageBlock from "./components/empty-message-block";
import Message from "./components/message";

import RegistrationPage from "./pages/registration";
import LoginPage from "./pages/login";
import AddUserPage from "./pages/add-user";
import Page404 from "./pages/page-404";
import Page500 from "./pages/page-500";
import ChangePasswordPage from "./pages/change-password";
import Profile from "./pages/profile";
import ChatEmptyPage from "./pages/chat-empty";
import ChatPage from "./pages/chat";

registerComponent(Button);
registerComponent(Link);
registerComponent(Input);
registerComponent(Error);
registerComponent(UserItem);
registerComponent(MessageBlock);
registerComponent(EmptyMessageBlock);
registerComponent(Message);

document.addEventListener("DOMContentLoaded", () => {
    const pathName = window.location.pathname;
    switch (true) {
        case pathName === "/chat-empty":
            renderDOM(new ChatEmptyPage());
            break;
        case pathName === "/chat":
            renderDOM(new ChatPage());
            break;
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
});
