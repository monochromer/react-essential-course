import React from 'react';

import './FilterForm.less';


class FilterForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            filterType: 'all' // [all, completed, active]
        };

        this.changeFilterType = this.changeFilterType.bind(this);
    }

    changeFilterType(type) {
        var changeCallback = this.props.onChangeFilterType;
        changeCallback(type);

        this.setState({
            filterType: type
        });
    }

    render() {
        var self = this;
        return (
            <div className='Filter'>
                {this.props.types.map(function(type, index) {
                    return (
                        <div key={index}
                            className={'FilterType ' + (self.state.filterType === type ? 'FilterType--Active' : '')}
                            onClick={self.changeFilterType.bind(self, type)}
                        >
                            <div className='FilterType-Icon'></div>
                            <div className='FilterType-Text'>{type}</div>
                        </div>
                    );
                })}
            </div>
        );
    }
};


export default FilterForm;
