type ValidateFormType = {
    value: string,
    type: string
}

export function validateForm(element: HTMLInputElement) {
    let errorMessage = '';

    switch (true) {
        case element.name === 'email': {
            const regexp = new RegExp(/^([a-zA-Z0-9_.\-+])+@(([a-zA-Z0-9-])+\.)+([a-zA-Z]{2,4})+$/, "gi");
            if (!regexp.test(element.value)) {
                errorMessage = "Not valid email";
            }
        }
            break;
        case element.name === 'password' || element.name === 'old_password': {
            const regexp = new RegExp(/((?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W]).{8,40})/);
            if (!regexp.test(element.value)) {
                errorMessage = "Not valid password";
            }
        }
            break;
        case element.name === 'phone': {
            const regexp = new RegExp(/^(\+)?(\d){10,14}/);
            if (!regexp.test(element.value)) {
                errorMessage = "Not valid phone";
            }
        }
            break;
        case element.name === 'message': {
            if (!element.value) {
                errorMessage = "Enter your message";
            }
        }
            break;
        case (element.name === "name" || element.name === "surname" || element.name === "username"): {
            const regexp = new RegExp(/^[а-яА-ЯёЁa-zA-Z-]+$/, "g");
            if (element.value === "") {
                errorMessage = "Field must not be empty";
            } else if (element.value[0] !== element.value[0].toUpperCase()) {
                errorMessage = "First letter must be uppercase";
            } else if (!regexp.test(element.value)) {
                errorMessage = "Latin or Cyrillic characters allowed";
            }
        }
            break;
        case (element.name === "login"): {
            const regexp = new RegExp(/[a-zA-Z0-9-_]{3,20}]/);
            if (element.value.length < 3 || element.value.length > 20) {
                errorMessage = "Login must be 3 to 20 characters long";
            } else if (!/[^0-9]/.test(element.value)) {
                errorMessage = "Login cannot consist only of numbers";
            } else if (element.value.includes(" ")) {
                errorMessage = "Login cannot contain spaces";
            }
            if (regexp.test(element.value)) {
                errorMessage = "Unacceptable symbols";
            }
        }
            break;
    }

    return errorMessage;
}
