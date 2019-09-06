import React, { Component } from 'react'

export default class Lg extends Component {

    render() {

        const stops = this.props.lg.stops || [];

        return (
            <svg viewBox="0 0 10 1">
                <defs>
                    <linearGradient id="myGradient" gradientTransform="rotate(0)">
                        {stops.map((stop, i) => 
                            <stop key={i} offset={stop.offset} stopColor={stop.stopcolor}/>
                        )}
                    </linearGradient>
                </defs>

                <rect width="100%" height="100%" fill="url('#myGradient')" />
            </svg>
        )
    }
}
