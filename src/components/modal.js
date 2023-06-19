import {openPopup, closePopup} from "./utils.js";



// открытие попапов по кнопке

function makePopupOpenable (popup, openButton) {
    openButton.addEventListener(
        "click", () => openPopup(popup)
    )
}



// закрытие попапов по клику вне попапа

function makePopupClosable (
    popup,
    closureHandler = () => {},
    closeButtonClass = "popup__close",
) {
    popup.addEventListener(
        "click", (event) => {
            if (
                event.target.classList.contains(closeButtonClass)
                || event.target === event.currentTarget
            ) {
                closePopup(popup);
                closureHandler();
            };            
        }
    )
}



// сохранение значений при отправке форм

function makePopupActionable (
    popup,
    formSubmitHandler = () => {},
    formElementClass = "popup__form"
) {
    const formElement = popup.querySelector(`.${formElementClass}`);
    formElement.addEventListener(
        "submit", (event) => {
            event.preventDefault();
            formSubmitHandler();
            closePopup(popup);
        }
    )
}



// реакция попапов на нажатия кнопок

function makePopupResponsive (
    popup,
    formSubmitHandler = () => {},
    formInputClass = "popup__input",
    formElementClass = "popup__form",
) {
    popup.addEventListener(
        "keydown", (event) => {
            if (
                event.key === "Enter"
                && event.target.classList.contains(formInputClass)
                && event.currentTarget.querySelector(`.${formElementClass}`).checkValidity()
            ) {
                formSubmitHandler();
                closePopup(popup);
            };
        }
    );
};



export {
    makePopupOpenable,
    makePopupClosable,
    makePopupActionable,
    makePopupResponsive
};
