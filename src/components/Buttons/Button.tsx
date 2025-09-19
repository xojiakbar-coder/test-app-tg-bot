import { Button as MatineButtonComponent } from '@mantine/core';
import type { ButtonProps, ElementProps } from '@mantine/core';

interface MyButtonProps extends ButtonProps, ElementProps<'button', keyof ButtonProps> {
  height?: number;
}
const Button = ({ height, ...others }: MyButtonProps) => {
  return <MatineButtonComponent style={{ height }} {...others} />;
};

export default Button;
