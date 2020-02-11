const axios = require('axios')
const WebSocket = require('ws')
const BASE_URL = 'http://localhost:5000'

/**
 * A mapping of zones and the template component they must use
 */
const ZONE_TEMPLATE_MAPPING = {
  guides: './src/templates/Guides.vue'
}

/**
 * We decided to stick to a single version for the docs. Every
 * major release can get it's own website (a copy of it) and
 * every minor release can have inline notes.
 */
const WEBSITE_VERSION = 'master'

/**
 * Returns an array of zones and their respective version. Each
 * zone has a single version only.
 */
export function getZones () {
  const { data } = await axios.get(`${BASE_URL}/zones.json`)
  return data.map(({ name, slug }) => {
    const component = ZONE_TEMPLATE_MAPPING[slug]
    const version = zone.versions.find((version) => version.no === WEBSITE_VERSION)

    if (!component) {
      throw new Error(
        `${slug} doesn't have a component assigned to it. Open "frontend/api.js" to assign a component`,
      )
    }

    if (!version) {
      throw new Error(`${slug} must have a ${WEBSITE_VERSION} in order to be compiled.`)
    }

    return {
      name: name,
      slug: slug,
      component,
      version,
    }
  })
}

/**
 * Returns a tree of categories and optionally their docs with complete
 * content.
 */
export function getZoneCategories (zoneSlug, versionNo, includeContent) {
  if (!zoneSlug || !versionNo) {
    throw new Error(
      `Cannot fetch categories. zoneSlug and versionNo are required.`
    )
  }

  const params = {}
  if (includeContent) {
    params.load_content = true
  }

  const { data } = await axios(`${BASE_URL}/${zoneSlug}/versions/${versionNo}.json`, { params })
  return data
}

/**
 * Returns the content for a doc
 */
export function getDoc (zoneSlug, versionNo, permalink) {
  if (!zoneSlug || !versionNo || !permalink) {
    throw new Error(
      `Cannot fetch doc. "zoneSlug", "versionNo" and "permalink" are required.`
    )
  }

  const { data } = await axios(`${BASE_URL}/${zoneSlug}/versions/${versionNo}/${permalink}.json`)
  return data
}