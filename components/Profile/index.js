import { Box, Flex, Icon, Link, Text, Tooltip } from '@chakra-ui/react';
import { IoMailOutline, IoLogoGithub, IoLogoLinkedin, IoDocumentTextOutline } from 'react-icons/io5';
import { format } from 'date-fns';

const Profile = ({ profile }) => {
  const contacts = [
    { name: 'Email', url: profile?.email, icon: IoMailOutline },
    { name: 'Github', url: profile?.github, icon: IoLogoGithub },
    { name: 'LinkedIn', url: profile?.linkedin, icon: IoLogoLinkedin },
    { name: 'CV', url: profile?.cv, icon: IoDocumentTextOutline },
  ];

  return (
    <Box>
      <Text fontSize="xl" fontWeight={'bold'} mb={1}>
        Hi, Happy {format(new Date(), 'EEEE')}!
      </Text>
      <Text fontSize="3xl" fontWeight={'bold'} mb={2}>
        I&apos;m{' '}
        <Text as="span" color={'customBlue'}>
          {profile?.name}.
        </Text>
      </Text>
      <Text mb={4}>{profile?.short_desc}</Text>
      <Flex w={{ base: '40%', md: '15%' }} justify={'space-between'}>
        {contacts.map((ele, i) => (
          <Tooltip key={i} label={ele.name} placement={'top'} hasArrow>
            <Link href={ele.url} isExternal>
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
