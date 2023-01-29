import Block from 'core/Block';

interface MessageProps {
    position?: string;
    messages?: string;
    time?: string;
}

export class Message extends Block<MessageProps> {
    static componentName = "Message";

    constructor(props: MessageProps) {
        super({...props});
    }

    render(): string {
        // language=hbs
        return `
            <div class="chat__messages-block_body_message {{#if this.from_me}}message_to_right{{/if}}">
                <div class="chat__messages-block_body_message_text">{{this.content}}</div>
                <div class="chat__messages-block_body_message_time">{{this.time}}</div>
            </div>
        `;
    }
}
