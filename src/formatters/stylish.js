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
export { stringify }

const stylish = (data) => {
    const replacer = ' '
    const doubleSpace = '  '
    const spacesCount = 4
    const iter = (node, depth = 1) => {
        const bracketIndent = replacer.repeat(depth * spacesCount - spacesCount)
        const getIndent = (depth) => replacer.repeat(depth * spacesCount).slice(0, -2)
        const result = node.map((child) => {
            switch (child.type) {
                case 'changed': {
                    return `${getIndent(depth)} - ${child.key}: ${stringify(
                        child.value1
                    )}\n${getIndent(depth)} + ${child.key}: ${stringify(child.value2)}`
                }
                case 'added': {
                    return `${getIndent(depth)} + ${child.key}: ${stringify(child.value2)}`
                }
                case 'deleted': {
                    return `${getIndent(depth)} - ${child.key}: ${stringify(child.value1)}`
                }
                case 'unchanged': {
                    return `${getIndent(depth)} ${doubleSpace}${child.key}: ${stringify(
                        child.value1
                    )}`
                }
                case 'nested': {
                    return `${getIndent(depth)}  ${child.key}: ${iter(child.children, depth + 1)}`
                }
            }
        })
        return ['{', ...result, `${bracketIndent}}`].join('\n')
    }
    return iter(data, 1)
}
export { stylish }
