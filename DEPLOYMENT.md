# Deployment: GitHub Pages + ntuia.org (GoDaddy)

## 1. Push the code to GitHub

1. On github.com, create a **public** repository named `NTUIA` under the `Akarsth` account. Do not add a README or .gitignore.
2. From this folder:

```bash
git remote add origin https://github.com/Akarsth/NTUIA.git
git push -u origin main
```

## 2. Turn on GitHub Pages

1. Repository → **Settings → Pages**.
2. Under **Build and deployment → Source**, choose **GitHub Actions**.
3. Open the **Actions** tab. The "Deploy to GitHub Pages" run should finish green within about a minute. Re-run it if it started before you switched the source.

## 3. Set the custom domain

1. **Settings → Pages → Custom domain**: enter `ntuia.org` and save.
2. The `public/CNAME` file already contains `ntuia.org`, so the domain survives every redeploy.
3. Recommended: verify the domain under your GitHub profile **Settings → Pages → Verified domains** to prevent takeover.

## 4. GoDaddy DNS

GoDaddy → **Domains → ntuia.org → DNS**.

Delete any existing `A` record for `@` that points to GoDaddy parking or forwarding, and any `CNAME` for `www`. Also turn off GoDaddy domain **Forwarding** if it is on.
**Do not touch** `MX`, `TXT` (SPF/DKIM/verification), or `NS` records. Those run email and the domain itself.

Add:

| Type | Name | Value | TTL |
| --- | --- | --- | --- |
| A | @ | 185.199.108.153 | 1 hour |
| A | @ | 185.199.109.153 | 1 hour |
| A | @ | 185.199.110.153 | 1 hour |
| A | @ | 185.199.111.153 | 1 hour |
| CNAME | www | akarsth.github.io | 1 hour |

Optional IPv6 (`AAAA`, name `@`): `2606:50c0:8000::153`, `2606:50c0:8001::153`, `2606:50c0:8002::153`, `2606:50c0:8003::153`.

Check propagation (can take from minutes up to 24 hours):

```bash
dig +short ntuia.org
dig +short www.ntuia.org
```

## 5. HTTPS

1. Back in **Settings → Pages**, wait for "DNS check successful".
2. Tick **Enforce HTTPS**. The certificate can take up to an hour to issue after DNS resolves.
3. Test `https://ntuia.org` and `https://www.ntuia.org`. The `www` address redirects to the apex.

## 6. Updating the site

```bash
git add .
git commit -m "Update website content"
git push origin main
```

The workflow rebuilds and redeploys automatically.

## Notes

- `vite.config.js` uses `base: '/'` because the site lives at the domain root. To test at `https://akarsth.github.io/NTUIA/` before the domain works, temporarily set `base: '/NTUIA/'`.
- The build copies `index.html` to `404.html` so links like `/events` work on refresh.
- The contact form opens the visitor's email app. It has no backend. For server-side submissions, connect a form service such as Formspree.
- Dependencies are set to `latest` and CI runs `npm install`, so each deploy uses the newest library versions. If a future release breaks the build, the Actions run fails and the live site stays on the previous version.
