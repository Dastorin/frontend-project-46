import _ from 'lodash'

const getCompare = (data1, data2) => {
    const keys1 = _.keys(data1)
    const keys2 = _.keys(data2)
    const keys = _.union(keys1, keys2).sort()
    const result = keys.map((key) => {
        const value1 = data1[key]
        const value2 = data2[key]
        if (_.has(data1, key) && _.has(data2, key)) {
            if (value1 === value2) {
                return { key, type: 'unchanged', value1 }
            }
        }
        if (_.isObject(value1) && _.isObject(value2)) {
            return { key, type: 'nested', children: getCompare(value1, value2) }
        }
        if (!_.has(data1, key)) {
            return { key, type: 'added', value2 }
        }
        if (!_.has(data2, key)) {
            return { key, type: 'deleted', value1 }
        }
        if (value1 !== value2) {
            return { key, type: 'changed', value1, value2 }
        }
    })
    return result
}
export { getCompare }
