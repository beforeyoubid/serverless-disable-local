# Serverless Disable Local

## Background

If you have a lot of functions that doesn't seem to be used locally e.g. we do have a lot of cron in one service but
they aren't really used locally and consume of memory and pollute our local log items.

One way you can speed up is to comment out other unused functions but you need to stash/apply every when you perform git
operations which you need to remember to do every time.

This plugin is very simple and allow you to deactivate those functions on the local environment. Once set, you don't
need to adjust your serverless file again.

## How to use & activate

Add this npm plugin package to your serverless repo

```
  yarn add @beforeyoubid/serverless-disable-local --dev
```

Add this plugin to your serverless.yaml, please consider to add before `serverless-offline` plugin

```
e.g.
plugins:
  - serverless-disable-local
  - other plugins go here
```

Choose functions you would like to activate

```
  serverless-disable-local:
    enabled: ${env:LITE_LOCAL_DEV, 'false'}
    activated:
      - graphql
      - emailMicroService
```

Or choose functions you would like to deactivate

```
  serverless-disable-local:
    enabled: ${env:LITE_LOCAL_DEV, 'false'}
    deactivated:
      - cronEveryHour
      - cronEvery2Hours
      - cronOtherFunctions
```

You can control the `enabled` flag by using environment variable. Once change, just need to restart your serverless.
