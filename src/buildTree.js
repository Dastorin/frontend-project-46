import _ from 'lodash'

const buildTree = (data1, data2) => {
    const difference = []
    const keys = _.uniq([...Object.keys(data1), ...Object.keys(data2)]).sort()
    for (const key of keys) {
        if (_.has(data1, `${key}`) && _.has(data2, `${key}`)) {
            if (data1[key] === data2[key]) {
                const difString = `   ${key}: ${data2[key]}`
                difference.push(difString)
            }
            if (data1[key] !== data2[key]) {
                const difString = ` - ${key}: ${data1[key]}\n + ${key}: ${data2[key]}`
                difference.push(difString)
            }
        }
        if (_.has(data1, `${key}`) && !_.has(data2, `${key}`)) {
            const difString = ` - ${key}: ${data1[key]}`
            difference.push(difString)
        }
        if (!_.has(data1, `${key}`) && _.has(data2, `${key}`)) {
            const difString = ` + ${key}: ${data2[key]}`
            difference.push(difString)
        }
    }
    return ['{\n', difference.join('\n'), '\n}'].join('')
}
export default buildTree
