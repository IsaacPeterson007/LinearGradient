import React, { Component } from 'react';

export default class Slider extends Component {

    constructor(props) {
        super(props);
        this.state = {

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
            height: '15px',
            width: '15px',
            borderRadius: '50%',
            display: 'inline-block',
            border: '1px solid black',
            boxShadow: 'inset 0 0 0 2px rgb(255, 255, 255)',
            backgroundColor: stop.stopcolor,
            float: 'left',
            cursor: 'pointer',
        }
    }

    handleRight(stop){
        return{
            height: '15px',
            width: '15px',
            borderRadius: '50%',
            display: 'inline-block',
            border: '1px solid black',
            boxShadow: 'inset 0 0 0 2px rgb(255, 255, 255)',
            backgroundColor: stop.stopcolor,
            float: 'right',
            cursor: 'pointer',
        }
    }

    handleClick = () => {
        console.log("clicked")
    }

    getStopPositions(numStops){
        
    }

    render() {

        // just two stops for now, just map through this.props.stops for multiple
        return (
            <div>
                {this.props.stops ? 
                (<div style={this.gradient()}>
                    <span onClick={() => this.props.onClick(this.props.stops[0])} style={this.handleLeft(this.props.stops[0])}></span>
                    <span onClick={() => this.props.onClick(this.props.stops[1])} style={this.handleRight(this.props.stops[1])}></span>
                </div>) 
                : (<p>values not passed to slider</p>)}
            </div>
        )
    }
}

//handle positions
//1 = 50
//2 = 0, 100
//3 = 0, 50, 100
//4 = 0, 33, 66, 100
//5 = 0, 25, 50, 75, 100
