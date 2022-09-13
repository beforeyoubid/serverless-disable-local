import jiraIssue from 'danger-plugin-jira-issue';
import yarn from 'danger-plugin-yarn';

import { env, envMergingTo } from './danger/consts';
import { prHealth } from './danger/prHealth';

console.log(`branch = ${env}, merging to ${envMergingTo}`);

// Rules
jiraIssue({
  key: 'PLT',
  url: 'https://beforeyoubid.atlassian.net/browse',
  emoji: ':paperclip:',
  location: 'title',
});
prHealth();
yarn();
