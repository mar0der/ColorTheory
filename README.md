# Hue / Нюанс

An interactive bilingual color theory studio in Bulgarian and English.

## Local preview

Because the site is static, open `dist/index.html` directly or run:

```sh
python3 -m http.server 4173 --directory dist
```

## Production shape

The site is served by the `nginx:alpine` container on the shared `web_network`. It intentionally publishes no host port; the shared `main_proxy` handles public HTTPS for `colortheory.petarpetkov.com`.

Production runtime files belong under `/opt/color-theory/` on `the18th`. See the company runbooks at `/Users/petarpetkov/Developer/ABillionDollarCompany/docs/shared/` for DNS, certificate, proxy, and deployment steps.

## Checks

```sh
docker build -t color-theory-web .
docker run --rm -p 8080:80 color-theory-web
```
