import Block from '../../core/Block';

interface LinkProps {
  text: string;
  to: string;
}

export class Link extends Block {
  constructor(props: LinkProps) {
    const onClick = (e: MouseEvent) => {
      // console.log('Link clicked!');
      // e.preventDefault();
    }

    super({...props, events: { click: onClick }});
  }

  render() {
    // language=hbs
    return `<a class="modal__link" href="{{to}}">{{text}}</a>`;
  }
}