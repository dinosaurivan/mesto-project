import "../index.css";

import {enableValidation} from "./validate.js";
import {createGalleryCard} from "./card.js";

import {
    closePopup,
    makePopupOpenable,
    makePopupClosable,
    makePopupActionable
} from "./modal.js";

import {
    getMe, getInitialCards,
    changeProfileInfo, changeProfileAvatar,
    addCard
} from "./api.js";



// валидация форм

enableValidation(
    {
        InputClass: "popup__input",
        SubmitClass: "popup__submit",
    }
);



// элементы для работы с данными пользвателя

const currentProfileAvatar = document.querySelector(".profile__avatar");
const currentProfileName = document.querySelector(".profile__name");
const currentProfileBio = document.querySelector(".profile__bio");

let currentlyAuthenticatedUser;



// элементы для работы с карточками

const galleryCards = document.querySelector(`.gallery__cards`);
const galleryCardTemplate = galleryCards.querySelector(`#gallery__card`).content;

const popupDetail = document.querySelector("#popup_type_detail");
const popupDetailImage = popupDetail.querySelector(".popup__image");
const popupDetailCaption = popupDetail.querySelector(".popup__caption");

const popupPromptDelete = document.querySelector("#popup_type_remove");
const formPromptDelete = document.forms.gallery__remove;
const promptDeleteInput = formPromptDelete.elements.gallery__remove;



// загрузка исходных данных для отрисовки страницы

Promise.all(
    [getMe(), getInitialCards()]
).then(
    ([profile, initialCards]) => {
        currentProfileAvatar.src = profile.avatar;
        currentProfileName.textContent = profile.name;
        currentProfileBio.textContent = profile.about;        
        currentlyAuthenticatedUser = profile._id;

        initialCards.forEach(
            (card) => galleryCards.append(
                createGalleryCard(
                    {
                        CardObject: card,
                        GalleryCardTemplate: galleryCardTemplate,
                        PopupDetail: popupDetail,
                        PopupDetailImage: popupDetailImage,
                        PopupDetailCaption: popupDetailCaption,
                        PopupPromptDelete: popupPromptDelete,
                        InputPromptDelete: promptDeleteInput,
                        galleryCardClass: "gallery__card",
                        cardTitleClass: "gallery__title",
                        cardImageClass: "gallery__image",
                        likeButtonClass: "gallery__like",
                        trashButtonClass: "gallery__remove",
                        submitButtonClass: "popup__submit",
                        formElementClass: "popup__form",
                        closeButtonClass: "popup__close",
                        currentUserId: currentlyAuthenticatedUser
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



// элементы для работы с формами

const formEditProfile = document.forms.profile__edit;
const profileNameInput = formEditProfile.elements.profile__name;
const profileBioInput = formEditProfile.elements.profile__bio;

const formAddCard = document.forms.profile__add;
const galleryTitleInput = formAddCard.elements.gallery__title;
const galleryImageInput = formAddCard.elements.gallery__image;

const formEditAvatar = document.forms.profile__avatar;
const profileAvatarInput = formEditAvatar.elements.profile__avatar;



// элементы для работы с модальными окнами

const popupEditProfile = document.querySelector("#popup_type_edit");
const openPopupEditProfileButton = document.querySelector("#profile__edit");

const popupAddCard = document.querySelector("#popup_type_add");
const openPopupAddCardButton = document.querySelector("#profile__add");

const popupEditAvatar = document.querySelector("#popup_type_avatar");
const openPopupEditAvatarButton = document.querySelector("#profile__change-avatar");



// открытие попапа по нажатию на соответствующую кнопку

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



// закрытие попапа по клику в любое место вне попапа

makePopupClosable(popupDetail, "popup__close");
makePopupClosable(popupAddCard, "popup__close");
makePopupClosable(popupEditAvatar, "popup__close");
makePopupClosable(popupEditProfile, "popup__close");



// обработка введённых значений при отправке форм

const addCardSubmitButton = formAddCard.querySelector(".popup__submit");
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
    ).then(
        () => {
            closePopup(popupEditProfile);
            formEditProfile.reset();
        }
    ).catch(
        error => {
            console.log(error);
        }
    ).finally(
        () => {
            editProfileSubmitButton.textContent = initialSubmitButtonText;
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
    ).then(
        () => {
            closePopup(popupEditAvatar);
            formEditAvatar.reset();
        }   
    ).catch(
        error => {
            console.log(error);
        }
    ).finally(
        () => {
            editAvatarSubmitButton.textContent = initialSubmitButtonText;
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
                        CardObject: card,
                        GalleryCardTemplate: galleryCardTemplate,
                        PopupDetail: popupDetail,
                        PopupDetailImage: popupDetailImage,
                        PopupDetailCaption: popupDetailCaption,
                        PopupPromptDelete: popupPromptDelete,
                        InputPromptDelete: promptDeleteInput,
                        galleryCardClass: "gallery__card",
                        cardTitleClass: "gallery__title",
                        cardImageClass: "gallery__image",
                        likeButtonClass: "gallery__like",
                        trashButtonClass: "gallery__remove",
                        submitButtonClass: "popup__submit",
                        formElementClass: "popup__form",
                        closeButtonClass: "popup__close",
                        currentUserId: currentlyAuthenticatedUser                      
                    }
                )
            );
        }
    ).then(
        () => {
            closePopup(popupAddCard);
            formAddCard.reset();
        }
    ).catch(
        error => {
            console.log(error);
        }
    ).finally(
        () => {
            addCardSubmitButton.textContent = initialSubmitButtonText;
        }
    );
};



makePopupActionable(popupAddCard, "popup__form", formAddCardSubmitHandler);
makePopupActionable(popupEditAvatar, "popup__form", formEditAvatarSubmitHandler);
makePopupActionable(popupEditProfile, "popup__form", formEditProfileSubmitHandler);
