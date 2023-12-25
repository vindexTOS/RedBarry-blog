import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./Pages/Home/Home";
import LayOut from "./LayOut";
import AddBlog from "./Pages/Add_Blog/AddBlog";

function App() {
  const router = [
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "/blog",
      element: <AddBlog />,
    },
    {
      path: "/blog/:id",
      element: <AddBlog />,
    },
  ];

  type ReactRouteType = {
    path: string;
    element: JSX.Element;
    outlet?: ReactRouteType[];
  };
  return (
    <LayOut>
      <Routes>
        {router.map((route: ReactRouteType) => {
          const { path, element, outlet } = route;
          if (outlet) {
            return (
              <Route key={path} path={path} element={element}>
                {outlet.map((outletRoute) => {
                  const { path, element } = outletRoute;
                  return <Route key={path} path={path} element={element} />;
                })}
              </Route>
            );
          } else {
            return <Route key={path} path={path} element={element} />;
          }
        })}
      </Routes>
    </LayOut>
  );
}

export default App;
