/// <reference path="../typings/electron.d.ts" />
/// <reference path="../typings/node.d.ts" />

import app = require('app');
import ipc = require('ipc');
import BrowserWindow = require('browser-window');
import crashReporter = require('crash-reporter');
import dialog = require('dialog');
import path = require("path");

let settings = {
  width: 800,
  height: 600
};

function findRoot() {
  return __dirname;
}

let root = findRoot();

class Main {
  mainWindow: BrowserWindow;

  constructor() {
    app.on('ready', this.init.bind(this));
  }

  private init() {
    crashReporter.start({
      productName: 'Splitterino',
      companyName: 'Splitterino',
    });

    app.on('window-all-closed', function () {
      if (process.platform != 'darwin')
        app.quit();
    });

    app.on('activate', function () {
      // On OS X it's common to re-create a window in the app when the
      // dock icon is clicked and there are no other windows open.
      if (this.mainWindow === null) {
        this.createWindow();
      }
    }.bind(this));

    this.createWindow();
  }

  private createWindow() {
    this.mainWindow = new BrowserWindow({
      width: settings.width,
      height: settings.height
    });

    this.mainWindow.loadURL('file://' + root + '/index.html');
  }
}

var main: Main = new Main();
