const cohortId = "plus-cohort-25";
const token = "8b127a1a-395e-48e9-a236-f106c6bfb4b6";

const baseConfig = {
    baseUrl: `https://nomoreparties.co/v1/${cohortId}/`,
    params: {
        headers: {
            authorization: token,
            "Content-Type": "application/json"
        }
    }
};

function copyConfig(object) {
    const result = Object.assign({}, object);
    result.params = Object.assign({}, object.params);
    result.params.headers = Object.assign({}, object.params.headers);
    return result;
};

function makeConfig(endpointPath, params) {
    const config = copyConfig(baseConfig);
    config.url = config.baseUrl + endpointPath;
    for (let param in params) {
        config.params[param] = params[param]
    };
    return config;
};



function performFetch (config) {
    return fetch(
        config.url, config.params
    ).then(
        response => {
            if (response.ok) {
                return response.json();
            };
            return Promise.reject(`Error: ${response.status}`);
        }
    );
};



function getMe() {
    const config = makeConfig("users/me/", {method: "GET"});
    return performFetch(config);
};

function getInitialCards () {
    const config = makeConfig("cards/", {method: "GET"});
    return performFetch(config);
};

function changeProfileInfo (newNameValue, newBioValue) {
    const config = makeConfig(
        "users/me/", {
            method: "PATCH",
            body: JSON.stringify(
                {
                    name: newNameValue,
                    about: newBioValue
                }
            )
        }
    );
    return performFetch(config);
};

function changeProfileAvatar (newAvatarLink) {
    const config = makeConfig(
        "users/me/avatar/", {
            method: "PATCH",
            body: JSON.stringify(
                {avatar: newAvatarLink}
            )
        }
    );
    return performFetch(config);    
}

function addCard (imageNameValue, imageLinkValue) {
    const config = makeConfig(
        "cards/", {
            method: "POST",
            body: JSON.stringify(
                {
                    name: imageNameValue,
                    link: imageLinkValue
                }
            )
        }
    );
    return performFetch(config);
};

function removeCard (cardId) {
    const config = makeConfig(
        `cards/${cardId}`, {method: "DELETE"}
    );
    return performFetch(config);
};

function likeCard (cardId) {
    const config = makeConfig(
        `cards/likes/${cardId}`, {method: "PUT"}
    );
    return performFetch(config);
};

function unlikeCard (cardId) {
    const config = makeConfig(
        `cards/likes/${cardId}`, {method: "DELETE"}
    );
    return performFetch(config);
};

export {
    getMe,
    getInitialCards,
    changeProfileInfo,
    changeProfileAvatar,
    addCard,
    removeCard,
    likeCard,
    unlikeCard,
};
