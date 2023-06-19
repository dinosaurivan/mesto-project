// утилиты для использования другими компонентами

function openPopup (popup) {
    popup.classList.add("popup_opened");
    document.addEventListener(
        "keydown", keyHandler
    )
};

function closePopup (popup) {
    popup.classList.remove("popup_opened");
    document.removeEventListener(
        "keydown", keyHandler
    )    
};

function keyHandler (event) {
    if (event.key === "Escape") {
        const activePopup = document.querySelector(".popup_opened");
        closePopup(activePopup);
    };
};

export {openPopup, closePopup};
