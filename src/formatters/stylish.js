import _ from 'lodash'

const stringify = (value, replacer = ' ', spaceCount = 1) => {
    const iter = (data, depth = 1) => {
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

    return iter(value)
}
export { stringify }

const stylish = (tree, replacer = ' ', spaceCount = 1) => {
    const iter = (node, depth = 1) => {
        const indent = replacer.repeat(depth * spaceCount)
        const line = node.map((children) => {
            const type = children.type
            switch (type) {
                case 'nested': {
                    return `${indent}  ${children.key}: ${iter(
                        children.children,
                        (depth + 1)
                    )}`
                }
                case 'changed': {
                    return `${indent}- ${children.key}: ${stringify(
                        children.value.key1, ' ', depth * spaceCount
                    )}\n${indent}+ ${children.key}: ${stringify(
                        children.value.key2, ' ', depth * spaceCount
                    )}`
                }
                case 'unchanged': {
                    return `${indent}  ${children.key}: ${stringify(
                        children.value, ' ', depth * spaceCount
                    )}`
                }
                case 'deleted': {
                    return `${indent}- ${children.key}: ${stringify(
                        children.value, ' ', depth * spaceCount
                    )}`
                }
                case 'added': {
                    return `${indent}+ ${children.key}: ${stringify(
                        children.value, ' ', depth * spaceCount
                    )}`
                }
            }
        })
        const outIndent = replacer.repeat(depth * spaceCount - spaceCount)
        return ['{', ...line, `${outIndent}}`].join('\n')
    }
    return iter(tree)
}
export default stylish
