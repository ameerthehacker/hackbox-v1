import vscode from './icons/vscode.png'

const APPS = [
  {
    name: 'Visual Studio Code',
    image: 'codercom/code-server:v2',
    icon: vscode,
    ports: [{
      name: 'Code server port',
      description: 'Port on which vscode is served',
      port: '8080',
    }],
    volumes: [{
      name: 'Project Path',
      path: '/home/coder/project',
      description: 'Path to the project you want to work in vscode'
    }],
    cmd: ['--auth', 'none']
  }
];

export default APPS;
