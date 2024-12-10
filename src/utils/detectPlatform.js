function getOgSiteName() {
  const metaTag = document.querySelector('meta[property="og:site_name"]')
  if (!metaTag) {
    console.warn('Meta tag with property="og:site_name" not found.')
    return null
  }
  return metaTag.getAttribute('content')
}

function checkGitlabSite() {
  const ogSiteName = getOgSiteName()
  return !!(ogSiteName && ogSiteName.toLowerCase() === 'gitlab')
}

export { checkGitlabSite }
