const Docker = require('dockerode');
const { name } = require('../package.json');

class DockerClient {
  constructor() {
    this.dockerClient = new Docker();
  }

  createApp(app) {
    const port = `${app.port}/tcp`;
    
    return this.dockerClient.createContainer({
      Image: app.image,
      HostConfig: {
        PortBindings: { [port]: [{ "HostPort": "8080" }] }
      },
      Labels: {
        createdBy: name,
        name: app.name
      },
      Cmd: ['--auth', 'none'] 
    });
  }

  startApp(container) {
    return container.start();
  }
}

module.exports = new DockerClient();
