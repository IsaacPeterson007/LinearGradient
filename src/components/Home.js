import React, { Component } from 'react';
import Lg from './Lg';
import Slider from './Slider';

export default class Home extends Component {

constructor(props) {
    super(props);
    this.state = {
        r1: 0,
        g1: 0,
        b1: 0,
        r2: 0,
        g2: 0,
        b2: 0,
        s1: 0,
        s2: 0
    }
}

onr1Change = (e) => {
    this.setState({r1: e.target.value});
}

ong1Change = (e) => {
    this.setState({g1: e.target.value});
}

onb1Change = (e) => {
    this.setState({b1: e.target.value});
}

    render() {
        return (
            <div>
                <h1>Linear Gradient Test</h1>
                <Lg red1={this.state.r1} green1={this.state.g1} blue1={this.state.b1}/>
                <Slider onChange={this.onr1Change}/>
                <Slider onChange={this.ong1Change}/>
                <Slider onChange={this.onb1Change} />
            </div>
        )
    }
}
