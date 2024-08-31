import React from 'react';
import {RGB} from './util/color';
import './ColorInput.scss';

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
    <table className='color-input'>
      <tbody>
        <tr>
          <td>Red</td>
          <td>
            <input type='range' min={0} max={255} value={r} onChange={onRedChange} />
          </td>
          <td>
            {r}
          </td>
        </tr>
        <tr>
          <td>Green</td>
          <td>
            <input type='range' min={0} max={255} value={g} onChange={onGreenChange} />
          </td>
          <td>
            {g}
          </td>
        </tr>
        <tr>
          <td>Blue</td>
          <td>
            <input type='range' min={0} max={255} value={b} onChange={onBlueChange} />
          </td>
          <td>
            {b}
          </td>
        </tr>
      </tbody>
    </table>
  );
}
