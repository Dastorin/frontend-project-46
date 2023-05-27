import yaml from 'js-yaml'

const parsers = (file, type) => {
    if (type === 'yaml' || type === 'yml') {
        const data = yaml.load(file)
        return data
    }
    if (type === 'json') {
        const data = JSON.parse(file)
        return data
    }
    return 'wrong file extension'
}
export default parsers
