import {getMe} from "./api.js";

let currentUserId;

getMe().then(
    profile => {
        currentUserId = profile._id;
    }
).catch(
    error => {
        console.log(error);
    }
);

export {currentUserId};
