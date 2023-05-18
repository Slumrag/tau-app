import React ,{useState} from 'react';
import logo from './logo.svg';
import './App.scss';
import { transferFunction } from 'control-systems-js';
import InputTF from "./InputTF/InputTF";
import { parseString ,isSupported } from './utils/helperFunctions'

// const times = [0, 5, 10];

// const stepResult = tf.step(times);
// const bode=tf.bode([0,10,100])

// const [den, setDen] = useState("");
function App() {
  const [num, setNum] = useState<string>('1');
  const [den, setDen] = useState<string>('1 1');
 
  // console.log(stepResult,bode)
  const [arrNum,arrDen]=[parseString(num),parseString(den)];
  console.log('n',arrNum,'d',arrDen)
  console.log(isSupported(arrNum,arrDen))

  const tf = isSupported(arrNum,arrDen)?
  transferFunction({
	  numerator: parseString(num),
	  denominator: parseString(den),
}):
  null;
  console.log(tf)
  return (
    <div className="App _container">
      <header className="App-header">
        <h1>Анализ ЛСАУ</h1>
      </header>
      <main>
        <h3 className='description'>Введите коэффиценты числителя и знаменателя передаточной функции.</h3>
        <div className="InputWraper">
        <InputTF id={'num'} name={"Числитель"} 
        value={num} 
          callback={(arg:string):void=>setNum(arg)}
          />
        <InputTF id={'den'} name={"Знаменатель"} 
        value={den} 
         callback={(arg:string):void=>setDen(arg)}
         />
         </div>
        <p>{num} {den}</p>
      </main>
      <footer></footer>
    </div>
  );
}
export default App;
