import React, { Component } from 'react'

export default class Lg extends Component {

    constructor(props) {
        super(props);
        this.state = {
            red1: 0,
            green1: 0,
            blue1: 0,
            r2: 0,
            g2: 0,
            b2: 0,
            s1: 0,
            s2: 0
        }
    }

    render() {
        return (
            <svg viewBox="0 0 10 1">
                <defs>
                    <linearGradient id="myGradient" gradientTransform="rotate(0)">
                        <stop offset="0%" stopColor={`rgb(${this.state.red1}, ${this.state.green1}, ${this.state.blue1})`}/>
                        <stop offset="100%" stopColor={`rgb(${this.state.red2}, ${this.state.green2}, ${this.state.blue2})`}/>
                    </linearGradient>
                </defs>

                <rect width="100%" height="100%" fill="url('#myGradient')" />
            </svg>
        )
    }
}
