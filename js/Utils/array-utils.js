/**
 * Seskupí prvky pole do skupin, které mají stejnou hodnotu zadané property
 * @param {pole objektů} arr
 * @param {vlastnost objektu pole} property
 */
export function groupArrByProperty(arr, property) {
    return arr.reduce((acc, obj) => {
        let key = obj[property];
        if (!acc[key]) {
            acc[key] = [];
        }
        acc[key].push(obj);
        return acc;
    }, {});
}
/**
 * Ze seskupeného pole vrátí pro každou skupinu objekt s nejvyšší hodnotou property
 * @param {pole objektů, které jsou seskupeny podle jedné z property objektu} groupedArr
 * @param {property objektu pole, pro kterou se v každé skupině hledá nejvyšší hodnota} property
 */
export function getMaxValuesFromGroupedArr(groupedArr, property) {
    let maxValuesFromGroupArr = new Array();
    for (let groupKey in groupedArr) {
        const max = groupedArr[groupKey].reduce((prev, current) => {
            return prev[property] > current[property] ? prev : current;
        });
        maxValuesFromGroupArr.push(max);
    }
    return maxValuesFromGroupArr;
}
