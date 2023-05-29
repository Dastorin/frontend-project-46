import _ from 'lodash'

const stylish = (tree) => {
    const iter = (node, depth = 1) => {
        const indent = ' '.repeat(depth * 2)
        const line = node.map((key) => {
            const { type } = node[key]
            switch (type) {
                case 'nested': {
                    return `${indent} ${key}: ${iter(node, (depth += 1))}`
                }
                case 'changed': {
                    return `${indent} - ${key}: ${node.value1}\n${indent} + ${key}: ${node.value2}`
                }
                case 'unchanged': {
                    return `${indent} ${key}: ${node.value}`
                }
                case 'deleted': {
                    return `${indent} - ${key}: ${node.value}`
                }
                case 'added': {
                    return `${indent} + ${key}: ${node.value}`
                }
            }
        })
        const bracketIndent = ' '.repeat(depth * 2 - 2)
        return ['{', ...line, `${bracketIndent}}`].join('\n')
    }
    return iter(tree, 1)
}
export default stylish
