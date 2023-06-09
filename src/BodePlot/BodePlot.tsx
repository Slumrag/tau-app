import './BodePlot.scss';
import { ReactChart, ReactECharts, ReactEChartsProps } from '../ReactECharts/ReactECharts';
import { EChartsOption } from 'echarts';
// import React, { useState, useEffect } from 'react'
import { TransferFunctionInput, transferFunction } from 'control-systems-js';
import { isSupportedTF } from '../utils/helperFunctions';

export interface BodePlotProps extends ReactEChartsProps {
  numden: TransferFunctionInput,
  freqRange?: number[] | undefined,
};
const errMessage = 'Невозможно построить ЛАЧХ для заданной передаточной функции';


export function BodePlot({ numden, option, freqRange, ...props }: BodePlotProps): ReactChart {

  const chartConfig: EChartsOption = {
    ...option,
    grid: [
      { top: '5%', width: '70%', height: '45%' },
      { bottom: '5%', width: '70%', height: '45%' }
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

    title: {
      text: 'ЛАЧХ ФЧХ',
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


  const bodeData = isSupportedTF(numden) ?
    transferFunction(numden).bode(freqRange) :
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
  // console.log(bodeData);
  return (
    < >
      {bodeData ?
        <div className="BodePlot">
          <ReactECharts option={{
            ...chartConfig,
            ...series,
          }} {...props} />
        </div> :
        <h4 className='err'>{errMessage}</h4>
      }
    </>
  )
}
