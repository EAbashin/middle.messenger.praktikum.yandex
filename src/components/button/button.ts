import Block from '../../core/Block';

interface ButtonProps {
    text: string;
    addClass?: string;
    type?: string
    onClick: () => void;
    onSubmit: () => void;
}

export class Button extends Block {
    static componentName = "Button";
    constructor({text, addClass, type='submit', onClick, onSubmit}: ButtonProps) {
        super({text, addClass, type, events: {click: onClick, submit: onSubmit}});
    }

    protected render(): string {
        // language=hbs
        return `
                <button class="modal__btn {{addClass}}" type={{type}}>{{text}}</button>
        `;
    }
}
