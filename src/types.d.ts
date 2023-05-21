import { type FunctionDefinition, type FunctionDefinitionImage } from 'serverless';

type ServerlessFunctions = { [key: string]: FunctionDefinition | FunctionDefinitionImage };

type FunctionName = string;

type InternalPluginConfig = {
  enabled: boolean;
  enabledFunctions: FunctionName[];
};

type ServerlessPluginConfig = {
  enabled: boolean;
  activated?: FunctionName[];
  deactivated?: FunctionName[];
};
