import { useEffect } from 'react';
import '../assets/css/index.css';
import { useRouter } from 'next/router';
import { ChakraProvider } from '@chakra-ui/react';
import Layout from '../layout';
import theme from '../theme';
import { DefaultSeo } from 'next-seo';
import { setAnalytics } from '../utils';

function MyApp({ Component, pageProps }) {
  const router = useRouter();

  useEffect(() => {
    setAnalytics(router);
  }, [router]);

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
