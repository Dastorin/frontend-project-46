import _ from 'lodash'

const stylish = (tree) => {
    const iter = (node, depth = 1) => {
        const indent = ' '.repeat(depth * 2)
        const line = node.map((children) => {
            const { type } = children
            switch (type) {
                case 'nested': {
                    return `${indent} ${children}: ${iter(node, (depth += 1))}`
                }
                case 'changed': {
                    return `${indent} - ${children}: ${node.value1}\n${indent} + ${children}: ${node.value2}`
                }
                case 'unchanged': {
                    return `${indent} ${children}: ${node.value}`
                }
                case 'deleted': {
                    return `${indent} - ${children}: ${node.value}`
                }
                case 'added': {
                    return `${indent} + ${children}: ${node.value}`
                }
            }
        })
        const bracketIndent = ' '.repeat(depth * 2 - 2)
        return ['{', ...line, `${bracketIndent}}`].join('\n')
    }
    return iter(tree, 1)
}
export default stylish
