/**
 * @author wayco
 */
const UtilBase = require('./util/UtilBase')

class SeparateHTMLWebpackPlugin extends UtilBase {
    constructor (options) {
        super()
        this.preProcessOptions(options)
    }

    preProcessOptions (options) {
        this.cssList = []
        this.jsList = []
        if (!options) return false
        const optionsType = this.getType(options)
        const sortingOption = optionItem => {
            let type = SeparateHTMLWebpackPlugin.cssLstSorting(this.specifiedSuffix(optionItem, 'css'))

            this[type].push(optionItem)
        }
        const sortingDefaultOption = (option, type = 'js') => {
            let variable = option
            let variableType = this.getType(variable)
            let arr = SeparateHTMLWebpackPlugin.cssLstSorting(type === 'css')

            if (variableType === 'string') {
                this[arr].push(this.addSuffix(variable, type))
            } else if (variableType === 'array') {
                this[arr].push(...variable.map(item => this.addSuffix(item, type)))
            }
        }

        switch (optionsType) {
        case 'string':
            sortingOption(options)
            break
        case 'array':
            options.forEach(item => sortingOption(item))
            break
        default:
            if (options.css) {
                sortingDefaultOption(options.css, 'css')
            }
            if (options.js) {
                sortingDefaultOption(options.js, 'js')
            }
            break
        }
    }

    static cssLstSorting (cssReg) {
        return cssReg ? 'cssList' : 'jsList'
    }

    apply (compiler) {
        compiler.plugin('compilation', compliation => {
            compliation.plugin('html-webapck-plugin-before-html-proessing', (htmlPluginData, callback) => {
                let data = htmlPluginData

                const separateReg = (item, type) => {
                    let arr = this[SeparateHTMLWebpackPlugin.cssLstSorting(type === 'css')]

                    for (let i in arr) {
                        let itemReg = new RegExp(arr[i])

                        if (itemReg.test(item)) return false
                    }

                    return true
                }

                data.assets.js = data.assets.js.filter(item => separateReg(item, 'js'))
                data.assets.css = data.assets.css.filter(item => separateReg(item, 'css'))

                callback(null, data)
            })
        })
    }
}

module.exports = SeparateHTMLWebpackPlugin
