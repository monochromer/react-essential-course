import React from 'react';

import './Note.css';

const Note = ({
    id,
    title,
    text,
    color,
    onDelete
}) => {
    return (
        <div className='Note' style={{ backgroundColor: color }}>
            <span className='Note-Del' onClick={() => onDelete(id)}>×</span>
            {
                title
                    ? <h4 className='Note-Title'>{title}</h4>
                    : null
            }
            <div className='Note-Text'>{text}</div>
        </div>
    );
};

export default Note;
