const countEl = document.getElementById('count')

let count = Number(localStorage.getItem('count') || 0)
update()

document.getElementById('inc').onclick = () => {
  count++
  update()
}

document.getElementById('dec').onclick = () => {
  count--
  update()
}

document.getElementById('reset').onclick = () => {
  count = 0
  update()
}

function update() {
  countEl.textContent = count
  localStorage.setItem('count', count)
}

// Register service worker
if ('serviceWorker' in navigator)
  navigator.serviceWorker.register('sw.js')
