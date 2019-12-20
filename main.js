const { app, BrowserWindow } = require('electron');

let win;

function createWindow() {
  win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true
    }
  });

  if (process.env.NODE_ENV === 'development') {
    const fetch = require('node-fetch');
    const clientServerPort = process.env.CLIENT_PORT || 3000;
    const clientServerUrl = `http://localhost:${clientServerPort}`;

    win.loadFile('public/loading.html');

    const interval = setInterval(async () => {
      try {
        const response = await fetch(clientServerUrl);

        if(response.status == 200) {
          win.loadURL(clientServerUrl);
          clearInterval(interval);
        }
      }
      catch(e) {
        console.log(
          `error while checking the status of client dev server: ${e}`
        );
      }
    }, 3000);

    if (process.env.DEBUG) {
      win.webContents.openDevTools();
    }
  } else {
    win.loadFile('index.html');
  }

  win.on('closed', () => {
    win = null;
  });
}

app.on('ready', createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (win === null) {
    createWindow();
  }
});
