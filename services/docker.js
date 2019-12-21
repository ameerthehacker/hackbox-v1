const Docker = require('dockerode');
const { name } = require('../package.json');
const os = require('os');

class DockerClient {
  constructor() {
    this.dockerClient = new Docker();
  }

  createApp(app) {
    const portBindings  = {};
    const volumeBindings = [];
    const volumeMounts = {};

    app.ports.forEach(port => {
      portBindings[`${port.port}/tcp`] = [{
        HostPort: port.port
      }]
    });
    app.volumes.forEach(volume => {
      volumeBindings.push(`${os.homedir()}:${volume.path}:rw`);
      volumeMounts[volume.path] = {};
    });
    
    return this.dockerClient.createContainer({
      Image: app.image,
      Volumes: {
        ...volumeMounts
      },
      HostConfig: {
        PortBindings: { ...portBindings },
        Binds: [...volumeBindings]
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
