import React from 'react';
import Note from '../Note/Note';

import Masonry from 'react-masonry-component';
import './NotesGrid.css';

const NotesGrid = ({ notes, onNoteDelete }) => {
        const masonryOptions = {
            itemSelector: '.Note',
            columnWidth: 250,
            gutter: 10,
            isFitWidth: true
        };

        return (
            <Masonry
                className='NotesGrid'
                options={masonryOptions}
            >
                {
                    notes.map(note =>
                        <Note
                            key={note.id}
                            {...note}
                            onDelete={onNoteDelete}
                        >
                        </Note>
                    )
                }
            </Masonry>
        );
};

export default NotesGrid;
