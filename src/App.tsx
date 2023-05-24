import React, { useState, useEffect } from 'react';
import './App.scss';
import { TransferFunctionInput } from 'control-systems-js';
import { InputTF, CharTypes } from "./InputTF/InputTF";
import { parseString, removeFirstElements } from './utils/helperFunctions';
// import * as echarts from 'echarts';
import { StepPlot, StepPlotProps } from './StepPlot/StepPlot';
import { PZMap } from './PZMap/PZMap';
import { EChartsOption } from 'echarts';
import { BodePlot, BodePlotProps } from './BodePlot/BodePlot';
import { NyquistPlot } from './NyquistPlot/NyquistPlot';
import FreqInput from './FreqInput/FreqInput';


function App() {
  const [num, setNum] = useState<string>('1');
  const [den, setDen] = useState<string>('1 0');

  // console.log(stepResult,bode)
  const numden: TransferFunctionInput = {
    numerator: removeFirstElements(parseString(num), 0),
    denominator: removeFirstElements(parseString(den), 0),
  };
  // console.log(numden)
  // console.log(isSupportedTF(numden))
  let option: EChartsOption = {}

  const allowedCharacters = CharTypes.decimal;
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
            callback={(arg: string): void => setNum(arg)}
          />
          <InputTF id={'den'}
            name={"Знаменатель"}
            value={den}
            allowedCharacters={allowedCharacters}
            callback={(arg: string): void => setDen(arg)}
          />
        </div>
        <PZMap option={{}}
          numden={numden}
        />
        <StepPlot
          option={{}}
          numden={numden}
        />
        <FreqInput initialFreq={{
          startFreq: 0.01,
          endFreq: 10,
          stepFreq: 2,
        }}>

          <BodePlot
            option={{}}
            numden={numden}
          />
          <NyquistPlot
            option={{}}
            numden={numden}
          />
        </FreqInput>

      </main>
      <footer></footer>
    </div>
  );
}
export default App;
