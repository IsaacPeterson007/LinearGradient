import React, { Component } from 'react';
//import Slider from './Slider';
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

    //GET
    componentDidMount() {
        axios.get('http://localhost:8000/svg')
            .then(res =>
                this.setData(res.data),
            )
            .catch(err => {
                console.log(err);
            })
    }

    //data from file is used to set state, if data is empty, use default values
    setData(data){

        if(typeof data === 'undefined' || data == null || data === ''){
            this.componentDidUpdate();
        }
        else{
            this.setState({
                color1: data.color1,
                color2: data.color2,
                stop1: data.stop1,
                stop2: data.stop2,
                svgString: data.svg,
            })
        }
    }

    //converts svg string to img element
    //source: https://medium.com/@benjamin.black/using-blob-from-svg-text-as-image-source-2a8947af7a8e
    componentDidUpdate() {
        var svg = this.imgToSvg();
        const blob = new Blob([svg], { type: 'image/svg+xml' });
        const url = URL.createObjectURL(blob);
        const image = document.getElementById('img');
        image.addEventListener('load', () => URL.revokeObjectURL(url), { once: true });
        image.src = url;
    }

    imgToSvg() {
        return `
            <!-- nti-linear-gradient -->
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
        var svg = {
            "color1":this.state.color1,
            "color2":this.state.color2,
            "stop1":this.state.stop1.toString(),
            "stop2":this.state.stop2.toString(),
            "svg":this.imgToSvg(),
        }

        axios.post('http://localhost:8000/upload', svg);
    }
    
    // onStopChange = (e) => {
    //    this.setState({stop1: e.target.value})    
    // }

    onColor1Change = (e) => {
        this.setState({ color1: e.rgb });
    }

    onColor2Change = (e) => {
        this.setState({ color2: e.rgb });
    }

    onLeftBtnClicked = () => {
        this.setState({ showLeftPicker: !this.state.showLeftPicker })
        this.setState({ showRightPicker: false })
    }
    onRightBtnClicked = () => {
        this.setState({ showLeftPicker: false })
        this.setState({ showRightPicker: !this.state.showRightPicker })
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
    left(){
        return {
            float: 'left'
        }
    };
    right(){
        return {
            float: 'right'
        }
    };
    // centerSlider() {
    //     return {
    //         width: '100%',
    //         textAlign: 'center',
    //     }
    // }

    render() {
        return (
            <div>
                <h1>Linear Gradient</h1>
                <button onClick={this.saveStuff}>SaveSomeStuff</button>

                <img id="img" alt="img cannot load" width="100%" height="100%"></img>

                <div style={{ width: '100%' }}>
                    <button style={this.leftBtn()} onClick={this.onLeftBtnClicked}></button>
                    <button style={this.rightBtn()} onClick={this.onRightBtnClicked}></button>
                    {/* SLIDER */}
                    {/* <div style={this.centerSlider()}>
                        <h5>Stopper</h5>
                        <Slider onChange={this.onStopChange} value={this.state.stop1}/>
                    </div> */}
                </div>

                <div style={this.state.showLeftPicker ? this.left() : this.right()}>
                    {(this.state.showLeftPicker || this.state.showRightPicker) ? (
                        <SketchPicker disableAlpha={true} color={this.state.showLeftPicker ? this.state.color1 : this.state.color2}
                            onChangeComplete={this.state.showLeftPicker ? this.onColor1Change : this.onColor2Change}/>
                    ) : (<br></br>
                        )
                    }
                </div>
            </div>
        )
    }
}





