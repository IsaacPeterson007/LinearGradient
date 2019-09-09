import React, { Component } from 'react';

export default class Slider extends Component {

    constructor(props) {
        super(props);
        this.state = {
            colors: [],
        }
    }



    componentDidUpdate() {
        console.log(this.props.stops);
    }

    // STYLES
    //use 2 colors for now, allow multiple later
    gradient() {
        return {
            WebkitAppearance: 'none',
            backgroundImage: `linear-gradient(to right, ${this.props.stops[0].stopcolor}, ${this.props.stops[1].stopcolor})`,
            width: '300px',
            height: '15px',
        }
    }

    render() {

        return (
            <div>
                {this.props.stops ? 
                (<div style={this.gradient()}></div>) 
                : (<p>values not passed to slider</p>)}
            </div>
        )
    }
}
