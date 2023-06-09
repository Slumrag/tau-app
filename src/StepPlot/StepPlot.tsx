import { ReactECharts, ReactEChartsProps } from '../ReactECharts/ReactECharts';
import { InputTF } from "../InputTF/InputTF";
import { EChartsOption } from 'echarts';
import React, { useState, useEffect } from 'react'
import { TransferFunctionInput, transferFunction } from 'control-systems-js';
import { parseString, isSupportedTF } from '../utils/helperFunctions';
import './StepPlot.scss';
export interface StepPlotProps extends ReactEChartsProps {
  numden: TransferFunctionInput,
  timeRange?: number[] | undefined,
};
const errMessage = 'Невозможно построить переходную характеристику для заданной передаточной функции';

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
export function StepPlot({ numden, option, ...props }: StepPlotProps) {
  const [time, setTime] = useState<TimeRange>({
    startTime: 0,
    endTime: 10,
    stepTime: 0.01,
  });
  const allowedRange = { min: 0, max: 1e5 };
  const chartConfig: EChartsOption = {
    ...option,
    xAxis: {
      type: 'value',
      name: 'Время, с',
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
    yAxis: {
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
    series: [
      {
        type: 'line',
        symbol: 'none',
      }
    ],
    // dataZoom:{
    //   type:'inside',
    //   filterMode:'empty',
    // },
    title: {
      text: 'Переходная характеристика',
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
  let rng;
  rng = getTimeRange(time);
  useEffect(() => {
    // console.log('useEff')

  }, [time]);

  // console.log('range',rng);

  const stepData = isSupportedTF(numden) && rng ?
    transferFunction(numden).step(rng).map(item => [item.x, item.y]) :
    null;
  return (
    <div className="StepPlot">
      <div className="time-input">
        <InputTF id='startTime'
          name='Начальное время'
          callback={(arg: string) => {
            handleInput<TimeRange>(arg,
              "startTime", time, setTime)
          }}
          defaultValue='0'
          type='number'
          {...allowedRange}
        />

        <InputTF id='endTime'
          name='Конечное время'
          callback={(arg: string) => {
            handleInput<TimeRange>(arg,
              "endTime", time, setTime)
          }}
          type='number'
          {...allowedRange}
          defaultValue='10'
          pattern='[\\d\\.]'
        // allowedCharacters={CharTypes.decimal}
        />

        <InputTF id='timeStep'
          name='Шаг, с'
          callback={
            (arg: string) => {
              return handleInput<TimeRange>(arg,
                "stepTime", time, setTime)
            }
          }
          defaultValue='0.01'
          type='number'
          min={'1e-5'}
        />
      </div>
      {stepData ?
        <div className="StepPlot-plot">
          <ReactECharts option={{
            ...chartConfig,
            dataset: { source: stepData, }
          }} {...props} />
        </div> :
        <h4 className='err'>{errMessage}</h4>
      }
    </div>
  )
}
