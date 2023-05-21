import { TransferFunctionInput, transferFunction } from "control-systems-js";

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
    try {
      const tf=transferFunction(numden);
    } catch (error) {
      console.warn(error);
      return false;
      
    }
    return numden.numerator.length>0 && numden.denominator.length>0
    && ([...numden.numerator,...numden.denominator].every((item)=>!isNaN(item))); 
}
// function getTimeRange(timeRange:):number[]{
//     const timeSries:number[]=[];
//     for (let i=startTime;i<endTime;i+=timeStep)
//         timeSries.push(i);
//     return timeSries;
// }
function isObjectEmpty(objectName:any) :boolean{
  return (
    objectName &&
    Object.keys(objectName).length === 0 &&
    objectName.constructor === Object
  );
};
export {parseString,
    isSupportedTF,
    // getTimeRange,
    removeFirstElements,
  isObjectEmpty
}