import React, { Component } from 'react';
import Slider from './Slider';
//import { SketchPicker } from 'react-color';
import axios from 'axios';
import Lg from './Lg';
import CustomPicker from './CustomPicker';

export default class Home extends Component {

    constructor(props) {
        super(props);
        this.state = {
            rotation: null,        
            stops: [],
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

    //set string to inner html and get object data for editor
    setData(data){
        var temp = document.createElement('div');
        temp.innerHTML = data;
        const nodelist = temp.querySelectorAll('stop');
        const tempStops = Array.from(nodelist);
        this.setState({stops: tempStops});      
    }

    //save from object to string before writing out
    toSvg(){
        return `
        <!-- nti-linear-gradient-->
        <svg xmlns="http://www.w3.org/2000/svg">
        <defs>
                <linearGradient id="Gradient" gradientTransform="rotate(0)" viewBox="0 0 10 1">`
                + this.printStops() + 
                `</linearGradient>
            </defs>
            <rect x="0" y="0" height="100%" width="100%"  fill="url(#Gradient)" />
        </svg>`;
    }

    printStops() {
        var s = '';
        this.state.stops.map((stop, i) => {
            s += `<stop offset="${stop.attributes.offset.nodeValue}" stopColor="${stop.attributes.stopcolor.nodeValue}"/>`
        })
        return s;
    }
    
    saveStuff = () => {
        this.printStops();
        axios.post('http://localhost:8000/upload', this.toSvg());
    }
    
    onStopChange = (e) => {
       this.setState({stop1: e.target.value})    
    }

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

    handleColorChange = ({ e }) => console.log(e)

    // STYLES
    leftBtn() {
        return {
            width: '50px',
            height: '50px',
            block: "inline-block",
            float: 'left',
            //backgroundColor: `rgb(${this.state.color1.r}, ${this.state.color1.g}, ${this.state.color1.b})`
        }
    };
    rightBtn() {
        return {
            width: '50px',
            height: '50px',
            block: "inline-block",
            float: 'right',
            //backgroundColor: `rgb(${this.state.color2.r}, ${this.state.color2.g}, ${this.state.color2.b})`
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
                    stop1={this.state.stop1.toString() + "%"} stop2={"100%"} /> */}

                <Lg stops={this.state.stops} />

                <div style={{ width: '100%' }}>
                    <button style={this.leftBtn()} onClick={this.onLeftBtnClicked}></button>
                    <button style={this.rightBtn()} onClick={this.onRightBtnClicked}></button>
                    {/* SLIDER */}
                    <div style={this.centerSlider()}>
                        <h5>Stopper</h5>
                        <Slider onChange={this.onStopChange} value={this.state.stop1}/>
                    </div>
                </div>

                <div style={this.state.showLeftPicker ? this.left() : this.right()}>
                    {(this.state.showLeftPicker || this.state.showRightPicker) ? (
                        // <SketchPicker disableAlpha={true} color={this.state.showLeftPicker ? this.state.color1 : this.state.color2}
                        //     onChangeComplete={this.state.showLeftPicker ? this.onColor1Change : this.onColor2Change}/>
                        <CustomPicker onChange={this.handleColorChange} />
                    ) : (<br></br>
                        )
                    }
                </div>
            </div>
        )
    }
}





