'use strict'

const uuidv4 = require("uuid/v4")
const CommonHook = exports = module.exports = {}

/**
 * @param  {} commonInstance
 */
CommonHook.uuid = async (commonInstance) => {
  commonInstance.id = uuidv4()
}
