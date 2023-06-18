// утилиты для использования другими компонентами

function openPopup (popup) {
    popup.classList.add("popup_opened");
};

function closePopup (popup) {
    popup.classList.remove("popup_opened");
};

export {openPopup, closePopup};
