import React from 'react';
import {RGB} from './color';

type ColorInputProps = {
  value: RGB;
  onChange: (value: RGB) => void;
};

export function ColorInput(props: ColorInputProps): React.ReactNode {
  const {value, onChange} = props;

  function onRedChange(event: React.ChangeEvent<HTMLInputElement>) {
    const color: RGB = {
      ...value,
      r: parseInt(event.target.value)
    };
    onChange(color);
  }

  function onGreenChange(event: React.ChangeEvent<HTMLInputElement>) {
    const color: RGB = {
      ...value,
      g: parseInt(event.target.value)
    };
    onChange(color);
  }

  function onBlueChange(event: React.ChangeEvent<HTMLInputElement>) {
    const color: RGB = {
      ...value,
      b: parseInt(event.target.value)
    };
    onChange(color);
  }

  const {r, g, b} = value;
  return (
    <fieldset>
      <label>
        Red
        <input type='range' min={0} max={255} value={r} onChange={onRedChange} />
      </label>

      <label>
        Green
        <input type='range' min={0} max={255} value={g} onChange={onGreenChange} />
      </label>

      <label>
        Blue
        <input type='range' min={0} max={255} value={b} onChange={onBlueChange} />
      </label>

    </fieldset>
  );
}
