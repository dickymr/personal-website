import '../assets/css/index.css';
import { ChakraProvider } from '@chakra-ui/react';
import Layout from '../layout';
import theme from '../theme';
import { DefaultSeo } from 'next-seo';

function MyApp(props) {
  const { Component, pageProps } = props;

  return (
    <ChakraProvider theme={theme}>
      <DefaultSeo
        title="Personal Website | Dicky Muhamad R"
        description="Frontend Web Developer"
        openGraph={{
          type: 'website',
          title: 'Personal Website | Dicky Muhamad R',
          description: 'Frontend Web Developer',
          url: 'https://dickymr.xyz/',
          images: [{ url: 'https://res.cloudinary.com/dickymr/image/upload/v1646668175/dickymr_4b59491ed6.jpg' }],
        }}
      />
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ChakraProvider>
  );
}

export default MyApp;
