import { MODAL_REQUEST_SHOW, MODAL_REQUEST_HIDE, MODAL_ABOUT_SHOW, MODAL_ABOUT_HIDE } from '../actions/actionTypes';

export default function modal(state = { visibleRequest: false, visibleAbout: false }, action = {}) {
    switch (action.type) {
        case MODAL_REQUEST_SHOW:
            return { ...state, visibleRequest: true };
        case MODAL_REQUEST_HIDE:
            return { ...state, visibleRequest: false };
        case MODAL_ABOUT_SHOW:
            return { ...state, visibleAbout: true };
        case MODAL_ABOUT_HIDE:
            return { ...state, visibleAbout: false };
        default:
            return state;
    }
}