# Serverless Disable Local Plugin

## Background

You might have many functions on your serverless project that don't appear to be used locally, such as many cron
functions in one service that aren't actually used locally. They eat up memory and processing power on your computer.
Also, they pollute local logging which makes it harder to interpret debug logs.

One option to speed up is to comment out other unnecessary lambda functions, however you must always stash/apply when
dealing with git operations and so you must remember to do this every time.

This plugin is very easy to use and it lets you disable such features in the local setting. Your serverless file doesn't
require further adjustment once it's been set. You can also control to enable/disable through environment variable of
your choice.

## How to use & activate

Add this npm plugin package to your serverless repo

```sh
  yarn add serverless-disable-local --dev
```

Add this plugin to your serverless.yaml, please consider to add before `serverless-offline` plugin

```yaml
# e.g.
plugins:
  - serverless-disable-local
  - other plugins go here
```

Choose functions you would like to activate

```yaml
  serverless-disable-local:
    enabled: ${env:LITE_LOCAL_DEV, 'false'}
    activated:
      - graphql
      - emailMicroService
```

Or choose functions you would like to deactivate

```yaml
  serverless-disable-local:
    enabled: ${env:LITE_LOCAL_DEV, 'false'}
    deactivated:
      - cronEveryHour
      - cronEvery2Hours
      - cronOtherFunctions
```

You can control the `enabled` flag by using environment variable. Once change, just need to restart your serverless.
