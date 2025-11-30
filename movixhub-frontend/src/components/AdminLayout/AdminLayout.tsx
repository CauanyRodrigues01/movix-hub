import { useState } from "react";
import { Outlet } from "react-router-dom";

import Styles from "./AdminLayout.module.css";
import { Footer, MainHeader, Sidebar } from "../common/Layout";

function AdminLayout() {

  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className={Styles.adminContainer}>

      <Sidebar onCollapseChange={setCollapsed} />

      <div className={`
        ${Styles.content}
        ${collapsed ? Styles.collapsedContent : ""}
      `}>
        <MainHeader />
        <div className={Styles.pageContent}>
          <div className={Styles.pageWrapper}>
            <Outlet />
          </div>
          <Footer isCollapsed={collapsed} />
        </div>
      </div>
    </div>
  );
}

export default AdminLayout;