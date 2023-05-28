import _ from 'lodash'

const buildTree = (data1, data2) => {
    const keys = _.union(Object.keys(data1), Object.keys(data2)).sort()
    const difference = keys
        .map((key) => {
            if (_.isObject(data1[key]) && _.isObject(data2[key])) {
                return `   ${key}: ${buildTree(data1[key], data2[key])}`
            }
            let str = ''
            if (data1[key] !== data2[key]) {
                if (_.has(data1, key)) {
                    str += _.isObject(data1[key])
                        ? ` - ${key}: ${JSON.stringify(data1[key], null, 4)}`
                        : ` - ${key}: ${data1[key]}`
                }
                if (_.has(data2, key)) {
                    if (str.length > 0) str += '\n'
                    str += _.isObject(data2[key])
                        ? ` + ${key}: ${JSON.stringify(data2[key], null, 4)}`
                        : ` + ${key}: ${data2[key]}`
                }
            }
            if (data1[key] === data2[key]) str += `   ${key}: ${data1[key]}`
            return str
        })
        .join('\n')
    return `{\n${difference}\n}`
}

export default buildTree
