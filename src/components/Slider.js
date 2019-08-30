import React, { Component } from 'react'

export default class Slider extends Component {

    constructor(props) {
        super(props);
        this.state = {

        }
    }

    render() {
        return (
            <div>
                <input type="range" min="0" max="100" 
                onChange={this.props.onChange} value={this.props.value}></input>
            </div>
        )
    }
}
