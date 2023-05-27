/* eslint-disable no-undef */
import resultFlat from '../_fixtures_/flat/resultFlatFile.js'
import genDiff from '../src/genDiff.js'

const jsonFiles = {
    filePath1: '_fixtures_/flat/flatFile1.json',
    filePath2: '_fixtures_/flat/flatFile2.json',
}
const yamlFiles = {
    filePath1: '_fixtures_/flat/flatYaml1.yaml',
    filePath2: '_fixtures_/flat/flatYaml2.yaml',
}
test('genDiff should return difference betweet two files depends on extension', () => {
    expect(genDiff(jsonFiles.filePath1, jsonFiles.filePath2)).toEqual(
        resultFlat
    )
    expect(genDiff(yamlFiles.filePath1, yamlFiles.filePath2)).toEqual(
        resultFlat
    )
})
