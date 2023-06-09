import './PZMap.scss';
import { ReactECharts, ReactEChartsProps } from '../ReactECharts/ReactECharts';
import { TransferFunctionInput, transferFunction, Complex } from 'control-systems-js';
import { EChartsOption } from 'echarts';
import { isSupportedTF, isObjectEmpty } from '../utils/helperFunctions';
export interface PZMaptProps extends ReactEChartsProps {
    numden: TransferFunctionInput,
};
function parseComplex(item: Complex): string {
    return `${item.re} ${item.im >= 0 ? '+' : '-'} j${Math.abs(item.im)}`;
}
export function PZMap({ numden, option, ...props }: PZMaptProps) {
    const chartConfig: EChartsOption = {
        ...option,
        title: {
            show: true,
            text: 'Корневая картина',
            right: 'center',
            left: 'center',
        },
        xAxis: {
            type: 'value',
            name: 'Re',
            boundaryGap: ['5%', '5%'],
        },
        yAxis: {
            type: 'value',
            name: 'Im',
            boundaryGap: ['5%', '5%'],
        },
        legend: {
            // show: true,
            bottom: 0,
        },
        tooltip: { show: true, },
        toolbox: {
            show: true,
            feature: {
                restore: { show: true, },
                dataView: { show: true, },
                dataZoom: { show: true, },
            }
        },

    };
    const PZData: EChartsOption = isSupportedTF(numden) ?
        {
            series: [
                {
                    type: 'scatter',
                    symbolSize: 15,
                    symbol: 'diamond',
                    data: transferFunction(numden).pole()?.map(item => [item.re, item.im]),
                    name: 'Полюса',
                },
                {
                    type: 'scatter',
                    symbolSize: 15,
                    symbol: 'emptyCircle',
                    name: 'Нули',
                    data: transferFunction(numden).zero()?.map(item => [item.re, item.im]),
                }
            ]
        } : {};
    // console.log({ ...chartConfig, ...PZData })
    return (
        <div className='PZMap'>
            {!isObjectEmpty(PZData) ?
                <div className="PZcontainer">
                    <div className="PZData">
                        <div className='PZtable'>
                            {/* <div className="pole"> */}
                            <h4>Полюса</h4>
                            <h4>Нули</h4>
                            <ol className="rootlist">
                                {transferFunction(numden).pole().map((item, i) => {
                                    return <li key={i + 'p'}> {parseComplex(item)}</li>
                                })}
                            </ol>
                            {/* </div> */}
                            {/* <div className="zero"> */}
                            <ol className="rootList">
                                {transferFunction(numden).zero().map((item, i) => {
                                    return <li key={i + 'z'} > {parseComplex(item)}</li>
                                })}
                            </ol>
                            {/* </div> */}
                        </div>
                        <div className="PZformula">
                            <h4 className="PZformula-title">
                                Передаточная Функция
                            </h4>
                            <p className="PZformula-content">
                                {`W(s)=${transferFunction(numden).toString()}`}
                            </p>
                        </div>

                    </div>
                    <div className="PZChart-wrapper">
                        <ReactECharts
                            option={{ ...chartConfig, ...PZData }}
                            {...props} />
                    </div>
                </div>
                : null
            }
        </div>
    )
}
