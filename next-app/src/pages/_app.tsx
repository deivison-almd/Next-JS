import { ConfigProvider } from 'antd';
import type { AppProps } from 'next/app';
import { Header } from '../components/Header';
import '../styles/globals.scss';

function MyApp({ Component, pageProps }: AppProps) {
  ConfigProvider.config({
    theme: {
      primaryColor: '#9254de',
    },
  });

  return (
    <>
      <ConfigProvider>
        <Header />
        <Component {...pageProps} />
      </ConfigProvider>
    </>
  );
}

export default MyApp;
