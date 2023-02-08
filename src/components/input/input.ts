import Block from '../../core/Block';

interface InputProps {
  name?: string;
  accept?: string;
  type?: 'text' | 'password' | 'email';
  addClass?: string;
  placeholder?: string;
  value?: string;
  onFocus?: () => void;
  onBlur?: () => void;
  onInput?: () => void;
  onChange?: () => void;

}

export class Input extends Block<object> {
  static componentName = 'Input';

  constructor({
    name, type = 'text', addClass, placeholder, value, accept, onFocus, onBlur, onInput, onChange,
  }: InputProps) {
    super({
      name,
      type,
      addClass,
      placeholder,
      value,
      accept,
      events: {
        focus: onFocus, blur: onBlur, input: onInput, onchange: onChange,
      },
    });
  }

  protected render(): string {
    // language=hbs
    return `
            <input name="{{name}}" class="modal__input {{addClass}}" type="{{type}}" placeholder="{{placeholder}}" accept="{{accept}}" value="{{value}}">
        `;
  }
}
