import React, { Component } from 'react';
import { HuePicker } from 'react-color';
//var { HuePicker } = require('react-color/lib/components/common');

export default class CustomPicker extends Component {
  constructor(props) {
    super(props);
}

  render() {
    return (
      <div style={{ position: 'relative' }}>
        <button>
          Pick Color
      </button>

        <div
          style={{
            position: 'absolute',
            top: '100%',
            left: '50%',
            transform: 'translateX(-50%)',
            marginTop: 15,
          }}
         >

          <HuePicker onChange={this.props.onChangeComplete}/>

        </div>
      </div>
    )
  }
}

