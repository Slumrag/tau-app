import { useState } from 'react';
import './FreqInput.scss';
import { InputProps, InputTF, } from "../InputTF/InputTF";
import { FreqRange, getFreqRange } from '../utils/freqFunc';
import { parseString } from '../utils/helperFunctions';
import React from 'react';
function handleInput<T>(value: string, field: string, state: T, callback: (arg: T) => void): void {
    const tmp = parseString(value).at(0);
    callback({
        ...state,
        [field]: typeof (tmp) === 'number' ?
            Math.abs(tmp) : 0
    });
}

type FreqInputProps = InputProps & {

    initialFreq?: FreqRange,
}
export default function FreqInput({ initialFreq, ...props }: FreqInputProps): JSX.Element {

    const freqDefault: FreqRange = initialFreq ? initialFreq : {
        startFreq: 0.1,
        endFreq: 100,
        stepFreq: 1.1,
    }
    const [freq, setFreq] = useState<FreqRange>(freqDefault
    );
    const freqRange: number[] = getFreqRange(freq);
    const renderChildren = () => {
        // console.log(props.children);
        return React.Children.map(props.children,
            (child) => {
                // console.log('in', child);
                // return <p></p>
                return React.cloneElement(child as any,
                    { freqRange, }
                )
            });
    };

    const allowedRange = { min: 1e-3, max: 1e6 };
    return (
        <div className="FreqInput">
            <div className="freq-input">
                <InputTF id='startFreq'
                    name='Начальная частота'
                    callback={(arg: string) => {
                        handleInput<FreqRange>(arg,
                            "startFreq", freq, setFreq)
                    }}
                    defaultValue={freqDefault.startFreq}
                    type='number'
                    {...allowedRange}
                />

                <InputTF id='endFreq'
                    name='Конечная частота'
                    callback={(arg: string) => {
                        handleInput<FreqRange>(arg,
                            "endFreq", freq, setFreq)
                    }}
                    type='number'
                    {...allowedRange}
                    defaultValue={freqDefault.endFreq}
                // allowedCharacters={CharTypes.decimal}
                />
                <InputTF id='freqStep'
                    name='Шаг, рад/с'
                    callback={
                        (arg: string) => {
                            return handleInput<FreqRange>(arg,
                                "stepFreq", freq, setFreq)
                        }
                    }
                    defaultValue={freqDefault.stepFreq}
                    type='number'
                    min={'1'}
                />

            </div>
            <div className="charts">
                {/* {props.children({ ...props, freqRange })} */}
                {renderChildren()}
                {/* {renderPlot(plot, freqRange)} */}

            </div>
        </div>

    )
}
