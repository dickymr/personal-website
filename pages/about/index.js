import { NextSeo } from 'next-seo';
import { useQuery } from '@tanstack/react-query';
import { Avatar, Box, Flex, Link, Text } from '@chakra-ui/react';

import { Breadcrumb, Markdown } from '../../components';
import { fetcher } from '../../utils';

const About = () => {
  const { data: profile, isLoading } = useQuery({
    queryKey: ['my_profile'],
    queryFn: async () => fetcher('/api/profile?populate=*'),
  });

  if (isLoading) {
    return null;
  }

  return (
    <Box>
      <NextSeo title="About | Dicky Muhamad R" />
      <Breadcrumb items={['home', 'about']} />
      <Flex my={10} direction={{ base: 'column', md: 'row' }} align="center">
        <Avatar size="xl" name={profile?.data?.name} src={profile?.data?.avatar?.url} mr={5} />
        <Flex direction={'column'} justify="center" align={{ base: 'center', md: 'flex-start' }}>
          <Text fontSize={'2xl'} fontWeight={'bold'} mt={{ base: 3, md: 0 }}>
            {profile?.data?.name}
          </Text>
          <Text>
            {profile?.data?.title} at{' '}
            <Link href={profile?.data?.company_url} isExternal>
              {profile?.data?.company}
            </Link>
          </Text>
        </Flex>
      </Flex>
      <Markdown content={profile?.data?.long_desc} />
    </Box>
  );
};

export default About;
