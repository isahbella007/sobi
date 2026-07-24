import { createNavigation } from "next-intl/navigation";
import { routing } from "./routing";

// Locale-aware equivalents of next/navigation's Link/usePathname/useRouter
// — automatically add/strip the /en or /de prefix so components never have
// to think about it.
export const { Link, redirect, usePathname, useRouter, getPathname } =
  createNavigation(routing);
