import type Service from 'serverless/classes/Service';
import type { Logging } from 'serverless/classes/Plugin';

import { pluginName } from './consts';
import type { ServerlessFunctions, InternalPluginConfig, FunctionName } from './types';

export class PluginConfig {
  internalConfig: InternalPluginConfig;
  logging: Logging;
  functions: ServerlessFunctions;
  deactivatedFunctions: FunctionName[] = [];
  originalFunctionsCount: number;

  constructor(suppliedPluginConfig: Service.Custom, functions: ServerlessFunctions, logging: Logging) {
    this.logging = logging;
    this.functions = functions;
    this.originalFunctionsCount = Object.keys(functions).length;
    this.internalConfig = this.parseSuppliedConfig(suppliedPluginConfig, functions);
  }

  get config() {
    return this.internalConfig;
  }

  parseSuppliedConfig(suppliedPluginConfig: Service.Custom, functions: ServerlessFunctions = {}): InternalPluginConfig {
    const originalFunctions = Object.keys(functions);
    const foundConfig = suppliedPluginConfig?.[pluginName];
    if (!foundConfig) {
      this.logging.log.warning(`${pluginName} is used in this project but no configurations are supplied.`);
      return { enabled: false, enabledFunctions: originalFunctions };
    }

    const thisPluginConfig = suppliedPluginConfig?.[pluginName] ?? {};

    const enabled = thisPluginConfig?.enabled === 'true' ?? false;
    const activated = thisPluginConfig?.activated ?? [];
    const deactivated = thisPluginConfig?.deactivated ?? [];

    const enabledFunctions = enabled ? this.pick(functions, activated, deactivated) : originalFunctions;
    return {
      enabled,
      enabledFunctions,
    };
  }

  pick(functions: ServerlessFunctions, activated: FunctionName[], deactivated: FunctionName) {
    const allFunctions = Object.keys(functions);
    const activatedFunctions = activated.length ? activated : allFunctions;
    if (deactivated.length) {
      return activatedFunctions.filter(f => !deactivated.includes(f));
    }
    return activatedFunctions;
  }

  isActivated(functionName: FunctionName) {
    if (!this.internalConfig.enabled) {
      return true;
    }
    return this.internalConfig.enabledFunctions.includes(functionName);
  }

  addToDeactivatedList(functionName) {
    this.deactivatedFunctions.push(functionName);
  }

  showInfo() {
    const concatFunctions = this.deactivatedFunctions.join(', ');
    const deactivatedCount = this.deactivatedFunctions.length;
    this.logging.writeText(`${pluginName}: found ${this.originalFunctionsCount} original function(s)`);
    this.logging.writeText(
      `${pluginName}: have deactivated ${deactivatedCount} function(s), (${concatFunctions || 'none'})`
    );
  }
}
