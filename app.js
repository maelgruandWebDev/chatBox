const { app, BrowserWindow } = require('electron');  // Importation correcte
const path = require('path');

let mainWindow;

app.on('ready', () => {
  // Créer la fenêtre principale
  mainWindow = new BrowserWindow({
    width: 1000,
    height: 900,
    webPreferences: {
      contextIsolation: true,
      enableRemoteModule: false,
      preload: path.join(__dirname, 'preload.js')
    }
  });

  // Charger la page HTML
  mainWindow.loadFile('./src/index.html');

  // Ouvrir les outils de développement (facultatif)
  mainWindow.webContents.openDevTools();

  // Gérer la fermeture de la fenêtre
  mainWindow.on('closed', () => {
    mainWindow = null;
  });
});

// Quitter l'application si toutes les fenêtres sont fermées
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow();
  }
});
