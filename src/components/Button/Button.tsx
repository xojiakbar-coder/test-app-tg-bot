import { Button as MantineButton } from "@mantine/core";

import * as Types from "./internal/types";

// styles
import cx from "clsx";
import styles from "./Button.module.scss";

export const Button = ({
  children,
  className,
  color,
  full,
  htmlType,
  size = "md",
  effective = false,
  variant = "filled",
  ...props
}: Types.IBase.IProps) => (
  <MantineButton
    size={size}
    type={htmlType}
    variant={variant}
    classNames={{
      root: styles.btn_root,
      inner: styles.btn_inner,
      label: styles.btn_label,
      section: styles.btn_section,
    }}
    data-fullwidth={full && full.toString()}
    className={cx(
      styles.button,
      color && styles[color],
      effective && !props.disabled && styles.btn_root_effective,
      className
    )}
    {...props}
  >
    {children}
  </MantineButton>
);

export default Button;
