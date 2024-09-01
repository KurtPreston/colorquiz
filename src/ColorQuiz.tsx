import React, {CSSProperties} from 'react';
import confetti from 'canvas-confetti';

import {colorToRGB, randomNamedColor, RGB, rgbToHex} from './util/color';
import {ColorInput} from './ColorInput';
import {splitCamelCase} from './util/splitCamelCase';
import {colorDiffPerc} from './util/colorDiff';
import './ColorQuiz.scss';

enum ColorQuizMode {
  practice,
  guessing,
  submitted
}

type State = {
  mode: ColorQuizMode,
  target: string;
  selection: RGB;
  history: {
    target: string;
    selection: RGB;
  }[];
};

export class ColorQuiz extends React.Component<void, State> {
  public state: State = {
    target: randomNamedColor(),
    selection: {
      r: 0,
      g: 0,
      b: 0
    },
    history: [],
    mode: ColorQuizMode.practice
  };

  private nextPractice() {
    this.setState({
      target: randomNamedColor(),
      selection: {
        r: 0,
        g: 0,
        b: 0
      }
    });
  }

  private nextLevel() {
    this.setState({
      mode: ColorQuizMode.guessing,
      target: randomNamedColor(),
      selection: {
        r: 0,
        g: 0,
        b: 0
      }
    });
  }

  private solve() {
    this.setState({
      selection: colorToRGB(this.state.target)
    });
  }

  private submit() {
    const {history, selection, target} = this.state;
    const nextHistory = [
      ...history,
      {
        selection,
        target
      }
    ];
    if(this.percentAccuracy(selection) > 90) {
      this.triggerSolveAnimation();
    }
    this.setState({
      history: nextHistory,
      mode: ColorQuizMode.submitted
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

  private renderInput() {
    const {mode, selection, target} = this.state;
    const extraCol = mode === ColorQuizMode.submitted
      ? colorToRGB(target)
      : undefined;
    return (
      <ColorInput
        disabled={mode === ColorQuizMode.submitted}
        value={selection}
        onChange={(selection) => this.updateSelection(selection)}
        extraCol={extraCol}
      />
    );
  }

  private renderAccuracy() {
    const {mode} = this.state;
    if(mode === ColorQuizMode.guessing) {
      return null;
    } else {
      const perc = this.percentAccuracy(this.state.selection);
      return (
        <div>
          Accuracy: {perc.toFixed(1)}%{this.progressIcon(perc)}
        </div>
      );
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
    this.setState({
      selection: rgb
    });
  }

  private renderActions() {
    const {mode} = this.state;
    if(mode === ColorQuizMode.practice) {
      return (
        <div className='actions'>
          <button onClick={() => this.nextPractice()}>Try Another</button>
          <button onClick={() => this.solve()}>Solve</button>
        </div>
      );
    } else if(mode === ColorQuizMode.guessing) {
      return (
        <div className='actions'>
          <button onClick={() => this.submit()}>Submit</button>
        </div>
      );
    } else if(mode === ColorQuizMode.submitted) {
      return (
        <div className='actions'>
          <button onClick={() => this.nextLevel()}>Next</button>
        </div>
      )
    } else {
      throw new Error(`Unepxected mode ${mode}`);
    }
  }

  private beginChallenge() {
    this.setState({
      mode: ColorQuizMode.guessing,
      target: randomNamedColor(),
      selection: {
        r: 0,
        g: 0,
        b: 0
      }
    });
  }

  private renderInstructions() {
    const {history, mode} = this.state;
    if(mode === ColorQuizMode.practice) {
      return (
        <p>
          Adjust the sliders to match the color. When you've had enough practice, click the button below.
          <br />
          <button onClick={() => this.beginChallenge()}>🔥 BEGIN CHALLENGE 🔥</button>
        </p>
      );
    } else if(mode === ColorQuizMode.guessing) {
      return (
        <h4>
          Level {history.length + 1}
        </h4>
      )
    } else if (mode === ColorQuizMode.submitted) {
      return (
        <h4>
          Level {history.length}
        </h4>
      )
    } else {
      throw new Error(`Unexpected mode ${mode}`);
    }
  }

  public render() {
    const {target, selection, mode} = this.state;

    const targetCSS: CSSProperties = {
      backgroundColor: target
    };
    const guessing = mode === ColorQuizMode.guessing
    const selectionCSS: CSSProperties = {
      backgroundColor: guessing
        ? undefined
        : rgbToHex(selection),
      outline: guessing
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
            <div style={selectionCSS} className='colorbox'>{guessing && '?'}</div>
            {rgbToHex(selection)}
          </div>
        </div>
        {this.renderInput()}
        {this.renderAccuracy()}
        {this.renderActions()}
      </div>
    );
  }
}
