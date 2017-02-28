import React from 'react';

import './Note.styl';

const Note = React.createClass({
    render() {
        const style = { backgroundColor: this.props.color };

        return (
            <div className='Note' style={style}>
                <span className='Note-Del' onClick={this.props.onDelete}>×</span>
                {
                    this.props.title
                        ? <h4 className='Note-Title'>{this.props.title}</h4>
                        : null
                }
                <div className='Note-Text'>{this.props.children}</div>
            </div>
        );
    }
});

export default Note;
