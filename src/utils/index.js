import { checkModeByElementBackground } from './detectDarkMode'
import useChromeStorageSync from './useChromeStorageSync'
import { genNewData, getObjectByContent, retrieveConventionalPrefix } from './semantic'
import { checkGitlabSite } from './detectPlatform'
import { setExtensionIcon } from './extensions'
import { isGitlabSite } from './gitlab'
import { LOG_TAG } from '../constants'

function withDebug(callable) {
  return function (...args) {
    let result
    const functionName = callable.name || 'anonymous function'

    try {
      result = callable(...args)
      console.debug(`${LOG_TAG}[${functionName}] Success | args:`, args, '| result:', result)
    } catch (error) {
      console.error(`${LOG_TAG}[${functionName}] Error | args:`, args, '| error:', error)
      throw error
    }

    return result
  }
}

export {
  isGitlabSite,
  withDebug,
  checkModeByElementBackground,
  useChromeStorageSync,
  retrieveConventionalPrefix,
  genNewData,
  getObjectByContent,
  checkGitlabSite,
  setExtensionIcon,
}
