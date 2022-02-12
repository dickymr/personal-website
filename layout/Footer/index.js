import { Flex, Text, Link } from '@chakra-ui/react';

const Footer = () => {
  return (
    <Flex
      w={{ base: '100%', md: 'container.md' }}
      h={100}
      direction={{ base: 'column', md: 'row' }}
      justify={{ base: 'center', md: 'space-between' }}
      align={'center'}
      borderTop={'1px solid'}
      borderColor={'customBorder'}>
      <Text mb={{ base: '1', md: '0' }}>
        © {new Date().getFullYear()}{' '}
        <Text as={'span'} color={'customBlue'}>
          Dicky Muhamad R
        </Text>
      </Text>
      <Link href="https://vercel.com/" isExternal>
        Powered by ▲ Vercel
      </Link>
    </Flex>
  );
};

export default Footer;
