import type { AppType } from 'next/app';

import '../../styles/globals.css';

import { trpc } from '../utils/trps';

const MyApp: AppType = ({ Component, pageProps }) => {
  return <Component {...pageProps} />;
};
export default trpc.withTRPC(MyApp);
