import Block from '../../core/Block';

interface ButtonProps {
  text?: string;
  addClass?: string;
  type?: string
  onClick?: () => void;
  onSubmit?: () => void;
  dataTestId?: string;
}

export class Button extends Block {
  static componentName = 'Button';

  constructor({
    text, addClass, type = 'submit', dataTestId, onClick, onSubmit,
  }: ButtonProps) {
    super({
      text, addClass, type, dataTestId, events: { click: onClick, submit: onSubmit },
    });
  }

  protected render(): string {
    // language=hbs
    return `
                <button
                        class="modal__btn {{addClass}}"
                        type={{type}}
                        {{#if dataTestId}}
                            data-testid="{{dataTestId}}"
                        {{/if}}
                >
                    {{text}}
                </button>
        `;
  }
}
