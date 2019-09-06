import React, { Component } from 'react';
import Slider from './Slider';
import axios from 'axios';
import Lg from './Lg';
import svgToLgObject from './SvgToLgObject';
import lgObjectToSvg from './LgObjectToSvg';

export default class Home extends Component {

    constructor(props) {
        super(props);
        this.state = {
            lgObject: {},
            showPicker: false,
            currentStop: null,
        }
    }

    //GET
    componentDidMount() {
        axios.get('http://localhost:8000/svg')
            .then(res =>
                this.setState({ lgObject: svgToLgObject(res.data) })
            )
            .catch(err => {
                console.log(err);
            })
    }

    saveStuff = () => {
        axios.post('http://localhost:8000/upload', lgObjectToSvg(this.state.lgObject));
    }

    onColorChange(e) {
        var lgObject = { ...this.state.lgObject };
        lgObject.stops.map((stop) => {
            if (stop === this.state.currentStop) {
                stop.stopcolor = e.target.value
            }
            this.setState({ lgObject })
        })
    }

    hexToRgb(hex) {
        var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return result ? `rgb(${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[2], 16)})` : null;
    }

    onBtnClick = (stop) => {
        this.setState({ showPicker: !this.state.showPicker });
        this.setState({ currentStop: stop });
    }

    // STYLES
    btn(stop) {
        return {
            width: '50px',
            height: '50px',
            block: "inline-block",
            backgroundColor: stop.stopcolor,
        }
    }
    centerSlider() {
        return {
            width: '100%',
            textAlign: 'center',
        }
    }



    render() {

        const stops = this.state.lgObject.stops || [];

        return (
            <div>
                <h1>Linear Gradient</h1>
                <button onClick={this.saveStuff}>SaveSomeStuff</button>

                <Lg lg={this.state.lgObject} />

                <div>
                    {stops ? stops.map((stop, index) =>
                        <button key={index} style={this.btn(stop)} onClick={() => this.onBtnClick(stop)}>stop {index} </button>
                    ) : <p>gradient did not have tag</p>}
                    {/* <div style={this.centerSlider()}>
                        <h5>Stopper</h5>
                        <Slider onChange={this.onStopChange} value={this.state.stop1}/>
                    </div> */}
                </div>

                <div >
                    {(this.state.showPicker) ? (
                        <input type="color" onChange={(e) => this.onColorChange(e)}></input>
                    ) : (<br></br>
                        )
                    }
                </div>
            </div>
        )
    }
}





