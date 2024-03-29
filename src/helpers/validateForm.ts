export function validateForm(element: HTMLInputElement) {
  let errorMessage = '';

  switch (true) {
    case element.name === 'email': {
      const regexp = new RegExp(/^([a-zA-Z0-9_.\-+])+@(([a-zA-Z0-9-])+\.)+([a-zA-Z]{2,4})+$/, 'gi');
      if (!regexp.test(element.value)) {
        errorMessage = 'Not valid email';
      }
    }
      break;
    case element.name === 'password' || element.name === 'old_password': {
      const regexp = new RegExp(/((?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W]).{8,40})/);
      if (!regexp.test(element.value)) {
        errorMessage = 'Not valid password';
      }
    }
      break;
    case element.name === 'phone': {
      const regexp = new RegExp(/^(\+)?(\d){10,14}/);
      if (!regexp.test(element.value)) {
        errorMessage = 'Not valid phone';
      }
    }
      break;
      // eslint-disable-next-line no-lone-blocks
    case element.name === 'message': {
      if (!element.value) {
        errorMessage = 'Enter your message';
      }
    }
      break;
    case (element.name === 'first_name' || element.name === 'second_name' || element.name === 'display_name'): {
      const regexp = new RegExp(/^[а-яА-ЯёЁa-zA-Z-]+$/, 'g');
      if (element.value === '') {
        errorMessage = 'Field must not be empty';
      } else if (element.value[0] !== element.value[0].toUpperCase()) {
        errorMessage = 'First letter must be uppercase';
      } else if (!regexp.test(element.value)) {
        errorMessage = 'Latin or Cyrillic characters allowed';
      }
    }
      break;
    case (element.name === 'login'): {
      const regexp = new RegExp(/\W/g);
      if (element.value.length < 3 || element.value.length > 20) {
        errorMessage = 'SignUp must be 3 to 20 characters long';
      } else if (!/[^0-9]/.test(element.value)) {
        errorMessage = 'SignUp cannot consist only of numbers';
      } else if (element.value.includes(' ')) {
        errorMessage = 'SignUp cannot contain spaces';
      }
      if (regexp.test(element.value)) {
        errorMessage = 'Unacceptable symbols';
      }
    }
      break;
    default: return;
  }

  // eslint-disable-next-line consistent-return
  return errorMessage;
}
