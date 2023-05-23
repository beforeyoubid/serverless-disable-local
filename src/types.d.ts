import { type FunctionDefinition, type FunctionDefinitionImage } from 'serverless';

export type ServerlessFunctions = { [key: string]: FunctionDefinition | FunctionDefinitionImage };

export type FunctionName = string;

export type InternalPluginConfig = {
  enabled: boolean;
  enabledFunctions: FunctionName[];
};

export type ServerlessPluginConfig = {
  enabled: boolean;
  activated?: FunctionName[];
  deactivated?: FunctionName[];
};
