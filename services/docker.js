const Docker = require('dockerode');
const { name } = require('../package.json');
const os = require('os');

class DockerClient {
  constructor() {
    this.dockerClient = new Docker();
  }

  createApp(app) {
    const port = `${app.port}/tcp`;
    const containerVolumeMountPoint = '/home/coder/project';
    
    return this.dockerClient.createContainer({
      Image: app.image,
      Volumes: {
        [containerVolumeMountPoint]: {}
      },
      HostConfig: {
        PortBindings: { [port]: [{ "HostPort": "8080" }] },
        Binds: [`${os.homedir()}:${containerVolumeMountPoint}:rw`]
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
