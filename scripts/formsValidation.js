export function enableFormsValidation({
    formSelector,
    inputSelector,
    submitButtonSelector,
    inactiveButtonClass,
    inputErrorClass,
    errorClass,
}) {
    const forms = Array.from(document.querySelectorAll(formSelector));
    forms.forEach((form) => {
        const inputs = Array.from(form.querySelectorAll(inputSelector));
        const submitBtn = form.querySelector(submitButtonSelector);
        form.addEventListener("input", () =>
            setSubmitBtnState(inputs, submitBtn, inactiveButtonClass)
        );
        for (let input of inputs) {
            const errorElement = form.querySelector(`#${input.name}-error`);
            input.addEventListener("input", () =>
                validateInput(
                    input,
                    inputErrorClass,
                    errorElement,
                    errorClass,
                    input.validationMessage
                )
            );
        }
    });
}

function validateInput(
    input,
    inputErrorClass,
    errorElement,
    errorClass,
    errorMessage
) {
    if (!input.validity.valid) {
        displayInputError(
            input,
            errorMessage,
            errorElement,
            inputErrorClass,
            errorClass
        );
    } else {
        hideInputError(input, errorElement, inputErrorClass, errorClass);
    }
}

function inputsAreValid(inputs) {
    return inputs.every((input) => input.validity.valid);
}

function setSubmitBtnState(inputs, submitButton, inactiveButtonClass) {
    inputsAreValid(inputs)
        ? enableSubmitBtn(submitButton, inactiveButtonClass)
        : disableSubmitBtn(submitButton, inactiveButtonClass);
}

function displayInputError(
    input,
    errorMessage,
    errorElement,
    inputErrorClass,
    errorClass
) {
    input.classList.add(inputErrorClass);
    errorElement.innerText = errorMessage;
    errorElement.classList.add(errorClass);
}

function hideInputError(input, errorElement, inputErrorClass, errorClass) {
    input.classList.remove(inputErrorClass);
    errorElement.innerText = "";
    errorElement.classList.remove(errorClass);
}

export function hideFormErrors(
    form,
    inputSelector,
    inputErrorClass,
    errorClass
) {
    const inputs = Array.from(form.querySelectorAll(inputSelector));
    inputs.forEach((input) => {
        const errorElement = form.querySelector(`#${input.name}-error`);
        hideInputError(input, errorElement, inputErrorClass, errorClass);
    });
}

export function disableSubmitBtn(submitBtn, inactiveButtonClass) {
    submitBtn.classList.add(inactiveButtonClass);
    submitBtn.disabled = true;
}

export function enableSubmitBtn(submitBtn, inactiveButtonClass) {
    submitBtn.classList.remove(inactiveButtonClass);
    submitBtn.disabled = false;
}
