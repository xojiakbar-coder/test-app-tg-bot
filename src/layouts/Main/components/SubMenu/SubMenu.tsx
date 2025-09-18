import * as RouterDom from "react-router-dom";
import * as SubMenuNavigation from "./navigation";

// styles
import styles from "./SubMenu.module.scss";
import { useDriverCheck } from "@/modules/driver/hooks";

const SubMenu = () => {
  const location = RouterDom.useLocation();
  const {
    data: { isDriver: driver },
  } = useDriverCheck();

  console.log(driver);

  const navItems = driver
    ? SubMenuNavigation.driver_nav
    : SubMenuNavigation.passenger_nav;

  return (
    <div className={styles.container}>
      {navItems.map(({ path, icon: Icon, title }) => {
        const isActive = Array.isArray(path)
          ? path.includes(location.pathname)
          : location.pathname === path;

        const to = Array.isArray(path) ? path[0] : path;

        return (
          <RouterDom.NavLink
            key={to}
            to={to}
            className={`${styles.nav_link} ${isActive ? styles.active : ""}`}
          >
            <Icon className={styles.icon} />
            <span className={styles.label}>{title}</span>
          </RouterDom.NavLink>
        );
      })}
    </div>
  );
};

export default SubMenu;
