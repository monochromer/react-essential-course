import React from 'react';
import { Link } from 'react-router';

import './App.less';

const App = React.createClass({
    render() {
        return (
            <div className='App'>
                <ul className='menu-bar'>
                    <li className='menu-item'>
                        <Link
                          className='menu-item-link'
                          activeClassName='active'
                          to='/about'>
                            About
                        </Link>
                    </li>
                    <li className='menu-item'>
                        <Link
                          className='menu-item-link'
                          activeClassName='active'
                          to='/inbox'>
                            Inbox
                        </Link>
                    </li>
                </ul>

                <div className='content'>
                    {this.props.children}
                </div>
            </div>
        );
    }
});

export default App;
