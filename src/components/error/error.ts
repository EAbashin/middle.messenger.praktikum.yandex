import Block from 'core/Block';

interface ErrorProps {
    errorMessage?: string;
    addClass?: string;
}

export class Error extends Block {
    constructor({errorMessage, addClass}: ErrorProps) {
        super({errorMessage, addClass});
    }
    protected render(): string {
        // language=hbs
        return `
            <div class="modal__error_text {{addClass}}">{{#if errorMessage}}{{errorMessage}}{{/if}}</div>
        `
    }
}
