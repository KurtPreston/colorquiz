import React, {CSSProperties} from 'react';
import confetti from 'canvas-confetti';

import {colorToRGB, randomNamedColor, rgbToHex} from './util/color';
import {ColorInput} from './ColorInput';
import {splitCamelCase} from './util/splitCamelCase';
import {colorDiffPerc} from './util/colorDiff';
import './ColorQuiz.scss';

type RGB = {
  r: number;
  g: number;
  b: number;
};

type Level = {
  target: string;
  selection: RGB;
  solved: boolean;
};

export class ColorQuiz extends React.Component<{}, Level> {
  public state: Level = {
    target: randomNamedColor(),
    selection: {
      r: 0,
      g: 0,
      b: 0
    },
    solved: false
  };

  private next() {
    this.setState({
      target: randomNamedColor()
    });
  }

  private solve() {
    this.setState({
      selection: colorToRGB(this.state.target),
      solved: false
    });
  }

  private progressIcon(progress: number) {
    if (progress > 90) {
      return '😎';
    }
    const emojis = ['😢', '😞', '😐', '🙂', '😃', '😄'];
    const idx = Math.floor((progress / 90) * emojis.length);
    return emojis[idx];
  }

  private percentAccuracy(guess: RGB) {
    const {target} = this.state;
    const perc = colorDiffPerc(guess, colorToRGB(target));
    return perc;
  }

  private progressMeter() {
    const perc = this.percentAccuracy(this.state.selection);
    return (
      <div>
        {perc.toFixed(1)}%{this.progressIcon(perc)}
      </div>
    );
  }

  private triggerSolveAnimation() {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: {y: 0.6}
    });
  }

  private updateSelection(rgb: RGB) {
    const currentPerc = this.percentAccuracy(this.state.selection);
    const nextPerc = this.percentAccuracy(rgb);
    if (!this.state.solved && currentPerc < 90 && nextPerc >= 90) {
      this.triggerSolveAnimation();
      this.setState({
        selection: rgb,
        solved: true
      });
    } else {
      this.setState({
        selection: rgb
      });
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
    };
    return (
      <div className='color-quiz'>
        <div className='color-quiz-boxes'>
          <div className='color-quiz-target'>
            <div style={targetCSS} />
            {splitCamelCase(target)}
          </div>
          <div className='color-quiz-selection'>
            <div style={selectionCSS} />
            {rgbToHex(selection)}
          </div>
        </div>
        <ColorInput value={selection} onChange={(selection) => this.updateSelection(selection)} />
        {this.progressMeter()}
        <div className='actions'>
          <button onClick={() => this.next()}>Next</button>
          <button onClick={() => this.solve()}>Solve</button>
        </div>
      </div>
    );
  }
}
