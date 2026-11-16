"use client";

import { usePathname } from "next/navigation";
import { isBareRoute } from "@/lib/page-config";

/**
 * Renders the site's chrome — header, footer, the floating buttons — except
 * on the bare landing routes in `lib/page-config.ts`, which carry their own.
 * The root layout wraps each piece of chrome in this rather than every
 * component checking the path for itself.
 */
export function SiteChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  if (isBareRoute(pathname)) return null;
  return <>{children}</>;
}
