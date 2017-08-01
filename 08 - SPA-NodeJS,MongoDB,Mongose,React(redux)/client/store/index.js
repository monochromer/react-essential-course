import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';

import rootReducer from '../reducers/rootReducer';

let initialState = {};

const logger = store => next => action => {
    console.group(action.type)
    console.info('dispatching', action)
    let result = next(action)
    console.log('next state', store.getState())
    console.groupEnd(action.type)
    return result
}

const configureStore = () => {
    const createStoreWithMiddleware = applyMiddleware(thunkMiddleware, logger)(createStore);
    const store = createStoreWithMiddleware(rootReducer, initialState);
    return store;
}

export default configureStore;