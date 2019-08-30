import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Slider extends Component {

    
    render() {
        return (
            <div>
                <input type="range" min="0" max="100" 
                onChange={this.props.onChange} value={this.props.value}></input>
            </div>
        )
    }
}
