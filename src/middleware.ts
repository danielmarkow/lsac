import { withClerkMiddleware } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// eslint-disable-next-line
export default withClerkMiddleware((req: NextRequest) => {
  return NextResponse.next();
});

// Stop Middleware running on static files
export const config = {
  matcher: "/((?!_next/image|_next/static|lsac-favicon.png).*)",
};
