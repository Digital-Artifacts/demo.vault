'use client';

import { createReactClient, studioProvider } from '@livepeer/react';
 
const LivepeerClient = createReactClient({
  provider: studioProvider({ apiKey: 'YOUR_API_KEY' }),
});
 
export default LivepeerClient;