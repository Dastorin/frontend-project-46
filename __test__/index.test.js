/* eslint-disable no-undef */
import result from '../__fixtures__/notFlat/noFlatResult.js'
import genDiff from '../src/index.js'
import stylish from '../src/formatters/stylish.js'

const noFlatFiles = {
    filePath1: '__fixtures__/notFlat/noFlatFile1.json',
    filePath2: '__fixtures__/notFlat/noFlatFile2.json',
}
test('genDiff should return difference betweet two files depends on extension', () => {
    expect(stylish(genDiff(noFlatFiles.filePath1, noFlatFiles.filePath2))).toEqual(result)
})
