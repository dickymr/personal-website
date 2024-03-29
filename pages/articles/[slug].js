import { useRouter } from 'next/router';
import { NextSeo } from 'next-seo';
import { format } from 'date-fns';
import { Box, Center, Image, Text, Spinner } from '@chakra-ui/react';
import { useFetch } from '../../utils/hooks';
import { Breadcrumb, Markdown } from '../../components';
import { capitalizeSlug } from '../../utils';

const Slug = () => {
  const router = useRouter();
  const { slug } = router.query;
  const { data: articles, isLoading } = useFetch(slug ? `/api/articles?filters[slug][$eq]=${slug}&populate=*` : null);
  const article = articles && articles[0];

  if (!article) {
    if (isLoading) {
      return (
        <Box>
          {slug && <NextSeo title={`${capitalizeSlug(slug)} | Dicky Muhamad R`} />}
          <Breadcrumb items={['home', 'articles', '...']} />
          <Spinner mt={2} />
        </Box>
      );
    }
    return null;
  }

  return (
    <Box>
      <NextSeo title={`${article?.title} | Dicky Muhamad R`} description={article?.description} />
      <Breadcrumb items={['home', 'articles', article?.title]} />
      {article?.image && (
        <Center>
          <Image maxW={'100%'} maxH={400} src={article.image.data.url} alt={'article'} objectFit="cover" mb={10} />
        </Center>
      )}
      <Text fontSize="2xl" fontWeight={'bold'} mb={1}>
        {article?.title}
      </Text>
      <Text fontSize={'sm'} mb={10}>
        {format(new Date(article.date), 'MMMM d, yyyy')}
        <Text as={'span'} mx={2}>
          •
        </Text>
        {article.views} Views
        <Text as={'span'} mx={2}>
          •
        </Text>
        {article.reading_time} min read
      </Text>
      <Markdown content={article?.content} />
    </Box>
  );
};

export default Slug;
