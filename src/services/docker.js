import Docker from 'dockerode';

class DockerClient {
  constructor() {
    this.dockerClient = new Docker();
  }

  createApp(app) {
    this.dockerClient.createContainer({
      image: app.image,
      hostConfig: {
        portBindings: { "8080/tcp": [{ "HostPort": "8080" }] }
      }
    });
  }
}

export default new DockerClient();
