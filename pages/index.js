import { Box, Flex, Icon, Link, Text, Tooltip } from '@chakra-ui/react';
import { IoMailOutline, IoLogoGithub, IoLogoLinkedin, IoDocumentTextOutline } from 'react-icons/io5';
import { format } from 'date-fns';

const CONTACTS = [
  { name: 'Email', url: 'mailto:dickymr.dev@gmail.com', icon: IoMailOutline },
  { name: 'Github', url: 'https://github.com/dickymr', icon: IoLogoGithub },
  { name: 'LinkedIn', url: 'https://linkedin.com/in/dickymr', icon: IoLogoLinkedin },
  { name: 'CV', url: 'https://read.cv/dickymr', icon: IoDocumentTextOutline },
];

const Home = () => {
  return (
    <Box mt={5}>
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
        {CONTACTS.map((ele, i) => (
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

export default Home;
