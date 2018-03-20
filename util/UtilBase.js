/**
 * base util
 * @author wayco
 */
class UtilBase {
    specifiedSuffix (link, type = 'js') {
        let validStr = '[a-zA-Z0-9]{0,50}'
        let typeReg = new RegExp(`${validStr}\\.${type}(\\?${validStr})?$`)

        return typeReg.test(link)
    }

    getType (variable) {
        return variable instanceof Array ? 'array' : typeof variable
    }

    addSuffix (link, type = 'js') {
        return this.specifiedSuffix(link, type) ? link : `${link}.${type}`
    }
}

module.exports = UtilBase
