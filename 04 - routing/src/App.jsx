import React from 'react';
import { Link } from 'react-router';

import './App.less';

const RouteLink = React.createClass({
    render() {
        return (
            <Link className='menu-item-link' activeClassName='active' {...this.props}>
                {this.props.children}
            </Link>
        )
    }
})

const App = React.createClass({
    render() {
        return (
            <div className='App'>
                <ul className='menu-bar'>
                    <li className='menu-item'>
                        <RouteLink to='/about'>About</RouteLink>
                    </li>
                    <li className='menu-item'>
                        <RouteLink to='/inbox'>Inbox</RouteLink>
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
