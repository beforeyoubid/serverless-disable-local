import { cloneDeep } from 'lodash';
import { pluginName } from '../consts';
import {
  fullConfig,
  functions,
  enableOneFunction,
  enableMultipleFunctions,
  disabledOption,
  deactivateOne,
  deactivateMultipleFunctions,
} from '../__seeds__/index.seed';
import { PluginConfig } from '../PluginConfig';
import { Logging } from 'serverless/classes/Plugin';

const logfn = () => {
  // empty
};
const logging = {
  log: {
    warning: logfn,
    info: logfn,
  },
} as Logging;

describe('PluginConfig', () => {
  describe('Enabled', () => {
    describe('Supplied `activated` functions', () => {
      it('can maintain appropriate functions when `activated` is supplied', () => {
        const count = enableOneFunction.activated.length;
        const mockConfig = {
          ...cloneDeep(fullConfig),
          [pluginName]: enableOneFunction,
        };
        const pluginConfig = new PluginConfig(mockConfig, functions, logging);
        const { enabled, enabledFunctions } = pluginConfig.config;
        expect(enabled).toBeTruthy();
        expect(enabledFunctions.length).toBe(count);
      });

      it('can return if we activate multiple fuctions', () => {
        const count = enableMultipleFunctions.activated.length;
        const mockConfig = {
          ...cloneDeep(fullConfig),
          [pluginName]: enableMultipleFunctions,
        };
        const pluginConfig = new PluginConfig(mockConfig, functions, logging);
        const { enabled, enabledFunctions } = pluginConfig.config;
        expect(enabled).toBeTruthy();
        expect(enabledFunctions.length).toBe(count);
      });
    });

    describe('Supplied `deactivated` functions', () => {
      it('can maintain appropriate functions when `deactivated` is supplied', () => {
        const count = Object.keys(functions).length - deactivateOne.deactivated.length;
        const mockConfig = {
          ...cloneDeep(fullConfig),
          [pluginName]: deactivateOne,
        };
        const pluginConfig = new PluginConfig(mockConfig, functions, logging);
        const { enabled, enabledFunctions } = pluginConfig.config;

        expect(enabled).toBeTruthy();
        expect(enabledFunctions.length).toBe(count);
      });

      it('can return if we activate multiple fuctions', () => {
        const count = Object.keys(functions).length - deactivateMultipleFunctions.deactivated.length;
        const mockConfig = {
          ...cloneDeep(fullConfig),
          [pluginName]: deactivateMultipleFunctions,
        };
        const pluginConfig = new PluginConfig(mockConfig, functions, logging);
        const { enabled, enabledFunctions } = pluginConfig.config;
        expect(enabled).toBeTruthy();
        expect(enabledFunctions.length).toBe(count);
      });
    });
  });

  describe('Disabled Plugins', () => {
    it('can handle when it is set to inactive', () => {
      const count = Object.keys(functions).length;
      const mockConfig = {
        ...cloneDeep(fullConfig),
        [pluginName]: disabledOption,
      };

      const pluginConfig = new PluginConfig(mockConfig, functions, logging);
      const { enabled, enabledFunctions } = pluginConfig.config;
      expect(enabled).toBeFalsy();
      expect(enabledFunctions.length).toBe(count);
    });

    it('can handle when no configuration supplied', () => {
      const count = Object.keys(functions).length;
      const mockConfig = {
        ...cloneDeep(fullConfig),
      };
      delete mockConfig?.[pluginName];

      jest.spyOn(logging.log, 'warning');

      const pluginConfig = new PluginConfig(mockConfig, functions, logging);

      const { enabled, enabledFunctions } = pluginConfig.config;
      expect(enabled).toBeFalsy();
      expect(enabledFunctions.length).toBe(count);
      expect(logging.log.warning).toBeCalled();
    });
  });
});
