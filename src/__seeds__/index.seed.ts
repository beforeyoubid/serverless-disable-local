import Serverless from 'serverless';

import type { ServerlessFunctions } from '../types';
import type Service from 'serverless/classes/Service';

const getMockFunction = (handler: string): Serverless.FunctionDefinitionHandler => ({
  handler,
  events: [],
});

export const functions: ServerlessFunctions = {
  graphql: getMockFunction('graphql'),
  cron30Minutes: getMockFunction('cron30Minutes'),
  cronHourly: getMockFunction('cronHourly'),
  backgroundTaskA: getMockFunction('backgroundTaskA'),
  backgroundTaskB: getMockFunction('backgroundTaskB'),
  backgroundTaskC: getMockFunction('backgroundTaskC'),
};

export const disabledOption = { enabled: 'false', activated: ['graphql'] };
export const enableOneFunction = { enabled: 'true', activated: ['graphql'] };
export const enableMultipleFunctions = { enabled: 'true', activated: ['graphql', 'backgroundTaskC'] };
export const deactivateOne = { enabled: 'true', deactivated: ['cronHourly'] };
export const deactivateMultipleFunctions = { enabled: 'true', deactivated: ['cronHourly', 'backgroundTaskA'] };

export const fullConfig: Service.Custom = {
  stage: 'local',
  defaultConfigType: 'cloud',
  // Start: plugin's custom settings
  'serverless-offline': {
    noPrependStageInUrl: true,
    localEnvironment: true,
  },
  'serverless-disable-local': enableOneFunction,
  // End: plugin's custom settings
  local: {
    sample: 'tbc',
  },
  dev: {
    sample: 'tbc',
  },
  qa: {
    sample: 'tbc',
  },
  uat: {
    sample: 'tbc',
  },
  production: {
    sample: 'tbc',
  },
};
