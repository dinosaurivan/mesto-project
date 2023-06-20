// import "../index.css";
import "../../styles/styles.css";

import {enableValidation} from "./validate.js";
import {createGalleryCard} from "./card.js";

import {
    makePopupOpenable,
    makePopupClosable,
    makePopupActionable
} from "./modal.js";

import {
    getMe, getInitialCards,
    changeProfileInfo, changeProfileAvatar,
    addCard, removeCard
} from "./api.js";



// валидация форм

enableValidation(
    {
        targetInputClass: "popup__input",
        targetSubmitClass: "popup__submit",
    }
);



// данные пользователя

const currentProfileAvatar = document.querySelector(".profile__avatar");
const currentProfileName = document.querySelector(".profile__name");
const currentProfileBio = document.querySelector(".profile__bio");

getMe().then(
    profile => {
        currentProfileAvatar.src = profile.avatar;
        currentProfileName.textContent = profile.name;
        currentProfileBio.textContent = profile.about;
    }
).catch(
    error => {
        console.log(error);
    }
);



// работа с карточками

const galleryCards = document.querySelector(`.gallery__cards`);
const galleryCardTemplate = galleryCards.querySelector(`#gallery__card`).content;

const popupDetail = document.querySelector("#popup_type_detail");
const popupDetailImage = popupDetail.querySelector(".popup__image");
const popupDetailCaption = popupDetail.querySelector(".popup__caption");

const popupPromptDelete = document.querySelector("#popup_type_remove");
const formRemoveCard = document.forms.gallery__remove;
const removeCardInput = formRemoveCard.elements.gallery__remove;

getInitialCards().then(
    initialCards => {
        initialCards.forEach(
            (card) => galleryCards.append(
                createGalleryCard(
                    {
                        targetCardObject: card,
                        targetGalleryCardTemplate: galleryCardTemplate,
                        targetPopupDetail: popupDetail,
                        targetPopupDetailImage: popupDetailImage,
                        targetPopupDetailCaption: popupDetailCaption,
                        targetPopupPromptDelete: popupPromptDelete,
                        targetInputPromptDelete: removeCardInput,
                        galleryCardClass: "gallery__card",
                        cardTitleClass: "gallery__title",
                        cardImageClass: "gallery__image",
                        likeButtonClass: "gallery__like",
                        trashButtonClass: "gallery__remove",
                        submitButtonClass: "popup__submit",
                    }
                )
            )
        );
    }
).catch(
    error => {
        console.log(error);
    }
);



// элементы форм

const formEditProfile = document.forms.profile__edit;
const profileNameInput = formEditProfile.elements.profile__name;
const profileBioInput = formEditProfile.elements.profile__bio;

const formAddCard = document.forms.profile__add;
const galleryTitleInput = formAddCard.elements.gallery__title;
const galleryImageInput = formAddCard.elements.gallery__image;

const formEditAvatar = document.forms.profile__avatar;
const profileAvatarInput = formEditAvatar.elements.profile__avatar;



// элементы модальных окон

const popupEditProfile = document.querySelector("#popup_type_edit");
const openPopupEditProfileButton = document.querySelector("#profile__edit");

const popupAddCard = document.querySelector("#popup_type_add");
const openPopupAddCardButton = document.querySelector("#profile__add");

const popupEditAvatar = document.querySelector("#popup_type_avatar");
const openPopupEditAvatarButton = document.querySelector("#profile__change-avatar");



// открытие попапов по кнопке

makePopupOpenable(
    popupEditProfile,
    openPopupEditProfileButton,
    "popup__submit", 
    [
        {
            inputElement: profileNameInput,
            initialValueContainer: currentProfileName,
            fallbackInitialValue: "",
        },
        {
            inputElement: profileBioInput,
            initialValueContainer: currentProfileBio,   
            fallbackInitialValue: "",
        },
    ]
);

makePopupOpenable(
    popupAddCard,
    openPopupAddCardButton,
    "popup__submit",
    [
        {
            inputElement: galleryTitleInput,
            fallbackInitialValue: "",
        },
        {
            inputElement: galleryImageInput,
            fallbackInitialValue: "",
        },
    ]
);

