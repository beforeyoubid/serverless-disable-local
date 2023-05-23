import Serverless from 'serverless';
import type Plugin from 'serverless/classes/Plugin';
import { PluginConfig } from './PluginConfig';

export default class ServerlessDisableLocalPlugin {
  serverless: Serverless;
  hooks: Plugin.Hooks;
  logging: Plugin.Logging;

  constructor(serverless: Serverless, cliOptions: Serverless.Options, logging: Plugin.Logging) {
    this.serverless = serverless;
    this.logging = logging;

    this.hooks = {
      // Tap into the initialise lifecyle
      initialize: this.run.bind(this),
    };
  }

  run(): void {
    const { custom, functions } = this.serverless.service;
    const pluginConfig = new PluginConfig(custom, functions, this.logging);
    Object.entries(this.serverless.service.functions).forEach(([key]) => {
      if (!pluginConfig.isActivated(key)) {
        pluginConfig.addToDeactivatedList(key);
        delete this.serverless.service.functions[key];
      }
    });
    pluginConfig.showInfo();
  }
}
