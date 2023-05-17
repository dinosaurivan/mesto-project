const openPopup = (popup) => popup.classList.add("popup_opened");
const closePopup = (popup) => popup.classList.remove("popup_opened");

const closeButtons = document.querySelectorAll(".popup__close");
closeButtons.forEach(
    (button) => {
        const popup = button.closest(".popup");
        button.addEventListener(
            "click", () => closePopup(popup)
        );
    }
);



const popupDetail = document.querySelector("#popup_type_detail");
const popupDetailCaption = popupDetail.querySelector(".popup__caption");
const popupDetailImage = popupDetail.querySelector(".popup__image");

const galleryCards = document.querySelector(".gallery__cards");
const galleryCardTemplate = galleryCards.querySelector("#gallery__card").content;

const createGalleryCard = (image) => {
    const galleryCard = galleryCardTemplate.querySelector(".gallery__card").cloneNode(true);
    
    const galleryTitle = galleryCard.querySelector(".gallery__title");
    galleryTitle.textContent = image.name;

    const galleryImage = galleryCard.querySelector(".gallery__image");
    galleryImage.alt = image.name;
    galleryImage.src = image.link;

    galleryImage.addEventListener(
        "click", () => {
            popupDetailCaption.textContent = image.name;
            popupDetailImage.alt = image.name;
            popupDetailImage.src = image.link;
            openPopup(popupDetail);
        }
    );
    
    const likeButton = galleryCard.querySelector(".gallery__like");
    likeButton.addEventListener(
        "click", () => likeButton.classList.toggle("gallery__like_active")
    );

    const trashButton = galleryCard.querySelector(".gallery__remove");
    trashButton.addEventListener(
        "click", () => trashButton.closest(".gallery__card").remove()
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

initialImages.forEach(
    (image) => galleryCards.append(
        createGalleryCard(image)
    )
);



const popupEdit = document.querySelector("#popup_type_edit");
const formEditElement = popupEdit.querySelector(".popup__form[name='profile__edit']");

const openPopupEditButton = document.querySelector(".profile__edit");
const closePopupEditButton = popupEdit.querySelector(".popup__close");

const profileNameInput = popupEdit.querySelector(".popup__input[name='profile__name']");
const profileBioInput = popupEdit.querySelector(".popup__input[name='profile__bio']");

const currentProfileName = document.querySelector(".profile__name");
const currentProfileBio = document.querySelector(".profile__bio");

profileNameInput.value = currentProfileName.textContent;
profileBioInput.value = currentProfileBio.textContent;

openPopupEditButton.addEventListener(
    "click", () => openPopup(popupEdit)
);
closePopupEditButton.addEventListener(
    "click", () => {
        profileNameInput.value = currentProfileName.textContent;
        profileBioInput.value = currentProfileBio.textContent;
    }
);

const handleFormEditSubmit = (event) => {
    event.preventDefault();
    currentProfileName.textContent = profileNameInput.value;
    currentProfileBio.textContent = profileBioInput.value;
    closePopup(popupEdit);
};

formEditElement.addEventListener(
    "submit", handleFormEditSubmit
);



const popupAdd = document.querySelector("#popup_type_add");
const formAddElement = popupAdd.querySelector(".popup__form[name='profile__add']");

const openPopupAddButton = document.querySelector(".profile__add");
const closePopupAddButton = popupAdd.querySelector(".popup__close");

const galleryTitleInput = popupAdd.querySelector(".popup__input[name='gallery__title']");
const galleryImageInput = popupAdd.querySelector(".popup__input[name='gallery__image']");

openPopupAddButton.addEventListener(
    "click", () => openPopup(popupAdd)
);
closePopupAddButton.addEventListener(
    "click", () => formAddElement.reset()
);

const handleFormAddSubmit = (event) => {
    event.preventDefault(); 
    galleryCards.prepend(
        createGalleryCard(
            {
                name: galleryTitleInput.value,
                link: galleryImageInput.value,
            }
        )
    );
    closePopup(popupAdd);
}

formAddElement.addEventListener(
    "submit", handleFormAddSubmit
);
