import '../assets/css/index.css';
import Script from 'next/script';
import { ChakraProvider } from '@chakra-ui/react';
import Layout from '../layout';
import theme from '../theme';
import { DefaultSeo } from 'next-seo';

function MyApp(props) {
  const { Component, pageProps } = props;

  return (
    <ChakraProvider theme={theme}>
      <Script
        strategy="lazyOnload"
        src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}`}
      />
      <Script
        id="analytics"
        strategy="lazyOnload"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}', {
              page_path: window.location.pathname,
            });
          `,
        }}
      />
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
