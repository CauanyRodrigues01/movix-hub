import { Outlet } from "react-router-dom";

import Styles from "./AdminLayout.module.css";
import Sidebar from "../../components/Sidebar/Sidebar";
import Header from "../../components/Header/Header";
import { useState } from "react";

function AdminLayout() {

  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className={Styles.adminContainer}>

      <Sidebar onCollapseChange={setCollapsed} />

      <div className={`
        ${Styles.content}
        ${collapsed ? Styles.collapsedContent : ""}
      `}>
        <Header />
        <div className={Styles.pageContent}>
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default AdminLayout;