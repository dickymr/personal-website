import { useEffect } from 'react';
import '../assets/css/index.css';
import { useRouter } from 'next/router';
import { ChakraProvider } from '@chakra-ui/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Layout from '../layout';
import theme from '../theme';
import { DefaultSeo } from 'next-seo';
import { setAnalytics } from '../utils';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

const queryClient = new QueryClient();

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
          url: 'https://dickymr.com/',
          images: [{ url: 'https://res.cloudinary.com/dickymr/image/upload/v1646668175/dickymr_4b59491ed6.jpg' }],
        }}
      />
      <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools initialIsOpen={false} />
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </QueryClientProvider>
    </ChakraProvider>
  );
}

export default MyApp;
