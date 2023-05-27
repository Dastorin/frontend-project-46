import path from 'path'
import fs from 'fs'
const getFile = (filePath) => {
    const absolutePath =
        path.resolve(filePath) === filePath ? filePath : path.resolve(filePath)
    const file = fs.readFileSync(absolutePath, 'utf8')
    const type = path.extname(filePath).slice(1);
    return [file, type];
}
export default getFile