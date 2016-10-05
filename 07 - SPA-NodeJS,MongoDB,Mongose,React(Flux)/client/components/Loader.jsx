import React from 'react';
import classnames from 'classnames';

import './Loader.less';

const Loader = React.createClass({
    render() {
        return (
            <div className={classnames('Loader', {'Loader--Active': this.props.isActive})}>
                <div className='Loader-Spinner'></div>
            </div>
        )
    }
});

export default Loader;