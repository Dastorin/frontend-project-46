import _ from 'lodash'

const getCompare = (data1, data2) => {
    const keys = _.union(_.keys(data1), _.keys(data2))
    const sortedKeys = _.sortBy(keys)
    const result = sortedKeys.map((key) => {
        const value1 = data1[key]
        const value2 = data2[key]
        if (_.isObject(data1[key]) && _.isObject(data2[key])) {
            return {
                key,
                type: 'nested',
                value: getCompare(data1[key], data2[key]),
            }
        }
        if (!data2[key]) {
            return { key, type: 'added', value: value1 }
        }
        if (!data1[key]) {
            return { key, type: 'deleted', value: value2 }
        }
        if (value1 === value2) {
            return { key, type: 'unchanged', value: value1 }
        }
        if (value1 !== value2) {
            return { key, type: 'changed', value: value1, oldValue: value2 }
        }
    })
    return result
}

export default getCompare
