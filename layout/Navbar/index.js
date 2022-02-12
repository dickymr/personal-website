import {
  Box,
  Flex,
  Link,
  HStack,
  IconButton,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  Stack,
  Center,
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
      zIndex={1}
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
          <Link href="/">
            <Text fontSize={20} fontWeight="bold" color={'customBlue'}>
              Dickymr.
            </Text>
          </Link>
        </HStack>

        <HStack flex={0.9} justify={'flex-end'} as={'nav'} spacing={5} display={{ base: 'none', md: 'flex' }}>
          {Links.map((link, i) => (
            <Link key={i} fontWeight={'bold'} px={2} py={1} rounded={'md'} href={link.path}>
              {link.title}
            </Link>
          ))}
        </HStack>

        <Flex>
          <Button bg={useColorModeValue('white', 'gray.800')} mr={{ base: 0, md: 2 }} onClick={toggleColorMode}>
            {colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
          </Button>

          <Menu>
            <MenuButton as={Button} rounded={'full'} variant={'link'} cursor={'pointer'} minW={0}>
              {/* <Avatar size={'sm'} src={user?.picture} /> */}
            </MenuButton>

            <MenuList alignItems={'center'}>
              <br />
              <Center>{/* <Avatar size={'xl'} src={user?.picture} /> */}</Center>
              <br />
              <Center>{/* <p>{user?.email}</p> */}</Center>
              <br />
              <MenuDivider />
              <MenuItem>Account Settings</MenuItem>
              <MenuItem onClick={() => handleLogout()}>Logout</MenuItem>
            </MenuList>
          </Menu>
        </Flex>
      </Flex>

      {/* NAVBAR MOBILE */}
      {isOpen ? (
        <Box pl={4} pb={4} display={{ md: 'none' }}>
          <Stack as={'nav'} spacing={4}>
            {Links.map((link, i) => (
              <Link key={i} href={link.path}>
                {link.title}
              </Link>
            ))}
          </Stack>
        </Box>
      ) : null}
    </Box>
  );
};

export default Navbar;
