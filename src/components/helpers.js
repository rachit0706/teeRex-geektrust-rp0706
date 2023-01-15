export function applyFilters(data, filterObj) {
    const input = [...data];
    let result = input;
    const {color, gender, price, type} = filterObj;

    if(color.size) {
        result = filterByProp(result, 'color', color);
    }
    if(gender.size) {
        result = filterByProp(result, 'gender', gender);
    }
    if(price.size) {
        result = filterByProp(result, 'price', price);
    }
    if(type.size) {
        result = filterByProp(result, 'type', type);
    }

    return result;
}

function filterByProp(data, prop, filterSet) {
    const input = [...data];
    let result = [];
    
    if(prop === 'price') {
        const numArr = getPriceArr(filterSet);

        result = input.filter(item => (item.price >= numArr[0]) && (item.price < numArr[numArr.length - 1]));
    }else {
        result = input.filter(item => filterSet.has(item[prop].toLowerCase()));
    }

    return result;
}

function getPriceArr(priceSet) {
    const input = Array.from(priceSet);
    const result = [];

    for(let i = 0; i < input.length; i++) {
        let elem = input[i].split("-");

        result.push(Number(elem[0]));
        result.push(Number(elem[1]));
    }

    result.sort((a, b) => a - b);
    return result;
}