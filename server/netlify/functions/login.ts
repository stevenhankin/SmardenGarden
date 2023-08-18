import type { Handler, HandlerEvent, HandlerContext } from '@netlify/functions';
import { Response } from '@netlify/functions/dist/function/response';

const handler: Handler = async (
  event: HandlerEvent,
  context: HandlerContext
) => {
  // your server-side functionality
  const response: Response = {
    statusCode: 200,
    body: JSON.stringify({ message: 'Login!' }),
  };
  return response;
};

export { handler };
