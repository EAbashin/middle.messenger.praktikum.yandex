import {renderDOM, registerComponent} from 'core';

import Button from 'components/button';
import Link from 'components/link';
import Input from 'components/input';
import Error from "components/error";
import UserItem from "components/user-item";
import MessageBlock from "components/messages-block";
import EmptyMessageBlock from "components/empty-message-block";
import Message from "components/message";

import Registration from "pages/registration";
import Login from "pages/login";
import AddUser from "pages/add-user";
import Page404 from "pages/page-404";
import Page500 from "pages/page-500";
import ChangePassword from "pages/change-password";
import Profile from "pages/profile";
import ChatEmpty from "pages/chat-empty";
import Chat from "pages/chat";
import ProfileChangeDate from "pages/change-date";
import {UploadFile} from "pages/upload-file/upload-file";

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
            renderDOM(new ChatEmpty());
            break;
        case pathName === "/chat":
            renderDOM(new Chat());
            break;
        case pathName === "/upload-file":
            renderDOM(new UploadFile());
            break;
        case pathName === "/profile":
            renderDOM(new Profile());
            break;
        case pathName === "/change-data":
            renderDOM(new ProfileChangeDate());
            break;
        case pathName === "/login":
            renderDOM(new Login());
            break;
        case pathName === "/registration":
            renderDOM(new Registration());
            break;
        case pathName === "/change-password":
            renderDOM(new ChangePassword());
            break;
        case pathName === "/add-user":
            renderDOM(new AddUser());
            break;
        case pathName === "/page-404":
            renderDOM(new Page404());
            break;
        case pathName === "/page-500":
            renderDOM(new Page500());
            break;
    }
});
