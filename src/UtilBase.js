/**
 * base util class
 * @author wayco
 */
class UtilBase {
    specifiedSuffix (link, type = 'js') {
        let nameStr = '[a-zA-Z0-9]{0,50}';
        let typeReg = new RegExp(`${nameStr}\\.${type}(\\?${nameStr})?$`)

        return typeReg.test(link)
    }

    getType (variable) {
        return variable instanceof Array ? 'array' : typeof variable
    }

    addSuffix (link, type = 'js') {
        return this.specifiedSuffix(link, type) ? link : `${link}.${type}`
    }
}

module.export = UtilBase
