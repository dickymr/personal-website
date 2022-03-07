import Head from 'next/head';
import { Box } from '@chakra-ui/react';
import { Profile, ListProjects, ListArticles } from '../components';

export const getServerSideProps = async () => {
  const api = `${process.env.NEXT_PUBLIC_API_URL}${'/api/profile'}`;
  const res = await fetch(api);
  const profile = await res.json();

  return {
    props: { profile: profile.data },
  };
};

const Home = ({ profile }) => {
  return (
    <Box>
      <Head>
        <title>Dicky Muhamad R</title>
      </Head>
      <Profile profile={profile} />
      <ListProjects />
      <ListArticles />
    </Box>
  );
};

export default Home;
