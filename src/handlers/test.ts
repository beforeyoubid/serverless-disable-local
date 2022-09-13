export async function handler(event: AWSLambda.APIGatewayProxyEvent, context: AWSLambda.Context) {
  return await Promise.resolve({
    statusCode: 200,
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
    },
    body: JSON.stringify({ message: 'Success!' }),
  });
}
