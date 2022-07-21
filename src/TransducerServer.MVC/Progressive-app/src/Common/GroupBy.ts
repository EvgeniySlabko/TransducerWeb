
export function groupBy<T, K> (arr: T[], keySelector: (el: T) => K) : [K, T[]][] {

    let result = new Array<[K, T[]]>();
    arr.forEach(el => {
        let key = keySelector(el);
        let index = result.findIndex(r => r[0] === key);
        if (index != -1)
            result[index][1].push(el);
        else
            result.push([key, [el]]);            
    });

    return result;
  };