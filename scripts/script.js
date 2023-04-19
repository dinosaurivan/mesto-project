// открыть и закрыть попап

const popup = document.querySelector('.popup');
const profileEditButton = document.querySelector('.profile__edit');
const popupCloseButton = document.querySelector('.popup__close');

profileEditButton.addEventListener('click', function() {
    popup.classList.add('popup_opened');
});

popupCloseButton.addEventListener('click', function() {
    popup.classList.remove('popup_opened');
});   

// поставить и убрать лайк

const galleryLikeButtons = document.querySelectorAll('.gallery__like');

galleryLikeButtons.forEach(galleryLikeButton => {
    galleryLikeButton.addEventListener('click', function() {
        if (galleryLikeButton.classList.contains('gallery__like_active')) {
            galleryLikeButton.classList.remove('gallery__like_active');
        } else {
            galleryLikeButton.classList.add('gallery__like_active');
        }
    });
});
