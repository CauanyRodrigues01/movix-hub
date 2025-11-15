import { Outlet } from "react-router-dom";

import Styles from "./AdminLayout.module.css";
import Sidebar from "../../components/Sidebar/Sidebar";
import Header from "../../components/Header/Header";

function AdminLayout() {
  return (
    <div className={Styles.adminContainer}>
      <Sidebar/>
      <div className={Styles.content}>
        <Header />
        <div className={Styles.pageContent}>
        <Outlet />
        </div>
      </div>
    </div>
  );
}

export default AdminLayout;