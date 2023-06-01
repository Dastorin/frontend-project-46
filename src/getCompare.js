import _ from 'lodash'

const getCompare = (data1, data2) => {
    const keys1 = _.keys(data1)
    const keys2 = _.keys(data2)
    const keys = _.union(keys1, keys2).sort()
    const result = keys.map((key) => {
        if (_.isObject(data1[key]) && _.isObject(data2[key])) {
            return { key, type: 'nested', children: getCompare(data1[key], data2[key]) }
        }
        if (!_.has(data1, key) && _.has(data2, key)) {
            return { key, type: 'deleted', value: data2[key] }
        }
        if (!_.has(data2[key]) && _.has(data1[key])) {
            return { key, type: 'added', value: data1[key] }
        }
        if (data1[key] !== data2[key]) {
            return { key, type: 'changed', value1: data1[key], value2: data2[key] }
        }
        return { key, type: 'unchanged', value: data1[key] }
    })
    return result
}
export { getCompare }
