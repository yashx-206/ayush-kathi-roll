import { next } from '@vercel/functions';

/**
 * Private preview gate (Vercel Routing Middleware).
 * Visitors see a password screen until they enter the access password.
 * To change the password, replace PASSWORD_SHA256 with the SHA-256 hex of the new password.
 * To make the site public, delete this file.
 */
const PASSWORD_SHA256 = 'c35239477a356c880a12d5cffed74834f3da79efc36c938bf36203030c98e0b4';
const COOKIE = 'akr_access';
const UNLOCK_PATH = '/__unlock';

// Files that stay public so shared links still show a preview image and icon
const PUBLIC_FILES = new Set(['/og-image.jpg', '/favicon.svg', '/apple-touch-icon.png']);

export const config = {
  matcher: '/:path*',
};

const sha256 = async (text: string) => {
  const bytes = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(text));
  return [...new Uint8Array(bytes)].map((b) => b.toString(16).padStart(2, '0')).join('');
};

const sessionToken = () => sha256(`${PASSWORD_SHA256}:akr-session-v1`);

const readCookie = (request: Request, name: string) => {
  const header = request.headers.get('cookie') || '';
  for (const part of header.split(';')) {
    const [key, ...rest] = part.trim().split('=');
    if (key === name) return rest.join('=');
  }
  return null;
};

const loginPage = (error: boolean) => `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<meta name="robots" content="noindex, nofollow" />
<title>Ayush Kathi Roll · Private Preview</title>
<link rel="icon" type="image/svg+xml" href="/favicon.svg" />
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Cinzel:wght@700;900&family=Plus+Jakarta+Sans:wght@400;600;700&display=swap" />
<style>
  *{box-sizing:border-box;margin:0}
  body{min-height:100vh;display:flex;align-items:center;justify-content:center;padding:24px;background:radial-gradient(circle at 50% 30%,#1c1208 0%,#060608 60%);color:#eae7e1;font-family:'Plus Jakarta Sans',system-ui,sans-serif}
  .card{width:100%;max-width:380px;padding:36px 28px;border-radius:20px;background:linear-gradient(180deg,rgba(28,25,23,.85),rgba(0,0,0,.92));border:1px solid rgba(180,83,9,.45);box-shadow:0 30px 80px rgba(0,0,0,.6);text-align:center}
  .logo{width:52px;height:52px;margin:0 auto 18px;border-radius:14px;display:flex;align-items:center;justify-content:center;background:linear-gradient(135deg,#450a0a,#451a03);border:1px solid rgba(245,158,11,.45)}
  h1{font-family:'Cinzel',serif;font-size:22px;font-weight:900;letter-spacing:.06em;color:#fff}
  .sub{margin-top:6px;font-size:11px;font-weight:700;letter-spacing:.25em;text-transform:uppercase;color:#f59e0b}
  p{margin:18px 0 22px;font-size:13px;line-height:1.6;color:#a8a29e}
  input{width:100%;padding:13px 14px;border-radius:12px;border:1px solid ${error ? '#ef4444' : '#292524'};background:#000;color:#fff;font:inherit;font-size:15px;outline:none}
  input:focus{border-color:#f59e0b}
  .err{margin-top:8px;font-size:12px;color:#f87171;text-align:left}
  button{width:100%;margin-top:14px;padding:14px;border:0;border-radius:12px;background:linear-gradient(90deg,#d97706,#f59e0b,#d97706);color:#0c0a09;font:inherit;font-size:12px;font-weight:700;letter-spacing:.18em;text-transform:uppercase;cursor:pointer}
</style>
</head>
<body>
<form class="card" method="POST" action="${UNLOCK_PATH}">
  <div class="logo"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#fbbf24" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"/></svg></div>
  <h1>AYUSH KATHI ROLL</h1>
  <div class="sub">Private Preview</div>
  <p>This website is shared privately. Enter the access password to view it.</p>
  <input type="password" name="password" placeholder="Access password" autocomplete="current-password" autofocus required />
  ${error ? '<div class="err">That password is not correct. Please try again.</div>' : ''}
  <button type="submit">View Website</button>
</form>
</body>
</html>`;

const html = (body: string, status: number) =>
  new Response(body, {
    status,
    headers: { 'content-type': 'text/html; charset=utf-8', 'cache-control': 'no-store', 'x-robots-tag': 'noindex' },
  });

export default async function middleware(request: Request) {
  const url = new URL(request.url);
  if (PUBLIC_FILES.has(url.pathname)) return next();

  const token = await sessionToken();

  if (url.pathname === UNLOCK_PATH && request.method === 'POST') {
    const form = await request.formData();
    const password = String(form.get('password') || '');
    if ((await sha256(password)) !== PASSWORD_SHA256) return html(loginPage(true), 401);
    return new Response(null, {
      status: 303,
      headers: {
        location: '/',
        'set-cookie': `${COOKIE}=${token}; Path=/; Max-Age=2592000; HttpOnly; Secure; SameSite=Lax`,
        'cache-control': 'no-store',
      },
    });
  }

  if (readCookie(request, COOKIE) === token) return next();
  return html(loginPage(false), 401);
}
