'use client';

import { createReactClient, studioProvider } from '@livepeer/react';

const LivepeerClient = createReactClient({
  provider: studioProvider({ apiKey: process.env.NEXT_PUBLIC_API_KEY }),
});
 
export default LivepeerClient;