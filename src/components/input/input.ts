import Block from '../../core/Block';

interface InputProps {
    name?: string;
    type?: 'text' | 'password' | 'email';
    addClass?: string
    onFocus?: () => void;
    onBlur?: () => void;

}

export class Input extends Block {
    constructor({name, type = 'text', onFocus, onBlur}: InputProps) {
        super({name, type, events: {focus: onFocus, blur: onBlur}});
    }

    protected render(): string {
        // language=hbs
        return `
            <input name="{{name}}" class="modal__input {{addClass}}" type="{{type}}">
        `
    }
}
