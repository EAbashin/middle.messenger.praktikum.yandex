import Block from 'core/Block';

export class UploadFile extends Block {
  constructor() {
    super();
    this.setProps({
      onSubmit: () => this.onSubmit(),
      errorMessage: '',
    });
  }

  onSubmit() {
    const fileEl = this._element?.querySelector('input[name="file"]') as HTMLInputElement;
    if (!fileEl.value) {
      this.setProps({
        errorMessage: 'You must select a file',
      });
    } else {
      const submitObj = {
        [fileEl.name]: fileEl.value,
      };
      console.log(JSON.stringify(submitObj, null, 2));
    }
  }

  render() {
    // language=hbs
    return `
            <div class="modal__wrapper">
                <main class="modal__window">
                    <h2 class="modal__title ">Upload file</h2>
                    <form class="modal__inputs">
                        <label class="modal__label_upload-file" for="upload-file">Select file</label>
                        <input class="modal__input_upload-file" type="file" name="file" id="upload-file"/>
                        <div class="modal__btns">
                            {{{Button text="Download" onClick=onSubmit}}}
                            {{{Error ref="fileErrorRef" addClass="modal__error_text modal__general_error" errorMessage=errorMessage}}}
                        </div>
                    </form>
                </main>
            </div>
        `;
  }
}
