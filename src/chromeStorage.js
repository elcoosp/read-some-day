const db = {}
const S = chrome.storage.sync

db.set = o =>
  new Promise((resolve, reject) =>
    S.set(o, function() {
      return resolve(o)
    })
  )

db.get = key =>
  new Promise((resolve, reject) =>
    S.get(key, function(o) {
      return resolve(o[key])
    })
  )

db.push = o => {
  const [key, data] = Object.entries(o)[0]
  return new Promise((resolve, reject) =>
    db
      .get(key)
      .then((prevData, newArr = (prevData ? prevData : []).concat(data)) =>
        db.set({ [key]: newArr }).then(resolve)
      )
  )
}

export default db
