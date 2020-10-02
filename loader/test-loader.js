

const loaderUtil = require('loader-utils')
module.exports = function(source) {
    console.log('  source  => ', source)
    const options = loaderUtil.getOptions(this);
    console.log(' options ', options)

    this.callback(null, source);
}

//this.callback(
//     err: Error | null,
//     content: string | Buffer,
//     sourceMap?: SourceMap,
//     meta?: any
//    );