import {openPopup} from "./utils.js";



// работа с карточками

function createGalleryCard (
    targetImageObject,
    targetGalleryCardTemplate,
    targetPopupDetail,
    targetPopupDetailImage,
    targetPopupDetailCaption,
    galleryCardClass = "gallery__card",
    cardTitleClass = "gallery__title",
    cardImageClass = "gallery__image",
    likeButtonClass = "gallery__like",
    activeLikeButtonClass = "gallery__like_active",
    trashButtonClass = "gallery__remove"    
) {
    const galleryCard = targetGalleryCardTemplate.querySelector(`.${galleryCardClass}`).cloneNode(true);
    
    const galleryTitle = galleryCard.querySelector(`.${cardTitleClass}`);
    galleryTitle.textContent = targetImageObject.name;

    const galleryImage = galleryCard.querySelector(`.${cardImageClass}`);
    galleryImage.alt = targetImageObject.name;
    galleryImage.src = targetImageObject.link;

    galleryImage.addEventListener(
        "click", () => {
            targetPopupDetailImage.src = targetImageObject.link;
            targetPopupDetailImage.alt = targetImageObject.name;
            targetPopupDetailCaption.textContent = targetImageObject.name;
            openPopup(targetPopupDetail);
        }
    );
    
    const likeButton = galleryCard.querySelector(`.${likeButtonClass}`);
    likeButton.addEventListener(
        "click", () => likeButton.classList.toggle(activeLikeButtonClass)
    );

    const trashButton = galleryCard.querySelector(`.${trashButtonClass}`);
    trashButton.addEventListener(
        "click", () => trashButton.closest(`.${galleryCardClass}`).remove()
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
