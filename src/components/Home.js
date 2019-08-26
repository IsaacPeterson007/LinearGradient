import React, { Component } from 'react';
import Lg from './Lg';
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
                a: 100,
            },
            color2: {
                r: 255,
                g: 255,
                b: 255,
                a: 100,
            },
            stop: 50,
            showLeftPicker: false,
            showRightPicker: false,
            svgString: '',
            src: null,
        }
    }

    componentDidMount() {
        axios.get('http://localhost:8000/svg')
        .then(res => 
            this.setState({svgString: JSON.stringify(res.data)})
        )
        .then(this.updateLg())
    }

    updateLg(){
        const svg = this.state.svgString;
        const blob = new Blob([svg], {type: 'image/svg+xml'});
        const url = URL.createObjectURL(blob);
        const image = document.createElement('img');
        image.addEventListener('load', () => URL.revokeObjectURL(url),{once:true});
        image.src = url;
        this.setState({src: image.src})
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
        this.setState({showLeftPicker: true})
        this.setState({showRightPicker: false})
    }
    onRightBtnClicked = () => {
        this.setState({showLeftPicker: false})
        this.setState({showRightPicker: true})
    }

    saveStuff = () => {
        const svg = `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 10 1'><defs><linearGradient id='myGradient' gradientTransform='rotate(0)'><stop offset=${this.state.stop}' stopColor='rgb(${this.state.color1.r}, ${this.state.color1.g}, ${this.state.color1.b})'/><stop offset=${this.props.stop}' stopColor='rgb(${this.state.color2.r}, ${this.state.color2.g}, ${this.state.color2.b})'/></linearGradient></defs><rect width='100%' height='100%' fill='url("#myGradient")' /></svg>`;
        
        //MAYBE TO GET BLOG INTO IMAGE AT START
        //const blob = new Blob([svg], {type: 'image/svg+xml'});
        // const url = URL.createObjectURL(blob);
        // const image = document.createElement('img');
        // image.addEventListener('load', () => URL.revokeObjectURL(url),{once: true});
        // image.src = url;
        //const file = new Blob(svg, {type: 'image/svg+xml'})

        axios.post('http://localhost:8000/upload', svg)
        .then(function (res) {
            console.log(res);
        });
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
    centerSlider(){
        return{
            width: '100%',
            textAlign: 'center',
        }
    }
    pickerr(){
        if(this.state.showLeftPicker){
            return{
                width: '100%',
                block: "inline-block",
                float: 'left',
            }
        }
        if(this.state.showRightPicker){
            return{
                width: '100%',
                block: "inline-block",
                float: 'right',
                marginRight: '0px',
            }
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

                <svg viewBox="0 0 10 1">
                    <defs>
                        <linearGradient id="myGradient" gradientTransform="rotate(0)">
                            <stop offset={`${this.state.stop.toString() + "%"}`}
                                stopColor={`rgb(${this.state.color1.r}, ${this.state.color1.g}, ${this.state.color1.b})`}/>
                            <stop offset={"100%"}
                                stopColor={`rgb(${this.state.color2.r}, ${this.state.color2.g}, ${this.state.color2.b})`}/>
                        </linearGradient>
                    </defs>
                    <rect width="100%" height="100%" fill="url('#myGradient')" />
                </svg>

                <img src={this.state.src} alt={this.state.src} width="100%" height="100%"></img>

                <div style={{ width: '100%' }}>
                    <button style={this.leftBtn()} onClick={this.onLeftBtnClicked}></button>
                    <button style={this.rightBtn()} onClick={this.onRightBtnClicked}></button>
                    <div style={this.centerSlider()}>
                        <h5>Stopper</h5>
                        <Slider onChange={this.onStopChange} />
                    </div>
                </div>

                <div style={{width: '100%'}}>
                    {(this.state.showLeftPicker || this.state.showRightPicker) ? (
                        <SketchPicker disableAlpha="true" style={this.pickerr()} color={this.state.showLeftPicker ? this.state.color1 : this.state.color2} 
                        onChangeComplete={this.state.showLeftPicker ? this.onColor1Change : this.onColor2Change} />
                        ) : (<br></br>
                        )
                    }
                </div>
            </div>
        )
    }
}





