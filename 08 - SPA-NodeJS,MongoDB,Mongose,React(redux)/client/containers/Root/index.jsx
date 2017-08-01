import React from 'react';
import { Provider } from 'react-redux';

import 'normalize.css/normalize.css';
import App from '../App/App';

const Root = ({ store }) => {
    return (
        <Provider store={store}>
            <App />
        </Provider>
    );
}

export default Root;