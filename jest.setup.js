process.env.UNIT_TEST_RUN = 'true';
process.env.AWS_XRAY_CONTEXT_MISSING = 'LOG_ERROR';
process.env.API_ENV_SECRET_NAME = 'unit-test';
if (!process.env.LISTENING_TO_UNHANDLED_REJECTION) {
  process.on('unhandledRejection', reason => {
    throw reason;
  });
  // Avoid memory leak by adding too many listeners
  process.env.LISTENING_TO_UNHANDLED_REJECTION = true;
}
