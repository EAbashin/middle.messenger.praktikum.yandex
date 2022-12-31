import Block from '../../core/Block';

interface LinkProps {
    onClick?: () => void;
    text: string;
    to: string;
}

export class Link extends Block<object> {
    static componentName = "Link";

    constructor({to, text, onClick}: LinkProps) {
        super({to, text, events: {click: onClick}});
    }

    render() {
        // language=hbs
        return `<a class="modal__link" href="{{to}}">{{text}}</a>`;
    }
}
