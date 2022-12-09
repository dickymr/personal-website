import { NextSeo } from 'next-seo';
import { Avatar, Box, Flex, Link, Text } from '@chakra-ui/react';
import { Breadcrumb, Markdown } from '../../components';

export const getServerSideProps = async () => {
  const api = `${process.env.NEXT_PUBLIC_API_URL}${'/api/profile?populate=*'}`;
  const res = await fetch(api);
  const profile = await res.json();

  return {
    props: { profile: profile.data },
  };
};

const About = ({ profile }) => {
  return (
    <Box>
      <NextSeo title="About | Dicky Muhamad R" />
      <Breadcrumb items={['home', 'about']} />
      <Flex my={10} direction={{ base: 'column', md: 'row' }} align="center">
        <Avatar size="xl" name={profile?.name} src={profile?.avatar?.url} mr={5} />
        <Flex direction={'column'} justify="center" align={{ base: 'center', md: 'flex-start' }}>
          <Text fontSize={'2xl'} fontWeight={'bold'} mt={{ base: 3, md: 0 }}>
            {profile?.name}
          </Text>
          <Text>
            {profile?.title} at{' '}
            <Link href={profile?.company_url} isExternal>
              {profile?.company}
            </Link>
          </Text>
        </Flex>
      </Flex>
      <Markdown content={profile?.long_desc} />
    </Box>
  );
};

export default About;
