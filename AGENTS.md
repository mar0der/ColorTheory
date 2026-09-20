# ColorTheory project notes

This project is a static Docker-served site for `colortheory.petarpetkov.com`.

Production operations follow the shared company runbooks at:
`/Users/petarpetkov/Developer/ABillionDollarCompany/docs/shared/`

- Runtime slug: `/opt/color-theory`
- Shared Docker network: `web_network`
- Public TLS terminator: `main_proxy`
- Application container: `color-theory-web`
