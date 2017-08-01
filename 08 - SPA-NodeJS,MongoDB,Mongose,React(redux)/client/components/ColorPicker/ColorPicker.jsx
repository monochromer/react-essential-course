import React, { Component } from 'react';
import cx from 'classnames';

import './ColorPicker.css';

/*
const Swatch = ({ color, value }) => {
    return (
        <div
            className={cx('ColorPicker-Swatch', { 'ColorPicker-Swatch--selected': value === color })}
            style={{ backgroundColor: color }}
        />
    )
}

const ColorPickerItem = ({ color, value, onCange }) => {
    const onClick = () => onChange(color);

    return (
        <div className='ColorPicker-Item'>
            <Swatch
                color={color}
                value={value}
                onClick={onClick}
            />
        </div>
    );
}

class ColorPicker extends Component {
    renderItem = ({ color }) =>
        <ColorPickerItem
            key={color}
            color={color}
            value={this.props.value}
            onChange={this.props.onChange}
        />;

    render() {
        return (
            <div className='ColorPicker'>
                {
                    this.props.colors.map(color => this.renderItem)
                }
            </div>
        )
    };
};
*/

class ColorPicker extends Component {

    onClick = (e) => {
        var swatch = e.target.closest('.ColorPicker-Swatch');
        if (!swatch) return;

        var color = swatch.getAttribute('data-color');
        var selectElem = this.selectElem;
        selectElem.value = color;
        var evt = selectElem.dispatchEvent(new Event('change', { 'bubbles': true }));
        typeof this.props.onChange === 'function' && this.props.onChange(color);
    }

    render() {
        var { colors, value, name } = this.props;

        return (
            <div className='ColorPicker' onClick={this.onClick}>
                <select name={name} className='ColorPicker-Select' defaultValue={value} ref={c => this.selectElem = c}>
                    {
                        colors.map((color) => {
                            return (
                                <option key={color} value={color}>{color}</option>
                            );
                        })
                    }
                </select>

                {
                    colors.map((color) => {
                        return (
                            <div className='ColorPicker-Item' key={color}>
                                <div
                                    data-color={color}
                                    className={cx('ColorPicker-Swatch', { 'ColorPicker-Swatch--selected': value === color })}
                                    style={{ backgroundColor: color }}
                                />
                            </div>
                        );
                    })
                }
            </div>
        );
    }
}

export default ColorPicker;
