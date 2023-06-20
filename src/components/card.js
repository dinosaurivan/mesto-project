// работа с карточками

import {currentUserId} from "./utils.js";
import {openStaticPopup, makePopupOpenable} from "./modal.js";
import {likeCard, unlikeCard} from "./api.js";



function setCardLikeAreaState (targetLikeButton, likeButtonClass, targetLikesCountElement, targetCardObject) {
    targetLikesCountElement.textContent = targetCardObject.likes.length;
    if (
        targetCardObject.likes.some(
            like => like._id === currentUserId
        )
    ) {
        targetLikeButton.classList.add(`${likeButtonClass}_active`);
    } else {
        targetLikeButton.classList.remove(`${likeButtonClass}_active`);
    };
};



function likeButtonClickHandler (likeButtonClass, likeCountContainer, galleryCardClass) {
    return function (event) {
        if (event.target.classList.contains(`${likeButtonClass}_active`)) {
            unlikeCard(
                event.target.closest(`.${galleryCardClass}`).dataset.cardId
            ).then(
                card => {
                    setCardLikeAreaState(
                        event.target, likeButtonClass, likeCountContainer, card
                    );
                }
            ).catch(
                error => {
                    console.log(error);
                }
            );
        } else {
            likeCard(
                event.target.closest(`.${galleryCardClass}`).dataset.cardId
            ).then(
                card => {
                    setCardLikeAreaState(
                        event.target, likeButtonClass, likeCountContainer, card
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



function restrictCardRemoval (
    trashButton, targetCardObject, galleryCardClass,
    popupPromptDelete, inputPromptDelete, submitButtonClass
) {
    if (currentUserId !== targetCardObject.owner._id) {
        trashButton.remove();
    } else {
        makePopupOpenable(
            popupPromptDelete,
            trashButton,
            submitButtonClass,
            [
                {
                    inputElement: inputPromptDelete,
                    fallbackInitialValue: trashButton.closest(`.${galleryCardClass}`).dataset.cardId,
                }              
            ]
        )
    };
};



function createGalleryCard (settingsObject) {
    const galleryCard = settingsObject.targetGalleryCardTemplate.querySelector(
        `.${settingsObject.galleryCardClass}`
    ).cloneNode(true);

    galleryCard.setAttribute("data-card-id", settingsObject.targetCardObject._id);
    
    const galleryTitle = galleryCard.querySelector(`.${settingsObject.cardTitleClass}`);
    galleryTitle.textContent = settingsObject.targetCardObject.name;

    const galleryImage = galleryCard.querySelector(`.${settingsObject.cardImageClass}`);
    galleryImage.alt = settingsObject.targetCardObject.name;
    galleryImage.src = settingsObject.targetCardObject.link;

    galleryImage.addEventListener(
        "click", () => {
            settingsObject.targetPopupDetailImage.src = settingsObject.targetCardObject.link;
            settingsObject.targetPopupDetailImage.alt = settingsObject.targetCardObject.name;
            settingsObject.targetPopupDetailCaption.textContent = settingsObject.targetCardObject.name;
            openStaticPopup(settingsObject.targetPopupDetail);
        }
    );
    
    const likeButton = galleryCard.querySelector(`.${settingsObject.likeButtonClass}`);
    const likeCountContainer = galleryCard.querySelector(`.${settingsObject.likeButtonClass}-count`);
    setCardLikeAreaState(
        likeButton, settingsObject.likeButtonClass, likeCountContainer, settingsObject.targetCardObject
    );
    likeButton.addEventListener(
        "click", likeButtonClickHandler(
            settingsObject.likeButtonClass, likeCountContainer, settingsObject.galleryCardClass
        )
    );

    const trashButton = galleryCard.querySelector(`.${settingsObject.trashButtonClass}`);
    restrictCardRemoval (  
        trashButton, settingsObject.targetCardObject, settingsObject.galleryCardClass,
        settingsObject.targetPopupPromptDelete, settingsObject.targetInputPromptDelete, settingsObject.submitButtonClass
    );

    return galleryCard;
};



export {createGalleryCard};
