import { createBrowserRouter } from "react-router";
import { RootLayout } from '@app/layout';
import { HomePage } from "@home/ui/HomePage.tsx";

export const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      }
    ]
  }
])
