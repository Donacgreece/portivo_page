# Portivo

[![Website](https://img.shields.io/badge/Website-portivo.org-7348F5?style=for-the-badge)](https://portivo.org/)
[![Documentation](https://img.shields.io/badge/Documentation-online-121116?style=for-the-badge)](https://portivo.org/docs/)
[![License](https://img.shields.io/badge/License-AGPL--3.0-35A77B?style=for-the-badge)](https://www.gnu.org/licenses/agpl-3.0.html)

**Portivo Control Center** is an independent, self-hosted network operations
platform for compatible Alcatel-Lucent Enterprise OmniSwitch environments. It
brings inventory, live operational visibility, troubleshooting, controlled
actions, auditing, automation and power awareness into one consistent
workspace.

This repository contains the official Portivo product website and its public
documentation portal.

## Official links

- Website: [portivo.org](https://portivo.org/)
- Documentation: [portivo.org/docs](https://portivo.org/docs/)
- Application source: [github.com/Donacgreece/Portivo](https://github.com/Donacgreece/Portivo)
- Releases: [github.com/Donacgreece/Portivo/releases](https://github.com/Donacgreece/Portivo/releases)
- Website source: [github.com/Donacgreece/portivo_page](https://github.com/Donacgreece/portivo_page)

## What Portivo is designed for

Portivo supports day-to-day network operations across compatible ALE
OmniSwitch fleets. Its operational model keeps the selected scope, collected
evidence, command preview, execution results and audit history connected.

The platform is intended for teams that need to:

- maintain a structured inventory of switches, sites and groups;
- inspect live port, link, VLAN, media, PoE, LLDP and endpoint evidence;
- locate endpoints using MAC, IP, hostname, UNP identity or VLAN data;
- troubleshoot network conditions without immediately making changes;
- preview and execute approved operational actions against explicit targets;
- preserve job history and audit evidence;
- run controlled automation and scheduled operational workflows;
- correlate switch availability with UPS telemetry and power incidents;
- enforce role, capability and organizational scope boundaries.

## Core capabilities

### Fleet and switch operations

Portivo provides centralized fleet visibility and switch-focused operational
views for compatible AOS 6 and AOS 8 systems. Driver identities and command
profiles remain separate for each command family rather than relying on unsafe
one-size-fits-all translation.

### Live port operations

Logical front-panel views combine current administrative and link state with
alias, VLAN, media, PoE, LLDP and endpoint information. Controlled actions stay
connected to the selected switch and port.

### Endpoint location

Find Device correlates available evidence to help operators identify the most
likely switch and edge port for a device. Results distinguish live evidence
from historical or incomplete observations.

### Auditing and evidence

Read-only fleet assessments, job records, audit history and generated reports
preserve operational context. Portivo is designed to avoid presenting an
assumption as a verified fact.

### Automation

Runbooks and schedules support approved command, wait and verification steps,
with variables, explicit targets, concurrency controls and operational limits.

### Access control

Built-in and custom roles can be mapped to granular capabilities. Site and
group scope is enforced by the application rather than treated as a visual
filter.

### Power awareness

SNMPv3 UPS monitoring normalizes battery, runtime, load and power-state
telemetry and can correlate protected switches with power incidents without
claiming an unverified root cause.

## Architecture

Portivo follows a self-hosted operational architecture:

```text
Browser
   │
   ▼
Portivo web interface
   │
   ▼
Application services
   ├── Authentication and access control
   ├── Inventory and operational state
   ├── Jobs, audits and scheduling
   ├── ALE AOS 6 and AOS 8 drivers
   ├── SSH coordination ─────────────► OmniSwitch
   ├── SNMPv3 monitoring ────────────► UPS
   └── Application database
```

## Security model

Portivo is intended for trusted management networks. Recommended deployment
practices include:

- terminate TLS at a trusted reverse proxy;
- restrict browser access to authorized administrative networks;
- never expose the application service port directly to the public Internet;
- trust forwarded proxy headers only from explicitly configured proxies;
- use personal, session-scoped SSH credentials for interactive operations;
- protect unattended credentials with the application secret;
- apply least-privilege roles and organizational scope;
- review command previews, job results and audit history.

Detailed guidance is available in the
[security and hardening documentation](https://portivo.org/docs/security/hardening.html).

## Website repository

The website is deliberately dependency-free and is published as static files.
No framework runtime, package installation or build step is required.

```text
.
├── .github/
│   └── workflows/
│       └── deploy-pages.yml   # Automated GitHub Pages deployment
├── public/
│   ├── index.html             # Product website
│   ├── assets/                # Brand assets, screenshots and styles
│   ├── docs/                  # Documentation portal
│   ├── og.png                 # Social sharing artwork
│   └── .nojekyll              # Static publishing configuration
└── README.md
```

## Local preview

Serve the `public` directory with any static HTTP server. For example:

```powershell
python -m http.server 8080 --directory public
```

Then open:

```text
http://localhost:8080/
```

## Deployment

Every push to `main` triggers the GitHub Pages workflow and publishes the
contents of `public/`.

```powershell
git add -A
git commit -m "Update Portivo website"
git push origin HEAD:main
```

The custom domain is configured as `portivo.org`. DNS for the apex domain and
the `www` alias must point to GitHub Pages, and HTTPS should be enforced from
the repository Pages settings.

## Documentation maintenance

Public documentation lives under `public/docs/` and is organized by topic:

- getting started and installation;
- concepts and architecture;
- operations and troubleshooting;
- automation and scheduling;
- observability and notifications;
- power monitoring;
- administration;
- security and deployment;
- API, environment and driver reference;
- release history.

Release-specific facts belong in the release history and relevant reference
pages. The main website and README describe Portivo as an evolving platform.

## License

Portivo is distributed under the **GNU Affero General Public License v3.0 only
(AGPL-3.0-only)**. Review the application repository and documentation for the
complete licensing and attribution information.

Copyright © 2026 Dimitris Galatsanos.
