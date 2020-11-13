const {
    override,
    fixBabelImports,
    addLessLoader,
    addWebpackAlias,
    addPostcssPlugins
} = require('customize-cra');
const path = require('path');

module.exports = override(
    fixBabelImports('import', {
        libraryName: 'antd',
        libraryDirectory: 'es',
        style: true,
    }),
    addLessLoader({
        lessOptions: {
            modifyVars: { '@primary-color': 'red' },
            javascriptEnabled: true,
        },
    }),
    addWebpackAlias({
        "@": path.resolve(__dirname, "src"),
        "views": path.resolve(__dirname, "src/views"),
        "components": path.resolve(__dirname, "src/components")
    }),
    addPostcssPlugins([
        require('postcss-pxtorem')({ rootValue: 128, propList: ['*'], minPixelValue: 2, selectorBlackList: ['am-'] })
    ]),
);