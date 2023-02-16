import Link from 'next/link';
import { Box, Flex, Text } from '@chakra-ui/react';
import { ArrowForwardIcon } from '@chakra-ui/icons';
import { useQuery } from '@tanstack/react-query';
import { Skeleton } from '../../components';
import { fetcher } from '../../utils';

const Article = ({ data }) => {
  return (
    <Link href={`/articles/${data.slug}`} passHref>
      <Box pl={2} mb={5} _hover={{ cursor: 'pointer' }}>
        <Text fontSize={'xl'} fontWeight={'bold'} color="customBlue" mb={1}>
          {data.title}
        </Text>
        <Text isTruncated>{data.description}</Text>
      </Box>
    </Link>
  );
};

const ListArticles = () => {
  const { data: articles, isLoading } = useQuery({
    queryKey: ['list_articles'],
    queryFn: async () => fetcher('/api/articles?pagination[page]=1&pagination[pageSize]=5&sort[0]=date%3Adesc'),
  });

  const renderContent = () => {
    if (isLoading) {
      return <Skeleton type={'list-article'} />;
    }

    if (articles?.data?.length === 0) {
      return (
        <Text fontSize={'xs'} align={'center'}>
          No articles yet
        </Text>
      );
    }

    return articles?.data?.map((ele) => <Article key={ele.id} data={ele} />);
  };

  return (
    <Box mt={20}>
      <Flex justify={'space-between'} align={'center'} mb={7}>
        <Text fontSize="2xl" fontWeight={'bold'}>
          Articles
        </Text>
        <Link href="/articles" passHref>
          <Text>
            View all articles <ArrowForwardIcon />
          </Text>
        </Link>
      </Flex>
      <Flex direction={'column'} mb={2}>
        {renderContent()}
      </Flex>
    </Box>
  );
};

export default ListArticles;
