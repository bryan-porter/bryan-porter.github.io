(function initializeAnalytics() {
  "use strict";

  var bootstrapScript = document.currentScript;
  var measurementId = bootstrapScript && bootstrapScript.dataset.measurementId;

  if (!measurementId || !/^G-[A-Z0-9]{4,14}$/.test(measurementId)) {
    return;
  }

  window.dataLayer = window.dataLayer || [];
  window.gtag = function gtag() {
    window.dataLayer.push(arguments);
  };

  window.gtag("consent", "default", {
    ad_storage: "denied",
    analytics_storage: "denied",
    ad_user_data: "denied",
    ad_personalization: "denied",
    wait_for_update: 500,
  });
  window.gtag("js", new Date());
  window.gtag("config", measurementId, {
    page_location: window.location.origin + window.location.pathname,
    page_path: window.location.pathname,
    page_referrer: "",
    ignore_referrer: true,
    allow_google_signals: false,
    allow_ad_personalization_signals: false,
  });

  var loader = document.createElement("script");
  loader.async = true;
  loader.src =
    "https://www.googletagmanager.com/gtag/js?id=" +
    encodeURIComponent(measurementId);
  document.head.appendChild(loader);
})();
