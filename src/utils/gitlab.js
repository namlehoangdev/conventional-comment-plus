import { LOG_TAG } from '../constants'

function isGitlabSite(url) {
  try {
    const parsedUrl = new URL(url)
    const hostname = parsedUrl.hostname

    // Regular expression to match '*.gitlab.*' or 'gitlab.*'
    const gitLabPattern = /(^|\.)gitlab\.[^.]+(\.[^.]+)?$/

    // Check if the hostname matches the pattern
    const result = gitLabPattern.test(hostname)
    console.debug(`${LOG_TAG} isGitLabSite - hostname`, hostname)
    return result
  } catch (error) {
    console.debug('Invalid URL:', url, error)
    return false
  }
}

export { isGitlabSite }
