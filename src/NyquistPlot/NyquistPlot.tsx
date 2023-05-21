import { ReactECharts, ReactEChartsProps } from '../ReactECharts/ReactECharts';
import { InputTF, CharTypes } from "../InputTF/InputTF";
import { DatasetComponentOption, EChartsOption } from 'echarts';
import React, { useState, useEffect } from 'react'
import { TransferFunctionInput, transferFunction } from 'control-systems-js';
import { parseString, isSupportedTF } from '../utils/helperFunctions';
import './NyquistPlot.scss';
export interface NyquistPlotProps extends ReactEChartsProps {
  numden: TransferFunctionInput,
  freqRange?: number[] | undefined,
};
const errMessage = 'Невозможно построить Годограф для заданной передаточной функции';

function handleInput<T>(value: string, field: string, state: T, callback: (arg: T) => void): void {
  const tmp = parseString(value).at(0);
  callback({
    ...state,
    [field]: typeof (tmp) === 'number' ?
      Math.abs(tmp) : 0
  });
}

export function NyquistPlot({ numden, option, ...props }: NyquistPlotProps) {
  const chartConfig: EChartsOption = {
    ...option,
    xAxis: [
      {
        type: 'value',
        name: 'Re',
        splitLine: {
          show: true,
        },
      },
    ],
    yAxis: [
      {
        type: 'value',
        name: 'Im',

        splitLine: {
          show: true,
        },
      },
    ],
    title: {
      text: 'Годограф Найквиста',
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
  const nyquistData = isSupportedTF(numden) ?
    transferFunction(numden).nyquist() :
    null;
  console.log(nyquistData);
  const series: EChartsOption = {
    series: [
      {
        xAxisIndex: 0,
        yAxisIndex: 0,
        type: 'line',
        symbol: 'none',
        data: nyquistData?.points.map(item => [item.x, item.y])
      },
      {
        type: 'scatter',
        data: [[-1, 0]],
        symbol: 'circle',
        color: 'red',
      },

    ],

  }
  console.log(nyquistData);
  return (
    <div className="NyquistPlot">
      {nyquistData ?
        <div className="NyquistPlot-plot">
          <ReactECharts option={{
            ...chartConfig,
            ...series,
          }} {...props} />
        </div> :
        <h4 className='err'>{errMessage}</h4>
      }
    </div>
  )
}
