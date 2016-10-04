import React from 'react';
import {render} from 'react-dom';

import ToDoApp from './components/ToDoApp/ToDoApp.jsx';

render(
    React.createElement(ToDoApp),
    document.getElementById('mount-point')
);
