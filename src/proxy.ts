import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { timingSafeEqual } from "node:crypto";

/**
 * HTTP Basic Auth para /admin/*.
 * Las credenciales se comparan en tiempo constante. Si faltan las env vars,
 * el admin queda completamente bloqueado (503), nunca abierto.
 *
 * NOTA: el doc de Next.js 16 (proxy.md) advierte que un cambio de matcher o
 * mover lógica a una Server Function puede saltarse el proxy en silencio.
 * Por eso `src/app/admin/page.tsx` también valida credenciales por su cuenta.
 */
export function proxy(request: NextRequest) {
  const username = process.env.ADMIN_USERNAME ?? "admin";
  const password = process.env.ADMIN_PASSWORD;

  if (!password) {
    return new NextResponse("Admin no configurado (falta ADMIN_PASSWORD)", {
      status: 503,
    });
  }

  const header = request.headers.get("authorization") ?? "";
  if (!header.startsWith("Basic ")) {
    return unauthorized();
  }

  let decoded: string;
  try {
    decoded = Buffer.from(header.slice("Basic ".length), "base64").toString(
      "utf8",
    );
  } catch {
    return unauthorized();
  }

  const sepIdx = decoded.indexOf(":");
  if (sepIdx === -1) return unauthorized();

  const providedUser = decoded.slice(0, sepIdx);
  const providedPass = decoded.slice(sepIdx + 1);

  if (!safeEqual(providedUser, username) || !safeEqual(providedPass, password)) {
    return unauthorized();
  }

  return NextResponse.next();
}

function unauthorized() {
  return new NextResponse("Authentication required", {
    status: 401,
    headers: {
      "WWW-Authenticate": 'Basic realm="hoyesfiesta admin", charset="UTF-8"',
    },
  });
}

function safeEqual(a: string, b: string): boolean {
  const ab = Buffer.from(a, "utf8");
  const bb = Buffer.from(b, "utf8");
  if (ab.length !== bb.length) {
    // timingSafeEqual exige misma longitud. Comparamos contra ab dummy para no
    // filtrar diferencia de longitud por timing.
    timingSafeEqual(ab, ab);
    return false;
  }
  return timingSafeEqual(ab, bb);
}

export const config = {
  matcher: "/admin/:path*",
};
