import {
  Button,
  Flex,
  Input,
  InputGroup,
  InputLeftElement,
  Menu,
  MenuButton,
  MenuItemOption,
  MenuList,
  MenuOptionGroup,
} from '@chakra-ui/react';
import { SearchIcon } from '@chakra-ui/icons';

const SearchBox = () => {
  return (
    <Flex>
      <InputGroup mb={10} mr={5}>
        <InputLeftElement pointerEvents="none">
          <SearchIcon color={'gray.500'} />
        </InputLeftElement>
        <Input type="tel" placeholder="Search for project title" />
      </InputGroup>
      <Menu closeOnSelect={false}>
        <MenuButton as={Button} variant="outline">
          Filters
        </MenuButton>
        <MenuList minWidth="240px">
          <MenuOptionGroup title="Categories" type="checkbox">
            <MenuItemOption value="frontend" isChecked>
              Frontend
            </MenuItemOption>
            <MenuItemOption value="backend" isChecked>
              Backend
            </MenuItemOption>
            <MenuItemOption value="mobile" isChecked>
              Mobile
            </MenuItemOption>
            <MenuItemOption value="work" isChecked>
              Work
            </MenuItemOption>
          </MenuOptionGroup>
        </MenuList>
      </Menu>
    </Flex>
  );
};

export default SearchBox;
