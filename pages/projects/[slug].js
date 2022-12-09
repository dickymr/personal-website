import { useRouter } from 'next/router';
import { format } from 'date-fns';
import { Badge, Box, Text, Flex, Button, Link, Spinner } from '@chakra-ui/react';
import { ExternalLinkIcon } from '@chakra-ui/icons';
import { useFetch } from '../../utils/hooks';
import { Breadcrumb, ImageSlider } from '../../components';
import { NextSeo } from 'next-seo';
import { capitalizeSlug } from '../../utils';

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

      {project.languages && (
        <Flex mb={2}>
          <Text w={125}>Languages</Text>
          <Text w={25}>:</Text>
          <Text textTransform={'capitalize'}>{project.languages.map((ele) => ele.name).join(', ')}</Text>
        </Flex>
      )}

      {project.fe_techs.length > 0 && (
        <Flex mb={2}>
          <Text w={{ sm: 149, md: 125 }}>Frontend Tech</Text>
          <Text w={25}>:</Text>
          <Text textTransform={'capitalize'}>{project.fe_techs.map((ele) => ele.name).join(', ')}</Text>
        </Flex>
      )}

      {project.be_techs.length > 0 && (
        <Flex mb={2}>
          <Text w={125}>Backend Tech</Text>
          <Text w={25}>:</Text>
          <Text textTransform={'capitalize'}>{project.be_techs.map((ele) => ele.name).join(', ')}</Text>
        </Flex>
      )}

      {project.deployments.length > 0 && (
        <Flex mb={2}>
          <Text w={125}>Deployment</Text>
          <Text w={25}>:</Text>
          <Text textTransform={'capitalize'}>{project.deployments.map((ele) => ele.name).join(', ')}</Text>
        </Flex>
      )}

      {(project.fe_github || project.be_github) && (
        <Flex mb={10}>
          <Box w={125}>Repository</Box>
          <Text w={25}>:</Text>
          {project.fe_github && (
            <Link href={project.fe_github} isExternal>
              <Box>Frontend</Box>
            </Link>
          )}
          {project.fe_github && project.be_github && <Box mx={3}>|</Box>}
          {project.be_github && (
            <Link href={project.be_github} isExternal>
              <Box>Backend</Box>
            </Link>
          )}
        </Flex>
      )}

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
