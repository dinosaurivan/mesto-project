// валидация форм

function showInputError (FormElement, InputElement, InputClass) {
    const ErrorElement = FormElement.querySelector(
        `#${InputElement.name}-error`
    );
    InputElement.classList.add(`${InputClass}_invalid`);
    ErrorElement.textContent = InputElement.validationMessage;
};

function hideInputError (FormElement, InputElement, InputClass) {
    const ErrorElement = FormElement.querySelector(
        `#${InputElement.name}-error`
    );
    InputElement.classList.remove(`${InputClass}_invalid`);
    ErrorElement.textContent = "";
};

function checkInputValidity (FormElement, InputElement, InputClass) {
    if (InputElement.validity.patternMismatch) {
        InputElement.setCustomValidity(InputElement.dataset.errorMessage);
    } else {
        InputElement.setCustomValidity("");
    };
    if (! InputElement.validity.valid) {
        showInputError(FormElement, InputElement, InputClass);
    }
    else {
        hideInputError(FormElement, InputElement, InputClass);
    };
};

function hasInvalidInput (inputList) {
    return inputList.some(
        inputElement => ! inputElement.validity.valid
    );
};

function toggleSubmitState (inputList, SubmitElement, SubmitClass) {
    if (hasInvalidInput(inputList)) {
        SubmitElement.classList.add(`${SubmitClass}_disabled`);
        SubmitElement.setAttribute("disabled", true);
    } else {
        SubmitElement.classList.remove(`${SubmitClass}_disabled`);
        SubmitElement.removeAttribute("disabled");
    };
};

function enableFormValidation (FormElement, settingsObject) {
    const inputList = Array.from(
        FormElement.querySelectorAll(
            `.${settingsObject.InputClass}`
        )
    );
    const submitElement = FormElement.querySelector(
        `.${settingsObject.SubmitClass}`
    );
    toggleSubmitState(inputList, submitElement, settingsObject.SubmitClass);
    inputList.forEach(
        inputElement => {
            inputElement.addEventListener(
                "input", function () {
                    checkInputValidity(FormElement,
                                       inputElement,
                                       settingsObject.InputClass);
                    toggleSubmitState(inputList,
                                      submitElement,
                                      settingsObject.SubmitClass);
                }
            );
        }
    );
};



function enableValidation (settingsObject) {
    const formsList = Array.from(document.forms);
    formsList.forEach(
        (formElement) => enableFormValidation(
            formElement,
            settingsObject
        )
    );
};



export {enableValidation, toggleSubmitState};
