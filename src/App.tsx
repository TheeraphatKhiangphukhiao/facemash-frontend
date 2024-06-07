// import './App.css'

import { RouterProvider, createBrowserRouter } from "react-router-dom";
import VotePage from "./Pages/vote page/VotePage";
import Login_CreateAccountPage from "./Pages/login_create accout/Login_CreateAccountPage";
import AccountPage from "./Pages/account page/AccountPage";
import DrawerLeft from "./components/drawer/Drawer";
import RankingPage from "./Pages/ranking page/RankingPage";
import PhotosPage from "./Pages/PhotosPage/PhotosPage";
import ViewThePhotoPage from "./Pages/PhotosPage/view the photo page/ViewThePhotoPage";
import AllUsersPage from "./Pages/all users page/AllUsersPage";
import AddPhotoPage from "./Pages/PhotosPage/add photo page/AddPhotoPage";
import EditThePhotoPage from "./Pages/PhotosPage/edit the photo/EditThePhotoPage";

function App() {
  // สร้าง path ของแต่ละหน้า
  const routers = createBrowserRouter([

    // path เริ่มต้น ถ้ายังไม่ login ก็สามารถ vote ได้
    { path: "/", element: <Login_CreateAccountPage /> },

    // หน้าต่างๆที่มีการแสดงแถบทางด้านซ้าย
    {
      path: "/Drawer",
      element: <DrawerLeft />,
      children: [
        { path: "/Drawer/vote", element: <VotePage /> },
        { path: "/Drawer/ranking", element: <RankingPage /> },
        { path: "/Drawer/photos", element: <PhotosPage /> },
        { path: "/Drawer/account", element: <AccountPage /> },
        { path: "/Drawer/allUsers", element: <AllUsersPage />}
      ],
    },
    { path: '/viewThePhoto', element: <ViewThePhotoPage /> },
    { path: '/addPhoto', element: <AddPhotoPage /> },
    { path: '/editThePhoto', element: <EditThePhotoPage /> },
  ]);

  return (
    <>
      <RouterProvider router={routers} />
    </>
  );
}

export default App;
