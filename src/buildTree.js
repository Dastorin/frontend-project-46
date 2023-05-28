import _ from 'lodash'
import stylish from './formatters/stylish.js'

const buildTree = (data1, data2) => {
    const spaceCount = 2
    const keys = _.union(Object.keys(data1), Object.keys(data2)).sort()
    const iter = (value, depth = 1) => {
        const difference = value.map((key) => {
            const indent = ' '.repeat(depth * spaceCount)
            if (_.isObject(data1[key]) && _.isObject(data2[key])) {
                return `${indent} ${key}: ${buildTree(data1[key], data2[key])}`
            }
            let str = ''
            if (data1[key] !== data2[key]) {
                if (_.has(data1, key)) {
                    if (_.isObject(data1[key])) {
                        str += `${indent}+ ${key}: ${stylish(data1[key])}`
                    }
                    if (!_.isObject(data1[key])) {
                        str += `${indent}+ ${key}: ${data1[key]}`
                    }
                }
                if (_.has(data2, key)) {
                    if (str.length > 0) str += '\n'
                    if (_.isObject(data2[key])) {
                        str += `${indent}+ ${key}: ${stylish(data2[key])}`
                    }
                    if (!_.isObject(data2[key])) {
                        str += `${indent}+ ${key}: ${data2[key]}`
                    }
                }
            }
            if (data1[key] === data2[key]) {
                str += `${indent}  ${key}: ${data1[key]}`
            }
            return str
        })
        const outIndent = ' '.repeat(depth * spaceCount - spaceCount)
        const rawResult = ['{', ...difference, `${outIndent}`].join('\n')
        return rawResult
    }
    return iter(keys)
}

export default buildTree
