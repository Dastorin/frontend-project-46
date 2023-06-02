/* eslint-disable no-unused-vars */
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

const stylish = (data, replacer = ' ', spaceCount = 2) => {
    const iter = (node, depth = 1) => {
        const indent = replacer.repeat(depth * spaceCount)
        const outIndent = replacer.repeat(depth * spaceCount - spaceCount)
        const result = node.map((child) => {
            switch (child.type) {
                case 'changed': {
                    return `${indent} - ${child.key}: ${stringify(child.value1)}\n${indent} + ${child.key}: ${stringify(child.value2)}`
                }
                case 'added': {
                    return `${indent} + ${child.key}: ${stringify(child.value2)}`
                }
                case 'deleted': {
                    return `${indent} - ${child.key}: ${stringify(child.value1)}`
                }
                case 'unchanged': {
                    return `${indent}   ${child.key}: ${stringify(child.value1)}`
                }
                case 'nested': {
                    return `${indent}   ${child.key}: ${iter(child.children, depth + 1)}`
                }
            }
        })
        return ['{', ...result, `${outIndent}}`].join('\n')
    }
    return iter(data, 1)
}
export default stylish
