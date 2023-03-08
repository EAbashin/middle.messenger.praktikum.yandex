import Block from '../Block';

describe('Block', () => {
  test('should init with props', () => {
    const page = new Block({ prop: 'prop' });

    expect(page.getProps()).toEqual({ prop: 'prop' });
  });

  test('should return Document Fragment', () => {
    const page = new Block({});

    const fragment = page._compile();

    expect(fragment).toBeInstanceOf(DocumentFragment);
  });

  test('should render page with props', () => {
    class NewPage extends Block {
      render() {
        return '<p>{{ text }}</p>';
      }
    }

    const props = { text: 'Test' };
    const page = new NewPage(props);
    const text = page.getContent().textContent;

    expect(text).toEqual('Test');
  });
});
