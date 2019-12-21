const Docker = require('dockerode');
const { name } = require('../package.json');
const os = require('os');
const tcpPortUsed = require('tcp-port-used');
const opn = require('opn');
const fetch = require('node-fetch');

class DockerClient {
  constructor() {
    this.dockerClient = new Docker();
  }

  async getNextAvailablePort() {
    const portRange = {
      from: 49152,
      to: 65535
    };

    for(let port = portRange.from; port <= portRange.to; port++) {
      const isUsed = await tcpPortUsed.check(port, '127.0.0.1');

      if(!isUsed) {
        return port;
      }
    }

    return -1;
  }

  openPortsInBrowser(container, ports) {
    const portBindings = container.HostConfig.PortBindings;

    // portBinding -> { '8080/tcp': [{ HostPort: '4459' }] }
    Object.keys(portBindings).forEach((containerPortConfig) => {
      // containerPortConfig -> '8080/tcp'
      // containerPort -> '8080'
      const containerPort = containerPortConfig.split('/')[0];
      // hostPort -> 4459
      const hostPort = portBindings[containerPortConfig][0].HostPort;
      const portConfig = ports.find(port => port.port === containerPort);
      
      if(portConfig && portConfig.openInBrowser) {
        const interval = portConfig.health.interval;
        const hostPath = `http://localhost:${hostPort}`
        const healthPath = `${hostPath}${portConfig.health.path}`;
        let retries = 1, maxRetires = 5;

        const tryOpeningInBrowser = async (healthPath) => {
          if(retries > maxRetires) {
            return;
          }
          else {
            retries++;

            try {
              const response = await fetch(healthPath);
  
              if(response.status === 200) {
                opn(hostPath);
  
                return true;
              }
            }
            catch {}
  
            setTimeout(async () => await tryOpeningInBrowser(healthPath), interval);
          }
        }
        
        // try opening in browser until it passes the healthcheck
        setTimeout(async () => {
          await tryOpeningInBrowser(healthPath);
        }, interval);
      }
    });
  }

  async createApp(app) {
    const portBindings  = {};
    const volumeBindings = [];
    const volumeMounts = {};   
    const openInBrowserPorts = [];

    const availablePortsPromises = app.ports.map(() => this.getNextAvailablePort());
    const availablePorts = await Promise.all(availablePortsPromises);

    app.ports.forEach((port, index) => {
      if(availablePorts[index] === -1) {
        throw new Error('Error: No ports are available');
      }

      portBindings[`${port.port}/tcp`] = [{
        HostPort: `${availablePorts[index]}`
      }]

      if(port.openInBrowser) {
        openInBrowserPorts.push(availablePorts[index]);
      }
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

  deleteApp(containerId) {
    const container = this.dockerClient.getContainer(containerId);

    return container.remove();
  }

  stopApp(containerId) {
    const container = this.getContainer(containerId);

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
