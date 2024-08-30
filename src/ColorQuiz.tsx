import React, {CSSProperties} from 'react';
import {randomNamedColor} from './color';

type RGB = {
  r: number;
  g: number;
  b: number;
};

type Level = {
  target: string;
  selection?: RGB;
}

export class ColorQuiz extends React.Component<{}, Level> {
  public state: Level = {
    target: randomNamedColor()
  }
  
  public render() {
    const targetCSS: CSSProperties = {
      height: 200,
      width: 200,
      backgroundColor: this.state.target
    };
    return (
      <div>
        <div className='color-quiz-target' style={targetCSS}/>
        {this.state.target}
      </div>
    );
  }
}