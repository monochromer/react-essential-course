import React from 'react';

import './FilterForm.less';


class FilterForm extends React.Component {
    constructor(props) {
        super(props);
    }

    changeFilterType(type) {
        var changeCallback = this.props.onChangeFilterType;
        changeCallback(type);
    }

    render() {
        var self = this;
        return (
            <div className='Filter'>
                {this.props.types.map(function(type) {
                    return (
                        <div key={'id-' + type}
                            className={'FilterType ' + (self.props.filterType === type ? 'FilterType--Active' : '')}
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
