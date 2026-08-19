# Portivo Control Center Website

[![Live Website](https://img.shields.io/badge/Live%20Website-7348F5?style=for-the-badge&logo=github)](https://donacgreece.github.io/portivo_page/)
[![Version](https://img.shields.io/badge/version-2.0.0-121116?style=for-the-badge)](https://github.com/Donacgreece/Portivo/releases)
[![License](https://img.shields.io/badge/license-AGPL--3.0-35a77b?style=for-the-badge)](https://www.gnu.org/licenses/agpl-3.0.html)

Professional product website and documentation portal for **Portivo Control
Center v2.0.0**.

## Live website

**https://donacgreece.github.io/portivo_page/**

The website is deployed automatically through GitHub Pages whenever a commit is
pushed to the `main` branch.

## About Portivo

Portivo is an independent, self-hosted network operations platform for
compatible Alcatel-Lucent Enterprise OmniSwitch environments. It centralizes
inventory, live port visibility, troubleshooting, controlled CLI operations,
fleet audits, automation and power awareness in one operational workspace.

### Highlights

- ALE AOS 6 and AOS 8 operational support
- Live port state, VLAN, media, PoE and LLDP visibility
- Evidence-led endpoint location
- Controlled command preview and execution
- Nine read-only fleet audits
- Automation runbooks and schedules
- Granular role and scope enforcement
- SNMPv3 UPS monitoring and switch correlation
- Windows and Linux installation packages
- Self-hosted, AGPL-3.0-only distribution

## Repository structure

```text
.
├── .github/workflows/deploy-pages.yml  # GitHub Pages deployment
├── public/
│   ├── index.html                      # Product landing page
│   ├── assets/                         # Brand, artwork and styling
│   ├── docs/                           # Complete v2.0.0 documentation
│   ├── og.png                          # Social sharing image
│   └── .nojekyll                       # Static publishing marker
└── README.md
```

## Local preview

No framework, package manager or build step is required. Serve the `public`
directory with any static HTTP server.

Using Python:

```powershell
python -m http.server 8080 --directory public
```

Then open `http://localhost:8080/`.

## Deployment

The workflow in `.github/workflows/deploy-pages.yml` publishes the complete
`public/` directory to GitHub Pages. GitHub Pages must use **GitHub Actions** as
its deployment source under repository **Settings → Pages**.

To deploy a change:

```powershell
git add -A
git commit -m "Update Portivo website"
git push origin HEAD:main
```

## Documentation

The documentation portal covers installation, architecture, authentication,
credentials, operations, automation, observability, power monitoring,
administration, security hardening and the complete reference material for
Portivo Control Center v2.0.0.

## Security notice

Portivo is intended for trusted management networks. Do not expose TCP 8766
directly to the public Internet. Use a trusted reverse proxy, HTTPS and
restricted administrative ingress.

## Related repositories

- Product source and releases: https://github.com/Donacgreece/Portivo
- Website source: https://github.com/Donacgreece/portivo_page

## License

Portivo is distributed under the **GNU Affero General Public License v3.0
only (AGPL-3.0-only)**.

Copyright © 2026 Dimitris Galatsanos.
