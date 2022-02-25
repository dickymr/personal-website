import { Stack } from '@chakra-ui/react';
import Navbar from './Navbar';
import Footer from './Footer';

const Layout = ({ children }) => {
  return (
    <Stack alignItems={'center'}>
      <Navbar />
      <Stack w={{ base: '100%', md: 'container.md' }} minH={{ base: '90vh', md: '90vh' }} px={{ base: 5, md: 0 }} py={10}>
        {children}
      </Stack>
      <Footer />
    </Stack>
  );
};

export default Layout;
