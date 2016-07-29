var Note = React.createClass({
    render: function() {
        var style = { backgroundColor: this.props.color };
        return (
            <div className="note" style={style}>
                <span className="delete-note" onClick={this.props.onDelete}> × </span>
                {this.props.children}
            </div>
        );
    }
});


var ColorPicker = React.createClass({
    getInitialState: function() {
        return {
            currentColor: this.props.palette[0]
        }
    },

    chooseColor: function(color) {
        var handler = this.props.onColorChange || function() {};
        handler(color);
        this.setState({
            currentColor: color
        });
    },

    render: function() {
        var self = this;
        var palette = self.props.palette;
        return (
            <div className='color-picker'>
                {palette.map(function(colorItem, index) {
                    var isChecked = colorItem === self.state.currentColor;
                    return (<div
                        key={index}
                        className={classNames('color-picker-item', {'checked': isChecked})}
                        style={{backgroundColor: colorItem}}
                        onClick={self.chooseColor.bind(null, colorItem)}
                    />);
                })}
            </div>
        );
    }
});


var NoteEditor = React.createClass({
    getInitialState: function() {
        return {
            text: '',
            color: this.palette[0]
        };
    },

    palette: [
        '#ff897d',
        '#ffd27a',
        '#ffff85',
        '#cfd8dc',
        '#7cd7ff',
        '#a4ffeb',
        '#cbff8a'
    ],

    handleTextChange: function(event) {
        this.setState({ text: event.target.value });
    },

    handleColorChange: function(color) {
        this.setState({ color: color });
    },

    handleNoteAdd: function() {
        if (this.state.text.trim() === '') return;
        
        var newNote = {
            text: this.state.text,
            color: this.state.color,
            id: Date.now()
        };

        this.props.onNoteAdd(newNote);
        this.setState({
            text: ''
        });
    },

    render: function() {
        return (
            <div className="note-editor">
                <textarea
                    placeholder="Enter your note here..."
                    rows={5}
                    className="textarea"
                    value={this.state.text}
                    onChange={this.handleTextChange}
                />
                <div className="note-editor-tools">
                    <ColorPicker
                        palette={this.palette}
                        onColorChange={this.handleColorChange}
                    />
                    <button className="add-button" onClick={this.handleNoteAdd}>Add</button>
                </div>
            </div>
        );
    }
});


var NotesGrid = React.createClass({
    componentDidMount: function() {
        var grid = this.refs.grid;
        this.msnry = new Masonry( grid, {
            itemSelector: '.note',
            columns: 3,
            gutter: 10,
            isFitWidth: true
        });
    },

    componentDidUpdate: function(prevProps) {
        if (this.props.notes.length !== prevProps.notes.length) {
            this.msnry.reloadItems();
            this.msnry.layout();
        }
    },

    render: function() {
        var onNoteDelete = this.props.onNoteDelete;

        return (
            <div className="notes-grid" ref="grid">
                {
                    this.props.notes.map(function(note){
                        return (
                            <Note
                                key={note.id}
                                onDelete={onNoteDelete.bind(null, note)}
                                color={note.color}>
                                {note.text}
                            </Note>
                        );
                    })
                }
            </div>
        );
    }
});


var NotesApp = React.createClass({
    getInitialState: function() {
        return {
            notes: []
        };
    },

    componentDidMount: function() {
        var localNotes = JSON.parse(localStorage.getItem('notes'));
        if (localNotes) {
            this.setState({ notes: localNotes });
        }
    },

    componentDidUpdate: function() {
        this._updateLocalStorage();
    },

    handleNoteDelete: function(note) {
        var noteId = note.id;
        var newNotes = this.state.notes.filter(function(note) {
            return note.id !== noteId;
        });
        this.setState({ notes: newNotes });
    },

    handleNoteAdd: function(newNote) {
        var newNotes = this.state.notes.slice();
        newNotes.unshift(newNote);
        this.setState({ notes: newNotes });
    },

    render: function() {
        return (
            <div className="notes-app">
                <h2 className="app-header">NotesApp</h2>
                <NoteEditor onNoteAdd={this.handleNoteAdd} />
                <NotesGrid notes={this.state.notes} onNoteDelete={this.handleNoteDelete} />
            </div>
        );
    },

    _updateLocalStorage: function() {
        var notes = JSON.stringify(this.state.notes);
        localStorage.setItem('notes', notes);
    }
});


ReactDOM.render(
    <NotesApp />,
    document.getElementById('mount-point')
);
