const db = {}
const S = chrome.storage.sync

db.set = o =>
  new Promise((resolve, reject) =>
    S.set(o, function() {
      return resolve(o)
    })
  )

db.get = x =>
  new Promise((resolve, reject) =>
    S.get(x, function(val) {
      return resolve(val)
    })
  )

db.push = o => {
  const [key, data] = Object.entries(o)[0]
  return new Promise((resolve, reject) =>
    db
      .get(key)
      .then(
        (
          pieceOfStore,
          newArr = pieceOfStore[key] ? pieceOfStore[key].concat(data) : [data]
        ) => db.set({ [key]: newArr }).then(resolve)
      )
  )
}

export default db
