import _ from 'lodash'

const getPerfix = (node, spaceCount = 2) => {
    const symbol = {
        nested: ['  '],
        unchanged: ['  '],
        added: ['+'],
        deleted: ['-'],
        changed: ['-', '+'],
    }
    return symbol[node.type].map(
        (el) => `${' '.repeat(spaceCount).substring(2)}${el}`
    )
}
const getString = (value, spaceCount, replacer = '    ') => {
    const iter = (currentValue, depth) => {
        if (!_.isObject(currentValue)) {
            return `${currentValue}`
        }
        const indentSize = depth * spaceCount + 1
        const currentIndent = replacer.repeat(indentSize)
        const bracketIndent = replacer.repeat(spaceCount + depth - 1)
        const lines = Object.entries(currentValue).map(
            ([key, val]) => `${currentIndent}${key}: ${iter(val, depth + 1)}`
        )
        return ['{', ...lines, `${bracketIndent}}`].join('\n')
    }

    return iter(value, 1)
}

const stylish = (data) => {
    console.log(data)
    const iter = (obj, depth = 1) => {
        const space = '  '.repeat(depth - 1)
        const result = obj.map((node) => {
            switch (node.type) {
                case 'added':
                    return `${getPerfix(node, depth)}${node.key}: ${getString(
                        node.value,
                        depth
                    )}`
                case 'deleted':
                    return `${getPerfix(node, depth)}${node.key}: ${getString(
                        node.value,
                        depth
                    )}`
                case 'unchanged':
                    return `${getPerfix(node, depth)}${node.key}: ${getString(
                        node.value,
                        depth
                    )}`
                case 'changed':
                    return `${getPerfix(node, depth)[0]}${
                        node.key
                    }: ${getString(node.value)}\n${getPerfix(node, depth)[1]}${
                        node.key
                    }: ${getString(node.oldValue)}`
                case 'nested':
                    return `${getPerfix(node, depth)}${iter(
                        node.children,
                        depth + 1
                    )}`
            }
        })
        return ['{', ...result, `${space}}`].join('\n')
    }
    return iter(...data, 1)
}

export default stylish
