import { MODAL_REQUEST_SHOW, MODAL_REQUEST_HIDE, MODAL_ABOUT_SHOW, MODAL_ABOUT_HIDE } from './actionTypes';

export const modalRequestShow = () => ({
    type: MODAL_REQUEST_SHOW
});

export const modalRequestHide = () => ({
    type: MODAL_REQUEST_HIDE
});

export const modalAboutShow = () => ({
    type: MODAL_ABOUT_SHOW
});

export const modalAboutHide = () => ({
    type: MODAL_ABOUT_HIDE
});

export const showModal = (name) => dispatch => {
    if(name === "request") {
        dispatch(modalRequestShow());
    } else {
        dispatch(modalAboutShow());
    }
};

export const hideModal = (name) => dispatch => {
    if(name === "request") {
        dispatch(modalRequestHide());
    } else {
        dispatch(modalAboutHide());
    }
};