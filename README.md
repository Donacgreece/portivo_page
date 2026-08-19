<p align="center"><a href="https://portivo.org/"><img src="public/assets/portivo-logo-color.svg" alt="Portivo Control Center" width="300"></a></p>

<h1 align="center">Portivo Control Center</h1>

<p align="center"><strong>Control without complexity.</strong><br>Self-hosted network operations for compatible ALE OmniSwitch environments.</p>

<p align="center"><a href="https://portivo.org/">Website</a> · <a href="https://portivo.org/docs/">Documentation</a> · <a href="https://github.com/Donacgreece/Portivo/releases">Releases</a> · <a href="https://github.com/Donacgreece/Portivo">Application source</a></p>

## Overview

Portivo Control Center is an independent, self-hosted network operations platform for compatible Alcatel-Lucent Enterprise OmniSwitch environments running AOS 6 and AOS 8.

It gives network teams one controlled workspace for fleet inventory, live port visibility, endpoint discovery, diagnostics, operational changes, automation, auditing and power awareness. The platform is designed to reduce repetitive CLI work while preserving the target, evidence, authorization, execution result and audit history of each operation.

Portivo follows a compatibility-first model. AOS 6 and AOS 8 are treated as separate command families with dedicated profiles, drivers and runtime capability evidence. Unsupported or incomplete device output reduces coverage; it is not converted into a false health conclusion.

## Why Portivo

Network operations often require several disconnected steps: identify an endpoint, find the correct switch, inspect the port, determine the platform syntax, apply a change, verify the result and document what happened. Portivo connects those steps inside one governed workflow.

The platform is intended for teams that need:

- a consistent operational view across distributed OmniSwitch environments;
- faster endpoint and port troubleshooting with live supporting evidence;
- safer execution through exact previews and explicit target selection;
- strict separation between personal access and unattended credentials;
- durable Jobs, activity history and reports for operational accountability;
- controlled automation with approval, scope and concurrency limits;
- server-enforced roles and Site or Group boundaries;
- evidence-based correlation between switch availability and UPS state.

## Core capabilities

### Fleet inventory

Maintain a centralized inventory of managed switches organized by Site and Group. Device records preserve management identity, expected AOS family, availability and operational context. Import and verification workflows support larger estates without removing per-device validation.

### Live Port Inventory

Inspect administrative state, physical link, alias, VLAN, media and PoE information through a logical front-panel workspace. Supported stacks are presented by chassis member, and interfaces that cannot be mapped safely remain separate from the physical panel.

### Find Device

Search for an endpoint by MAC address, IP address, hostname, UNP identity, profile or VLAN evidence. Portivo correlates ARP, forwarding, UNP and LLDP data, then distinguishes likely edge locations from upstream observations. The latest verified MAC location can provide bounded last-known context when an endpoint is not currently visible.

### Port Troubleshooter

Run an on-demand, read-only diagnostic against one physical port. The workflow collects interface state, media, error counters, PoE, learned MACs, UNP and LLDP evidence through one serialized device session. Unknown output remains explicitly unreported rather than inferred.

### Controlled operations

Select an action, provide only the required parameters, review exact target-specific commands and execute through a durable Job. Automated work on the same switch uses a strict FIFO lane, while operations against different switches can proceed with bounded concurrency.

Configuration-changing actions are tracked as pending until an authorized operator deliberately writes the intended switch configuration to flash.

### Jobs and audit evidence

Every execution creates a Job with per-target results. Queued, running, cancelling, completed, failed, cancelled and interrupted states remain distinct. Service restarts reconcile unfinished work without discarding completed target evidence. Search, filters and generated reports support change records and incident review.

### Fleet Audits

Run structured, read-only assessments for thermal health, cooling, power supplies, PoE capacity, interface errors, port stability, managed uplinks, persistent configuration and full switch health. Reports preserve normalized findings, evidence coverage, affected components, verification guidance and compatibility limitations.

### Runbooks and automation

Create reusable workflows with typed COMMAND, WAIT and VERIFY steps, bounded variables, target limits and concurrency policy. Editing an approved Runbook returns it to Draft. Before execution, the fully rendered definition is copied into the Job as an immutable snapshot.

Scheduled operations use a dedicated encrypted Automation credential. Target scope and safety limits are evaluated again when scheduled work is created.

### Monitoring and notifications

Full monitoring can independently enable switch availability, stack health, power monitoring and incident detection. Management-only mode pauses background workers while retaining inventory, credentials, assignments, routing and history.

Confirmed incidents can be routed to Microsoft Teams or Power Automate, Slack, Discord and Generic JSON destinations. Each destination has its own event and Site or Group policy. Delivery state is persisted before network transmission, and one failed destination does not block another.

### Power infrastructure

Manage UPS devices as first-class infrastructure assets and assign the switches they physically protect. SNMPv3 monitoring supports standards-based and vendor-aware driver paths. Portivo collects only metrics exposed by the active device and correlates network outages with power evidence only when an assignment and valid telemetry support that conclusion.

### Access control

Built-in and custom roles combine exact capabilities with Site and Group scope. Authorization is enforced by application APIs rather than treated as a visual menu filter. Operational access, Terminal access, platform administration, credential management, Runbook approval and power management can remain separate responsibilities.

## Operational model

```text
Find the target
      ↓
Collect current evidence
      ↓
Preview the exact operation
      ↓
Authorize and execute
      ↓
Verify the result
      ↓
Persist configuration when required
      ↓
Retain Job and audit evidence
```

