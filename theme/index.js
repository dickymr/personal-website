import { extendTheme } from '@chakra-ui/react';

const theme = extendTheme({
  semanticTokens: {
    colors: {
      customBlue: {
        _light: 'blue.600',
        _dark: 'blue.400',
      },
      customBg: {
        _light: 'white',
        _dark: 'gray.800',
      },
      customBorder: {
        _light: 'gray.200',
        _dark: 'gray.700',
      },
    },
  },
});

export default theme;
