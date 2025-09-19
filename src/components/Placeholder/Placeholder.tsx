import React from "react";
import { Text } from "@mantine/core";
import { IconInbox } from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";
import type { TablerIcon } from "@tabler/icons-react";

// styles
import styles from "./Placeholder.module.scss";
import { Button } from "../Button";

interface IProps {
  title: string;
  hasIcon?: boolean;
  icon?: TablerIcon;
  subtitle?: string;
  fullHeight?: boolean;
  externalLink?: string;
  internalLink?: string;
  buttonContent?: string;
  buttonOnClick?: () => void;
}

const Placeholder: React.FC<IProps> = ({
  title,
  subtitle,
  icon: Icon,
  hasIcon = true,
  externalLink = "",
  internalLink = "",
  fullHeight = false,
  buttonContent = "",
  buttonOnClick,
}) => {
  const navigate = useNavigate();

  return (
    <div className={`${styles.empty_page} ${fullHeight && styles.full_height}`}>
      {hasIcon &&
        (Icon ? (
          <Icon className={styles.icon} />
        ) : (
          <IconInbox className={styles.icon} />
        ))}

      <Text size="lg" className={styles.title}>
        {title}
      </Text>
      {subtitle && (
        <Text size="sm" className={styles.subtitle}>
          {subtitle}
        </Text>
      )}

      {buttonContent && !externalLink && !internalLink && (
        <Button size="sm" onClick={buttonOnClick}>
          {buttonContent}
        </Button>
      )}

      {buttonContent && externalLink && !internalLink && (
        <a href={externalLink} target="_blank" rel="noopener noreferrer">
          <Button size="sm" onClick={buttonOnClick}>
            {buttonContent}
          </Button>
        </a>
      )}

      {buttonContent && internalLink && !externalLink && (
        <Button size="sm" onClick={() => navigate(internalLink)}>
          {buttonContent}
        </Button>
      )}
    </div>
  );
};

export default Placeholder;