Portivo does not use configuration-changing commands as experimental probes. Action compatibility is resolved through the detected AOS family, registered driver metadata and learned read-only capability evidence. Explicit device rejections can be remembered against the exact device identity so incompatible variants are not repeatedly sent.

## Architecture

```text
Authorized browser
        │
        ▼
Portivo application
        ├── Authentication and session management
        ├── Roles, capabilities and organizational scope
        ├── Inventory and latest operational state
        ├── Jobs, audits, reports and scheduling
        ├── Notification and incident delivery
        ├── ALE AOS 6 and AOS 8 drivers
        ├── Per-device SSH coordinator ─────► OmniSwitch fleet
        ├── SNMPv3 power drivers ───────────► UPS infrastructure
        └── SQLite operational database
```

The browser is not the security boundary. Authentication, scope, capability, parameter and action checks are repeated by the backend. A live operation owns one device lease for its complete transaction so another automated Job or interactive terminal cannot overtake it on the same switch.

## Supported environment

### Network platforms

- Compatible ALE OmniSwitch systems using AOS 6 command profiles.
- Compatible ALE OmniSwitch systems using AOS 8 command profiles.
- Model and software support can vary by individual action.

The driver foundation is extensible, but the current product interface does not claim support for unrelated switch vendors.

### Server platforms

- Windows 10 or Windows 11 x64.
- Supported Windows Server x64 editions.
- Debian 12 or newer.
- Ubuntu Server 24.04 LTS or newer.
- Compatible modern systemd Linux environments.

Use the release-specific requirements and installer documentation before a production deployment.

## Security model

Portivo is an administrative system intended for trusted management networks. It should not be exposed directly to the public Internet.

The security model includes:

- local bootstrap administration and personal SSH-backed user sessions;
- progressive login throttling;
- signed application sessions;
- session-only personal SSH passwords;
- separately encrypted monitoring, automation and webhook secrets;
- server-enforced capabilities and organizational scope;
- exact command preview and parameter validation;
- strict per-device execution coordination;
- explicit pending-configuration tracking;
- WebSocket Origin validation for the interactive terminal;
- protected maintenance workflows with impact limits;
- durable Job and Audit Log evidence.

Production deployments should terminate HTTPS at a maintained reverse proxy, forward WebSocket upgrades, restrict browser ingress to authorized networks and trust forwarded headers only from explicit proxy addresses. Protect the application database, environment configuration and every backup as sensitive operational material.

Read the complete [security hardening guide](https://portivo.org/docs/security/hardening.html) before enabling production access.

## Installation

Portivo releases provide matching source and Windows or Linux installer archives with published SHA-256 checksums.

Recommended deployment sequence:

1. Download all artifacts from the same release revision.
2. Verify every archive against the published checksum manifest.
3. Review the release requirements and upgrade notes.
4. Install the application through the supported service installer.
5. Configure a unique application secret and bootstrap administrator.
6. Place the service behind a trusted HTTPS reverse proxy.
7. Restrict direct access to the application listener.
8. Add one representative switch and verify read-only workflows.
9. Configure named roles, monitoring credentials and backup ownership.
10. Import the wider fleet only after the acceptance checks succeed.

Detailed procedures are available in the [complete product handbook](https://portivo.org/docs/handbook.html) and the [installation documentation](https://portivo.org/docs/getting-started/requirements.html).

## Documentation

The public documentation covers:

- requirements, Windows installation and Linux installation;
- network placement, HTTPS and reverse-proxy configuration;
- architecture, authentication, credentials and access control;
- Dashboard, inventory, Live Ports and device discovery;
- diagnostics, Operations, Terminal, Jobs and persistent saves;
- Fleet Audits and evidence-rich reports;
- Runbooks, schedules, UNP and VLAN safeguards;
- monitoring modes, incidents and destination routing;
- UPS onboarding, telemetry and protected-switch assignments;
- administration, backup, restore, upgrades and maintenance;
- security hardening and incident troubleshooting;
- action, API, driver, environment and role references.

Start at [portivo.org/docs](https://portivo.org/docs/) or open the [complete handbook](https://portivo.org/docs/handbook.html).

## Project resources

| Resource | Location |
| --- | --- |
| Product website | [portivo.org](https://portivo.org/) |
| Documentation | [portivo.org/docs](https://portivo.org/docs/) |
| Application source | [github.com/Donacgreece/Portivo](https://github.com/Donacgreece/Portivo) |
| Releases | [github.com/Donacgreece/Portivo/releases](https://github.com/Donacgreece/Portivo/releases) |
| Public website repository | [github.com/Donacgreece/portivo_page](https://github.com/Donacgreece/portivo_page) |

## Contributing and responsible reporting

Review the contribution guidance in the application source repository before proposing product changes. Keep contributions focused, explain the operational problem being solved and include validation appropriate to the affected AOS family or platform component.

Do not publish credentials, customer configurations, private network details or unpatched security findings in public issues. Use the project's documented private reporting path for security-sensitive material.

## Repository note

This repository publishes the official product website and public documentation. The application implementation, release packages and product development history are maintained in the [Portivo application repository](https://github.com/Donacgreece/Portivo).

## License and independence

Portivo-owned source code is licensed under the **GNU Affero General Public License v3.0 only**, identified as `AGPL-3.0-only`. Third-party components remain under their respective licenses.

Portivo is an independent project. It is not affiliated with, endorsed by, sponsored by or supported by ALE International, Alcatel-Lucent Enterprise or Nokia. Product names are used only to describe technical compatibility.

Copyright © 2026 Dimitris Galatsanos.
