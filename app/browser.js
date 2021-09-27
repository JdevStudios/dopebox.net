'use strict'
const ipc = require('electron').ipcRenderer

function isDope () {
  return window.location.hostname === 'dopebox.net'
}

function injectCss (rule) {
  document.styleSheets[0].insertRule(rule, 0)
}

function handleDOMLoaded () {
  if (!isDope()) return

  if (process.platform === 'darwin') {
    injectCss(`
      #ognwrapper {
        -webkit-app-region: drag;
      }
    `)

    injectCss(`
      #ognwrapper form,
      #ognwrapper [role="menu"],
      #ognwrapper [role="button"] {
        -webkit-app-region: no-drag;
      }
    `)

    injectCss(`
      #ognwrapper > :first-child > :nth-child(2) {
        padding-left: 75px;
      }
    `)
  }

  injectCss(`
    ::-webkit-scrollbar {
      display: none !important;
    }
  `)
}

function handleClick (event) {
  const node = event.target

  if (node.nodeName === 'A' && node.target === '_blank') {
    event.preventDefault()
    ipc.send('clicklink', node.href)
  }
}

function handleNavigate (event, hash) {
  window.location.hash = hash
}

window.addEventListener('DOMContentLoaded', handleDOMLoaded, false)
window.addEventListener('click', handleClick, false)
ipc.on('navigate', handleNavigate)
