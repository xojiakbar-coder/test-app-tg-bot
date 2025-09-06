import React from "react";
import { Button } from "../Button";
import { Text } from "@mantine/core";
import { IconInbox } from "@tabler/icons-react";
import styles from "./EmptyPage.module.scss";
import { useNavigate } from "react-router-dom";
import type { TablerIcon } from "@tabler/icons-react";

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

const EmptyPage: React.FC<IProps> = ({
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
        <Button
          variant="primary"
          onClick={buttonOnClick}
          className={styles.button}
        >
          {buttonContent}
        </Button>
      )}

      {buttonContent && externalLink && !internalLink && (
        <a href={externalLink} target="_blank" rel="noopener noreferrer">
          <Button
            variant="primary"
            onClick={buttonOnClick}
            className={styles.button}
          >
            {buttonContent}
          </Button>
        </a>
      )}

      {buttonContent && internalLink && !externalLink && (
        <Button
          variant="primary"
          onClick={() => navigate(internalLink)}
          className={styles.button}
        >
          {buttonContent}
        </Button>
      )}
    </div>
  );
};

export default EmptyPage;
