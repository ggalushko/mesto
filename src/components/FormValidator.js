export class FormValidator {
  constructor(
    {
      inputSelector,
      submitButtonSelector,
      inactiveButtonClass,
      inputErrorClass,
      errorClass,
    },
    form
  ) {
    {
      this.inputSelector = inputSelector;
      this.submitButtonSelector = submitButtonSelector;
      this.inactiveButtonClass = inactiveButtonClass;
      this.inputErrorClass = inputErrorClass;
      this.errorClass = errorClass;
      this.form = form;
      this.inputs = Array.from(this.form.querySelectorAll(this.inputSelector));
      this.submitBtn = this.form.querySelector(this.submitButtonSelector);
    }
  }

  enableValidation() {
    this.form.addEventListener("input", () => this._setSubmitBtnState());
    for (let input of this.inputs) {
      const errorElement = this.form.querySelector(`.${input.name}-error`);
      input.addEventListener("input", () =>
        this._validateInput(input, errorElement, input.validationMessage)
      );
    }
  }

  hideErrors() {
    this.inputs.forEach((input) => {
      const errorElement = this.form.querySelector(`.${input.name}-error`);
      this._hideInputError(input, errorElement);
    });
  }

  _validateInput(input, errorElement, errorMessage) {
    if (!input.validity.valid) {
      this._displayInputError(input, errorMessage, errorElement);
    } else {
      this._hideInputError(input, errorElement);
    }
  }

  _inputsAreValid() {
    return this.inputs.every((input) => input.validity.valid);
  }

  _setSubmitBtnState() {
    this._inputsAreValid(this.inputs)
      ? this.enableSubmitBtn()
      : this.disableSubmitBtn();
  }

  _displayInputError(input, errorMessage, errorElement) {
    input.classList.add(this.inputErrorClass);
    errorElement.innerText = errorMessage;
    errorElement.classList.add(this.errorClass);
  }

  _hideInputError(input, errorElement) {
    input.classList.remove(this.inputErrorClass);
    errorElement.innerText = "";
    errorElement.classList.remove(this.errorClass);
  }

  disableSubmitBtn() {
    this.submitBtn.classList.add(this.inactiveButtonClass);
    this.submitBtn.disabled = true;
  }

  enableSubmitBtn() {
    this.submitBtn.classList.remove(this.inactiveButtonClass);
    this.submitBtn.disabled = false;
  }
}
