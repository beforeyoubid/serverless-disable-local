curl --fail \
  --include \
  --request POST \
  --header "Content-Type: application/json" \
  --data-binary "{
    \"text\": \"<<servicename>> was just deployed to $STAGE by $CIRCLE_USERNAME on $CIRCLE_BRANCH\"
    }" \
    'https://beforeyoubid.webhook.office.com/webhookb2/633e9c1c-e859-4df6-b0a3-b688849bc9fa@57186555-598f-4cf8-838d-398dec944c0d/IncomingWebhook/ece6ca65e2314ece9152d1d619396a33/4d81f73d-c3c5-4617-b7f1-68957dcf0f55'
