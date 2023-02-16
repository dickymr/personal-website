import axios from 'axios';
import ReactGA from 'react-ga4';

export const fetcher = async (endpoint) => {
  axios.defaults.baseURL = process.env.NEXT_PUBLIC_API_URL;
  const { data } = await axios.get(endpoint);
  return data;
};

export const capitalizeSlug = (slug) => {
  const title = slug?.replace(/-/g, ' ').replace(/[^\w-]+/g, ' ');
  return title
    ?.split(' ')
    .map((element) => {
      return element.charAt(0).toUpperCase() + element.substring(1).toLowerCase();
    })
    .join(' ');
};

export const setAnalytics = (router) => {
  ReactGA.initialize(process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS, { debug: false });
  ReactGA.set({ page: router.asPath });
  ReactGA.send({ hitType: 'pageview', page: router.asPath });

  const handleRouteChange = (url, { shallow }) => {
    ReactGA.set({ page: url });
    ReactGA.send({ hitType: 'pageview', page: url });
  };

  router.events.on('routeChangeComplete', handleRouteChange);
  return () => {
    router.events.off('routeChangeComplete', handleRouteChange);
  };
};
