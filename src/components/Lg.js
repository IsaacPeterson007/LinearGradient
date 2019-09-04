import React, { Component } from 'react'

export default class Lg extends Component {

    constructor(props) {
        super(props);
        this.state = {
            
        }
    }

    componentDidUpdate(){
        // console.log(this.props.stops);
        // this.props.stops.map((stop) => {
        //     console.log(stop.attributes.stopcolor.nodeValue);
        // })
    }

    render() {
        
        return (
            <svg viewBox="0 0 10 1">
                <defs>
                    <linearGradient id="myGradient" gradientTransform="rotate(0)">
                        {this.props.stops.map((stop, i) => 
                            <stop key={i} offset={stop.attributes.offset.nodeValue} stopColor={stop.attributes.stopcolor.nodeValue}/>
                        )}
                    </linearGradient>
                </defs>

                <rect width="100%" height="100%" fill="url('#myGradient')" />
            </svg>
        )
    }
}
