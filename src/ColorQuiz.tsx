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

type State = {
  // State
  started: boolean;
  guessing: boolean;

  target: string;
  selection: RGB;
  history: {
    target: string;
    selection: RGB;
  }[];
};

export class ColorQuiz extends React.Component<{}, State> {
  public state: State = {
    target: randomNamedColor(),
    selection: {
      r: 0,
      g: 0,
      b: 0
    },
    guessing: true,
    history: [],
    started: false
  };

  private next() {
    this.setState({
      target: randomNamedColor(),
      guessing: true
    });
  }

  private solve() {
    this.setState({
      selection: colorToRGB(this.state.target),
      guessing: false
    });
  }

  private submit() {
    this.setState({
      guessing: false
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
    if(!this.state.started || !this.state.guessing) {
      const perc = this.percentAccuracy(this.state.selection);
      return (
        <div>
          {perc.toFixed(1)}%{this.progressIcon(perc)}
        </div>
      );
    } else {
      return null;
    }
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
    if (!this.state.started && this.state.guessing && currentPerc < 90 && nextPerc >= 90) {
      this.triggerSolveAnimation();
      this.setState({
        selection: rgb,
        guessing: false
      });
    } else {
      this.setState({
        selection: rgb
      });
    }
  }

  private renderActions() {
    if(this.state.started) {
      return (
        <div className='actions'>
          <button onClick={() => this.submit()}>Submit</button>
        </div>
      )
    } else {
      return (
        <div className='actions'>
          <button onClick={() => this.next()}>Next</button>
          <button onClick={() => this.solve()}>Solve</button>
        </div>
      )
    }
  }

  private beginChallenge() {
    this.setState({
      started: true
    });
  }

  private renderInstructions() {
    const {history, started} = this.state;
    if (started) {
      return (
        <p>
          Level {history.length + 1}
        </p>
      )
    } else {
      return (
        <p>
          Adjust the sliders to match the color. When you've had enough practice, click the button
          to begin the
          <br />
          <button onClick={() => this.beginChallenge()}>🔥 CHALLENGE 🔥</button>
        </p>
      );
    }
  }

  public render() {
    const {target, selection, started} = this.state;

    const targetCSS: CSSProperties = {
      backgroundColor: target
    };
    const selectionCSS: CSSProperties = {
      backgroundColor: started ? undefined : rgbToHex(selection),
      outline: started
        ? `1px solid ${target}`
        : undefined
    };
    return (
      <div className='color-quiz'>
        <h3>rgb</h3>
        {this.renderInstructions()}
        <div className='color-quiz-boxes'>
          <div className='color-quiz-target'>
            <div style={targetCSS} className='colorbox'/>
            {splitCamelCase(target)}
          </div>
          <div className='color-quiz-selection'>
            <div style={selectionCSS} className='colorbox'>{started && '?'}</div>
            {rgbToHex(selection)}
          </div>
        </div>
        <ColorInput value={selection} onChange={(selection) => this.updateSelection(selection)} />
        {this.progressMeter()}
        {this.renderActions()}
      </div>
    );
  }
}
