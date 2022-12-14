import { useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Badge, Box, Flex, Spinner, Text } from '@chakra-ui/react';
import { NextSeo } from 'next-seo';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useInView } from 'react-intersection-observer';
import { Breadcrumb, SearchBox, Skeleton } from '../../components';
import { fetcher } from '../../utils';

const Project = ({ data }) => {
  return (
    <Box
      w={{ base: '100%', md: '48%' }}
      p={5}
      border={'1px solid'}
      borderColor={'customBorder'}
      borderRadius={10}
      mb={10}
      cursor={'pointer'}>
      <Link href={`projects/${data.slug}`} passHref>
        <Flex position={'relative'} h={200} mb={7}>
          <Image
            style={{ objectFit: 'contain' }}
            sizes={10}
            src={data.thumbnail.url}
            placeholder="blur"
            blurDataURL={data.blurhash}
            alt={'thumbnail'}
            fill
            priority
          />
        </Flex>
        <Text fontSize={'lg'} fontWeight={'bold'}>
          {data.title}
        </Text>
        {data.tags.map((ele, i) => (
          <Badge key={i} colorScheme="green" fontSize={'0.7rem'} mr={1}>
            {ele.name}
          </Badge>
        ))}
        <Text mt={2} isTruncated>
          {data.description}
        </Text>
      </Link>
    </Box>
  );
};

const Projects = () => {
  const getProjects = (page) => {
    return fetcher(`/api/projects?populate=*&pagination[page]=${page}&pagination[pageSize]=4&sort[0]=date%3Adesc`);
  };

  const { ref, inView } = useInView();
  const { data, isLoading, isFetchingNextPage, fetchNextPage, hasNextPage } = useInfiniteQuery(
    ['list_projects'],
    ({ pageParam = 1 }) => getProjects(pageParam),
    {
      getNextPageParam: (lastPage) => {
        const { pagination } = lastPage.meta;
        return pagination.page < pagination.pageCount ? pagination.page + 1 : false;
      },
    }
  );

  const projectPages = data?.pages;

  useEffect(() => {
    inView && hasNextPage && fetchNextPage();
  }, [inView]);

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
        {projectPages?.length === 0 ? (
          <Text fontSize={'xs'}>No articles yet</Text>
        ) : isLoading ? (
          <Skeleton type={'card-project'} />
        ) : (
          projectPages?.map((page) => page.data.map((project) => <Project key={project.id} data={project} />))
        )}
      </Flex>
      <Box ref={ref} visibility={isFetchingNextPage ? 'visible' : 'hidden'} textAlign="center" mt={3}>
        <Spinner />
      </Box>
    </Box>
  );
};

export default Projects;
