import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

import advertReducer from './advertRedux'
import initialState from './initialState';
import userReducer from './userRedux';

const subreducers = {
    ads: advertReducer,
    user: userReducer
}

const reducer = combineReducers(subreducers);

const store = createStore(
    reducer,
    initialState,
    compose(
        applyMiddleware(thunk),
        window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
        
    )
);

export default store;