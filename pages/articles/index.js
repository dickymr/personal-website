import Head from 'next/head';
import NextLink from 'next/link';
import { format } from 'date-fns';
import { Box, Flex, Text } from '@chakra-ui/react';
import { Breadcrumb, SearchBox, Skeleton } from '../../components';
import { useFetch } from '../../utils/hooks';

const Article = ({ data }) => {
  return (
    <NextLink href={`articles/${data.slug}`}>
      <Box w={'100%'} p={5} border={'1px solid'} borderColor={'customBorder'} borderRadius={10} mb={5} cursor={'pointer'}>
        <Text fontSize={'xs'} mb={2}>
          {format(new Date(data.date), 'MMMM d, yyyy')}
        </Text>
        <Text fontSize={'lg'} fontWeight={'bold'} mb={1}>
          {data.title}
        </Text>
        <Text>{data.description}</Text>
      </Box>
    </NextLink>
  );
};

const Articles = () => {
  const { data: articles, isLoading, isEmpty } = useFetch('/api/articles?populate=*&sort[0]=date%3Adesc');

  return (
    <Box>
      <Head>
        <title>Articles - Dicky Muhamad R</title>
      </Head>

      <Breadcrumb items={['home', 'articles']} />
      <Text fontSize="2xl" fontWeight={'bold'} mb={2}>
        Articles
      </Text>
      <Text mb={10}>Posts related to some of the latest technologies</Text>
      <SearchBox type={'article'} />
      <Flex direction={'column'}>
        {isEmpty ? (
          <Text fontSize={'xs'}>No articles yet</Text>
        ) : isLoading ? (
          <Skeleton type={'card-article'} />
        ) : (
          articles?.map((ele) => <Article key={ele.id} data={ele} />)
        )}
      </Flex>
    </Box>
  );
};

export default Articles;
