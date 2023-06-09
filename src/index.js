import { getCompare } from './getCompare.js'
import parsers from './parsers.js'
import getFile from './utils/getFile.js'

const genDiff = (filePath1, filePath2) => {
    const data1 = parsers(...getFile(filePath1))
    const data2 = parsers(...getFile(filePath2))
    const difference = getCompare(data1, data2)
    return difference
}
export default genDiff
// const difference = JSON.stringify(getCompare(data1, data2), null, 4)
