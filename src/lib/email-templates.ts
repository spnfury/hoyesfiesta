interface WelcomeEmail {
  subject: string;
  html: string;
  text: string;
}

const SITE_URL = "https://hoyesfiesta.com";

export function buildWelcomeEmail(): WelcomeEmail {
  const subject = "Bienvenido a Hoy Es Fiesta";

  const text = [
    "¡Gracias por suscribirte!",
    "",
    "Te avisaremos unas semanas antes de cada puente y festivo importante en España, con ideas de escapada y los puentes más rentables del año.",
    "",
    "Sin spam. Sin compartir tu email. Sólo puentes.",
    "",
    `Mientras tanto, echa un vistazo al calendario completo de festivos 2026 y al optimizador de vacaciones: ${SITE_URL}`,
    "",
    "Para darte de baja, responde a este email con la palabra BAJA y te eliminaremos.",
    "",
    "— Hoy Es Fiesta",
  ].join("\n");

  const html = `<!doctype html>
<html lang="es">
  <body style="margin:0;padding:0;background:#faf7f2;font-family:Georgia,'Times New Roman',serif;color:#1f1c18;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background:#faf7f2;padding:40px 16px;">
      <tr>
        <td align="center">
          <table role="presentation" width="540" cellpadding="0" cellspacing="0" border="0" style="background:#ffffff;border:1px solid #e8e1d4;padding:40px;max-width:540px;">
            <tr>
              <td style="text-align:center;padding-bottom:24px;border-bottom:1px solid #e8e1d4;">
                <p style="margin:0;font-family:Georgia,serif;font-size:11px;letter-spacing:0.18em;text-transform:uppercase;color:#8a7e6c;">Hoy Es Fiesta</p>
                <h1 style="margin:8px 0 0 0;font-family:Georgia,serif;font-weight:normal;font-size:28px;color:#1f1c18;">Bienvenido a bordo</h1>
              </td>
            </tr>
            <tr>
              <td style="padding:32px 0;font-size:16px;line-height:1.7;color:#3a352d;">
                <p style="margin:0 0 16px 0;">Te avisaremos unas semanas antes de cada puente y festivo importante en España, con ideas de escapada y los puentes más rentables del año.</p>
                <p style="margin:0 0 24px 0;color:#8a7e6c;font-size:14px;">Sin spam. Sin compartir tu email. Sólo puentes.</p>
                <p style="margin:0;text-align:center;">
                  <a href="${SITE_URL}/optimizador" style="display:inline-block;padding:12px 28px;background:#b3492e;color:#ffffff;text-decoration:none;font-family:Georgia,serif;font-size:13px;letter-spacing:0.16em;text-transform:uppercase;">Calcular mis días libres</a>
                </p>
              </td>
            </tr>
            <tr>
              <td style="padding-top:24px;border-top:1px solid #e8e1d4;text-align:center;font-size:11px;letter-spacing:0.16em;text-transform:uppercase;color:#8a7e6c;">
                <p style="margin:0;">Para darte de baja, responde con &laquo;BAJA&raquo;.</p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;

  return { subject, html, text };
}
