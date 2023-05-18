// преобразует строку в массив чисел
function parseString(arg:string):number[] {
  return arg.trim().split(' ').filter((item)=>item).map((item)=>+item)
}
//проверяет коэффициенты числителя и знаменателя на соответствие устойчивости
function isSupported(num:number[],den:number[]):boolean {
    return num.length>0 && den.length>0
    && ([...num,...den].every((item)=>!isNaN(item))) 
    && num.length<=den.length;
}
export {parseString,isSupported}