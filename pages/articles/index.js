import { useEffect } from 'react';
import Link from 'next/link';
import { Box, Flex, Spinner, Text } from '@chakra-ui/react';
import { NextSeo } from 'next-seo';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useInView } from 'react-intersection-observer';
import { format } from 'date-fns';
import { Breadcrumb, Skeleton } from '../../components';
import { fetcher } from '../../utils';

const Article = ({ data }) => {
  return (
    <Box w={'100%'} p={5} border={'1px solid'} borderColor={'customBorder'} borderRadius={10} mb={5} cursor={'pointer'}>
      <Link href={`articles/${data.slug}`} passHref>
        <Text fontSize={'xs'} mb={2}>
          {format(new Date(data.date), 'MMMM d, yyyy')}
        </Text>
        <Text fontSize={'lg'} fontWeight={'bold'} mb={1}>
          {data.title}
        </Text>
        <Text isTruncated>{data.description}</Text>
      </Link>
    </Box>
  );
};

const Articles = () => {
  const getArticles = (page) => {
    return fetcher(`/api/articles?populate=*&pagination[page]=${page}&pagination[pageSize]=5&sort[0]=date%3Adesc`);
  };

  const { ref, inView } = useInView();
  const { data, isLoading, isFetchingNextPage, fetchNextPage, hasNextPage } = useInfiniteQuery(
    ['list_articles'],
    ({ pageParam = 1 }) => getArticles(pageParam),
    {
      getNextPageParam: (lastPage) => {
        const { pagination } = lastPage.meta;
        return pagination.page < pagination.pageCount ? pagination.page + 1 : false;
      },
    }
  );

  const articlePages = data?.pages;

  useEffect(() => {
    inView && hasNextPage && fetchNextPage();
  }, [inView]);

  return (
    <Box>
      <NextSeo title="Articles | Dicky Muhamad R" description="Posts related to some of the latest technologies" />
      <Breadcrumb items={['home', 'articles']} />
      <Text fontSize="2xl" fontWeight={'bold'} mb={2}>
        Articles
      </Text>
      <Text mb={10}>Posts related to some of the latest technologies</Text>
      {/* <SearchBox type={'article'} /> */}
      <Flex direction={'column'}>
        {articlePages?.length === 0 ? (
          <Text fontSize={'xs'}>No articles yet</Text>
        ) : isLoading ? (
          <Skeleton type={'card-article'} />
        ) : (
          articlePages?.map((page) => page.data.map((article) => <Article key={article.id} data={article} />))
        )}
      </Flex>
      <Box ref={ref} visibility={isFetchingNextPage ? 'visible' : 'hidden'} textAlign="center" mt={3}>
        <Spinner />
      </Box>
    </Box>
  );
};

export default Articles;
