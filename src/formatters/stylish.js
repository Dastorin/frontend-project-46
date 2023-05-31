import _ from 'lodash'

const stringify = (value, replacer = ' ', spacesCount = 4) => {
    const iter = (currentValue, depth) => {
        // альтернативный вариант: (typeof currentValue !== 'object' || currentValue === null)
        if (!_.isObject(currentValue)) {
            return `${currentValue}`
        }

        let indentSize = depth * spacesCount
        let currentIndent = replacer
            .repeat(indentSize * spacesCount * 2)
            .slice(0, -2)
        let bracketIndent = replacer
            .repeat((indentSize + 2) * spacesCount )
        const lines = Object.entries(currentValue).map(
            ([key, val]) => `${currentIndent}${key}: ${iter(val, depth + 1)}`
        )
        return [
            '{',
            `${currentIndent}${lines.join('\n')}`,
            `${bracketIndent}}`,
        ].join('\n')
    }

    return iter(value, 1)
}

export { stringify }

const stylish = (tree, replacer = ' ', spaceCount = 4) => {
    const iter = (node, depth = 1) => {
        const getIndent = (depth) =>
            replacer.repeat(depth * spaceCount).slice(0, -2)
        const line = node.map((children) => {
            const type = children.type
            switch (type) {
                case 'nested': {
                    return `${getIndent(depth)}  ${children.key}: ${iter(
                        children.children,
                        depth + 1,
                        8
                    )}`
                }
                case 'changed': {
                    return `${getIndent(depth)}- ${children.key}: ${ stringify(
                        children.value.key1,
                        replacer,
                        depth,
                        8
                    )}\n${getIndent(depth)}+ ${children.key}: ${ stringify(
                        children.value.key2,
                        replacer,
                        depth,
                        8
                    )}`
                }
                case 'unchanged': {
                    return `${getIndent(depth)}  ${children.key}: ${ stringify(
                        children.value,
                        replacer,
                        depth,
                        8
                    )}`
                }
                case 'deleted': {
                    return `${getIndent(depth)}+ ${children.key}: ${ stringify(
                        children.value,
                        replacer,
                        depth,
                        8
                    )}`
                }
                case 'added': {
                    return `${getIndent(depth)}- ${children.key}: ${ stringify(
                        children.value,
                        replacer,
                        depth,
                        8
                    )}`
                }
            }
        })
        const outIndent = replacer
            .repeat(depth * spaceCount - spaceCount)
            .slice(0, -2)
        return ['{', ...line, `${outIndent}}`].join('\n')
    }
    return iter(tree, 1)
}
export default stylish
