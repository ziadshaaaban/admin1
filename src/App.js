import Login from "./components/login";
import Admin from "./components/admin";

import { Routes, Route, useLocation } from "react-router-dom";
import Upload from "./components/upload";
import Database from "./components/database";
import Users from "./components/users";
import Side from "./components/side";
import Search from "./components/search";
import Confirm from "./components/confirm";
import Header from "./components/header";
import Citizen from "./components/citzenid";
import Verify from "./components/verify";
import Logs from "./components/logs";
import Restpass from "./components/resetpass";
import Tranuser from "./components/tranuser";

import React, { useEffect } from 'react';


function App() {

  useEffect(() => {
    // Check if local storage flag is set
    const clearLocalStorageFlag = localStorage.getItem('clearLocalStorageFlag');
    if (!clearLocalStorageFlag) {
      // Clear local storage
      localStorage.clear();
      // Set flag in local storage
      localStorage.setItem('clearLocalStorageFlag', 'true');
    }
  }, []);


  const location = useLocation();
  const isLogin = ['/upload', '/', '/verify'].includes(location.pathname);
  return (

    <div className="App">
      <Header />
      {!isLogin && <Side />
      }
      <Routes>

        <Route path="/" element={<Login />}
        />
        <Route path="upload" element={<Upload />}
        />

        <Route path="admin" element={<Admin />} />

        <Route path="confirm" element={<Confirm />} />

        <Route path="database" element={<Database />} />
        <Route path="users" element={<Users />} />
        <Route path="side" element={<Side />} />
        <Route path="search" element={<Search />} />
        <Route path="citzen" element={<Citizen />} />
        <Route path="verify" element={<Verify />} />


        <Route path="logs" element={<Logs />} />
        <Route path="resetpass" element={<Restpass />} />


        <Route path="tranuser" element={<Tranuser />} />

      </Routes>

    </div>
  );
}
export default App;