import _ from 'lodash'

const buildTree = (data1, data2) => {
    const keys = _.union(Object.keys(data1), Object.keys(data2)).sort()
    const difference = keys.map((key) => {
        if (_.has(data1, key) && _.has(data2, key)) {
            if (_.isObject(data1[key]) && _.isObject(data2[key])) {
                return {
                    key: key,
                    type: 'nested',
                    children: buildTree(data1[key], data2[key]),
                }
            }
            if (data1[key] === data2[key]) {
                return { key: key, type: 'unchanged', value: data1[key] }
            }
            if (data1[key] !== data2[key]) {
                return {
                    key: key,
                    type: 'changed',
                    value: [data1[key], data2[key]],
                }
            }
        }
        if (_.has(data1, key) && !_.has(data2, key)) {
            return { key: key, type: 'added', value: data1[key] }
        }
        if (!_.has(data1, key) && _.has(data2, key)) {
            return { key: key, type: 'deleted', value: data2[key] }
        }
    })
    return difference
}

export default buildTree
