import Head from 'next/head';
import NextLink from 'next/link';
import { Badge, Box, Flex, Image, Text } from '@chakra-ui/react';
import { Breadcrumb, SearchBox, Skeleton } from '../../components';
import { useFetch } from '../../utils/hooks';

const Project = ({ data }) => {
  return (
    <NextLink href={`projects/${data.slug}`}>
      <Box
        w={{ base: '100%', md: '48%' }}
        p={5}
        border={'1px solid'}
        borderColor={'customBorder'}
        borderRadius={10}
        mb={10}
        cursor={'pointer'}>
        <Flex h={200} justify={'center'} mb={7}>
          <Image src={`${process.env.NEXT_PUBLIC_API_URL}${data.thumbnail.data.url}`} alt={'thumbnail'} objectFit="cover" />
        </Flex>
        <Text fontSize={'lg'} fontWeight={'bold'}>
          {data.title}
        </Text>
        {data.tags.data.map((ele, i) => (
          <Badge key={i} colorScheme="green" fontSize={'0.7rem'} mr={1}>
            {ele.name}
          </Badge>
        ))}
        <Text mt={2}>{data.description}</Text>
      </Box>
    </NextLink>
  );
};

const Projects = () => {
  const { data: projects, isLoading, isEmpty } = useFetch('/api/projects?populate=*');

  return (
    <Box>
      <Head>
        <title>Projects - Dicky Muhamad R</title>
      </Head>

      <Breadcrumb items={['home', 'projects']} />
      <Text fontSize="2xl" fontWeight={'bold'} mb={2}>
        Projects
      </Text>
      <Text mb={10}>Open source projects developed and available on Github</Text>
      <SearchBox type={'project'} />
      <Flex justify={'space-between'} flexWrap={'wrap'}>
        {isEmpty ? (
          <Text fontSize={'xs'}>No projects yet</Text>
        ) : isLoading ? (
          <Skeleton type={'card-project'} />
        ) : (
          projects?.map((ele) => <Project key={ele.id} data={ele} />)
        )}
      </Flex>
    </Box>
  );
};

export default Projects;
