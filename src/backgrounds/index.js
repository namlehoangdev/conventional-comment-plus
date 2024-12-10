import { setExtensionIcon } from '../utils'
import { LOG_TAG } from 'constants'

function isGitLabSite(url) {
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
    console.error('Invalid URL:', url, error)
    return false
  }
}

chrome.tabs.onActivated.addListener(async (activeInfo) => {
  console.debug(`${LOG_TAG} chrome.tabs.onActivated.addListener`, activeInfo)
  chrome.tabs.get(activeInfo.tabId, async (tab) => {
    const isGitLab = isGitLabSite(tab.url)
    await setExtensionIcon(isGitLab, chrome, activeInfo.tabId)
  })
})

// Listen for tab updates (e.g., navigation)
chrome.tabs.onUpdated.addListener(async (tabId, changeInfo, tab) => {
  console.debug(`${LOG_TAG} chrome.tabs.onUpdated.addListener`, tab)
  if (changeInfo.status === 'complete') {
    const isGitLab = isGitLabSite(tab.url)
    await setExtensionIcon(isGitLab, chrome, tabId)
  }
})

// Initial setup for the current active tab
chrome.tabs.query({ active: true, currentWindow: true }, async (tabs) => {
  console.debug(`${LOG_TAG} chrome.tabs.query`, tabs)
  if (tabs.length > 0) {
    const isGitLab = isGitLabSite(tabs[0].url)
    await setExtensionIcon(isGitLab, chrome, tabs[0].id)
  }
})
