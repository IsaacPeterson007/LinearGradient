import React, { Component } from 'react';
import Slider from './Slider';
import { SketchPicker } from 'react-color';
import axios from 'axios';

export default class Home extends Component {

    constructor(props) {
        super(props);
        this.state = {
            color1: {
                r: 0,
                g: 0,
                b: 0,
            },
            color2: {
                r: 255,
                g: 255,
                b: 255,
            },
            stop1: 0,
            stop2: 100,
            showLeftPicker: false,
            showRightPicker: false,
            svgString: null,
        }
    }

    //PULL 
    //-----IF SVG DOESNT EXIST, WE SHOULD HAVE A DEFAULT GRADIENT AVAILABLE TO GRAB
    componentDidMount() {
        axios.get('http://localhost:8000/svg')
            .then(res =>
                this.setState({ svgString: res.data }),
            )
            .then(() => {
                this.svgToImg(this.state.svgString);
            })
    }

    //converts svg string to img element
    //source: https://medium.com/@benjamin.black/using-blob-from-svg-text-as-image-source-2a8947af7a8e
    svgToImg(s) {
        const svg = s;
        const blob = new Blob([svg], { type: 'image/svg+xml' });
        const url = URL.createObjectURL(blob);
        const image = document.getElementById('img');
        image.addEventListener('load', () => URL.revokeObjectURL(url), { once: true });
        image.src = url;
    }

    imgToSvg() {
        return `
            <svg xmlns="http://www.w3.org/2000/svg">"
            <defs>
                    <linearGradient id="Gradient" gradientTransform="rotate(0)" viewBox="0 0 10 1">
                        <stop offset='${this.state.stop1.toString() + "%"}' stop-color='rgb(${this.state.color1.r}, ${this.state.color1.g}, ${this.state.color1.b})' />
                        <stop offset='${this.state.stop2.toString() + "%"}' stop-color='rgb(${this.state.color2.r}, ${this.state.color2.g}, ${this.state.color2.b})' />
                    </linearGradient>
                </defs>
                <rect x="0" y="0" height="100%" width="100%"  fill="url(#Gradient)" />
            </svg>`;
    }
    
    saveStuff = () => {
        const svg = {
            "svg":this.imgToSvg(),
        }
        axios.post('http://localhost:8000/upload', svg);
    }
    
    onStopChange = (e) => {
        this.setState({ stop: e.target.value });
    }

    onColor1Change = (e) => {
        this.setState({ color1: e.rgb });
    }

    onColor2Change = (e) => {
        this.setState({ color2: e.rgb });
    }

    onLeftBtnClicked = () => {
        this.setState({ showLeftPicker: true })
        this.setState({ showRightPicker: false })
    }
    onRightBtnClicked = () => {
        this.setState({ showLeftPicker: false })
        this.setState({ showRightPicker: true })
    }

    // STYLES
    leftBtn() {
        return {
            width: '50px',
            height: '50px',
            block: "inline-block",
            float: 'left',
            backgroundColor: `rgb(${this.state.color1.r}, ${this.state.color1.g}, ${this.state.color1.b})`
        }
    };
    rightBtn() {
        return {
            width: '50px',
            height: '50px',
            block: "inline-block",
            float: 'right',
            backgroundColor: `rgb(${this.state.color2.r}, ${this.state.color2.g}, ${this.state.color2.b})`
        }
    };
    centerSlider() {
        return {
            width: '100%',
            textAlign: 'center',
        }
    }

    render() {
        return (
            <div>
                <h1>Linear Gradient</h1>
                <button onClick={this.saveStuff}>SaveSomeStuff</button>

                {/* <Lg red1={this.state.color1.r} green1={this.state.color1.g} blue1={this.state.color1.b}
                    red2={this.state.color2.r} green2={this.state.color2.g} blue2={this.state.color2.b}
                    stop1={this.state.stop.toString() + "%"} stop2={"100%"} /> */}

                {/* <svg viewBox="0 0 10 1">
                    <defs>
                        <linearGradient id="myGradient" gradientTransform="rotate(0)">
                            <stop offset={`${this.state.stop.toString() + "%"}`}
                                stopColor={`rgb(${this.state.color1.r}, ${this.state.color1.g}, ${this.state.color1.b})`}/>
                            <stop offset={"100%"}
                                stopColor={`rgb(${this.state.color2.r}, ${this.state.color2.g}, ${this.state.color2.b})`}/>
                        </linearGradient>
                    </defs>
                    <rect width="100%" height="100%" fill="url('#myGradient')" />
                </svg> */}

                {this.state.svgString ? <img id="img" width="100%" height="100%"></img> : <p>cannot load svg...</p>}

                <div style={{ width: '100%' }}>
                    <button style={this.leftBtn()} onClick={this.onLeftBtnClicked}></button>
                    <button style={this.rightBtn()} onClick={this.onRightBtnClicked}></button>
                    <div style={this.centerSlider()}>
                        <h5>Stopper</h5>
                        <Slider onChange={this.onStopChange} />
                    </div>
                </div>

                <div style={{ width: '100%' }}>
                    {(this.state.showLeftPicker || this.state.showRightPicker) ? (
                        <SketchPicker disableAlpha={true} color={this.state.showLeftPicker ? this.state.color1 : this.state.color2}
                            onChangeComplete={this.state.showLeftPicker ? this.onColor1Change : this.onColor2Change} />
                    ) : (<br></br>
                        )
                    }
                </div>
            </div>
        )
    }
}





