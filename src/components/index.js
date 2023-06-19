import "../index.css";

import {enableValidation} from "./validate.js";
import {createGalleryCard, initialImages} from "./card.js";
import {makePopupOpenable, makePopupClosable, makePopupActionable} from "./modal.js";



// валидация форм

enableValidation(
    {
        targetInputClass: "popup__input",
        targetSubmitClass: "popup__submit",
        invalidInputClass: "popup__input_invalid",
        disabledSubmitClass: "popup__submit_disabled"
    }
);



// работа с карточками

const galleryCards = document.querySelector(`.gallery__cards`);
const galleryCardTemplate = galleryCards.querySelector(`#gallery__card`).content;

const popupDetail = document.querySelector("#popup_type_detail");
const popupDetailImage = popupDetail.querySelector(".popup__image");
const popupDetailCaption = popupDetail.querySelector(".popup__caption");

initialImages.forEach(
    (imageObject) => galleryCards.append(
        createGalleryCard(
            {
                targetImageObject: imageObject,
                targetGalleryCardTemplate: galleryCardTemplate,
                targetPopupDetail: popupDetail,
                targetPopupDetailImage: popupDetailImage,
                targetPopupDetailCaption: popupDetailCaption,
                galleryCardClass: "gallery__card",
                cardTitleClass: "gallery__title",
                cardImageClass: "gallery__image",
                likeButtonClass: "gallery__like",
                activeLikeButtonClass: "gallery__like_active",
                trashButtonClass: "gallery__remove"
            }
        )
    )
);



// данные для форм внутри попапов

const currentProfileName = document.querySelector(".profile__name");
const currentProfileBio = document.querySelector(".profile__bio");

const formEdit = document.forms.profile__edit;
const profileNameInput = formEdit.elements.profile__name;
const profileBioInput = formEdit.elements.profile__bio;

const formAdd = document.forms.profile__add;
const galleryTitleInput = formAdd.elements.gallery__title;
const galleryImageInput = formAdd.elements.gallery__image;



// открытие попапов по кнопке

const popupEdit = document.querySelector("#popup_type_edit");
const openPopupEditButton = document.querySelector(".profile__edit");
makePopupOpenable(
    popupEdit,
    openPopupEditButton,
    "popup__submit", 
    "popup__submit_disabled",
    [
        {
            inputElement: profileNameInput,
            initialValueHolder: currentProfileName,
            fallbackinitialValue: "",
        },
        {
            inputElement: profileBioInput,
            initialValueHolder: currentProfileBio,   
            fallbackinitialValue: "",
        }
    ]
);

const popupAdd = document.querySelector("#popup_type_add");
const openPopupAddButton = document.querySelector(".profile__add");
makePopupOpenable(
    popupAdd,
    openPopupAddButton,
    "popup__submit",
    "popup__submit_disabled",
    [
        {
            inputElement: galleryTitleInput,
            fallbackinitialValue: "",
        },
        {
            inputElement: galleryImageInput,
            fallbackinitialValue: "",
        }
    ]
);



// закрытие попапов по клику вне попапа

makePopupClosable(popupDetail, "popup__close");
makePopupClosable(popupEdit, "popup__close");
makePopupClosable(popupAdd, "popup__close");



// сохранение значений при отправке форм

function formEditSubmitHandler () {
    currentProfileName.textContent = profileNameInput.value;
    currentProfileBio.textContent = profileBioInput.value;
}

function formAddSubmitHandler () {
    galleryCards.prepend(
        createGalleryCard(
            {
                targetImageObject: {name: galleryTitleInput.value,
                                    link: galleryImageInput.value},
                targetGalleryCardTemplate: galleryCardTemplate,
                targetPopupDetail: popupDetail,
                targetPopupDetailImage: popupDetailImage,
                targetPopupDetailCaption: popupDetailCaption,
                galleryCardClass: "gallery__card",
                cardTitleClass: "gallery__title",
                cardImageClass: "gallery__image",
                likeButtonClass: "gallery__like",
                activeLikeButtonClass: "gallery__like_active",
                trashButtonClass: "gallery__remove"
            }
        )
    );
    formAdd.reset(); 
};

makePopupActionable(popupEdit, "popup__form", formEditSubmitHandler);
makePopupActionable(popupAdd, "popup__form", formAddSubmitHandler);
