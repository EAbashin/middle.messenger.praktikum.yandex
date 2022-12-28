import Block from 'core/Block';

interface MessageProps {
    position?: string;
    message?: string;
    time?: string;
}

export class Message extends Block {
    constructor(props: MessageProps) {
        super({...props});
    }
    protected render(): string {
        // language=hbs
        return `
            <div class="chat__messages-block_body_message {{position}}">
                <div class="chat__messages-block_body_message_text">{{text}}</div>
                <div class="chat__messages-block_body_message_time">{{time}}</div>
            </div>
        `;
    }
}
