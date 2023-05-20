import { TransferFunctionInput } from "control-systems-js";

// преобразует строку в массив чисел
function parseString(arg:string):number[] {
  return arg.trim().split(' ').filter((item)=>item).map((item)=>+item)
}
function removeFirstElements(array:number[],element:number):number[] {
    const newarr=[...array];
    for (let index = 0; index < array.length; index++) {
     if(array[index]!==element)
      return newarr;
      newarr.shift();
    }
    return newarr;
    
}
//проверяет коэффициенты числителя и знаменателя на соответствие устойчивости
function isSupportedTF(numden:TransferFunctionInput):boolean {
    return numden.numerator.length>0 && numden.denominator.length>0
    && ([...numden.numerator,...numden.denominator].every((item)=>!isNaN(item))) 
    && numden.numerator.length<=numden.denominator.length;
}
// function getTimeRange(timeRange:):number[]{
//     const timeSries:number[]=[];
//     for (let i=startTime;i<endTime;i+=timeStep)
//         timeSries.push(i);
//     return timeSries;
// }
export {parseString,
    isSupportedTF,
    // getTimeRange,
    removeFirstElements}