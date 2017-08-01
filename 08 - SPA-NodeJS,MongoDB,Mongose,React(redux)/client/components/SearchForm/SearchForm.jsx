import React, { Component } from 'react';

import './SearchForm.css';

class SearchForm extends Component {
    constructor() {
        super();
        this.state = {
            searchQuery: ''
        }
    }

    changeSearchQuery = (e) => {
        var text = e.target.value;
        var onSearch = this.props.onSearch;
        this.setState({ searchQuery: text });
        onSearch(text);
    }

    render() {
        return (
            <form className='SearchForm'>
                <input
                    className='SearchForm-Input'
                    type='text'
                    placeholder='Search...'
                    value={this.state.searchQuery}
                    onChange={this.changeSearchQuery}
                />
            </form>
        )
    }
}


export default SearchForm;