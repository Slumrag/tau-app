import React from 'react'
import './InputTF.scss';
const numPattern='\d+|\d+\.\d';
// ^-?\d{1,5}$|(?=.{1,5})-?\d+\.\d{0,2}
type InputProps={
  id:string,
  name:string,
  value?:string,
  callback:(arg:string)=>void,

}
// const forbiddenKeys=/[\w]/
const handleKeys=(event:React.KeyboardEvent<HTMLElement>) => {
const allowedKeys=/[\d\s\.-]|^[A-Z]+/;
      // console.log(event.key);
      if (!allowedKeys.test(event.key)) {
        event.preventDefault();
      }
    }

export default function InputTF({id,name,value, callback}:InputProps) {

  return (
   <div className="InputTF">
     <label htmlFor={id}>{name}</label>
     <input type="text" name={name} id={id}
     value={value}
    //  pattern={numPattern} 
     onChange={(event)=>callback(event.target.value)}
     onKeyDown={handleKeys}
     />
   </div>
      
  )
}

