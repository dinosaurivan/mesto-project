// работа с карточками

import {openStaticPopup} from "./modal.js";



function createGalleryCard (settingsObject) {
    const galleryCard = settingsObject.targetGalleryCardTemplate.querySelector(
        `.${settingsObject.galleryCardClass}`
    ).cloneNode(true);
    
    const galleryTitle = galleryCard.querySelector(`.${settingsObject.cardTitleClass}`);
    galleryTitle.textContent = settingsObject.targetImageObject.name;

    const galleryImage = galleryCard.querySelector(`.${settingsObject.cardImageClass}`);
    galleryImage.alt = settingsObject.targetImageObject.name;
    galleryImage.src = settingsObject.targetImageObject.link;

    galleryImage.addEventListener(
        "click", () => {
            settingsObject.targetPopupDetailImage.src = settingsObject.targetImageObject.link;
            settingsObject.targetPopupDetailImage.alt = settingsObject.targetImageObject.name;
            settingsObject.targetPopupDetailCaption.textContent = settingsObject.targetImageObject.name;
            openStaticPopup(settingsObject.targetPopupDetail);
        }
    );
    
    const likeButton = galleryCard.querySelector(`.${settingsObject.likeButtonClass}`);
    likeButton.addEventListener(
        "click", () => likeButton.classList.toggle(settingsObject.activeLikeButtonClass)
    );

    const trashButton = galleryCard.querySelector(`.${settingsObject.trashButtonClass}`);
    trashButton.addEventListener(
        "click", () => trashButton.closest(`.${settingsObject.galleryCardClass}`).remove()
    );    

    return galleryCard;
};



const initialImages = [
    {
        name: "Архыз",
        link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
    },
    {
        name: "Челябинская область",
        link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
    },
    {
        name: "Иваново",
        link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
    },
    {
        name: "Камчатка",
        link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
    },
    {
        name: "Холмогорский район",
        link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
    },
    {
        name: "Байкал",
        link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
    },         
];



export {createGalleryCard, initialImages};
