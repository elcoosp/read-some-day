chrome.storage.sync.clear()
const pickProps = (...props) => o =>
  props.reduce((acc, p) => ((acc[p] = o[p]), acc), {})

const pipe = (...fns) => init => fns.reduce((acc, f) => f(acc), init)

const db = {}
db.set = o =>
  new Promise((resolve, reject) =>
    chrome.storage.sync.set(o, function() {
      return resolve(o)
    })
  )
db.get = x =>
  new Promise((resolve, reject) =>
    chrome.storage.sync.get(x, function(val) {
      return resolve(val)
    })
  )
db.push = o => {
  const [key, data] = Object.entries(o)[0]
  return new Promise((resolve, reject) =>
    db.get(key).then(pieceOfStore => {
      const newData = pieceOfStore[key]
        ? pieceOfStore[key].concat(data)
        : [data]

      chrome.storage.sync.set({ [key]: newData }, function() {
        return resolve(newData)
      })
    })
  )
}

chrome.browserAction.onClicked.addListener(
  pipe(
    pickProps('url', 'title', 'favIconUrl'),
    data =>
      db
        .push({ readings: data })
        .then(() => db.get('readings').then(console.log))
  )
)
