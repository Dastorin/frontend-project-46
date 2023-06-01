import _ from 'lodash'

const stringify = (value, replacer = ' ', spaceCount = 1) => {
    const iter = (data, depth) => {
        if (!_.isObject(data)) return `${data}`

        const lines = Object.entries(data).map(([key, value]) => {
            const preparedValue = iter(value, depth + 1)
            const indent = replacer.repeat(depth * spaceCount)
            return `${indent}${key}: ${preparedValue}`
        })

        const outIndent = replacer.repeat(depth * spaceCount - spaceCount)
        const rawResult = ['{', ...lines, `${outIndent}}`].join('\n')
        return rawResult
    }

    return iter(value, 1)
}
export { stringify }

const stylish = (data) => {
    const iter = (node, depth = 1) => {
        
    }
}
