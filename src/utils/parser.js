import yaml from 'js-yaml'

const parser = (file, type) => {
    if (type === 'yaml') {
        const data = yaml.load(file)
        return data
    }
    if (type === 'json') {
        const data = JSON.parse(file)
        return data
    }
    return 'wrong file extension'
}
export default parser
