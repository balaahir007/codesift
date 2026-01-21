import {Inngest} from 'inngest';

import {sentryMiddleware} from '@inngest/middleware-sentry'
export const inngest = new Inngest({
  id : 'codesift',
  middleware : [sentryMiddleware()]
  
  // You can add more configuration options here if needed
  
});