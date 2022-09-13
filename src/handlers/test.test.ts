import { handler } from './test';

describe('handler', () => {
  it('should return a response', async () => {
    const result = await handler({} as AWSLambda.APIGatewayProxyEvent, {} as AWSLambda.Context);
    expect(result).toMatchSnapshot();
  });
});
