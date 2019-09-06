import React, { Component } from 'react';
import Slider from './Slider';
import axios from 'axios';
import Lg from './Lg';
import svgToObject from './SvgToLgObject';

export default class Home extends Component {

    constructor(props) {
        super(props);
        this.state = {
            rotation: null,        
            stops: [],
            showPicker: false,
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
        console.log(svgToObject(data));
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
            s += `<stop offset="${stop.getAttribute('offset')}" stopColor="${stop.getAttribute('stopcolor')}"/>`
        })
        return s;
    }
    
    saveStuff = () => {

        console.log(this.state.stops[0].getAttribute('stopcolor'));
        console.log(this.state.stops[0].getAttribute('offset'));
        

        this.printStops();
        axios.post('http://localhost:8000/upload', this.toSvg());
    }
    
    // onStopChange = (e) => {
    //    this.setState({stop1: e.target.value})    
    // }

    // onColor1Change = (e) => {
    //     this.setState({ color1: e.rgb });
    // }

    // onColor2Change = (e) => {
    //     this.setState({ color2: e.rgb });
    // }

    // onLeftBtnClicked = () => {
    //     this.setState({ showLeftPicker: !this.state.showLeftPicker })
    //     this.setState({ showRightPicker: false })
    // }
    // onRightBtnClicked = () => {
    //     this.setState({ showLeftPicker: false })
    //     this.setState({ showRightPicker: !this.state.showRightPicker })
    // }
    // onBtnClick = () => {
    //     this.setState({showPicker: true})
    // }

    // STYLES
    btn(stop) {
        return {
            width: '50px',
            height: '50px',
            block: "inline-block",
            backgroundColor: stop.attributes.stopcolor.nodeValue,
        }
    }
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

                <div style={{ width: '100%'}}>
                    {this.state.stops.map((stop, index) => 
                        <button key={index} style={this.btn(stop)}>stop {index} </button>
                    )}
                    {/* <button style={this.leftBtn()} onClick={this.onLeftBtnClicked}></button>
                    <button style={this.rightBtn()} onClick={this.onRightBtnClicked}></button> */}
                    {/* SLIDER */}
                    <div style={this.centerSlider()}>
                        <h5>Stopper</h5>
                        <Slider onChange={this.onStopChange} value={this.state.stop1}/>
                    </div>
                </div>

                <div >
                    {(this.state.showPicker) ? (
                        <input type="color" ></input>
                    ) : (<br></br>
                        )
                    }
                </div>
            </div>
        )
    }
}





