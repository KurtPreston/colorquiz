import React, {CSSProperties} from 'react';
import {randomNamedColor, rgbToHex} from './color';
import {ColorInput} from './ColorInput';

type RGB = {
  r: number;
  g: number;
  b: number;
};

type Level = {
  target: string;
  selection: RGB;
}

export class ColorQuiz extends React.Component<{}, Level> {
  public state: Level = {
    target: randomNamedColor(),
    selection: {
      r: 0,
      g: 0,
      b: 0
    }
  }
  
  public render() {
    const targetCSS: CSSProperties = {
      height: 200,
      width: 200,
      backgroundColor: this.state.target
    };
    const selectionCSS: CSSProperties = {
      height: 200,
      width: 200,
      backgroundColor: rgbToHex(this.state.selection)
    }
    return (
      <div>
        <div className='color-quiz-target' >
          <div style={targetCSS}/>
          {this.state.target}
        </div>
        <div className='color-quiz-selection' >
          <div style={selectionCSS}/>
        </div>
        <ColorInput value={this.state.selection} onChange={(selection) => this.setState({selection})}/>
      </div>
    );
  }
}
