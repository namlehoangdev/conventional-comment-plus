import { isGitlabSite, setExtensionIcon, withDebug } from '../utils'
import { LOG_TAG } from 'constants'

const SupportedSiteVerifiers = [isGitlabSite]

function isSupportedGitSite(url) {
  for (const verifier of SupportedSiteVerifiers) {
    const verifierWithDebug = withDebug(verifier)
    if (verifierWithDebug(url)) {
      return true
    }
  }
  return false
}

chrome.tabs.onActivated.addListener(async (activeInfo) => {
  console.debug(`${LOG_TAG} chrome.tabs.onActivated.addListener`, activeInfo)
  const tab = await chrome.tabs.get(activeInfo?.tabId)
  console.debug(`${LOG_TAG} chrome.tabs.get(activeInfo?.tabId)`, tab)
  const isGitLab = isSupportedGitSite(tab?.url)
  await setExtensionIcon(isGitLab, chrome, activeInfo?.tabId)
})
