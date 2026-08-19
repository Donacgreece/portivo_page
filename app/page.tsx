const capabilities = [
  ["01", "Find", "Locate an endpoint", "Search by MAC, IP, hostname, UNP identity or VLAN and correlate live fleet evidence."],
  ["02", "Diagnose", "Understand the port", "Inspect link state, media, counters, PoE, LLDP, MAC and recent activity in one read-only view."],
  ["03", "Act", "Execute with control", "Preview verified catalog actions, choose targets explicitly and keep work inside per-device queues."],
  ["04", "Audit", "Preserve the evidence", "Connect jobs, audit history, fleet findings and PDF reports to the action that created them."],
];

const features = [
  ["Live Port Operations", "A logical front panel with live state, VLAN, media and controlled port actions.", "LP"],
  ["Find Device", "Evidence-led endpoint location with live SSH correlation and edge-port ranking.", "FD"],
  ["Fleet Audits", "Nine read-only operational assessments with conservative evidence handling.", "FA"],
  ["Automation", "Approved runbooks, variables, target limits, concurrency policy and schedules.", "AU"],
  ["Access Control", "Built-in and custom roles with exact capabilities and server-enforced scope.", "AC"],
  ["Power Awareness", "SNMPv3 UPS telemetry, incidents and protected-switch correlation.", "PW"],
];

