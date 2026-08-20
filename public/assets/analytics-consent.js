(function () {
  "use strict";

  var measurementId = "G-1W5BVE1EZM";
  var consentVersion = "2026-08-20";
  var storageKey = "portivo_cookie_consent";
  var lifetimeMs = 180 * 24 * 60 * 60 * 1000;
  var analyticsLoaded = false;
  var activeDialog = null;
  var previousFocus = null;

  window.dataLayer = window.dataLayer || [];
  window.gtag = window.gtag || function () {
    window.dataLayer.push(arguments);
  };

  window.gtag("consent", "default", {
    analytics_storage: "denied",
    ad_storage: "denied",
    ad_user_data: "denied",
    ad_personalization: "denied",
    wait_for_update: 500
  });
  window.gtag("set", "ads_data_redaction", true);

  function scriptRoot() {
    var source = document.currentScript && document.currentScript.src;
    return source ? new URL("../", source) : new URL("/", window.location.href);
  }

  var rootUrl = scriptRoot();
  var privacyUrl = new URL("privacy.html", rootUrl).href;
  var cookieUrl = new URL("cookie-policy.html", rootUrl).href;

  function readConsent() {
    try {
      var saved = JSON.parse(window.localStorage.getItem(storageKey));
      if (!saved || saved.version !== consentVersion || typeof saved.timestamp !== "number") return null;
      if (Date.now() - saved.timestamp > lifetimeMs) return null;
      return { analytics: saved.analytics === true };
    } catch (error) {
      return null;
    }
  }

  function writeConsent(analytics) {
    try {
      window.localStorage.setItem(storageKey, JSON.stringify({
        version: consentVersion,
        timestamp: Date.now(),
        analytics: analytics === true
      }));
    } catch (error) {
      return;
    }
  }

  function deleteAnalyticsCookies() {
    document.cookie.split(";").forEach(function (item) {
      var name = item.split("=")[0].trim();
      if (name === "_ga" || name.indexOf("_ga_") === 0) {
        [window.location.hostname, "." + window.location.hostname, ""].forEach(function (domain) {
          document.cookie = name + "=; Max-Age=0; path=/" + (domain ? "; domain=" + domain : "") + "; SameSite=Lax";
        });
      }
    });
  }

  function loadAnalytics() {
    if (analyticsLoaded) return;
    analyticsLoaded = true;
    window.gtag("consent", "update", {
      analytics_storage: "granted",
      ad_storage: "denied",
      ad_user_data: "denied",
      ad_personalization: "denied"
    });
    window.gtag("js", new Date());
    window.gtag("config", measurementId, {
      allow_google_signals: false,
      allow_ad_personalization_signals: false
    });

    var script = document.createElement("script");
    script.async = true;
    script.src = "https://www.googletagmanager.com/gtag/js?id=" + encodeURIComponent(measurementId);
    document.head.appendChild(script);
  }

  function applyConsent(analytics, reloadAfterRevocation) {
    var previous = readConsent();
    writeConsent(analytics);
    if (analytics) {
      loadAnalytics();
    } else {
      window.gtag("consent", "update", {
        analytics_storage: "denied",
        ad_storage: "denied",
        ad_user_data: "denied",
        ad_personalization: "denied"
      });
      deleteAnalyticsCookies();
    }
    closeDialog();
    if (reloadAfterRevocation && previous && previous.analytics && !analytics) window.location.reload();
  }

  function addStyles() {
    if (document.getElementById("portivo-consent-styles")) return;
    var style = document.createElement("style");
    style.id = "portivo-consent-styles";
    style.textContent =
      ".pc-consent{position:fixed;z-index:10000;left:20px;right:20px;bottom:20px;max-width:1080px;margin:auto;padding:24px;background:#121116;color:#fff;border:1px solid #3b3742;box-shadow:0 24px 70px rgba(18,17,22,.34);font-family:Manrope,Arial,sans-serif}" +
      ".pc-consent-grid{display:grid;grid-template-columns:minmax(0,1fr) auto;gap:30px;align-items:center}.pc-consent h2{margin:0 0 7px;font-size:20px;letter-spacing:-.02em}.pc-consent p{margin:0;color:#dedbe5;font-size:14px;line-height:1.55}.pc-consent a{color:#c9b9ff;text-decoration:underline;text-underline-offset:3px}" +
      ".pc-actions{display:flex;gap:10px;align-items:center}.pc-button{min-height:44px;padding:0 15px;border:1px solid #d8d3e0;background:transparent;color:#fff;font:700 13px Manrope,Arial,sans-serif;cursor:pointer;white-space:nowrap}.pc-button.choice{background:#fff;color:#121116;border-color:#fff}.pc-button:hover{border-color:#a98eff}.pc-button.choice:hover{background:#eee9ff}.pc-button:focus-visible,.pc-settings:focus-visible,.pc-close:focus-visible{outline:3px solid #a98eff;outline-offset:3px}" +
      ".pc-overlay{position:fixed;z-index:10001;inset:0;display:grid;place-items:center;padding:20px;background:rgba(18,17,22,.68)}.pc-panel{width:min(620px,100%);max-height:min(760px,calc(100vh - 40px));overflow:auto;background:#f7f6f2;color:#121116;border:1px solid #dedbe5;box-shadow:0 28px 90px rgba(0,0,0,.35)}.pc-panel-head{display:flex;justify-content:space-between;gap:20px;padding:24px;border-bottom:1px solid #dedbe5}.pc-panel h2{margin:0 0 6px;font-size:25px}.pc-panel p{margin:0;color:#5f5b66;font-size:14px;line-height:1.6}.pc-close{width:38px;height:38px;border:1px solid #dedbe5;background:#fff;font-size:22px;cursor:pointer}.pc-panel-body{padding:22px 24px}.pc-category{display:grid;grid-template-columns:1fr auto;gap:22px;padding:18px 0;border-bottom:1px solid #dedbe5}.pc-category:first-child{padding-top:0}.pc-category h3{margin:0 0 5px;font-size:16px}.pc-category small{display:block;color:#5f5b66;line-height:1.5}.pc-toggle{width:48px;height:26px;margin:0;accent-color:#7348f5}.pc-required{color:#087b59;font-size:12px;font-weight:800}.pc-panel-actions{display:flex;justify-content:flex-end;gap:10px;padding:18px 24px;border-top:1px solid #dedbe5}.pc-panel .pc-button{color:#121116;border-color:#121116}.pc-panel .pc-button.choice{background:#121116;color:#fff}.pc-settings{border:0;background:transparent;color:inherit;padding:0;font:inherit;text-decoration:underline;text-underline-offset:3px;cursor:pointer}" +
      "body.pc-lock{overflow:hidden}@media(max-width:760px){.pc-consent{left:10px;right:10px;bottom:10px;padding:19px}.pc-consent-grid{display:block}.pc-actions{display:grid;grid-template-columns:1fr 1fr;margin-top:17px}.pc-actions .pc-button:first-child{grid-column:1/-1}.pc-button{white-space:normal}.pc-panel-actions{display:grid;grid-template-columns:1fr 1fr}.pc-panel-actions .pc-button:last-child{grid-column:1/-1}.pc-overlay{padding:10px}.pc-panel{max-height:calc(100vh - 20px)}}";
    style.textContent += ".pc-settings{color:inherit;font-weight:400;opacity:.82}.pc-settings:hover{opacity:1;color:#562ac9}";
    document.head.appendChild(style);
  }

  function trapFocus(event) {
    if (!activeDialog || event.key !== "Tab") return;
    var focusable = activeDialog.querySelectorAll("a[href],button:not([disabled]),input:not([disabled])");
    if (!focusable.length) return;
    var first = focusable[0];
    var last = focusable[focusable.length - 1];
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  }

  function closeDialog() {
    if (!activeDialog) return;
    activeDialog.removeEventListener("keydown", trapFocus);
    activeDialog.remove();
    activeDialog = null;
    document.body.classList.remove("pc-lock");
    if (previousFocus) previousFocus.focus();
    previousFocus = null;
  }

  function showSettings() {
    closeDialog();
    previousFocus = document.activeElement;
    var saved = readConsent();
    var overlay = document.createElement("div");
    overlay.className = "pc-overlay";
    overlay.innerHTML =
      '<section class="pc-panel" role="dialog" aria-modal="true" aria-labelledby="pc-settings-title">' +
      '<div class="pc-panel-head"><div><h2 id="pc-settings-title">Cookie preferences</h2><p>Choose whether Portivo may use optional analytics. Necessary storage is always active.</p></div><button class="pc-close" type="button" aria-label="Close cookie settings">×</button></div>' +
      '<div class="pc-panel-body"><div class="pc-category"><div><h3>Strictly necessary</h3><small>Stores your cookie preference and supports essential site operation. It is not used for advertising.</small></div><span class="pc-required">Always active</span></div>' +
      '<div class="pc-category"><div><h3>Analytics</h3><small>Google Analytics helps measure page visits, navigation and technical usage so the website can be improved. Google advertising and personalization signals remain disabled.</small></div><input class="pc-toggle" id="pc-analytics-toggle" type="checkbox" aria-label="Allow analytics cookies"' + (saved && saved.analytics ? " checked" : "") + '></div>' +
      '<p style="margin-top:18px">Read the <a href="' + cookieUrl + '">Cookie Policy</a> and <a href="' + privacyUrl + '">Privacy Policy</a>.</p></div>' +
      '<div class="pc-panel-actions"><button class="pc-button choice" type="button" data-action="reject">Reject optional</button><button class="pc-button" type="button" data-action="save">Save selection</button><button class="pc-button choice" type="button" data-action="accept">Accept analytics</button></div></section>';
    overlay.addEventListener("click", function (event) {
      var action = event.target.closest("[data-action]");
      if (event.target.closest(".pc-close")) {
        closeDialog();
        if (!readConsent()) showBanner();
        return;
      }
      if (!action) return;
      if (action.dataset.action === "reject") applyConsent(false, true);
      if (action.dataset.action === "accept") applyConsent(true, false);
      if (action.dataset.action === "save") applyConsent(overlay.querySelector("#pc-analytics-toggle").checked, true);
    });
    activeDialog = overlay;
    document.body.appendChild(overlay);
    document.body.classList.add("pc-lock");
    overlay.addEventListener("keydown", trapFocus);
    overlay.querySelector(".pc-close").focus();
  }

  function showBanner() {
    closeDialog();
    var banner = document.createElement("section");
    banner.className = "pc-consent";
    banner.setAttribute("role", "dialog");
    banner.setAttribute("aria-modal", "true");
    banner.setAttribute("aria-labelledby", "pc-title");
    banner.innerHTML =
      '<div class="pc-consent-grid"><div><h2 id="pc-title">Your privacy choices</h2><p>Portivo uses necessary storage for your preference. With your permission, Google Analytics measures website usage. Analytics is off until you accept. Read our <a href="' + cookieUrl + '">Cookie Policy</a>.</p></div>' +
      '<div class="pc-actions"><button class="pc-button" type="button" data-action="settings">Customize</button><button class="pc-button choice" type="button" data-action="reject">Reject optional</button><button class="pc-button choice" type="button" data-action="accept">Accept analytics</button></div></div>';
    banner.addEventListener("click", function (event) {
      var action = event.target.closest("[data-action]");
      if (!action) return;
      if (action.dataset.action === "settings") showSettings();
      if (action.dataset.action === "reject") applyConsent(false, false);
      if (action.dataset.action === "accept") applyConsent(true, false);
    });
    activeDialog = banner;
    document.body.appendChild(banner);
    banner.addEventListener("keydown", trapFocus);
    banner.querySelector('[data-action="settings"]').focus();
  }

  function addSettingsLinks() {
    var hosts = document.querySelectorAll("footer .footer-utility,.docs-footer");
    hosts.forEach(function (host) {
      if (!host.querySelector(".pc-settings")) {
        if (host.classList.contains("docs-footer")) host.appendChild(document.createTextNode(" · "));
        var button = document.createElement("button");
        button.type = "button";
        button.className = "pc-settings";
        button.textContent = "Cookie settings";
        host.appendChild(button);
      }
      var contactScope = host.closest("footer") || host;
      if (!contactScope.querySelector('a[href="mailto:info@portivo.org"]')) {
        if (host.classList.contains("docs-footer")) host.appendChild(document.createTextNode(" · "));
        var contact = document.createElement("a");
        contact.href = "mailto:info@portivo.org";
        contact.textContent = "Contact";
        host.appendChild(contact);
      }
    });
    document.querySelectorAll(".pc-settings").forEach(function (button) {
      if (button.dataset.cookieSettingsBound) return;
      button.dataset.cookieSettingsBound = "true";
      button.addEventListener("click", showSettings);
    });
  }

  function init() {
    addStyles();
    addSettingsLinks();
    var saved = readConsent();
    if (!saved) {
      deleteAnalyticsCookies();
      try {
        window.localStorage.removeItem("portivo_analytics_consent");
      } catch (error) {
        // The preference banner still works when storage access is unavailable.
      }
      showBanner();
    } else if (saved.analytics) {
      loadAnalytics();
    } else {
      deleteAnalyticsCookies();
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
