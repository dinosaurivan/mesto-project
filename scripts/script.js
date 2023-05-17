const popupDetail = document.querySelector("#popup_type_detail");
const closePopupDetailButton = popupDetail.querySelector(".popup__close");

closePopupDetailButton.addEventListener(
    "click", function () {
        popupDetail.classList.remove("popup_opened");
    }
);



const galleryCards = document.querySelector(".gallery__cards");
const galleryCardTemplate = galleryCards.querySelector("#gallery__card").content;

const renderGalleryCard = function (image) {
    const galleryCard = galleryCardTemplate.querySelector(".gallery__card").cloneNode(true);
    galleryCard.querySelector(".gallery__title").textContent = image.name;

    const galleryImage = galleryCard.querySelector(".gallery__image")
    galleryImage.alt = image.name;
    galleryImage.src = image.link;

    galleryImage.addEventListener(
        "click", function() {
            popupDetail.querySelector(".popup__caption").textContent = image.name;
            popupDetail.querySelector(".popup__image").alt = image.name;
            popupDetail.querySelector(".popup__image").src = image.link;
            popupDetail.classList.add("popup_opened");
        }
    );
    
    const likeButton = galleryCard.querySelector(".gallery__like");
    likeButton.addEventListener(
        "click", function() {
            likeButton.classList.toggle("gallery__like_active");
        }
    );

    const trashButton = galleryCard.querySelector(".gallery__remove");
    trashButton.addEventListener(
        "click", function() {
            const galleryCard = trashButton.closest('.gallery__card');
            galleryCard.remove();
        }
    );    
    
    galleryCards.prepend(galleryCard);
}



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

initialImages.forEach(renderGalleryCard);



const popupEdit = document.querySelector("#popup_type_edit");

const openPopupEditButton = document.querySelector(".profile__edit");
const closePopupEditButton = popupEdit.querySelector(".popup__close");

const profileNameInput = popupEdit.querySelector(`.popup__input[name='profile__name']`);
const profileBioInput = popupEdit.querySelector(`.popup__input[name='profile__bio']`);

const currentProfileName = document.querySelector(".profile__name");
const currentProfileBio = document.querySelector(".profile__bio");

profileNameInput.value = currentProfileName.textContent;
profileBioInput.value = currentProfileBio.textContent;

openPopupEditButton.addEventListener(
    "click", function () {
        popupEdit.classList.add("popup_opened");
    }
);
closePopupEditButton.addEventListener(
    "click", function () {
        popupEdit.classList.remove("popup_opened");
        profileNameInput.value = currentProfileName.textContent;
        profileBioInput.value = currentProfileBio.textContent;
    }
);



const formEditElement = popupEdit.querySelector(".popup__form[name='profile__edit']");

const handleFormEditSubmit = function (event) {
    event.preventDefault(); 
    
    currentProfileName.textContent = profileNameInput.value;
    currentProfileBio.textContent = profileBioInput.value;

    closePopupEditButton.click();
}

formEditElement.addEventListener(
    "submit", handleFormEditSubmit
);



const popupAdd = document.querySelector("#popup_type_add");

const openPopupAddButton = document.querySelector(".profile__add");
const closePopupAddButton = popupAdd.querySelector(".popup__close");

const galleryTitleInput = popupAdd.querySelector(`.popup__input[name='gallery__title']`);
const galleryImageInput = popupAdd.querySelector(`.popup__input[name='gallery__image']`);

openPopupAddButton.addEventListener(
    "click", function () {
        popupAdd.classList.add("popup_opened");
    }
);
closePopupAddButton.addEventListener(
    "click", function () {
        popupAdd.classList.remove("popup_opened");
        galleryTitleInput.value = "";
        galleryImageInput.value = "";
    }
);



const formAddElement = popupAdd.querySelector(".popup__form[name='profile__add']");

const handleFormAddSubmit = function (event) {
    event.preventDefault(); 
    const newImage = {
        name: galleryTitleInput.value,
        link: galleryImageInput.value,
    }
    renderGalleryCard(newImage);
    closePopupAddButton.click();
}

formAddElement.addEventListener(
    "submit", handleFormAddSubmit
);