makePopupOpenable(
    popupEditAvatar,
    openPopupEditAvatarButton,
    "popup__submit",
    [
        {
            inputElement: profileAvatarInput,
            fallbackInitialValue: "",
        },
    ]
);



// закрытие попапов по клику вне попапа

makePopupClosable(popupDetail, "popup__close");
makePopupClosable(popupAddCard, "popup__close");
makePopupClosable(popupEditAvatar, "popup__close");
makePopupClosable(popupEditProfile, "popup__close");
makePopupClosable(popupPromptDelete, "popup__close");



// сохранение значений при отправке форм

const addCardSubmitButton = formAddCard.querySelector(".popup__submit");
const removeCardSubmitButton = formRemoveCard.querySelector(".popup__submit");
const editAvatarSubmitButton = formEditAvatar.querySelector(".popup__submit");
const editProfileSubmitButton = formEditProfile.querySelector(".popup__submit");

function formEditProfileSubmitHandler () {
    const initialSubmitButtonText = editProfileSubmitButton.textContent;
    editProfileSubmitButton.textContent = "Сохраняем...";
    changeProfileInfo(
        profileNameInput.value, profileBioInput.value
    ).then(
        profile => {
            currentProfileName.textContent = profile.name;
            currentProfileBio.textContent = profile.about;
        }
    ).catch(
        error => {
            console.log(error);
        }
    ).finally(
        () => {
            editProfileSubmitButton.textContent = initialSubmitButtonText;
            formEditProfile.reset();
        }
    );
}

function formEditAvatarSubmitHandler () {
    const initialSubmitButtonText = editAvatarSubmitButton.textContent;
    editAvatarSubmitButton.textContent = "Сохраняем...";    
    changeProfileAvatar(
        profileAvatarInput.value
    ).then(
        profile => {
            currentProfileAvatar.src = profile.avatar;
        }
    ).catch(
        error => {
            console.log(error);
        }
    ).finally(
        () => {
            editAvatarSubmitButton.textContent = initialSubmitButtonText;
            formEditAvatar.reset();
        }
    );
}

function formAddCardSubmitHandler () {
    const initialSubmitButtonText = addCardSubmitButton.textContent;
    addCardSubmitButton.textContent = "Добавляем...";        
    addCard(
        galleryTitleInput.value, galleryImageInput.value
    ).then(
        card => {
            galleryCards.prepend(
                createGalleryCard(
                    {
                        targetCardObject: card,
                        targetGalleryCardTemplate: galleryCardTemplate,
                        targetPopupDetail: popupDetail,
                        targetPopupDetailImage: popupDetailImage,
                        targetPopupDetailCaption: popupDetailCaption,
                        targetPopupPromptDelete: popupPromptDelete,
                        targetInputPromptDelete: removeCardInput,
                        galleryCardClass: "gallery__card",
                        cardTitleClass: "gallery__title",
                        cardImageClass: "gallery__image",
                        likeButtonClass: "gallery__like",
                        trashButtonClass: "gallery__remove",
                        submitButtonClass: "popup__submit",                        
                    }
                )
            );
        }
    ).catch(
        error => {
            console.log(error);
        }
    ).finally(
        () => {
            addCardSubmitButton.textContent = initialSubmitButtonText;
            formAddCard.reset();
        }
    );
};

function formRemoveCardSubmitHandler () {
    const initialSubmitButtonText = removeCardSubmitButton.textContent;
    removeCardSubmitButton.textContent = "Удаляем...";         
    removeCard(
        removeCardInput.value
    ).then(
        () => {
            const card = document.querySelector(
                `[data-card-id="${removeCardInput.value}"]`
            );
            card.remove();
        }
    ).catch(
        error => {
            console.log(error);
        }
    ).finally(
        () => {
            removeCardSubmitButton.textContent = initialSubmitButtonText;
            formRemoveCard.reset();
        }
    );
};

makePopupActionable(popupAddCard, "popup__form", formAddCardSubmitHandler);
makePopupActionable(popupEditAvatar, "popup__form", formEditAvatarSubmitHandler);
makePopupActionable(popupEditProfile, "popup__form", formEditProfileSubmitHandler);
makePopupActionable(popupPromptDelete, "popup__form", formRemoveCardSubmitHandler);
