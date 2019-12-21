import vscode from './icons/vscode.png'

const APPS = [
  {
    name: 'Visual Studio Code',
    image: 'codercom/code-server:v2',
    icon: vscode,
    port: '8080',
    cmd: ['--auth', 'none']
  }
];

export default APPS;
