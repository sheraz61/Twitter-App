import { createBrowserRouter } from 'react-router-dom';
import Home from './Components/Home';
import Profile from './Components/Profile';
import SignIn from './Components/SignIn';
import Explore from './Components/Explore';
import Notifications from './Components/Notifications';
import Bookmarks from './Components/Bookmarks';
import Feed from './Components/Feed';

// Create routes configuration
const router = createBrowserRouter([
 
  {
    path: '/',
    element: <Home />,
    children:[
      {
        path:'/',
        element:<Feed/>
      },
      {
        path:'/profile/:id',
        element:<Profile/>
      },{
        path:'/bookmarks',
        element:<Bookmarks/>
      },{
        path: '/explore',
        element: <Explore />,
      },{
        path: '/notifications',
    element: <Notifications />,
      }
    ]
  },
  {
    path:'/login',
    element:<SignIn/>
  },
]);

export default router; 