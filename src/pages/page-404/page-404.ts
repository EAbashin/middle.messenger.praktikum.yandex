import Block from 'core/Block';

export class Page404 extends Block {
  render() {
    // language=hbs
    return `
            <div class="modal__wrapper">
                <main class="modal__window">
                    <h1 class="modal__main-title">404</h1>
                    <h2 class="modal__title">Went to the wrong place</h2>
                    {{{Link class="modal__link" to="/messenger" text="Back to chats"}}}
                </main>
            </div>
        `;
  }
}
