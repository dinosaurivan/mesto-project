// валидация форм

function showInputError (targetFormElement, targetInputElement, targetInputClass) {
    const targetErrorElement = targetFormElement.querySelector(
        `#${targetInputElement.name}-error`
    );
    targetInputElement.classList.add(`${targetInputClass}_invalid`);
    targetErrorElement.textContent = targetInputElement.validationMessage;
};

function hideInputError (targetFormElement, targetInputElement, targetInputClass) {
    const targetErrorElement = targetFormElement.querySelector(
        `#${targetInputElement.name}-error`
    );
    targetInputElement.classList.remove(`${targetInputClass}_invalid`);
    targetErrorElement.textContent = "";
};

function checkInputValidity (targetFormElement, targetInputElement, targetInputClass) {
    if (targetInputElement.validity.patternMismatch) {
        targetInputElement.setCustomValidity(targetInputElement.dataset.errorMessage);
    } else {
        targetInputElement.setCustomValidity("");
    };
    if (! targetInputElement.validity.valid) {
        showInputError(targetFormElement, targetInputElement, targetInputClass);
    }
    else {
        hideInputError(targetFormElement, targetInputElement, targetInputClass);
    };
};

function hasInvalidInput (inputList) {
    return inputList.some(
        inputElement => ! inputElement.validity.valid
    );
};

function toggleSubmitState (inputList, targetSubmitElement, targetSubmitClass) {
    if (hasInvalidInput(inputList)) {
        targetSubmitElement.classList.add(`${targetSubmitClass}_disabled`);
        targetSubmitElement.setAttribute("disabled", true);
    } else {
        targetSubmitElement.classList.remove(`${targetSubmitClass}_disabled`);
        targetSubmitElement.removeAttribute("disabled");
    };
};

function enableFormValidation (targetFormElement, settingsObject) {
    const inputList = Array.from(
        targetFormElement.querySelectorAll(
            `.${settingsObject.targetInputClass}`
        )
    );
    const submitElement = targetFormElement.querySelector(
        `.${settingsObject.targetSubmitClass}`
    );
    toggleSubmitState(inputList, submitElement, settingsObject.targetSubmitClass);
    inputList.forEach(
        inputElement => {
            inputElement.addEventListener(
                "input", function () {
                    checkInputValidity(targetFormElement,
                                       inputElement,
                                       settingsObject.targetInputClass);
                    toggleSubmitState(inputList,
                                      submitElement,
                                      settingsObject.targetSubmitClass);
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
