/* eslint-disable no-undef */
import result from '../__fixtures__/notFlat/noFlatResult.js'
// import resultFlat from '../__fixtures__/flat/resultFlatFile.js'
import genDiff from '../src/index.js'

// const jsonFiles = {
//     filePath1: '__fixtures__/flat/flatFile1.json',
//     filePath2: '__fixtures__/flat/flatFile2.json',
// }
// const yamlFiles = {
//     filePath1: '__fixtures__/flat/flatYaml1.yaml',
//     filePath2: '__fixtures__/flat/flatYaml2.yaml',
}
const noFlatFiles = {
    filePath1: '__fixtures__/notFlat/noFlatFile1.json',
    filePath2: '__fixtures__/notFlat/noFlatFile2.json',
}
test('genDiff should return difference betweet two files depends on extension', () => {
    // expect(genDiff(jsonFiles.filePath1, jsonFiles.filePath2)).toEqual(
    //     resultFlat
    // )
    // expect(genDiff(yamlFiles.filePath1, yamlFiles.filePath2)).toEqual(
    //     resultFlat
    // )
    expect(
        genDiff(noFlatFiles.filePath1, noFlatFiles.filePath2)
    ).toEqual(result)
})
