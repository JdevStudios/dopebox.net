'use strict'
const app = require('electron').app
const Menu = require('electron').Menu
const shell = require('electron').shell

module.exports = function createMainMenu () {
  const template = [
    {
      label: 'DopeBox Stream',
      submenu: [
        {
          label: 'Services',
          role: 'services',
          submenu: []
        },
        {
          type: 'separator'
        },
        {
          label: 'Hide Stream',
          accelerator: 'Cmd+H',
          role: 'hide'
        },
        {
          label: 'Hide Others',
          accelerator: 'Alt+Cmd+H',
          role: 'hideothers'
        },
        {
          label: 'Show All',
          role: 'unhide'
        },
        {
          type: 'separator'
        },
        {
          label: 'Quit',
          accelerator: 'Cmd+Q',
          click: () => {
            app.quit()
          }
        }
      ]
    },
    {
      label: 'Edit',
      submenu: [
        {
          label: 'Undo',
          accelerator: 'CmdOrCtrl+Z',
          role: 'undo'
        },
        {
          label: 'Redo',
          accelerator: 'Shift+CmdOrCtrl+Z',
          role: 'redo'
        },
        {
          type: 'separator'
        },
        {
          label: 'Cut',
          accelerator: 'CmdOrCtrl+X',
          role: 'cut'
        },
        {
          label: 'Copy',
          accelerator: 'CmdOrCtrl+C',
          role: 'copy'
        },
        {
          label: 'Paste',
          accelerator: 'CmdOrCtrl+V',
          role: 'paste'
        },
        {
          label: 'Select All',
          accelerator: 'CmdOrCtrl+A',
          role: 'selectall'
        }
      ]
    },
    {
      label: 'View',
      submenu: [
        {
          label: 'Reload',
          accelerator: 'CmdOrCtrl+R',
          click: (item, win) => {
            if (win) win.reload()
          }
        },
        {
          label: 'Toggle Full Screen',
          accelerator: 'Ctrl+F',
          click: (item, win) => {
            if (win) win.setFullScreen(!win.isFullScreen())
          }
        },
        {
          label: 'Toggle Developer Tools',
          accelerator: 'Alt+Cmd+I',
          click: (item, win) => {
            if (win) win.webContents.toggleDevTools()
          }
        }
      ]
    },
    {
      label: 'Window',
      role: 'window',
      submenu: [
        {
          label: 'Minimize',
          accelerator: 'CmdOrCtrl+M',
          role: 'minimize'
        },
        {
          label: 'Close',
          accelerator: 'CmdOrCtrl+W',
          role: 'close'
        },
        {
          type: 'separator'
        },
        {
          label: 'Home',
          accelerator: 'CmdOrCtrl+1',
          click: (item, win) => {
            win.webContents.send('navigate', 'home')
          },
          type: 'radio',
          checked: true
        },
        {
          label: 'Movies',
          accelerator: 'CmdOrCtrl+2',
          click: (item, win) => {
            win.webContents.send('navigate', 'movie')
          },
          type: 'radio'
        },
        {
          label: 'Tv-Series',
          accelerator: 'CmdOrCtrl+3',
          click: (item, win) => {
            win.webContents.send('navigate', 'tv-show')
          },
          type: 'radio'
        },
        {
          label: 'Top IMDB',
          accelerator: 'CmdOrCtrl+4',
          click: (item, win) => {
            win.webContents.send('navigate', 'top-imbd')
          },
          type: 'radio'
        }
      ]
    },
    {
      label: 'Help',
      role: 'help',
      submenu: [
        {
          label: 'View on GitHub',
          click: () => {
            shell.openExternal('http://github.com/jdevstudios/dopebox.net/')
          }
        }
      ]
    }
  ]

  const menu = Menu.buildFromTemplate(template)
  Menu.setApplicationMenu(menu)
}
