import Block from '../../core/Block';

interface InputProps {
    name?: string;
    type?: 'text' | 'password' | 'email';
    addClass?: string
    placeholder?: string
    onFocus?: () => void;
    onBlur?: () => void;
    onInput?: () => void;

}

export class Input extends Block {
    constructor({name, type = 'text', addClass, placeholder, onFocus, onBlur, onInput}: InputProps) {
        super({name, type, addClass, placeholder, events: {focus: onFocus, blur: onBlur, input: onInput}});
    }

    protected render(): string {
        // language=hbs
        return `
            <input name="{{name}}" class="modal__input {{addClass}}" type="{{type}}" placeholder={{placeholder}}>
        `
    }
}
