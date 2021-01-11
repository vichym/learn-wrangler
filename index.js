
const WORK_SPACE = TODO_APP

// Add (K,V) to remote work space in Cloudflare server
function setCache(key, data) {
  WORK_SPACE.put(key, data)
}


// Get (K,V) to remote work space in Cloudflare server
function getCache(key) {
  WORK_SPACE.get(key)
}

const defaultData = {
  "links": [
    { "name": "Amazon", "url": "https://amazon.com" },
    { "name": "Instagram", "url": "https://instagram.com" },
    { "name": "Facebook", "url": "https://facebook.com" },
    { "name": "Google", "url": "https://google.com" }
  ]
}


const data = await WORK_SPACE.get(key)

// Get Data from the cloud 
async function getData(request) {
  const cacheKey = `data`
  let data
  // retrieve data from cloud
  const cache = await getCache(cacheKey)
  // when the application first load and no data in cloud to retrieve
  if (!cache) {
    // set data to cloud
    await setCache(cacheKey, JSON.stringify(defaulData))
    data = defaulData
  }
  // when there is data, set data to what ever get pass to cache
  else {
    data = JSON.parse(cache)
  }
  const body = html(JSON.stringify(data) || [])
  return new Response(body, { header: { 'content-type': "text/html" } })
}

addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})
/**
 * Respond with hello worker text
 * @param {Request} request
 */
async function handleRequest(request) {
  return getData(request)
}
