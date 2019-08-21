import React, { Component } from 'react';
import Lg from './Lg';
import Slider from './Slider';
import { SketchPicker } from 'react-color';

// STYLES
const btn = {
    block: "inline-block", 
    float: 'left', 
    backgroundColor: 'black',
};

export default class Home extends Component {

    constructor(props) {
        super(props);
        this.state = {
            color1: {
                r: null, 
                g: null, 
                b: null, 
                a: null,
            },
            color2: null,
            s1: 0,
            s2: 100
        }
    }

    ons1Change = (e) => {
        this.setState({ s1: e.target.value });
    }

    ons2Change = (e) => {
        this.setState({ s2: e.target.value });
    }

    onColor1Change = (e) => {
        console.log(e.rgb);
        this.setState({color1: e.rgb});
    }

    onColor2Change = (e) => {
        this.setState({color2: e.rgb});
    }



    render() {
        return (
            <div>
                <h1>Linear Gradient Test</h1>

                <Lg red1={this.state.color1.r} green1={this.state.color1.g} blue1={this.state.color1.b}
                    red2={this.state.r2} green2={this.state.g2} blue2={this.state.b2}
                    stop1={this.state.s1} stop2={this.state.s2} />

                <div style={{width: '100%'}}>
                        <button class="btn"></button>
                        <button style={{block: "inline-block", float: 'right', backgroundColor: 'black'}}></button>
                </div>

                <SketchPicker onChange={this.onColor1Change} />

                <h5>Stopper</h5>
                <Slider onChange={this.onChange} />
            </div>
        )
    }
}



