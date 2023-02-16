import { useRouter } from 'next/router';
import { format } from 'date-fns';
import { Badge, Box, Text, Flex, Button, Link, Spinner, Table, Tbody, Tr, Td, TableContainer } from '@chakra-ui/react';
import { ExternalLinkIcon } from '@chakra-ui/icons';
import { useFetch } from '../../utils/hooks';
import { Breadcrumb, ImageSlider } from '../../components';
import { NextSeo } from 'next-seo';
import { capitalizeSlug } from '../../utils';

const Row = ({ title, desc }) => {
  const renderDesc = () => {
    if (title === 'Repository') {
      return (
        <>
          {desc.fe_github && (
            <Link href={desc.fe_github} isExternal>
              <Box>Frontend</Box>
            </Link>
          )}
          {desc.fe_github && desc.be_github && <Box mx={3}>|</Box>}
          {desc.be_github && (
            <Link href={desc.be_github} isExternal>
              <Box>Backend</Box>
            </Link>
          )}
        </>
      );
    }

    return desc;
  };

  return (
    <Tr>
      <Td pl={0} w={100} fontSize={'md'} border={'none'}>
        {title}
      </Td>
      <Td w={10} fontSize={'md'} border={'none'}>
        :
      </Td>
      <Td textTransform={'capitalize'} display="flex" fontSize={'md'} border={'none'}>
        {renderDesc()}
      </Td>
    </Tr>
  );
};

const Slug = () => {
  const router = useRouter();
  const { slug } = router.query;
  const { data: projects, isLoading } = useFetch(slug ? `/api/projects?filters[slug][$eq]=${slug}&populate=*` : null);
  const project = projects && projects[0];

  if (!project) {
    if (isLoading) {
      return (
        <Box>
          {slug && <NextSeo title={`${capitalizeSlug(slug)} | Dicky Muhamad R`} />}
          <Breadcrumb items={['home', 'projects', '...']} />
          <Spinner mt={2} />
        </Box>
      );
    }
    return null;
  }

  return (
    <Box>
      <NextSeo title={`${project.title} | Dicky Muhamad R`} description={project.description} />
      <Breadcrumb items={['home', 'projects', project.title]} />
      <ImageSlider images={project.images} />
      <Flex mt={10}>
        <Text fontSize="2xl" fontWeight={'bold'} mb={2} mr={3}>
          {project.title}
        </Text>
      </Flex>
      <Text fontSize={'sm'} mb={7}>
        {project.tags.map((ele, i) => (
          <Badge key={i} colorScheme="green" fontSize={'0.7rem'} mr={1}>
            {ele.name}
          </Badge>
        ))}
        <Text as={'span'} mx={2}>
          •
        </Text>
        {format(new Date(project.date), 'MMMM d, yyyy')}
      </Text>
      <Text mb={7}>{project.description}</Text>
      <TableContainer mb={7}>
        <Table size={'sm'}>
          <Tbody>
            {project.languages && <Row title="Languages" desc={project.languages.map((ele) => ele.name).join(', ')} />}
            {project.fe_techs.length > 0 && (
              <Row title="FE Tech" desc={project.fe_techs.map((ele) => ele.name).join(', ')} />
            )}
            {project.be_techs.length > 0 && (
              <Row title="BE Tech" desc={project.be_techs.map((ele) => ele.name).join(', ')} />
            )}
            {project.deployments.length > 0 && (
              <Row title="Deployment" desc={project.deployments.map((ele) => ele.name).join(', ')} />
            )}
            {(project.fe_github || project.be_github) && <Row title="Repository" desc={project} />}
          </Tbody>
        </Table>
      </TableContainer>

      {project.preview_url && (
        <Link href={project.preview_url} isExternal>
          <Button rightIcon={<ExternalLinkIcon />} variant={'link'}>
            <Text fontSize={'lg'}>Preview</Text>
          </Button>
        </Link>
      )}
    </Box>
  );
};

export default Slug;
