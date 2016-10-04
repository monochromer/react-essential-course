import React from 'react';
import { Link } from 'react-router';

import classNames from 'classnames';

import './MessagePreview.less';

const MessagePreview = React.createClass({
    render() {
        const { title, senderName, selected, onClick } = this.props;
        const classes = classNames('MessagePreview', { selected });

        return (
            <div className={classes}>
                <div className='title'>{title}</div>
                <div className='from'>{`from ${senderName}`}</div>
                <Link to={`/inbox/messages/${this.props.id}`} className="MessagePreview-Link"></Link>
            </div>
        );
    }
});

export default MessagePreview;
