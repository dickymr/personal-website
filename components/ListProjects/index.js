import NextLink from 'next/link';
import { Box, Flex, Text, Link } from '@chakra-ui/react';
import { ArrowForwardIcon } from '@chakra-ui/icons';
import { useFetch } from '../../utils/hooks';
import { Skeleton } from '../../components';

const Project = ({ data }) => {
  return (
    <NextLink href={`/projects/${data.slug}`}>
      <Box pl={2} mb={5} _hover={{ cursor: 'pointer' }}>
        <Text fontSize={'xl'} fontWeight={'bold'} color="customBlue" mb={1}>
          {data.title}
        </Text>
        <Text isTruncated>{data.description}</Text>
      </Box>
    </NextLink>
  );
};

const ListProjects = () => {
  const { data: projects, isLoading, isEmpty } = useFetch('/api/projects?sort[0]=date%3Adesc');

  return (
    <Box mt={20}>
      <Flex justify={'space-between'} align={'center'} mb={7}>
        <Text fontSize="2xl" fontWeight={'bold'}>
          Projects
        </Text>
        <NextLink href="/projects" passHref>
          <Link>
            <Text>
              View all projects <ArrowForwardIcon />
            </Text>
          </Link>
        </NextLink>
      </Flex>
      <Flex direction={'column'} mb={2}>
        {isEmpty ? (
          <Text fontSize={'xs'} align={'center'}>
            No projects yet
          </Text>
        ) : isLoading ? (
          <Skeleton type={'list-project'} />
        ) : (
          projects?.map((ele) => <Project key={ele.id} data={ele} />)
        )}
      </Flex>
      {/* <Flex justify={'center'}>
        <Button variant="ghost" fontSize={'sm'}>
          Show More
          <br />
          <ChevronDownIcon fontSize={'2xl'} />
        </Button>
      </Flex> */}
    </Box>
  );
};

export default ListProjects;
