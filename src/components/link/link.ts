import Block from '../../core/Block';

interface LinkProps {
  text: string;
  to: string;
}

export class Link extends Block<object> {
  constructor(props: LinkProps) {
    const onClick = () => {
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