import { Outlet } from "react-router-dom";

// components
import SubMenu from "./components/SubMenu";

// styles
import styles from "./Main.module.scss";

const Main = () => {
  return (
    <div className={styles.layout}>
      <div className={styles.content}>
        <Outlet />
      </div>

      {/* Sub Menu */}
      <SubMenu />
    </div>
  );
};

export default Main;
