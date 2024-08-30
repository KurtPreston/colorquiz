import React, {CSSProperties} from 'react';
import {colorToRGB, randomNamedColor, rgbToHex} from './util/color';
import {ColorInput} from './ColorInput';
import {splitCamelCase} from './util/splitCamelCase';
import {colorDiff} from './util/colorDiff';

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
    const {target, selection} = this.state;

    const targetCSS: CSSProperties = {
      height: 200,
      width: 200,
      backgroundColor: target
    };
    const selectionCSS: CSSProperties = {
      height: 200,
      width: 200,
      backgroundColor: rgbToHex(selection)
    }
    return (
      <div>
        <div className='color-quiz-target' >
          <div style={targetCSS}/>
          {splitCamelCase(target)}
        </div>
        <div className='color-quiz-selection' >
          <div style={selectionCSS}/>
        </div>
        <ColorInput value={selection} onChange={(selection) => this.setState({selection})}/>
        {colorDiff(colorToRGB(target), selection)}
      </div>
    );
  }
}
