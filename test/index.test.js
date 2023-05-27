/* eslint-disable no-undef */
import getFile from '../src/utils/getFile.js'
import buildTree from '../src/buildTree.js'
import resultFlatJson from '../_fixtures_/resultFlatFile.js'
import parser from '../src/utils/parser.js'

const filePath1 = '_fixtures_/flatFile1.json'
const filePath2 = '_fixtures_/flatFile2.json'
const [file1, type1] = getFile(filePath1)

test('buildTree should return difference between flat files', () => {
    expect(buildTree(filePath1, filePath2)).toEqual(resultFlatJson)
})

test('parser should return file following correct extension', () => {
    expect(parser(file1, type1)).toEqual({
        host: 'hexlet.io',
        timeout: 50,
        proxy: '123.234.53.22',
        follow: false,
    })
})
