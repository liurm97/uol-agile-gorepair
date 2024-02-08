import { Icon } from '@chakra-ui/react';
import {
  MdBarChart,
  MdPerson,
  MdHome,
  MdLock,
  MdOutlineShoppingCart,
} from 'react-icons/md';


// Auth Imports
// import SignInCentered from './pages/auth/sign-in';
import { IRoute } from 'types/navigation';

const routes: IRoute[] = [
  //Admin
  {
    name: '️👨‍🔧Orders',
    layout: '/contractor',
    icon: <Icon as={MdBarChart} width="20px" height="20px" color="inherit" />,
    path: '/orders',
  },
  {
    name: '️👨‍🔧Profile',
    layout: '/contractor',
    icon: <Icon as={MdBarChart} width="20px" height="20px" color="inherit" />,
    path: '/profile',
  }
];

export default routes;

