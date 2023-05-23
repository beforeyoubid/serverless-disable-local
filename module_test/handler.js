function handler(event, context) {
  console.log('Event: %j', event);
  console.log('Context: %j', context);
  console.log('handler ran!');
  return {
    status: 200,
  };
}

module.exports = { default: handler };
