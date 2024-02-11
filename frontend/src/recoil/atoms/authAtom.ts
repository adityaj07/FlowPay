import {atom} from "recoil";

export const userState = atom({
    key: "userState",
    default: null
})

export const isAuthenticatedState = atom({
    key: "isAuthenticatedState",
    default: false
})