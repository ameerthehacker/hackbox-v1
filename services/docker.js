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
      Cmd: app.cmd
    });
  }

  startApp(containerId) {
    const container = this.dockerClient.getContainer(containerId);

    return container.start();
  }

  stopApp(containerId) {
    const container = this.dockerClient.getContainer(containerId);

    return container.stop();
  }

  getContainer(containerId) {
    return this.dockerClient.getContainer(containerId);
  }

  listApps() {
    return this.dockerClient.listContainers({
      all: true,
      filters: {
        label: [`createdBy=${name}`]
      }
    });
  }
}

module.exports = new DockerClient();
