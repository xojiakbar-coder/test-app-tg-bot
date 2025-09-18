import * as TelegramAppSdk from "@telegram-apps/sdk-react";
import { type DisplayDataRow } from "@/components/DisplayData/DisplayData.tsx";

function getUserRows(user: TelegramAppSdk.User): DisplayDataRow[] {
  return Object.entries(user).map(([title, value]) => ({ title, value }));
}

export default getUserRows;
