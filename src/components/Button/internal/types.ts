import type { ButtonProps } from '@mantine/core';

export declare namespace IBase {
  type ExtendedVariant =
    | NonNullable<ButtonProps['variant']>
    | 'primary'
    | 'secondary'
    | 'secondary-out'
    | 'primary-out'
    | 'link'
    | 'info'
    | 'success'
    | 'warning'
    | 'danger'
    | 'info-out'
    | 'success-out'
    | 'warning-out'
    | 'danger-out';

  interface IProps extends ButtonProps {
    className?: string;
    effective?: boolean;
    variant?: ExtendedVariant;
    full?: boolean;
    htmlType?: 'button' | 'submit' | 'reset';
    onClick?: (e?: React.MouseEvent<HTMLButtonElement>) => void;
  }
}

export declare namespace IUse {}
