import { Role } from "@prisma/client";
import { ISODateString } from "next-auth";
import { useSession } from "next-auth/react";

interface SessionT {
  user?: {
    name?: string;
    email?: string;
    image?: string;
    id?: string;
    role?: Role;
  };
  expires: ISODateString;
}

export function useRole() {
  const { data } = useSession();
  const session = data as SessionT;

  return {
    isAdmin: session?.user?.role === Role["ADMIN"],
    isSuperAdmin: session?.user?.role === Role["SUPER_ADMIN"],
    isUser: session?.user?.role === Role["USER"],
  };
}
