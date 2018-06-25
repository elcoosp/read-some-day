import db from './chromeStorage.js'
chrome.storage.sync.clear()

const pickProps = (...props) => o =>
  props.reduce((acc, p) => ((acc[p] = o[p]), acc), {})

const pipe = (...fns) => init => fns.reduce((acc, f) => f(acc), init)

chrome.browserAction.onClicked.addListener(
  pipe(
    pickProps('url', 'title', 'favIconUrl'),
    data =>
      db
        .push({ readings: data })
        .then(() => db.get('readings').then(console.log))
  )
)
