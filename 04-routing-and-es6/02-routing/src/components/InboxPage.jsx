import React from 'react';

import MessagePreview from './MessagePreview.jsx';

import messages from '../messages.json';

import './InboxPage.less';

const InboxPage = React.createClass({
    getInitialState() {
        return {
            messages
        };
    },

    render() {
        const { messages } = this.state;
        const selectedMessageId = this.props.params['messageId'];

        return (
            <div className='InboxPage'>
                <div className='messages'>
                    {
                        messages.map(message =>
                            <MessagePreview
                                key={message.id}
                                id={message.id}
                                selected={message.id === selectedMessageId}
                                title={message.subject}
                                senderName={message.senderName}
                            />
                        )
                    }
                </div>

                <div className='message-container'>
                    {this.props.children}
                </div>
            </div>
        );
    }
});

export default InboxPage;
