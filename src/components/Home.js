import React, { Component } from 'react';
import Lg from './Lg';
import Slider from './Slider';
import { SketchPicker } from 'react-color';
import axios from 'axios'

export default class Home extends Component {

    constructor(props) {
        super(props);
        this.state = {
            results: "no call made",
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
        }
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
        axios.get("http://localhost:8000/lgApi")
        .catch(err => () => {console.log(err)});
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
                <h1>Linear Gradient {this.state.results}</h1>
                <button onClick={this.saveStuff}>SaveSomeStuff</button>

                <Lg red1={this.state.color1.r} green1={this.state.color1.g} blue1={this.state.color1.b}
                    red2={this.state.color2.r} green2={this.state.color2.g} blue2={this.state.color2.b}
                    stop1={this.state.stop.toString() + "%"} stop2={"100%"} />

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





