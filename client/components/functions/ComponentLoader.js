export default function componentLoader(lazyComponent, attemptsLeft = 3) {
  return new Promise((resolve,reject) => {
    lazyComponent()
    .then(resolve)
    .catch(err => {
      setTimeout(() => {
        if (attemptsLeft === 1) {
          reject(err);
          return
        }
        componentLoader(lazyComponent, attemptsLeft - 1).then(resolve,reject);
      }, 500)
    })
  })
}