import { useEffect } from "react";
import Header from "./components/Header";
import { Navigate, Routes, Route, useLocation } from "react-router-dom";
import { cn } from "./lib/utils";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Theme } from "@carbon/react";
import { useSelector, useDispatch } from "react-redux";

import Home from "./views/Home";
import Login from "./views/Login";
import Register from "./views/Register";
import Dashboard from "./views/Dashboard";
import Advert from "./views/Advert";
import Job from "./views/Job";
import MyAdverts from "./views/MyAdverts";

import { loadAdverts } from "./lib/actions/advertsActions";
import { loadApplications } from "./lib/actions/applicationsActions";

function App() {
  const location = useLocation();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);

  useEffect(() => {
    if (user) {
      dispatch(loadApplications());
    }
    dispatch(loadAdverts());
  }, [user]);

  return (
    <>
      <Header />
      <Theme theme="g100">
        <main
          className={cn(
            "container flex min-h-[calc(100dvh_-_3rem_-_1px)] flex-1 flex-col",
          )}
        >
          <Routes key={location.pathname} location={location}>
            <Route exact path="/" element={<Home />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route
              path="/dashboard"
              element={user ? <Dashboard /> : <Navigate to="/login" />}
            />
            <Route
              path="/advert"
              element={user ? <Advert /> : <Navigate to="/login" />}
            />
            <Route
              path="/advert/:id"
              element={user ? <Advert /> : <Navigate to="/login" />}
            />
            <Route
              path="/my-adverts"
              element={user ? <MyAdverts /> : <Navigate to="/login" />}
            />
            <Route path="job/:id" element={<Job />} />
          </Routes>
        </main>
      </Theme>
      <ToastContainer />
    </>
  );
}

export default App;
