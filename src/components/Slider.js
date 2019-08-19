import React, { Component } from 'react'

export default class Slider extends Component {

    constructor(props) {
        super(props);
        this.state = {
            value: 0,
        }
    }



    render() {
        return (
            <div>
                <input type="range" min="0" max="255" 
                onChange={this.props.onChange}></input>
            </div>
        )
    }
}
