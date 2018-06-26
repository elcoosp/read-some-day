const db = {},
  S = chrome.storage.sync

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

db.push = key => data =>
  new Promise((resolve, reject) =>
    db
      .get(key)
      .then((prevData, newArr = (prevData ? prevData : []).concat(data)) =>
        db.set({ [key]: newArr }).then(resolve)
      )
  )

export default db
