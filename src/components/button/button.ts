import Block from '../../core/Block';

interface ButtonProps {
    text: string;
    addClass?: string;
    onClick: () => void;
}

export class Button extends Block {
    constructor({text, addClass, onClick}: ButtonProps) {
        super({text, addClass, events: {click: onClick}});
    }

    protected render(): string {
        // language=hbs
        return `
            <div class="button">
                <button class="modal__btn {{addClass}}" type="button">{{text}}</button>
            </div>
        `;
    }
}
