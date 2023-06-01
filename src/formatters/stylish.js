/* eslint-disable no-unused-vars */
import _ from 'lodash'

const stylish = (data) => {
    const iter = (node, depth = 1) => {
        const replacer = ' '
        const doubleSpace = '  '
        const spacesCount = 4

        const getIndent = (depth) => replacer.repeat(depth * spacesCount).slice(0, -3)

        const stringify = (value, depth) => {
            if (!_.isPlainObject(value)) {
                return String(value)
            }
            const lines = Object.entries(value).map(
                ([key, val]) => `${getIndent(depth + 1)}  ${key}: ${stringify(val, depth + 1)}`
            )
            return `{\n${lines.join('\n')}\n${getIndent(depth)}${doubleSpace}}`
        }

        const result = node.map((child) => {
            switch (child.type) {
                case 'changed': {
                    return `${getIndent(depth)} - ${child.key}: ${stringify(
                        child.value1,
                        ' ',
                        spacesCount + 2
                    )}\n${getIndent(depth)} + ${child.key}: ${stringify(child.value2)}`
                }
                case 'added': {
                    return `${getIndent(depth)} + ${child.key}: ${stringify(child.value2)}`
                }
                case 'deleted': {
                    return `${getIndent(depth)} - ${child.key}: ${stringify(child.value1)}`
                }
                case 'unchanged': {
                    return `${getIndent(depth)}   ${child.key}: ${stringify(
                        child.value1
                    )}`
                }
                case 'nested': {
                    return `${getIndent(depth)}  ${child.key}: ${iter(child.children, depth + 1)}`
                }
            }
        })
        return ['{', ...result, `${getIndent(depth)}}`].join('\n')
    }
    return iter(data, 1)
}
export default stylish
