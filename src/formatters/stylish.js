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

const stylish = (tree) => {
    const iter = (node, depth = 1) => {
        const indent = ' '.repeat(depth * 1)
        const line = node.map((children) => {
            const type = children.type
            switch (type) {
                case 'nested': {
                    return `${indent} ${children.key}: ${iter(children.children)}`
                }
                case 'changed': {
                    return `${indent} - ${children.key}: ${children.value.key1}\n${indent} + ${children.key}: ${children.value.key2}`
                }
                case 'unchanged': {
                    return `${indent} ${children.key}: ${children.value}`
                }
                case 'deleted': {
                    return `${indent} - ${children.key}: ${children.value}`
                }
                case 'added': {
                    return `${indent} + ${children.key}: ${children.value}`
                }
            }
        })
        const bracketIndent = ' '.repeat(0)
        return ['{', ...line, `${bracketIndent}}`].join('\n')
    }
    return iter(tree, 1)
}
export default stylish
