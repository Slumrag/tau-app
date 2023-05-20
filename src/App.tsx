import React ,{useState,useEffect} from 'react';
import logo from './logo.svg';
import './App.scss';
import { TransferFunctionInput, transferFunction } from 'control-systems-js';
import {InputTF,CharTypes} from "./InputTF/InputTF";
import { parseString ,isSupportedTF,removeFirstElements } from './utils/helperFunctions';
// import * as echarts from 'echarts';
import { StepPlot,StepPlotProps } from './StepPlot/StepPlot';
import { DatasetComponentOption, EChartsOption } from 'echarts';

// const times = [0, 5, 10];

// const stepResult = tf.step(times);
// const bode=tf.bode([0,10,100])


function App() {
 
  const [num, setNum] = useState<string>('1');
  const [den, setDen] = useState<string>('1 1');
 
  // console.log(stepResult,bode)
  const numden:TransferFunctionInput={
    numerator:removeFirstElements(parseString(num),0),
    denominator:removeFirstElements(parseString(den),0),
  };
  console.log(numden)
  console.log(isSupportedTF(numden))
  let option:EChartsOption={}
  
  // const tf = isSupportedTF(numden)?
  // transferFunction(numden):
  // null;
  // const getData=getEChartsOptions(chartConfig);
  const timeRange:number[]=[0, 0.1,1,5];
  // const stepData=tf?.step(timeRange);
  // console.log(stepData)
  const allowedCharacters=CharTypes.decimal;
  return (
    <div className="App _container">
      <header className="App-header">
        <h1>Анализ ЛСАУ</h1>
      </header>
      <main>
        <h3 className='description'>Введите коэффиценты числителя и знаменателя передаточной функции.</h3>
        <div className="InputWraper">
        <InputTF id={'num'} 
        name={"Числитель"} 
        value={num} 
        allowedCharacters={allowedCharacters}
          callback={(arg:string):void=>setNum(arg)}
          />
        <InputTF id={'den'} 
        name={"Знаменатель"} 
        value={den} 
        allowedCharacters={allowedCharacters}
         callback={(arg:string):void=>setDen(arg)}
         />
         </div>
        {/* <p>{num} {den}</p> */}
          <StepPlot 
          option={option} 
          loading={false}
          numden={numden} 
          timeRange={timeRange} />
      </main>
      <footer></footer>
    </div>
  );
}
export default App;
