import { useMemo } from "react";
import jsonParser from "./jsonParser";
import { storage } from "@/core/services";

interface IUser {
  id: string;
  first_name: string;
  last_name: string;
  username: string;
  is_premium: boolean;
  language_code: string;
  allows_write_to_pm: boolean;
  photo_url: string;
}

interface IUserMapped {
  userId: string;
  firstName: string;
  lastName: string;
  userName: string;
  isPremium: boolean;
  languageCode: string;
  allowsWriteToPm: boolean;
  photoUrl: string;
}

function getUserData(): IUserMapped {
  return useMemo(() => {
    try {
      const raw = storage.local.get("user");
      const parsed = jsonParser(raw || "{}");
      const user = parsed?.user as IUser | undefined;

      return {
        userId: user?.id ?? "",
        firstName: user?.first_name ?? "",
        lastName: user?.last_name ?? "",
        userName: user?.username ?? "",
        isPremium: user?.is_premium ?? false,
        languageCode: user?.language_code ?? "en",
        allowsWriteToPm: user?.allows_write_to_pm ?? false,
        photoUrl: user?.photo_url ?? "",
      };
    } catch (err) {
      console.error("Invalid user:", err);
      return {
        userId: "",
        firstName: "",
        lastName: "",
        userName: "",
        isPremium: false,
        languageCode: "en",
        allowsWriteToPm: false,
        photoUrl: "",
      };
    }
  }, []);
}

export default getUserData;
