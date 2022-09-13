import { globalWithDanger } from './types';

const { danger } = global as globalWithDanger;

const { github } = danger;
const { pr } = github;

const env = pr?.head?.ref ?? process.env.GITHUB_REF?.replace('refs/heads/', '') ?? '';
const envMergingTo = (pr?.base?.ref ?? '') || '';
let STAGE_MERGING_TO: string = 'dev';
if (envMergingTo.toLocaleLowerCase().trim() === 'master') {
  STAGE_MERGING_TO = 'production';
} else if (envMergingTo && envMergingTo.toLocaleLowerCase().trim().startsWith('qa')) {
  STAGE_MERGING_TO = 'qa';
} else if (envMergingTo && envMergingTo.toLocaleLowerCase().trim().startsWith('rc')) {
  STAGE_MERGING_TO = 'uat';
}

const prefix = `${STAGE_MERGING_TO}/`;

export { pr, prefix, STAGE_MERGING_TO, env, envMergingTo };
