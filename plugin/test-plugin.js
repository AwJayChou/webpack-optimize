// plugin 是一个类
// 使用 LogWebpackPlugin(option)
// 核心方法  apply(compiler)


module.exports =  class LogWebpackPlugin{
    constructor(options) {
        this.logName = options.logName
    }

    apply(compiler) {
        compiler.hooks.emit.tapAsync('LogWebpackPlugin', 
            (application, cb) => {
                application.assets[this.logName + '.txt'] = {
                    source: function(info) {
                        console.log(' info ', info)
                        return 'LogWebpackPlugin log'
                    },
                    size: function() {
                        return 20
                    }
                }
                cb()
            }
            
        )
    }
}