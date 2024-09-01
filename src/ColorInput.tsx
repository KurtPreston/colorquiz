import React from 'react';
import {RGB} from './util/color';
import './ColorInput.scss';

type ColorInputProps = {
  value: RGB;
  onChange: (value: RGB) => void;
  disabled?: boolean;
  extraCol?: RGB;
};

export function ColorInput(props: ColorInputProps): React.ReactNode {
  const {disabled, value, onChange, extraCol} = props;

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
            <input type='range' min={0} max={255} value={r} onChange={onRedChange} disabled={disabled}/>
          </td>
          <td>
            {r}
          </td>
          {extraCol && <td>{extraCol.r}</td>}
        </tr>
        <tr>
          <td>Green</td>
          <td>
            <input type='range' min={0} max={255} value={g} onChange={onGreenChange} disabled={disabled}/>
          </td>
          <td>
            {g}
          </td>
          {extraCol && <td>{extraCol.g}</td>}
        </tr>
        <tr>
          <td>Blue</td>
          <td>
            <input type='range' min={0} max={255} value={b} onChange={onBlueChange} disabled={disabled}/>
          </td>
          <td>
            {b}
          </td>
          {extraCol && <td>{extraCol.b}</td>}
        </tr>
      </tbody>
    </table>
  );
}
