import NextLink from 'next/link';
import { NextSeo } from 'next-seo';
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
          <Image src={data.thumbnail.data.url} alt={'thumbnail'} objectFit="cover" />
        </Flex>
        <Text fontSize={'lg'} fontWeight={'bold'}>
          {data.title}
        </Text>
        {data.tags.data.map((ele, i) => (
          <Badge key={i} colorScheme="green" fontSize={'0.7rem'} mr={1}>
            {ele.name}
          </Badge>
        ))}
        <Text mt={2} isTruncated>
          {data.description}
        </Text>
      </Box>
    </NextLink>
  );
};

const Projects = () => {
  const { data: projects, isLoading, isEmpty } = useFetch('/api/projects?populate=*&sort[0]=date%3Adesc');

  return (
    <Box>
      <NextSeo title="Projects | Dicky Muhamad R" description="Here are a few projects I've worked on recently" />
      <Breadcrumb items={['home', 'projects']} />
      <Text fontSize="2xl" fontWeight={'bold'} mb={2}>
        Projects
      </Text>
      <Text mb={10}>{`Here are a few projects I've worked on recently`}</Text>
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
