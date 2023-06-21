// работа модальных окон

import {toggleSubmitState} from "./validate.js";



function setInputInitialValues (valuesObjectsList) {
    valuesObjectsList.forEach(
        valuesObjectElement => {
            valuesObjectElement.inputElement.value = (
                valuesObjectElement.initialValueContainer
                ? valuesObjectElement.initialValueContainer.textContent
                : valuesObjectElement.fallbackInitialValue
            );
        }
    );
};

function escapeKeyHandler (event) {
    if (event.key === "Escape") {
        const activePopup = document.querySelector(".popup_opened");
        closePopup(activePopup);
    };
};

function openStaticPopup (popup) {
    document.addEventListener(
        "keydown", escapeKeyHandler
    );
    popup.classList.add("popup_opened");    
};

function openInteractivePopup (popup, submitButtonClass, formInitialValuesList = []) {
    setInputInitialValues(formInitialValuesList);
    toggleSubmitState(
        formInitialValuesList.map(
            (inputInitialValueObject) => inputInitialValueObject.inputElement
        ),
        popup.querySelector(`.${submitButtonClass}`),
        submitButtonClass
    );
    openStaticPopup(popup);
};

function closePopup (popup) {
    popup.classList.remove("popup_opened");
    document.removeEventListener(
        "keydown", escapeKeyHandler
    );
};



// открытие попапов по кнопке

function makePopupOpenable (
    popup,
    openButton,
    submitButtonClass,
    formInitialValuesList = []
) {
    openButton.addEventListener(
        "click", () => openInteractivePopup(
            popup,
            submitButtonClass,
            formInitialValuesList
        )
    );
};



// закрытие попапов по клику вне попапа

function makePopupClosable (popup, closeButtonClass) {
    popup.addEventListener(
        "click", event => {
            if (
                event.target.classList.contains(closeButtonClass)
                || event.target === event.currentTarget
            ) {
                closePopup(popup);
            };            
        }
    );
};



// сохранение значений при отправке форм

function makePopupActionable (
    popup,
    formElementClass,
    formSubmitHandler = () => {}
) {
    const formElement = popup.querySelector(`.${formElementClass}`);
    formElement.addEventListener(
        "submit", event => {
            event.preventDefault();
            formSubmitHandler();
        }
    );
};



export {
    closePopup,
    openStaticPopup,
    openInteractivePopup,
    makePopupOpenable,
    makePopupClosable,
    makePopupActionable
};
