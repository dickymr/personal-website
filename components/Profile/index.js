import { Box, Flex, Icon, Link, Text, Tooltip } from '@chakra-ui/react';
import { format } from 'date-fns';
import { contacts } from '../../data';

const Profile = () => {
  return (
    <Box>
      <Text fontSize="xl" fontWeight={'bold'} mb={1}>
        Hi, Happy {format(new Date(2020, 1, 10), 'EEEE')}!
      </Text>
      <Text fontSize="3xl" fontWeight={'bold'} mb={2}>
        I&apos;m{' '}
        <Text as="span" color={'customBlue'}>
          Dicky Muhamad R.
        </Text>
      </Text>
      <Text mb={4}>
        More than 2 years of experience as a Frontend Developer using React.js and Next.js at game publisher company. I also
        have experience building projects as a Backend Developer using Node.js, Express.js, Mongoose, and Prisma.
      </Text>
      <Flex w={{ base: '25%', md: '15%' }} justify={'space-between'}>
        {contacts.map((ele, i) => (
          <Tooltip key={i} label={ele.name} placement={'top'} hasArrow>
            <Link href={ele.url}>
              <span>
                <Icon as={ele.icon} fontSize={'xl'} />
              </span>
            </Link>
          </Tooltip>
        ))}
      </Flex>
    </Box>
  );
};

export default Profile;
