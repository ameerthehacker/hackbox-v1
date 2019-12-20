const Docker = require('dockerode');

class DockerClient {
  constructor() {
    this.dockerClient = new Docker();
  }

  createApp(app) {
    this.dockerClient.run(app.image, ['--auth', 'none'], [], {
      hostConfig: {
        portBindings: { "8080/tcp": [{ "HostPort": "8080" }] }
      }
    });
  }
}

module.exports = new DockerClient();
