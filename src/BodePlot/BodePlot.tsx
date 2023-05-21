import { ReactECharts, ReactEChartsProps } from '../ReactECharts/ReactECharts';
import { InputTF, CharTypes } from "../InputTF/InputTF";
import { DatasetComponentOption, EChartsOption } from 'echarts';
import React, { useState, useEffect } from 'react'
import { TransferFunctionInput, transferFunction } from 'control-systems-js';
import { parseString, isSupportedTF } from '../utils/helperFunctions';
import './BodePlot.scss';
export interface BodePlotProps extends ReactEChartsProps {
  numden: TransferFunctionInput,
  freqRange?: number[] | undefined,
};
const errMessage = 'Невозможно построить ЛАЧХ для заданной передаточной функции';

type TimeRange = {
  startTime: number,
  endTime: number,
  stepTime: number,
}
function handleInput<T>(value: string, field: string, state: T, callback: (arg: T) => void): void {
  const tmp = parseString(value).at(0);
  callback({
    ...state,
    [field]: typeof (tmp) === 'number' ?
      Math.abs(tmp) : 0
  });
}
function getTimeRange(timeRange: TimeRange): number[] | null {
  const timeSries: number[] = [];
  if (!(timeRange.stepTime > 1e-3) ||
    !(timeRange.startTime < timeRange.endTime) ||
    !(timeRange.endTime - timeRange.startTime > timeRange.stepTime)) {
    // console.log("left")
    return null;
  }
  const numPoints = Math.floor((timeRange.endTime - timeRange.startTime) / timeRange.stepTime);
  // console.log(numPoints)
  try {
    for (let i = timeRange.startTime; i < numPoints; i++)
      timeSries.push(i * timeRange.stepTime);

  } catch (error) {
    console.error(error)
    return null;
  }
  return timeSries;
}
export function BodePlot({ numden, option, ...props }: BodePlotProps) {
  const [time, setTime] = useState<TimeRange>({
    startTime: 0,
    endTime: 10,
    stepTime: 0.01,
  });
  const allowedRange = { min: 0, max: 1e5 };
  const chartConfig: EChartsOption = {
    ...option,
    grid: [
      { top: '5%', width: '70%', height: '45%' },
      { bottom: '0%', width: '70%', height: '45%' }
    ],
    xAxis: [
      {
        gridIndex: 0,
        type: 'log',
        name: 'Частота, рад/с',
        minorTick: {
          show: true,
          splitNumber: 10,
        },
        splitLine: {
          show: true,
        },
        minorSplitLine: {
          show: true,
        },
      },
      {
        gridIndex: 1,
        type: 'log',
        name: 'Частота, рад/с',
        minorTick: {
          show: true,
          splitNumber: 10,
        },
        splitLine: {
          show: true,
        },
        minorSplitLine: {
          show: true,
        },
      },
    ],
    yAxis: [
      {
        gridIndex: 0,
        type: 'value',
        minorTick: {
          show: true,
          splitNumber: 2,
        },
        splitLine: {
          show: true,
        },
        minorSplitLine: {
          show: true,
        },
      },
      {
        gridIndex: 1,
        type: 'value',
        minorTick: {
          show: true,
          splitNumber: 2,
        },
        splitLine: {
          show: true,
        },
        minorSplitLine: {
          show: true,
        },
      },
    ],

    // dataZoom:{
    //   type:'inside',
    //   filterMode:'empty',
    // },
    title: {
      text: 'ЛАЧХ ФЧХ',
      // textAlign:'left',
      right: 'center',
      left: 'center',
    },
    tooltip: {
      show: true,
      axisPointer: {
        show: true,
        type: 'cross',
      },
    },
    toolbox: {
      show: true,
      feature: {
        saveAsImage: {
          show: true,
          title: 'сохранить изображение'
        },
        dataZoom: {
          show: true,
        }

      }
    },
  }

  // console.log('range',rng);

  const bodeData = isSupportedTF(numden) ?
    transferFunction(numden).bode() :
    null;
  const series: EChartsOption = {
    series: [
      {
        xAxisIndex: 0,
        yAxisIndex: 0,
        type: 'line',
        symbol: 'none',
        data: bodeData?.magnitude.map(item => [item.x, item.y])
      },
      {
        xAxisIndex: 1,
        yAxisIndex: 1,
        type: 'line',
        symbol: 'none',
        data: bodeData?.phase.map(item => [item.x, item.y])
      }
    ],

  }
  console.log(bodeData);
  return (
    <div className="BodePlot">
      {/* <div className="time-input">
          <InputTF id='startTime' 
          name='Начальное время'
           callback={(arg:string)=>{handleInput<TimeRange>(arg,
            "startTime",time,setTime)}}  
          defaultValue='0'
          type='number'
            {...allowedRange}
          />

          <InputTF id='endTime' 
          name='Конечное время'
          callback={(arg:string)=>{handleInput<TimeRange>(arg,
            "endTime",time,setTime)}}  
            type='number'
            {...allowedRange}
          defaultValue='10'
            pattern='[\\d\\.]'
          // allowedCharacters={CharTypes.decimal}
          />
          
          <InputTF id='timeStep' 
          name='Шаг, с'
          callback={
            (arg:string)=>{
            return handleInput<TimeRange>(arg,
            "stepTime",time,setTime)}
          }   
          defaultValue='0.01'
          type='number'
          min={'1e-5'}
          />
        </div> */}
      {bodeData ?
        <div className="BodePlot-plot">
          <ReactECharts option={{
            ...chartConfig,
            ...series,
            // dataset: { source: bodeData.magnitude, }
          }} {...props} />
        </div> :
        <h4 className='err'>{errMessage}</h4>
      }
    </div>
  )
}
