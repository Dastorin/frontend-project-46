import _ from 'lodash'

const stylish = (value) => {
    const iter = (data, depth) => {
        if (!_.isObject(data)) return `${data}`

        const lines = Object.entries(data).map(([key, value]) => {
            const preparedValue = iter(value, depth + 1)
            const indent = ' '.repeat(depth * 2)
            return `${indent}${key}: ${preparedValue}`
        })

        const outIndent = ' '.repeat(depth * 2 - 2)
        const rawResult = ['{', ...lines, `${outIndent}}`].join('\n')
        return rawResult
    }

    return iter(value, 1)
}
export default stylish
