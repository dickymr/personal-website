import Link from 'next/link';
import { Breadcrumb as BreadcrumbContainer, BreadcrumbItem, BreadcrumbLink, Text } from '@chakra-ui/react';
import { ChevronRightIcon } from '@chakra-ui/icons';

const Breadcrumb = ({ items }) => {
  return (
    <BreadcrumbContainer separator={<ChevronRightIcon />} mb={5}>
      {items.map((ele, i) => (
        <BreadcrumbItem key={i} alignItems="bottom">
          {i + 1 !== items.length ? (
            <Link href={ele === 'home' ? '/' : `/${ele}`} passHref>
              <BreadcrumbLink as={Text} fontSize={'sm'} textTransform={'capitalize'}>
                {ele}
              </BreadcrumbLink>
            </Link>
          ) : (
            <Text fontSize={'sm'} textTransform={'capitalize'} color={'grey'}>
              {ele}
            </Text>
          )}
        </BreadcrumbItem>
      ))}
    </BreadcrumbContainer>
  );
};

export default Breadcrumb;
