import { type FC } from "react";
import { Section, Cell, List } from "@telegram-apps/telegram-ui";

import { Page } from "@/components/Page.tsx";
import { Link } from "@/components/Link/Link.tsx";

import styles from "./Style.module.scss";

export const IndexPage: FC = () => {
  return (
    <Page back={false}>
      <List>
        <Section
          className={styles.list}
          header="Features"
          footer="You can use these pages to learn more about features, provided by Telegram Mini Apps and other useful projects"
        >
          <Cell subtitle="User data, chat information, technical data">
            Init Data
          </Cell>
        </Section>
        <Section
          header="Application Launch Data"
          footer="These pages help developer to learn more about current launch information"
        >
          <Link to="/init-data">
            <Cell subtitle="User data, chat information, technical data">
              Init Data
            </Cell>
          </Link>
          <Link to="/launch-params">
            <Cell subtitle="Platform identifier, Mini Apps version, etc.">
              Launch Parameters
            </Cell>
          </Link>
        </Section>
      </List>
    </Page>
  );
};
