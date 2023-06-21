// работа с карточками

import {closePopup, openStaticPopup, makePopupOpenable} from "./modal.js";
import {likeCard, unlikeCard, removeCard} from "./api.js";



function setCardLikeAreaState (
    LikeButton, likeButtonClass, LikesCountElement,
    CardObject, currentUserId
) {
    LikesCountElement.textContent = CardObject.likes.length;
    if (
        CardObject.likes.some(
            like => like._id === currentUserId
        )
    ) {
        LikeButton.classList.add(`${likeButtonClass}_active`);
    } else {
        LikeButton.classList.remove(`${likeButtonClass}_active`);
    };
};



function likeButtonClickHandler (
    likeButtonClass, likeCountContainer, CardId, currentUserId
) {
    return function (event) {
        if (event.target.classList.contains(`${likeButtonClass}_active`)) {
            unlikeCard(
                CardId
            ).then(
                card => {
                    setCardLikeAreaState(
                        event.target, likeButtonClass, likeCountContainer,
                        card, currentUserId
                    );
                }
            ).catch(
                error => {
                    console.log(error);
                }
            );
        } else {
            likeCard(
                CardId
            ).then(
                card => {
                    setCardLikeAreaState(
                        event.target, likeButtonClass, likeCountContainer,
                        card, currentUserId
                    );
                }
            ).catch(
                error => {
                    console.log(error);
                }
            );                
        };
    };
};



function formPromptDeleteSubmitHandler (
    cardElement, popupPromptDelete, formPromptDelete, inputPromptDelete, promptDeleteSubmitButton
) {
    promptDeleteSubmitButton.textContent = "Удаляем...";         
    removeCard(
        inputPromptDelete.value
    ).then(
        () => {
            cardElement.remove();
        }
    ).then(
        () => {
            closePopup(popupPromptDelete);
            formPromptDelete.reset();
        }
    ).catch(
        error => {
            console.log(error);
        }
    ).finally(
        () => {
            promptDeleteSubmitButton.textContent = "Да";
        }
    );
};



function rotatingPromptDeleteEventListener (
    card, popupPromptDelete, formPromptDelete, inputPromptDelete, submitButtonElement
) {
    return function (event) {
        event.preventDefault();
        formPromptDeleteSubmitHandler(
            card, popupPromptDelete, formPromptDelete, inputPromptDelete, submitButtonElement
        );
    }
};



function restrictCardRemoval (
    trashButton, galleryCardClass, popupPromptDelete, 
    formElementClass, inputPromptDelete, submitButtonClass, closeButtonClass,
    CardObject, currentUserId
) {
    if (currentUserId !== CardObject.owner._id) {
        trashButton.remove();
    } else {
        const card = trashButton.closest(`.${galleryCardClass}`);
        const formPromptDelete = popupPromptDelete.querySelector(`.${formElementClass}`);
        const submitButtonElement = formPromptDelete.querySelector(`.${submitButtonClass}`);
        makePopupOpenable(
            popupPromptDelete,
            trashButton,
            submitButtonClass,
            [
                {
                    inputElement: inputPromptDelete,
                    fallbackInitialValue: CardObject._id,
                }              
            ]
        );
        trashButton.addEventListener(
            "click", () => {
                formPromptDelete.addEventListener(
                    "submit",
                    rotatingPromptDeleteEventListener(
                        card, popupPromptDelete, formPromptDelete, inputPromptDelete, submitButtonElement
                    )
                );
            }
        );
        popupPromptDelete.addEventListener(
            "click", event => {
                if (
                    event.target.classList.contains(closeButtonClass)
                    || event.target === event.currentTarget
                ) {
                    closePopup(popupPromptDelete);
                    formPromptDelete.removeEventListener(
                        "submit",
                        rotatingPromptDeleteEventListener(
                            card, popupPromptDelete, formPromptDelete, inputPromptDelete, submitButtonElement
                        )
                    );                    
                };            
            }
        );        
    };
};



function createGalleryCard (settingsObject) {
    const galleryCard = settingsObject.GalleryCardTemplate.querySelector(
        `.${settingsObject.galleryCardClass}`
    ).cloneNode(true);
    
    const galleryTitle = galleryCard.querySelector(`.${settingsObject.cardTitleClass}`);
    galleryTitle.textContent = settingsObject.CardObject.name;

    const galleryImage = galleryCard.querySelector(`.${settingsObject.cardImageClass}`);
    galleryImage.alt = settingsObject.CardObject.name;
    galleryImage.src = settingsObject.CardObject.link;

    galleryImage.addEventListener(
        "click", () => {
            settingsObject.PopupDetailImage.src = settingsObject.CardObject.link;
            settingsObject.PopupDetailImage.alt = settingsObject.CardObject.name;
            settingsObject.PopupDetailCaption.textContent = settingsObject.CardObject.name;
            openStaticPopup(settingsObject.PopupDetail);
        }
    );
    
    const likeButton = galleryCard.querySelector(`.${settingsObject.likeButtonClass}`);
    const likeCountContainer = galleryCard.querySelector(`.${settingsObject.likeButtonClass}-count`);
    setCardLikeAreaState(
        likeButton, settingsObject.likeButtonClass, likeCountContainer,
        settingsObject.CardObject, settingsObject.currentUserId        
    );
    likeButton.addEventListener(
        "click", likeButtonClickHandler(
            settingsObject.likeButtonClass, likeCountContainer,
            settingsObject.CardObject._id, settingsObject.currentUserId
        )
    );

    const trashButton = galleryCard.querySelector(`.${settingsObject.trashButtonClass}`);
    restrictCardRemoval(
        trashButton, settingsObject.galleryCardClass, settingsObject.PopupPromptDelete, 
        settingsObject.formElementClass, settingsObject.InputPromptDelete,
        settingsObject.submitButtonClass, settingsObject.closeButtonClass,
        settingsObject.CardObject, settingsObject.currentUserId
    );

    return galleryCard;
};



export {createGalleryCard};
