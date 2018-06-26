import db from './chromeStorage.js'
// Debugging purpose
chrome.storage.sync.clear()

const pickProps = (...props) => o =>
  props.reduce((acc, p) => ((acc[p] = o[p]), acc), {})

const pipe = (...fns) => init => fns.reduce((acc, f) => f(acc), init)

const grabMetaAndPushToDB = data =>
  chrome.tabs.executeScript({ file: 'contentScript.js' }, ([description]) =>
    db
      .push('readings')({ ...data, ...description })
      .then(console.log)
  )
chrome.browserAction.onClicked.addListener(
  pipe(
    pickProps('url', 'title', 'favIconUrl'),
    grabMetaAndPushToDB
  )
)
