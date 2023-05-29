import _ from 'lodash'

const stylish = (tree) => {
    const iter = (node, depth = 1) => {
        const indent = ' '.repeat(depth * 2)
        const line = node.map((children) => {
            const type = children.type
            switch (type) {
                case 'nested': {
                    return `${indent} ${children.key}: ${iter(children.children, (depth += 1))}`
                }
                case 'changed': {
                    return `${indent} - ${children.key}: ${children.value1}\n${indent} + ${children.key}: ${children.value2}`
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
        const bracketIndent = ' '.repeat(depth * 2 - 2)
        return ['{', ...line, `${bracketIndent}}`].join('\n')
    }
    return iter(tree, 1)
}
export default stylish
