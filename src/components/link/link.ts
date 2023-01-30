import Block from '../../core/Block';

interface LinkProps {
    onClick?: () => void;
    addClass?: string;
    text: string;
    accept?: string;
    to?: string;
}

export class Link extends Block {
    static componentName = "Link";

    constructor({to, text, addClass, onClick}: LinkProps) {
        super({to, text, addClass, events: {click: onClick}});
    }

    render() {
        // language=hbs
        return `<a class="modal__link {{addClass}}" href="{{to}}">{{text}}</a>`;
    }
}
