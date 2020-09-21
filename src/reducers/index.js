import { combineReducers } from 'redux';
import user from './usersReducer';
import modal from './modalsReducer';

const rootReducer = combineReducers({
    user,
    modal
});

export default rootReducer;