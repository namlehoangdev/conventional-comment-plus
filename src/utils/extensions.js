const IconSetByStatus = {
  enabled: {
    16: require('../assets/icons/logo-16'),
    128: require('../assets/icons/logo-128'),
  },
  disabled: {
    16: require('../assets/icons/disabledLogo-16.png'),
    128: require('../assets/icons/disabledLogo-128.png'),
  },
}

async function setExtensionIcon(isEnabled, chrome, tabId) {
  const iconSet = IconSetByStatus[isEnabled ? 'enabled' : 'disabled']

  chrome.action.setIcon({ path: iconSet, tabId }, () => {
    if (chrome.runtime.lastError) {
      console.debug('Failed to set icon:', chrome.runtime.lastError)
    } else {
      console.debug('Icon updated successfully!')
    }
  })
}

export { setExtensionIcon }
