/*
 * NormaKit cookie consent, gates Microsoft Advertising UET (ad_storage /
 * analytics_storage) behind explicit opt-in. No cookie is set for necessary
 * site function (there is none needed); only this consent choice itself is
 * stored, in localStorage, first-party, nothing sent to a server.
 */
(function () {
  var STORAGE_KEY = 'normakit_consent';
  var LOG_KEY = 'normakit_consent_log';

  function readConsent() {
    try {
      var raw = localStorage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw) : null;
    } catch (e) {
      return null;
    }
  }

  function logDecision(action, advertising) {
    try {
      var log = JSON.parse(localStorage.getItem(LOG_KEY) || '[]');
      log.push({ action: action, advertising: advertising, ts: new Date().toISOString(), page: location.pathname });
      if (log.length > 20) log = log.slice(log.length - 20);
      localStorage.setItem(LOG_KEY, JSON.stringify(log));
    } catch (e) {}
  }

  function applyConsent(advertising) {
    window.uetq = window.uetq || [];
    window.uetq.push('consent', 'update', {
      ad_storage: advertising ? 'granted' : 'denied',
      analytics_storage: advertising ? 'granted' : 'denied'
    });
  }

  function saveConsent(advertising, action) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ advertising: advertising, ts: new Date().toISOString(), v: 1 }));
    } catch (e) {}
    logDecision(action, advertising);
    applyConsent(advertising);
  }

  var CSS = [
    '.nk-consent-banner{position:fixed;left:0;right:0;bottom:0;z-index:9999;',
    'background:#ffffff;border-top:1px solid #e4e4e0;box-shadow:0 -2px 16px rgba(0,0,0,0.08);',
    'font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",Helvetica,Arial,sans-serif;color:#1a1d24;}',
    '.nk-consent-inner{max-width:900px;margin:0 auto;padding:18px 24px;display:flex;',
    'flex-wrap:wrap;align-items:center;gap:16px;}',
    '.nk-consent-text{flex:1 1 380px;font-size:13.5px;line-height:1.5;color:#545b68;margin:0;}',
    '.nk-consent-text a{color:#1f5c4c;}',
    '.nk-consent-actions{display:flex;gap:10px;flex-wrap:wrap;align-items:center;flex:0 0 auto;}',
    '.nk-consent-btn{font-size:13.5px;font-weight:600;padding:10px 16px;border-radius:8px;',
    'cursor:pointer;border:1px solid #1f5c4c;line-height:1;white-space:nowrap;}',
    '.nk-consent-btn.nk-accept{background:#1f5c4c;color:#fff;}',
    '.nk-consent-btn.nk-reject{background:#fff;color:#1f5c4c;}',
    '.nk-consent-link{font-size:13px;color:#545b68;background:none;border:none;',
    'text-decoration:underline;cursor:pointer;padding:6px 2px;}',
    '.nk-consent-panel{max-width:900px;margin:0 auto;padding:6px 24px 20px;}',
    '.nk-consent-row{display:flex;align-items:flex-start;justify-content:space-between;gap:16px;',
    'padding:12px 0;border-top:1px solid #e4e4e0;}',
    '.nk-consent-row:first-child{border-top:none;}',
    '.nk-consent-row h4{margin:0 0 3px;font-size:13.5px;}',
    '.nk-consent-row p{margin:0;font-size:12.5px;color:#545b68;max-width:60ch;}',
    '.nk-consent-panel-actions{display:flex;justify-content:flex-end;gap:10px;margin-top:6px;}',
    '.nk-switch{position:relative;width:38px;height:22px;flex:0 0 auto;margin-top:2px;}',
    '.nk-switch input{opacity:0;width:0;height:0;}',
    '.nk-switch span{position:absolute;inset:0;background:#e4e4e0;border-radius:999px;transition:background .15s;}',
    '.nk-switch span:before{content:"";position:absolute;width:16px;height:16px;left:3px;top:3px;',
    'background:#fff;border-radius:50%;transition:transform .15s;}',
    '.nk-switch input:checked + span{background:#1f5c4c;}',
    '.nk-switch input:checked + span:before{transform:translateX(16px);}',
    '.nk-switch input:disabled + span{opacity:.6;cursor:not-allowed;}',
    '.nk-consent-settings-link{position:fixed;left:14px;bottom:14px;z-index:9998;font-size:12px;',
    'color:#545b68;background:#fff;border:1px solid #e4e4e0;padding:6px 10px;border-radius:999px;',
    'text-decoration:none;font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",Helvetica,Arial,sans-serif;}',
    '@media (max-width:560px){.nk-consent-inner{flex-direction:column;align-items:stretch;}',
    '.nk-consent-actions{justify-content:stretch;}.nk-consent-btn{flex:1;text-align:center;}}'
  ].join('');

  function injectStyle() {
    if (document.getElementById('nk-consent-style')) return;
    var style = document.createElement('style');
    style.id = 'nk-consent-style';
    style.textContent = CSS;
    document.head.appendChild(style);
  }

  function removeBanner() {
    var el = document.getElementById('nk-consent-banner');
    if (el) el.parentNode.removeChild(el);
  }

  function buildBanner(showManage) {
    removeBanner();
    injectStyle();
    var el = document.createElement('div');
    el.className = 'nk-consent-banner';
    el.id = 'nk-consent-banner';

    var existing = readConsent();
    var adOn = existing ? !!existing.advertising : false;

    el.innerHTML =
      '<div class="nk-consent-inner">' +
        '<p class="nk-consent-text">We use Microsoft Advertising cookies to measure ad performance ' +
          '&mdash; only with your consent. No cookies are set for basic site function. ' +
          '<a href="/blog/cookie-consent-banners-eu-compliance">Learn more</a>.</p>' +
        '<div class="nk-consent-actions">' +
          '<button type="button" class="nk-consent-link" id="nk-manage-btn">Manage</button>' +
          '<button type="button" class="nk-consent-btn nk-reject" id="nk-reject-btn">Reject all</button>' +
          '<button type="button" class="nk-consent-btn nk-accept" id="nk-accept-btn">Accept all</button>' +
        '</div>' +
      '</div>' +
      '<div class="nk-consent-panel" id="nk-consent-panel" style="display:' + (showManage ? 'block' : 'none') + '">' +
        '<div class="nk-consent-row">' +
          '<div><h4>Strictly necessary</h4><p>Required for the site to function. Nothing is stored ' +
            'for this category &mdash; there is no necessary cookie on this site.</p></div>' +
          '<label class="nk-switch"><input type="checkbox" checked disabled><span></span></label>' +
        '</div>' +
        '<div class="nk-consent-row">' +
          '<div><h4>Advertising &amp; analytics (Microsoft Advertising UET)</h4>' +
            '<p>Lets us measure which ads lead to purchases. Off by default; only active if you turn it on.</p></div>' +
          '<label class="nk-switch"><input type="checkbox" id="nk-ad-toggle"' + (adOn ? ' checked' : '') + '><span></span></label>' +
        '</div>' +
        '<div class="nk-consent-panel-actions">' +
          '<button type="button" class="nk-consent-btn nk-reject" id="nk-save-btn">Save preferences</button>' +
        '</div>' +
      '</div>';

    document.body.appendChild(el);

    document.getElementById('nk-accept-btn').addEventListener('click', function () {
      saveConsent(true, 'accept_all');
      removeBanner();
    });
    document.getElementById('nk-reject-btn').addEventListener('click', function () {
      saveConsent(false, 'reject_all');
      removeBanner();
    });
    document.getElementById('nk-manage-btn').addEventListener('click', function () {
      var panel = document.getElementById('nk-consent-panel');
      panel.style.display = panel.style.display === 'none' ? 'block' : 'none';
    });
    document.getElementById('nk-save-btn').addEventListener('click', function () {
      var on = document.getElementById('nk-ad-toggle').checked;
      saveConsent(on, 'save_preferences');
      removeBanner();
    });
  }

  function injectSettingsLink() {
    if (document.getElementById('nk-consent-settings-link')) return;
    injectStyle();
    var a = document.createElement('a');
    a.href = '#';
    a.id = 'nk-consent-settings-link';
    a.className = 'nk-consent-settings-link';
    a.textContent = 'Cookie settings';
    a.addEventListener('click', function (e) {
      e.preventDefault();
      buildBanner(true);
    });
    document.body.appendChild(a);
  }

  window.normakitOpenConsentSettings = function () {
    buildBanner(true);
  };

  function init() {
    injectSettingsLink();
    var existing = readConsent();
    if (existing) {
      applyConsent(existing.advertising);
    } else {
      buildBanner(false);
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
