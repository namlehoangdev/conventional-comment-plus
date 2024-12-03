import { useEffect, useState } from 'react'
import { LOG_TAG } from 'constants'
import { ColorModes } from '../constants'

const useChromeStorageSync = (key) => {
  const [value, setValue] = useState()

  useEffect(() => {
    // Fetch initial value from chrome.storage
    chrome.storage.sync.get(key, (result) => {
      if (result[key] !== undefined) {
        setValue(result[key])
      } else {
        setValue(ColorModes.DEFAULT_LIGHT)
      }
    })

    // Listener for storage changes
    const onStorageChanged = (changes, area) => {
      if (area === 'sync' && changes && changes[key]) {
        const { newValue, oldValue } = changes[key] || {}
        if (newValue !== oldValue) {
          console.debug(
            `${LOG_TAG} useChromeStorageSync.onStorageChanged matched and change: area=${area} newValue=${newValue} oldValue=${oldValue}`,
            changes
          )
          setValue(newValue)
        }
      } else {
        console.debug(`${LOG_TAG} useChromeStorageSync.onStorageChanged not matched: `, area, changes)
      }
    }

    chrome.storage.onChanged.addListener(onStorageChanged)

    // Cleanup listener on unmount
    return () => {
      chrome.storage.onChanged.removeListener(onStorageChanged)
    }
  }, [key])

  // Function to update chrome.storage
  const updateValue = (newValue) => {
    chrome.storage.sync.set({ [key]: newValue }, () => {
      setValue(newValue)
    })
  }

  return [value, updateValue]
}

export default useChromeStorageSync
