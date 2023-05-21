'use strict';
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
const danger_plugin_jira_issue_1 = __importDefault(require('danger-plugin-jira-issue'));
const danger_plugin_yarn_1 = __importDefault(require('danger-plugin-yarn'));
const consts_1 = require('./danger/consts');
const prHealth_1 = require('./danger/prHealth');
console.log(`branch = ${consts_1.env}, merging to ${consts_1.envMergingTo}`);
// Rules
(0, danger_plugin_jira_issue_1.default)({
  key: 'PLT',
  url: 'https://beforeyoubid.atlassian.net/browse',
  emoji: ':paperclip:',
  location: 'title',
});
(0, prHealth_1.prHealth)();
(0, danger_plugin_yarn_1.default)();
//# sourceMappingURL=Dangerfile.js.map
