import Block from '../../core/Block';

interface ButtonProps {
    text: string;
    addClass?: string;
    onClick: () => void;
}

export class Button extends Block {
    static componentName = "Button";
    constructor({text, addClass, onClick}: ButtonProps) {
        super({text, addClass, events: {click: onClick}});
    }

    protected render(): string {
        // language=hbs
        return `
                <button class="modal__btn {{addClass}}" type="button">{{text}}</button>
        `;
    }
}
