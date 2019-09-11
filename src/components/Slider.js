import React, { Component } from 'react';

export default class Slider extends Component {

    constructor(props) {
        super(props);
        this.state = {
            colors: [],
        }
    }



    componentDidUpdate() {

    }

    // STYLES
    //use 2 colors for now, allow multiple later
    gradient() {
        return {
            WebkitAppearance: 'none',
            backgroundImage: `linear-gradient(to right, ${this.props.stops[0].stopcolor}, ${this.props.stops[1].stopcolor})`,
            width: '300px',
            height: '15px',
            borderRadius: '30px',
        }
    }

    handleLeft(stop){
        return{
            height: '11px',
            width: '11px',
            borderRadius: '50%',
            display: 'inline-block',
            border: '2px solid black',
            backgroundColor: stop.stopcolor,
            float: 'left',
        }
    }

    handleRight(stop){
        return{
            height: '11px',
            width: '11px',
            borderRadius: '50%',
            display: 'inline-block',
            border: '2px solid black',
            backgroundColor: stop.stopcolor,
            float: 'right',
        }
    }

    render() {

        return (
            <div>
                {this.props.stops ? 
                (<div style={this.gradient()}>
                    <span style={this.handleLeft(this.props.stops[0])}></span>
                    <span style={this.handleRight(this.props.stops[1])}></span>
                </div>) 
                : (<p>values not passed to slider</p>)}
            </div>
        )
    }
}

//1 = 50
//2 = 0, 100
//3 = 0, 50, 100
//4 = 0, 33, 66, 100
//5 = 0, 25, 50, 75, 100
