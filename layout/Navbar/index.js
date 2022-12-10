import Link from 'next/link';
import {
  Box,
  Flex,
  HStack,
  IconButton,
  Button,
  Stack,
  Text,
  useDisclosure,
  useColorMode,
  useColorModeValue,
} from '@chakra-ui/react';
import { HamburgerIcon, CloseIcon, MoonIcon, SunIcon } from '@chakra-ui/icons';

const Links = [
  { title: 'Projects', path: '/projects' },
  { title: 'Articles', path: '/articles' },
  { title: 'About', path: '/about' },
];

const Navbar = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Box
      as={'header'}
      position={'sticky'}
      top={0}
      zIndex={3}
      w={{ base: '100%', md: 'container.md' }}
      bg={'customBg'}
      borderBottom={'1px solid'}
      borderColor={'customBorder'}
      px={{ base: 3, md: 0 }}>
      <Flex h={75} alignItems={'center'} justifyContent={'space-between'}>
        {/* NAVBAR MOBILE */}
        <IconButton
          bg={'customBg'}
          size={'md'}
          icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
          display={{ md: 'none' }}
          onClick={isOpen ? onClose : onOpen}
        />

        <HStack>
          <Link href="/" passHref>
            <Text fontSize={20} fontWeight="bold" color={'customBlue'} _hover={{ textDecoration: 'underline' }}>
              Dickymr.
            </Text>
          </Link>
        </HStack>

        <HStack flex={0.9} justify={'flex-end'} as={'nav'} spacing={5} display={{ base: 'none', md: 'flex' }}>
          {Links.map((link, i) => (
            <Link key={i} href={link.path} passHref>
              <Text fontWeight={'bold'} px={2} py={1} rounded={'md'} _hover={{ textDecoration: 'underline' }}>
                {link.title}
              </Text>
            </Link>
          ))}
        </HStack>

        <Flex>
          <Button bg={useColorModeValue('white', 'gray.800')} mr={{ base: 0, md: 2 }} onClick={toggleColorMode}>
            {colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
          </Button>
        </Flex>
      </Flex>

      {/* NAVBAR MOBILE */}
      {isOpen ? (
        <Box pl={4} pb={4} display={{ md: 'none' }}>
          <Stack as={'nav'} spacing={4}>
            {Links.map((link, i) => (
              <Link key={i} href={link.path} passHref>
                <Text>{link.title}</Text>
              </Link>
            ))}
          </Stack>
        </Box>
      ) : null}
    </Box>
  );
};

export default Navbar;
