// валидация форм

function showInputError (targetFormElement, targetInputElement, invalidInputClass) {
    const targetErrorElement = targetFormElement.querySelector(
        `#${targetInputElement.name}-error`
    );
    targetInputElement.classList.add(invalidInputClass);
    targetErrorElement.textContent = targetInputElement.validationMessage;
};

function hideInputError (targetFormElement, targetInputElement, invalidInputClass) {
    const targetErrorElement = targetFormElement.querySelector(
        `#${targetInputElement.name}-error`
    );
    targetInputElement.classList.remove(invalidInputClass);
    targetErrorElement.textContent = "";
};

function checkInputValidity (targetFormElement, targetInputElement, invalidInputClass) {
    if (targetInputElement.validity.patternMismatch) {
        targetInputElement.setCustomValidity(targetInputElement.dataset.errorMessage);
    } else {
        targetInputElement.setCustomValidity("");
    };
    if (! targetInputElement.validity.valid) {
        showInputError(targetFormElement, targetInputElement, invalidInputClass);
    }
    else {
        hideInputError(targetFormElement, targetInputElement, invalidInputClass);
    };
};

function hasInvalidInput (inputList) {
    return inputList.some(
        (inputElement) => {
            return ! inputElement.validity.valid;
        }
    );
};

function toggleSubmitState (inputList, targetSubmitElement, disabledSubmitClass) {
    if (hasInvalidInput(inputList)) {
        targetSubmitElement.classList.add(disabledSubmitClass);
        targetSubmitElement.setAttribute("disabled", true);
    } else {
        targetSubmitElement.classList.remove(disabledSubmitClass);
        targetSubmitElement.removeAttribute("disabled");
    };
};

function enableFormValidation (
    targetFormElement,
    targetInputClass = "popup__input",
    targetSubmitClass = "popup__submit",
    invalidInputClass = "popup__input_invalid",
    disabledSubmitClass = "popup__submit_disabled"
) {
    const inputList = Array.from(
        targetFormElement.querySelectorAll(`.${targetInputClass}`)
    );
    const submitElement = targetFormElement.querySelector(`.${targetSubmitClass}`);
    toggleSubmitState(inputList, submitElement, disabledSubmitClass);
    inputList.forEach(
        (inputElement) => {
            inputElement.addEventListener(
                "input", function () {
                    checkInputValidity(targetFormElement, inputElement, invalidInputClass);
                    toggleSubmitState(inputList, submitElement, disabledSubmitClass);
                }
            );
        }
    );
};

export {enableFormValidation};
