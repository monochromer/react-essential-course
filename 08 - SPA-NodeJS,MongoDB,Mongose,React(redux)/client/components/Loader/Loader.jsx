import React from 'react';
import classnames from 'classnames';

import './Loader.css';

const Loader = ({ isActive }) => {
    return (
        <div className={classnames('Loader', {'Loader--Active': isActive})}>
            <div className='Loader-Spinner'></div>
        </div>
    )
};

export default Loader;