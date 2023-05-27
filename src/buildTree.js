import getFile from './utils/getFile.js'
import parser from './utils/parser.js'
import _ from 'lodash'

const buildTree = (filePath1, filePath2) => {
    const difference = []
    let difString = ''
    const [file1, type1] = getFile(filePath1)
    const [file2, type2] = getFile(filePath2)
    const data1 = parser(file1, type1)
    const data2 = parser(file2, type2)
    const keys = Array.from(
        new Set([...Object.keys(data1), ...Object.keys(data2)].sort())
    )
    for (const key of keys) {
        if (_.has(data1, `${key}`) && _.has(data2, `${key}`)) {
            if (data1[key] === data2[key]) {
                difString = `   ${key}: ${data2[key]}`
                difference.push(difString)
            }
            if (data1[key] !== data2[key]) {
                difString = ` - ${key}: ${data1[key]}\n + ${key}: ${data2[key]}`
                difference.push(difString)
            }
        }
        if (_.has(data1, `${key}`) && !_.has(data2, `${key}`)) {
            difString = ` - ${key}: ${data1[key]}`
            difference.push(difString)
        }
        if (!_.has(data1, `${key}`) && _.has(data2, `${key}`)) {
            difString = ` + ${key}: ${data2[key]}`
            difference.push(difString)
        }
    }
    const resultString = ['{\n', difference.join('\n'), '\n}'].join('')
    return resultString
}
export default buildTree
