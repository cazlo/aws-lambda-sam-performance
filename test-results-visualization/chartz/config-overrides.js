const {
    override,
    // addDecoratorsLegacy,
    addBabelPlugin,
    babelInclude
} = require("customize-cra")

const path = require("path")

module.exports = (config, ...rest) => {
    /* Simply clones the object */
    const overriddenConfig = Object.assign(config, {})

    /* Remove the last item from the resolve plugins array. This should be ModuleScopePlugin */
    overriddenConfig.resolve.plugins.pop()

    return Object.assign(overriddenConfig, override(
        /* Makes sure Babel compiles the stuff in the common folder */
        babelInclude([
            path.resolve('src'), // don't forget this
            path.resolve(__dirname, '../cloudwatch/etl/result')
        ]),
        // addDecoratorsLegacy(),
        addBabelPlugin(['module-resolver', {
            root: '../cloudwatch/etl/result',
            alias: {
                common: '../cloudwatch/etl/result'
            }
        }])
        )(overriddenConfig, ...rest)
    )
}