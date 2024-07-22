import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import HomePage from './pages/Home';
import EventsPage, { loader as eventsLoader } from './pages/Events';
import EventDetailPage, {
  loader as eventDetailLoader,
  action as deleteEventAction
} from './pages/EventDetail';
import NewEventPage from './pages/NewEvent';
import EditEventPage from './pages/EditEvent';
import RootLayout from './pages/Root';
import ErrorPage from './pages/Error';
import EventsRoot from './pages/EventsRoot';
import {action as manipulateEventAction} from './components/EventForm';
import NewsletterPage, { action as newsletterAction } from './pages/Newsletter';
import AuthenticationPage from './pages/Authentication';
import {action as authAction} from './pages/Authentication';
import {action as logoutAction} from './pages/Logout'
import { tokenLoader, checkAuthLoader } from './util/auth'

const router = createBrowserRouter([
  {
    path: '/', 
    element: <RootLayout />, 
    errorElement: <ErrorPage />,
    id: 'root',
    loader: tokenLoader,
    children: [
      { index: true, element: <HomePage /> },
      {
        path: 'events', element: <EventsRoot />,
        children: [
          {
            index: true, element: <EventsPage />, loader: eventsLoader
          },
          {
            path: ':eventId',
            id: 'event-detail',
            loader: eventDetailLoader,
            children: [
              {
                index: true,
                element: <EventDetailPage />,
                action: deleteEventAction
              },
              { 
                path: 'edit', 
                element: <EditEventPage />, 
                action: manipulateEventAction,
                loader: checkAuthLoader,
              }
            ]
          },

          { 
            path: 'new', 
            element: <NewEventPage />, 
            action: manipulateEventAction,
            loader: checkAuthLoader,
          },

        ],
      },
      {
        path: 'auth',
        element: <AuthenticationPage />,
        action: authAction,
      },
      {
        path: 'newsletter',
        element: <NewsletterPage />,
        action: newsletterAction,
      },
      {
        path: 'logout',
        action: logoutAction,
      }

    ]
  }
]);


function App() {
  return (<RouterProvider router={router} />);
}

export default App;
