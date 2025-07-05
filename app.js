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

let deferredPrompt

window.addEventListener('beforeinstallprompt', e => {
  e.preventDefault()
  deferredPrompt = e
  showInstallButton()
})

function showInstallButton() {
  const btn = document.createElement('button')
  btn.textContent = 'Install App'
  btn.style = 'position:fixed;bottom:1em;right:1em;font-size:1.2em'
  document.body.appendChild(btn)

  btn.onclick = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt()
      const { outcome } = await deferredPrompt.userChoice
      if (outcome === 'accepted') console.log('App installed')
      else console.log('User dismissed install')
      btn.remove()
    }
  }
}
