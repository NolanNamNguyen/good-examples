import React from 'react';
import { wrapper } from '../redux/store';
import { SessionProvider } from 'next-auth/react';
import '../scss/app.scss';

function ETypingApp({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <SessionProvider session={session}>
      <Component {...pageProps} />
    </SessionProvider>
  );
}

export default wrapper.withRedux(ETypingApp);
