import { Box, Stack, Flex, Skeleton as ChakraSkeleton, SkeletonText } from '@chakra-ui/react';

const Skeleton = ({ type }) => {
  if (type === 'list-project') {
    return (
      <Stack mx={2} mt={2}>
        <ChakraSkeleton h={'25px'} mb={1} />
        <ChakraSkeleton h={'20px'} />
      </Stack>
    );
  }

  if (type === 'list-article') {
    return (
      <Stack mx={2} mt={2}>
        <ChakraSkeleton h={'25px'} mb={1} />
        <ChakraSkeleton h={'20px'} />
      </Stack>
    );
  }

  if (type === 'card-project') {
    return [1, 2].map((ele) => (
      <Box
        key={ele}
        w={{ base: '100%', md: '48%' }}
        h={'350px'}
        p={5}
        border={'1px solid'}
        borderColor={'customBorder'}
        borderRadius={10}
        mb={10}>
        <Flex justify={'center'} mb={5}>
          <ChakraSkeleton w={225} h={225} borderRadius={10} />
        </Flex>
        <SkeletonText spacing={5} />
      </Box>
    ));
  }

  if (type === 'card-article') {
    return (
      <Box w={'100%'} h={125} p={5} border={'1px solid'} borderColor={'customBorder'} borderRadius={10} mb={5}>
        <SkeletonText spacing={7} />
      </Box>
    );
  }

  return null;
};

export default Skeleton;

{
  /* <Box
key={ele}
  w={{ base: '100%', md: '48%' }}
  h={'350px'}
  p={5}
  border={'1px solid'}
  borderColor={'customBorder'}
  borderRadius={10}
  mb={10}
  cursor={'pointer'}>
  <Flex justify={'center'} mb={10}>
    <ChakraSkeleton w={225} h={225} borderRadius={10} />
  </Flex>
  <SkeletonText />
</Box> */
}
