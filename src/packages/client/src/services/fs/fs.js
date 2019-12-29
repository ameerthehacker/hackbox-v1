import { vol } from 'memfs';

class FS {
  constructor() {
    this.changeListeners = [];
  }

  __writeFileAndNotify(path, content) {
    vol.writeFileSync(path, content);

    this.changeListeners.forEach((listener) => listener(path));
  }

  createOrUpdateFileSync(path, content) {
    let fileExists = vol.existsSync(path);

    if (fileExists) {
      let oldContent = vol.readFileSync(path, 'utf-8');

      if (oldContent !== content) {
        this.__writeFileAndNotify(path, content);
      }
    } else {
      this.__writeFileAndNotify(path, content);
    }
  }

  getVol() {
    return vol;
  }

  addChangeListener(func) {
    if (this.changeListeners.indexOf(func) === -1) {
      this.changeListeners.push(func);
    }
  }

  removeChangeListener(func) {
    let indexOfFunc = this.changeListeners.indexOf(func);

    if (indexOfFunc !== -1) {
      this.changeListeners.splice(indexOfFunc, 1);
    }
  }
}

export default new FS();
