import React, { Component } from 'react'

export default class Lg extends Component {

    constructor(props) {
        super(props);
        this.state = {

        }
    }

    render() {
        return (
            <svg viewBox="0 0 10 1">
                <defs>
                    <linearGradient id="myGradient" gradientTransform="rotate(0)">
                        <stop offset={`${this.props.stop1}`} stopColor={`rgb(${this.props.red1}, ${this.props.green1}, ${this.props.blue1})`}/>
                        <stop offset={`${this.props.stop2}`} stopColor={`rgb(${this.props.red2}, ${this.props.green2}, ${this.props.blue2})`}/>
                    </linearGradient>
                </defs>

                <rect width="100%" height="100%" fill="url('#myGradient')" />
            </svg>
        )
    }
}
