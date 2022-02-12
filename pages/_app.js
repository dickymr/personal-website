import { ChakraProvider } from '@chakra-ui/react';
import Layout from '../layout';
import theme from '../theme';

function MyApp(props) {
  const { Component, pageProps } = props;

  return (
    <ChakraProvider theme={theme}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ChakraProvider>
  );
}

export default MyApp;
