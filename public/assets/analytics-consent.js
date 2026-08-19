(function () {
  "use strict";

  var measurementId = "G-1W5BVE1EZM";
  var storageKey = "portivo_analytics_consent";
  var loaded = false;

  function getChoice() {
    try {
      return window.localStorage.getItem(storageKey);
    } catch (error) {
      return null;
    }
  }

  function saveChoice(value) {
    try {
      window.localStorage.setItem(storageKey, value);
    } catch (error) {
      return;
    }
  }

  function loadAnalytics() {
    if (loaded) return;
    loaded = true;

    window.dataLayer = window.dataLayer || [];
    window.gtag = function () {
      window.dataLayer.push(arguments);
    };
    window.gtag("js", new Date());
    window.gtag("consent", "default", {
      analytics_storage: "granted",
      ad_storage: "denied",
      ad_user_data: "denied",
      ad_personalization: "denied"
    });
    window.gtag("config", measurementId, {
      anonymize_ip: true,
      allow_google_signals: false,
      allow_ad_personalization_signals: false
    });

    var script = document.createElement("script");
    script.async = true;
    script.src = "https://www.googletagmanager.com/gtag/js?id=" + encodeURIComponent(measurementId);
    document.head.appendChild(script);
  }

  function removeDialog() {
    var dialog = document.getElementById("portivo-consent");
    if (dialog) dialog.remove();
  }

  function setChoice(value) {
    saveChoice(value);
    removeDialog();
    if (value === "granted") loadAnalytics();
  }

  function showDialog() {
    removeDialog();

    var dialog = document.createElement("section");
    dialog.id = "portivo-consent";
    dialog.className = "portivo-consent";
    dialog.setAttribute("role", "dialog");
    dialog.setAttribute("aria-modal", "true");
    dialog.setAttribute("aria-labelledby", "portivo-consent-title");
    dialog.innerHTML =
      '<div class="portivo-consent-copy">' +
      '<strong id="portivo-consent-title">Analytics preferences</strong>' +
      '<p>Portivo uses optional Google Analytics to understand site usage and improve the website. Analytics loads only if you accept.</p>' +
      '</div><div class="portivo-consent-actions">' +
      '<button type="button" data-consent="denied">Reject</button>' +
      '<button type="button" class="primary" data-consent="granted">Accept analytics</button>' +
      "</div>";

    dialog.addEventListener("click", function (event) {
      var button = event.target.closest("[data-consent]");
      if (button) setChoice(button.getAttribute("data-consent"));
    });
    document.body.appendChild(dialog);
    dialog.querySelector("button").focus();
  }

  function addSettingsControl() {
    var host = document.querySelector("footer div") || document.querySelector(".docs-footer");
    if (!host || document.getElementById("cookie-settings")) return;

    var button = document.createElement("button");
    button.id = "cookie-settings";
    button.className = "cookie-settings";
    button.type = "button";
    button.textContent = "Cookie settings";
    button.addEventListener("click", showDialog);
    host.appendChild(button);
  }

  function addStyles() {
    var style = document.createElement("style");
    style.textContent =
      ".portivo-consent{position:fixed;z-index:1000;left:24px;right:24px;bottom:24px;max-width:900px;margin:auto;display:flex;align-items:center;justify-content:space-between;gap:28px;padding:22px 24px;background:#11131a;color:#fff;border:1px solid rgba(255,255,255,.18);box-shadow:0 20px 60px rgba(20,12,45,.28)}" +
      ".portivo-consent-copy{max-width:620px}.portivo-consent strong{font-size:18px}.portivo-consent p{margin:6px 0 0;color:#d7d8df;font-size:14px;line-height:1.5}" +
      ".portivo-consent-actions{display:flex;gap:10px;flex-shrink:0}.portivo-consent button,.cookie-settings{font:inherit;cursor:pointer}" +
      ".portivo-consent button{padding:11px 15px;border:1px solid #fff;background:transparent;color:#fff;font-weight:700}.portivo-consent button.primary{border-color:#7348f5;background:#7348f5}" +
      ".portivo-consent button:focus-visible,.cookie-settings:focus-visible{outline:3px solid #a991ff;outline-offset:3px}" +
      ".cookie-settings{border:0;background:transparent;color:inherit;padding:0;font-size:inherit}" +
      "@media(max-width:700px){.portivo-consent{left:12px;right:12px;bottom:12px;display:block;padding:18px}.portivo-consent-actions{margin-top:16px}.portivo-consent button{flex:1}}";
    document.head.appendChild(style);
  }

  function init() {
    addStyles();
    addSettingsControl();
    var choice = getChoice();
    if (choice === "granted") loadAnalytics();
    if (choice !== "granted" && choice !== "denied") showDialog();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
