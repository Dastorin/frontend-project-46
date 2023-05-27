import buildTree from './buildTree.js'
import parser from './parser.js'
import getFile from './utils/getFile.js'

const genDiff = (filePath1, filePath2) => {
    const data1 = parser(...getFile(filePath1))
    const data2 = parser(...getFile(filePath2))
    const difference = buildTree(data1, data2)
    return difference
}
export default genDiff
