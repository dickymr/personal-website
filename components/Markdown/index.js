import { Text } from '@chakra-ui/react';
import ReactMarkdown from 'react-markdown';
import ChakraUIRenderer from 'chakra-ui-markdown-renderer';

const Markdown = ({ content }) => {
  const newTheme = {
    h1: (props) => {
      const { children } = props;

      return (
        <Text fontSize="xl" fontWeight={'bold'} mb={1}>
          {children}
        </Text>
      );
    },
    p: (props) => {
      const { children } = props;

      return (
        <Text mb={5} fontSize={'md'}>
          {children}
        </Text>
      );
    },
  };

  return <ReactMarkdown components={ChakraUIRenderer(newTheme)} children={content} skipHtml={false} />;
};

export default Markdown;
