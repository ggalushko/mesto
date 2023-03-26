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
    }
  }

  enableValidation() {
    const inputs = Array.from(this.form.querySelectorAll(this.inputSelector));
    const submitBtn = this.form.querySelector(this.submitButtonSelector);
    this.form.addEventListener("input", () =>
      this._setSubmitBtnState(inputs, submitBtn)
    );
    for (let input of inputs) {
      const errorElement = this.form.querySelector(`#${input.name}-error`);
      input.addEventListener("input", () =>
        this._validateInput(input, errorElement, input.validationMessage)
      );
    }
  }

  hideErrors() {
    const inputs = Array.from(this.form.querySelectorAll(this.inputSelector));
    inputs.forEach((input) => {
      const errorElement = this.form.querySelector(`#${input.name}-error`);
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

  _inputsAreValid(inputs) {
    return inputs.every((input) => input.validity.valid);
  }

  _setSubmitBtnState(inputs, submitButton) {
    this._inputsAreValid(inputs)
      ? this._enableSubmitBtn(submitButton)
      : this._disableSubmitBtn(submitButton);
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

  _disableSubmitBtn(submitBtn) {
    submitBtn.classList.add(this.inactiveButtonClass);
    submitBtn.disabled = true;
  }

  _enableSubmitBtn(submitBtn) {
    submitBtn.classList.remove(this.inactiveButtonClass);
    submitBtn.disabled = false;
  }
}
