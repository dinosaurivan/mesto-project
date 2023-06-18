import "../styles/styles.css";
import {enableFormValidation} from "./components/validate.js";
import {createGalleryCard, initialImages} from "./components/card.js";
import {makePopupOpenable, makePopupClosable, 
        makePopupActionable, makePopupResponsive} from "./components/modal.js";



// валидация форм

const formsList = Array.from(document.forms);
formsList.forEach(
    (formElement) => enableFormValidation(formElement)
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
            imageObject,
            galleryCardTemplate,
            popupDetail,
            popupDetailImage,
            popupDetailCaption,
        )
    )
);



// установка начальных значений форм

const formEdit = document.forms.profile__edit;
const profileNameInput = formEdit.elements.profile__name;
const profileBioInput = formEdit.elements.profile__bio;

const currentProfileName = document.querySelector(".profile__name");
const currentProfileBio = document.querySelector(".profile__bio");

profileNameInput.value = currentProfileName.textContent;
profileBioInput.value = currentProfileBio.textContent;



// открытие попапов по кнопке

const popupEdit = document.querySelector("#popup_type_edit");
const openPopupEditButton = document.querySelector(".profile__edit");
makePopupOpenable(popupEdit, openPopupEditButton);

const popupAdd = document.querySelector("#popup_type_add");
const openPopupAddButton = document.querySelector(".profile__add");
makePopupOpenable(popupAdd, openPopupAddButton);



// закрытие попапов по клику вне попапа

function popupEditClosureHandler () {
    profileNameInput.value = currentProfileName.textContent;
    profileBioInput.value = currentProfileBio.textContent;           
};

const formAdd = document.forms.profile__add;
function popupAddClosureHandler () {
    formAdd.reset(); 
};

makePopupClosable(popupDetail);
makePopupClosable(popupEdit, popupEditClosureHandler);
makePopupClosable(popupAdd, popupAddClosureHandler);



// сохранение значений при отправке форм

function formEditSubmitHandler () {
    currentProfileName.textContent = profileNameInput.value;
    currentProfileBio.textContent = profileBioInput.value;
}

const galleryTitleInput = formAdd.elements.gallery__title;
const galleryImageInput = formAdd.elements.gallery__image;
function formAddSubmitHandler () {
    galleryCards.prepend(
        createGalleryCard(
            {
                name: galleryTitleInput.value,
                link: galleryImageInput.value
            },
            galleryCardTemplate,
            popupDetail,
            popupDetailImage,
            popupDetailCaption,
        )
    );
};

makePopupActionable(popupEdit, formEditSubmitHandler);
makePopupActionable(popupAdd, formAddSubmitHandler);



// реакция попапов на нажатия кнопок

makePopupResponsive(popupDetail);
makePopupResponsive(popupEdit);
makePopupResponsive(popupAdd);