export default function Home() {
  return (
    <main>
      <header className="site-header">
        <a className="brand" href="#top" aria-label="Portivo home"><img src="/assets/portivo-logo-color.svg" alt="Portivo" /></a>
        <nav aria-label="Primary navigation">
          <a href="#workflow">Workflow</a><a href="#capabilities">Capabilities</a><a href="#security">Security</a>
          <a href="/docs/">Docs</a><a className="nav-cta" href="https://github.com/Donacgreece/Portivo">GitHub ↗</a>
        </nav>
      </header>

      <section className="hero" id="top">
        <div className="hero-copy">
          <div className="kicker"><span /> Open-source network operations</div>
          <h1>Network control.<br/><em>Without the noise.</em></h1>
          <p className="hero-lede">Portivo turns compatible ALE OmniSwitch fleets into one clear operational workspace—for finding, diagnosing, acting and proving what happened.</p>
          <div className="actions">
            <a className="button primary" href="https://github.com/Donacgreece/Portivo/releases">Download v2.0.0 <span>↗</span></a>
            <a className="button secondary" href="/docs/">Explore the docs <span>→</span></a>
          </div>
          <div className="proof"><span>AGPL-3.0</span><span>AOS 6 + AOS 8</span><span>Windows + Linux</span><span>Self-hosted</span></div>
        </div>
        <div className="product-frame">
          <div className="frame-top"><i/><i/><i/><span>PORTIVO / CONTROL CENTER</span><b>LIVE</b></div>
          <img src="/assets/hero-collage.jpg" alt="Portivo dashboard, live ports and administration interface" />
          <div className="signal-card"><small>FLEET STATUS</small><strong><i/> Operational</strong><span>Live evidence across every managed site</span></div>
        </div>
      </section>

      <section className="metrics" aria-label="Portivo product metrics">
        <div><strong>149</strong><span>Catalog actions</span></div><div><strong>9</strong><span>Fleet audits</span></div>
        <div><strong>23</strong><span>Capabilities</span></div><div><strong>9 + Auto</strong><span>UPS driver modes</span></div>
      </section>

      <section className="section workflow" id="workflow">
        <div className="section-intro"><div><span className="label">THE OPERATIONAL LOOP</span><h2>From signal to certainty.</h2></div><p>One continuous workflow keeps the target, evidence, command preview, execution and audit history connected.</p></div>
        <div className="workflow-grid">{capabilities.map(([n,tag,title,copy]) => <article key={n}><div className="step-head"><span>{n}</span><b>{tag}</b></div><h3>{title}</h3><p>{copy}</p><i className="connector">→</i></article>)}</div>
      </section>

      <section className="section dark" id="capabilities">
        <div className="section-intro"><div><span className="label">BUILT FOR OPERATORS</span><h2>The tools that move work forward.</h2></div><p>Deep operational support without turning every task into a collection of disconnected utilities.</p></div>
        <div className="feature-grid">{features.map(([title,copy,code]) => <article key={title}><span className="feature-code">{code}</span><h3>{title}</h3><p>{copy}</p><a href="/docs/">Learn more →</a></article>)}</div>
      </section>

      <section className="section platform">
        <div className="platform-copy"><span className="label">COMPATIBILITY FIRST</span><h2>Deep ALE support.<br/>Deliberately focused.</h2><p>Portivo treats AOS 6 and AOS 8 as independent command families, with dedicated driver identities, compatibility metadata and conservative runtime capability learning.</p><ul><li><b>AOS 6 + AOS 8</b><span>Separate command profiles, not fragile translation.</span></li><li><b>Per-device learning</b><span>Avoid repeated incompatible attempts.</span></li><li><b>ALE-aware PoE</b><span>Slot-qualified status collection.</span></li></ul></div>
        <div className="terminal-card" aria-label="Portivo architecture">
          <div className="terminal-title"><span>ARCHITECTURE / LIVE MAP</span><b>v2.0.0</b></div>
          <div className="node browser">Browser UI</div><i className="line l1"/><div className="node core">PORTIVO<br/><small>FASTAPI APPLICATION</small></div><i className="line l2"/>
          <div className="node sub n1">Authentication<br/><small>RBAC + Scope</small></div><div className="node sub n2">Jobs & Audits<br/><small>Evidence trail</small></div><div className="node sub n3">AOS Drivers<br/><small>6 + 8</small></div>
          <div className="terminal-foot"><span>SSH → OmniSwitch</span><span>SNMPv3 → UPS</span><span>SQLite → State</span></div>
        </div>
      </section>

      <section className="section security" id="security">
        <div className="security-heading"><span className="label">SECURITY BY DESIGN</span><h2>Explicit trust boundaries.<br/>Auditable by default.</h2><p>Self-hosted control stays inside your management boundary, with deliberate safeguards around identity, credentials and action execution.</p><a className="text-link" href="/docs/security/hardening.html">Read the hardening guide →</a></div>
        <div className="security-list"><article><span>01</span><div><h3>Personal SSH sessions</h3><p>User SSH passwords are session-only and never become shared switch credentials.</p></div></article><article><span>02</span><div><h3>Encrypted automation secrets</h3><p>Unattended credentials and webhook endpoints are protected by the application secret.</p></div></article><article><span>03</span><div><h3>Preview before execution</h3><p>Operational changes remain tied to explicit targets, jobs and activity evidence.</p></div></article><div className="notice"><b>DEPLOYMENT NOTE</b><p>Designed for trusted management networks. Terminate TLS at a trusted reverse proxy and never expose TCP 8766 directly to the public Internet.</p></div></div>
      </section>

      <section className="closing"><div><span className="label">PORTIVO CONTROL CENTER 2.0.0</span><h2>Operate the network.<br/>Keep the evidence.</h2></div><div><p>Explore installation, operations, automation, security, drivers and the complete reference.</p><div className="actions"><a className="button light" href="/docs/">Open documentation →</a><a className="button outline" href="https://github.com/Donacgreece/Portivo">View source ↗</a></div></div></section>
      <footer><img src="/assets/portivo-logo-color.svg" alt="Portivo"/><p>Independent network operations platform.</p><div><a href="/docs/">Documentation</a><a href="#security">Security</a><a href="https://github.com/Donacgreece/Portivo">GitHub</a></div><small>© 2026 Dimitris Galatsanos · AGPL-3.0-only</small></footer>
    </main>
  );
}
