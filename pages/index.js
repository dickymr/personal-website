import { Box } from '@chakra-ui/react';
import { useQuery } from '@tanstack/react-query';

import { Profile, ListProjects, ListArticles } from '../components';
import { fetcher } from '../utils';

const Home = () => {
  const { data: profile, isLoading } = useQuery({
    queryKey: ['my_profile'],
    queryFn: async () => fetcher('/api/profile/'),
  });

  if (isLoading) {
    return null;
  }

  return (
    <Box>
      <Profile profile={profile?.data} />
      <ListProjects />
      <ListArticles />
    </Box>
  );
};

export default Home;
