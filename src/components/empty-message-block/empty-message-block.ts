import Block from 'core/Block';

export class EmptyMessageBlock extends Block {
    protected render(): string {
        // language=hbs
        return `
            <div class="chat__messages-block">
                <div class="chat__messages-block_empty-text">Select a chat to send a message</div>
            </div>
        `;
    }
}
