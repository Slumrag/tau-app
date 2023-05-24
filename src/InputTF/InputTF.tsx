import React, { InputHTMLAttributes } from 'react'
import './InputTF.scss';
// ^-?\d{1,5}$|(?=.{1,5})-?\d+\.\d{0,2}
export enum CharTypes {
  numeric = 'numeric',
  decimal = 'decimal',
  alphaNumeric = 'alphaNumeric',
};
export type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  allowedCharacters?: CharTypes | undefined,
  callback?: (arg: string) => void,
};

// const forbiddenKeys=/[\w]/
const handleKeys = (event: React.KeyboardEvent<HTMLElement>,
  characters: CharTypes | undefined) => {
  let reg;
  switch (characters) {
    case CharTypes.decimal:
      reg = /[\d\s\.-]|^[A-Z]+/;
      break;
    case CharTypes.alphaNumeric:
      reg = /[\d\s\w]|^[A-Z]+/;
      break;
    case CharTypes.numeric:
      reg = /[\d\s-]|^[A-Z]+/;
      break;
    default:
      reg = null;
      break;
  }
  if (!!reg && !reg?.test(event.key)) {
    console.log(event.key)
    event.preventDefault();
  }
}

export function InputTF({ id, name, type, callback, allowedCharacters, ...props }: InputProps) {

  return (
    <div className="InputTF">
      <label htmlFor={id}>{name}</label>
      <input type={type} name={name} id={id}
        onChange={
          callback ?
            (event) => callback(event.target.value) :
            () => { }
        }
        onKeyDown={(e) => handleKeys(e, allowedCharacters)}
        {...props}
      />
    </div>

  )
}

