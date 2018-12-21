'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
	NODE_ENV: '"development"',
	BASE_API: '"http://10.30.50.169:8765/api"',
	UPLOAD_URL: '"http://sy.aerozhonghuan.com/fsm/fsevice/uploadFile?account=www"'
//	BASE_API: '"http://172.16.1.89:8777"' //tianzhi
})