import { Outlet } from "react-router-dom";

import styles from "./AdminLayout.module.css";
import Sidebar from "../../components/Sidebar/Sidebar";

function AdminLayout() {
  return (
    <div className={styles.adminLayout}>
      <Sidebar/>
      <div className={styles.content}>
        <Outlet />
      </div>
    </div>
  );
}

export default AdminLayout;