/* eslint-disable no-undef */
import getFile from '../src/utils/getFile.js'
import resultFlat from '../_fixtures_/resultFlatFile.js'
import parser from '../src/parser.js'
import genDiff from '../src/genDiff.js'

const jsonFiles = {
    filePath1: '_fixtures_/flatFile1.json',
    filePath2: '_fixtures_/flatFile2.json',
}
const yamlFiles = {
    filePath1: '_fixtures_/flatYaml1.yaml',
    filePath2: '_fixtures_/flatYaml2.yaml',
}
test('genDiff should return difference betweet two files depends on extension', () => {
    expect(genDiff(jsonFiles.filePath1, jsonFiles.filePath2)).toEqual(
        resultFlat
    )
    expect(genDiff(yamlFiles.filePath1, yamlFiles.filePath2)).toEqual(
        resultFlat
    )
})
