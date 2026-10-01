/**
 * LuxNarr Platform Application Logic & Motion Controller
 * High-performance vanilla JavaScript.
 */

(function () {
  document.addEventListener('DOMContentLoaded', () => {
    initMotionAnimations();
    initScrollReveal();
    initHeaderScroll();
    initPollarizScorecard();
    initQuoteModal();
    initServicesModal();
    initTermsModal();
    initDynamicYear();
  });

  /* ==========================================================================
     1. MOTION ANIMATION FALLBACK
     ========================================================================== */
  function initMotionAnimations() {
    const appears = document.querySelectorAll('.appear');
    appears.forEach((el) => {
      el.addEventListener('animationend', () => {
        el.classList.add('is-in');
      }, { once: true });
    });

    // Fallback: If animations are not running after two rAFs, ensure visibility
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        appears.forEach((el) => {
          if (typeof el.getAnimations === 'function') {
            const anims = el.getAnimations();
            if (!anims || anims.length === 0) {
              el.classList.add('is-in');
            }
          }
        });
      });
    });
  }

  /* ==========================================================================
     2. SCROLL REVEAL MOTION GRAPHICS
     ========================================================================== */
  function initScrollReveal() {
    const revealElements = document.querySelectorAll('.reveal-on-scroll');
    if (!revealElements.length) return;

    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver((entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-revealed');
            obs.unobserve(entry.target);
          }
        });
      }, {
        root: null,
        rootMargin: '0px 0px -30px 0px',
        threshold: 0.05
      });

      revealElements.forEach((el) => {
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom > 0) {
          el.classList.add('is-revealed');
        } else {
          observer.observe(el);
        }
      });
    } else {
      revealElements.forEach((el) => el.classList.add('is-revealed'));
    }
  }

  /* ==========================================================================
     3. HEADER SCROLL SPY
     ========================================================================== */
  function initHeaderScroll() {
    const header = document.getElementById('site-header');
    if (!header) return;

    window.addEventListener('scroll', () => {
      if (window.scrollY > 30) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    }, { passive: true });
  }

  /* ==========================================================================
     4. POLLARIZ UNIFIED DASHBOARD REACTIVE TOGGLE (SEO / AEO / GEO)
     ========================================================================== */
  function initPollarizScorecard() {
    const btnBefore = document.getElementById('btn-show-before');
    const btnAfter = document.getElementById('btn-show-after');
    if (!btnBefore || !btnAfter) return;

    // Top Status Pill
    const dashStatus = document.getElementById('dash-status-pill');

    // 4 Core KPIs
    const dashShare = document.getElementById('dash-kpi-share');
    const dashBadgeShare = document.getElementById('dash-badge-share');
    const dashSubShare = document.getElementById('dash-sub-share');

    const dashCitations = document.getElementById('dash-kpi-citations');
    const dashBadgeCitations = document.getElementById('dash-badge-citations');
    const dashSubCitations = document.getElementById('dash-sub-citations');

    const dashRecs = document.getElementById('dash-kpi-recs');
    const dashBadgeRecs = document.getElementById('dash-badge-recs');
    const dashSubRecs = document.getElementById('dash-sub-recs');

    const dashPipeline = document.getElementById('dash-kpi-pipeline');
    const dashBadgePipeline = document.getElementById('dash-badge-pipeline');
    const dashSubPipeline = document.getElementById('dash-sub-pipeline');

    // Frontier Engine Breakdown Elements
    const engineChatgptFill = document.getElementById('engine-chatgpt-fill');
    const engineChatgptVal = document.getElementById('engine-chatgpt-val');
    const engineChatgptBadge = document.getElementById('engine-chatgpt-badge');

    const enginePerpFill = document.getElementById('engine-perp-fill');
    const enginePerpVal = document.getElementById('engine-perp-val');
    const enginePerpBadge = document.getElementById('engine-perp-badge');

    const engineGeminiFill = document.getElementById('engine-gemini-fill');
    const engineGeminiVal = document.getElementById('engine-gemini-val');
    const engineGeminiBadge = document.getElementById('engine-gemini-badge');

    const engineClaudeFill = document.getElementById('engine-claude-fill');
    const engineClaudeVal = document.getElementById('engine-claude-val');
    const engineClaudeBadge = document.getElementById('engine-claude-badge');

    // 90-Day Trajectory Chart
    const chartBar5 = document.getElementById('chart-bar-5');
    const chartBar4 = document.getElementById('chart-bar-4');
    const chartBar3 = document.getElementById('chart-bar-3');
    const chartBar2 = document.getElementById('chart-bar-2');
    const chartBar1 = document.getElementById('chart-bar-1');

    const chartVal5 = document.getElementById('chart-val-5');
    const chartVal4 = document.getElementById('chart-val-4');
    const chartVal3 = document.getElementById('chart-val-3');
    const chartVal2 = document.getElementById('chart-val-2');
    const chartVal1 = document.getElementById('chart-val-1');

    // Monitored Query Cohorts
    const queryBadge1 = document.getElementById('query-badge-1');
    const queryDesc1 = document.getElementById('query-desc-1');

    const queryBadge2 = document.getElementById('query-badge-2');
    const queryDesc2 = document.getElementById('query-desc-2');

    const queryBadge3 = document.getElementById('query-badge-3');
    const queryDesc3 = document.getElementById('query-desc-3');

    const stateBefore = {
      dashStatusText: '● 0 of 4 Frontier Engines Indexed',
      dashStatusBg: 'rgba(239, 68, 68, 0.12)',
      dashStatusBorder: 'rgba(239, 68, 68, 0.28)',
      dashStatusColor: '#ef4444',

      // 4 KPIs
      shareVal: '12%',
      shareBadge: '-68% Gap',
      shareBadgePos: false,
      shareSub: 'Ranked #8 (Sub-Threshold)',

      citationsVal: '140',
      citationsBadge: 'Rarely Cited',
      citationsBadgePos: false,
      citationsSub: 'Omitted In 92% of Prompts',

      recsVal: '0%',
      recsBadge: 'Omitted',
      recsBadgePos: false,
      recsSub: 'Not Recommended in Answers',

      pipelineVal: '0 Orders',
      pipelineBadge: '$0 GMV',
      pipelineBadgePos: false,
      pipelineSub: 'Zero AI Inbound Revenue',

      // Engine Breakdown
      chatgptFill: '4%',
      chatgptVal: '4%',
      chatgptBadge: 'Omitted',
      chatgptBadgePos: false,

      perpFill: '0%',
      perpVal: '0%',
      perpBadge: '0 Sources',
      perpBadgePos: false,

      geminiFill: '12%',
      geminiVal: '12%',
      geminiBadge: 'Sub-Threshold',
      geminiBadgePos: false,

      claudeFill: '0%',
      claudeVal: '0%',
      claudeBadge: 'Unindexed',
      claudeBadgePos: false,

      // Stepped Chart (Flattened to Baseline)
      bar1Height: '14px',
      bar2Height: '14px',
      bar3Height: '14px',
      bar4Height: '14px',
      bar5Height: '14px',

      chartVal1: '140',
      chartVal2: '140',
      chartVal3: '140',
      chartVal4: '140',
      chartVal5: '140',

      // Monitored Queries
      query1Badge: 'Omitted',
      query1BadgePos: false,
      query1Desc: 'Competitors cited; Pollariz omitted from answers',

      query2Badge: '0 Mentions',
      query2BadgePos: false,
      query2Desc: 'Zero brand mentions in Google AI Overviews',

      query3Badge: 'Unranked',
      query3BadgePos: false,
      query3Desc: 'Excluded from motorsport apparel recommendations'
    };

    const stateAfter = {
      dashStatusText: '● 4 of 4 Frontier Engines Active',
      dashStatusBg: 'rgba(52, 211, 153, 0.12)',
      dashStatusBorder: 'rgba(52, 211, 153, 0.28)',
      dashStatusColor: '#34d399',

      // 4 KPIs
      shareVal: '88%',
      shareBadge: '+76% Lift',
      shareBadgePos: true,
      shareSub: '#1 In Category (Was 12%)',

      citationsVal: '14,820',
      citationsBadge: '+10,480%',
      citationsBadgePos: true,
      citationsSub: 'Across All Frontier Engines',

      recsVal: '94%',
      recsBadge: 'Primary Choice',
      recsBadgePos: true,
      recsSub: 'High-Intent Prompts',

      pipelineVal: '1,480 Orders',
      pipelineBadge: '$420K GMV',
      pipelineBadgePos: true,
      pipelineSub: 'Direct AI Referral Sales',

      // Engine Breakdown
      chatgptFill: '95%',
      chatgptVal: '95%',
      chatgptBadge: '#1 Top Pick',
      chatgptBadgePos: true,

      perpFill: '92%',
      perpVal: '92%',
      perpBadge: 'Primary Citation',
      perpBadgePos: true,

      geminiFill: '89%',
      geminiVal: '89%',
      geminiBadge: 'Featured in Overview',
      geminiBadgePos: true,

      claudeFill: '84%',
      claudeVal: '84%',
      claudeBadge: 'Verified Partner',
      claudeBadgePos: true,

      // Stepped Chart (Growth Trajectory)
      bar1Height: '18px',
      bar2Height: '42px',
      bar3Height: '70px',
      bar4Height: '100px',
      bar5Height: '130px',

      chartVal1: '140',
      chartVal2: '2,400',
      chartVal3: '6,180',
      chartVal4: '10,950',
      chartVal5: '14,820',

      // Monitored Queries
      query1Badge: '#1 Recommended',
      query1BadgePos: true,
      query1Desc: 'Pollariz recommended as premier choice',

      query2Badge: 'Primary Citation',
      query2BadgePos: true,
      query2Desc: 'Featured brand in Gemini AI Overview citation',

      query3Badge: 'Verified Top 1',
      query3BadgePos: true,
      query3Desc: 'Premier recommended racing lifestyle label'
    };

    function setBadgeStyle(badgeElem, isPos) {
      if (!badgeElem) return;
      if (isPos) {
        badgeElem.classList.add('badge-pos');
        badgeElem.classList.remove('badge-neg');
      } else {
        badgeElem.classList.add('badge-neg');
        badgeElem.classList.remove('badge-pos');
      }
    }

    function applyState(data, isAfter) {
      if (isAfter) {
        btnAfter.classList.add('active');
        btnBefore.classList.remove('active');
        btnAfter.setAttribute('aria-selected', 'true');
        btnBefore.setAttribute('aria-selected', 'false');
      } else {
        btnBefore.classList.add('active');
        btnAfter.classList.remove('active');
        btnBefore.setAttribute('aria-selected', 'true');
        btnAfter.setAttribute('aria-selected', 'false');
      }

      // Top Status
      if (dashStatus) {
        dashStatus.textContent = data.dashStatusText;
        dashStatus.style.background = data.dashStatusBg;
        dashStatus.style.borderColor = data.dashStatusBorder;
        dashStatus.style.color = data.dashStatusColor;
      }

      // 4 KPIs
      if (dashShare) dashShare.textContent = data.shareVal;
      if (dashBadgeShare) {
        dashBadgeShare.textContent = data.shareBadge;
        setBadgeStyle(dashBadgeShare, data.shareBadgePos);
      }
      if (dashSubShare) dashSubShare.textContent = data.shareSub;

      if (dashCitations) dashCitations.textContent = data.citationsVal;
      if (dashBadgeCitations) {
        dashBadgeCitations.textContent = data.citationsBadge;
        setBadgeStyle(dashBadgeCitations, data.citationsBadgePos);
      }
      if (dashSubCitations) dashSubCitations.textContent = data.citationsSub;

      if (dashRecs) dashRecs.textContent = data.recsVal;
      if (dashBadgeRecs) {
        dashBadgeRecs.textContent = data.recsBadge;
        setBadgeStyle(dashBadgeRecs, data.recsBadgePos);
      }
      if (dashSubRecs) dashSubRecs.textContent = data.recsSub;

      if (dashPipeline) dashPipeline.textContent = data.pipelineVal;
      if (dashBadgePipeline) {
        dashBadgePipeline.textContent = data.pipelineBadge;
        setBadgeStyle(dashBadgePipeline, data.pipelineBadgePos);
      }
      if (dashSubPipeline) dashSubPipeline.textContent = data.pipelineSub;

      // Engine Breakdown
      if (engineChatgptFill) engineChatgptFill.style.width = data.chatgptFill;
      if (engineChatgptVal) engineChatgptVal.textContent = data.chatgptVal;
      if (engineChatgptBadge) {
        engineChatgptBadge.textContent = data.chatgptBadge;
        setBadgeStyle(engineChatgptBadge, data.chatgptBadgePos);
      }

      if (enginePerpFill) enginePerpFill.style.width = data.perpFill;
      if (enginePerpVal) enginePerpVal.textContent = data.perpVal;
      if (enginePerpBadge) {
        enginePerpBadge.textContent = data.perpBadge;
        setBadgeStyle(enginePerpBadge, data.perpBadgePos);
      }

      if (engineGeminiFill) engineGeminiFill.style.width = data.geminiFill;
      if (engineGeminiVal) engineGeminiVal.textContent = data.geminiVal;
      if (engineGeminiBadge) {
        engineGeminiBadge.textContent = data.geminiBadge;
        setBadgeStyle(engineGeminiBadge, data.geminiBadgePos);
      }

      if (engineClaudeFill) engineClaudeFill.style.width = data.claudeFill;
      if (engineClaudeVal) engineClaudeVal.textContent = data.claudeVal;
      if (engineClaudeBadge) {
        engineClaudeBadge.textContent = data.claudeBadge;
        setBadgeStyle(engineClaudeBadge, data.claudeBadgePos);
      }

      // Stepped Chart
      if (chartBar1) chartBar1.style.height = data.bar1Height;
      if (chartBar2) chartBar2.style.height = data.bar2Height;
      if (chartBar3) chartBar3.style.height = data.bar3Height;
      if (chartBar4) chartBar4.style.height = data.bar4Height;
      if (chartBar5) chartBar5.style.height = data.bar5Height;

      if (chartVal1) chartVal1.textContent = data.chartVal1;
      if (chartVal2) chartVal2.textContent = data.chartVal2;
      if (chartVal3) chartVal3.textContent = data.chartVal3;
      if (chartVal4) chartVal4.textContent = data.chartVal4;
      if (chartVal5) chartVal5.textContent = data.chartVal5;

      // Monitored Queries
      if (queryBadge1) {
        queryBadge1.textContent = data.query1Badge;
        setBadgeStyle(queryBadge1, data.query1BadgePos);
      }
      if (queryDesc1) queryDesc1.textContent = data.query1Desc;

      if (queryBadge2) {
        queryBadge2.textContent = data.query2Badge;
        setBadgeStyle(queryBadge2, data.query2BadgePos);
      }
      if (queryDesc2) queryDesc2.textContent = data.query2Desc;

      if (queryBadge3) {
        queryBadge3.textContent = data.query3Badge;
        setBadgeStyle(queryBadge3, data.query3BadgePos);
      }
      if (queryDesc3) queryDesc3.textContent = data.query3Desc;
    }

    btnBefore.addEventListener('click', () => applyState(stateBefore, false));
    btnAfter.addEventListener('click', () => applyState(stateAfter, true));
  }

  /* ==========================================================================
     5. BESPOKE QUOTE MODAL
     ========================================================================== */
  function initQuoteModal() {
    const modalOverlay = document.getElementById('quote-modal');
    const modalCloseBtn = document.getElementById('modal-close-btn');
    const quoteForm = document.getElementById('quote-form');
    const formView = document.getElementById('modal-form-view');
    const successView = document.getElementById('modal-success-view');
    const closeSuccessBtn = document.getElementById('close-success-btn');

    const brandInput = document.getElementById('brand-name');
    const emailInput = document.getElementById('contact-email');
    const phoneInput = document.getElementById('contact-phone');
    const brandError = document.getElementById('brand-name-error');
    const emailError = document.getElementById('contact-email-error');
    const phoneError = document.getElementById('contact-phone-error');

    const successBrandEl = document.getElementById('success-brand-name');
    const successEmailEl = document.getElementById('success-email-display');
    const successPhoneEl = document.getElementById('success-phone-display');
    const successRefEl = document.getElementById('success-ref-id');

    const openButtons = document.querySelectorAll('.open-quote-btn');
    openButtons.forEach((btn) => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        openModal();
      });
    });

    function openModal() {
      if (!modalOverlay) return;
      const servicesModal = document.getElementById('services-modal');
      if (servicesModal && servicesModal.classList.contains('active')) {
        servicesModal.classList.remove('active');
        servicesModal.setAttribute('aria-hidden', 'true');
      }

      if (formView) formView.style.display = 'block';
      if (successView) successView.style.display = 'none';
      modalOverlay.classList.add('active');
      modalOverlay.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';

      setTimeout(() => {
        if (brandInput && !brandInput.value) {
          brandInput.focus();
        }
      }, 150);
    }

    function closeModal() {
      if (!modalOverlay) return;
      modalOverlay.classList.remove('active');
      modalOverlay.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
    }

    if (modalCloseBtn) modalCloseBtn.addEventListener('click', closeModal);
    if (closeSuccessBtn) closeSuccessBtn.addEventListener('click', closeModal);

    if (modalOverlay) {
      modalOverlay.addEventListener('click', (e) => {
        if (e.target === modalOverlay) closeModal();
      });
    }

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && modalOverlay && modalOverlay.classList.contains('active')) {
        closeModal();
      }
    });

    if (quoteForm) {
      quoteForm.addEventListener('submit', (e) => {
        e.preventDefault();
        let isValid = true;

        const brandVal = brandInput ? brandInput.value.trim() : '';
        if (!brandVal) {
          if (brandError) brandError.style.display = 'block';
          isValid = false;
        } else if (brandError) {
          brandError.style.display = 'none';
        }

        const emailVal = emailInput ? emailInput.value.trim() : '';
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailVal || !emailRegex.test(emailVal)) {
          if (emailError) emailError.style.display = 'block';
          isValid = false;
        } else if (emailError) {
          emailError.style.display = 'none';
        }

        const countryCodeSelect = document.getElementById('country-code');
        const codeVal = countryCodeSelect ? countryCodeSelect.value : '+91';
        const rawPhone = phoneInput ? phoneInput.value.trim() : '';
        const phoneVal = `${codeVal} ${rawPhone}`;

        if (!rawPhone || rawPhone.length < 5) {
          if (phoneError) phoneError.style.display = 'block';
          isValid = false;
        } else if (phoneError) {
          phoneError.style.display = 'none';
        }

        if (!isValid) return;

        const trackingId =
          'LXN-' +
          Math.floor(1000 + Math.random() * 9000) +
          '-' +
          String.fromCharCode(65 + Math.floor(Math.random() * 26));

        if (successBrandEl) successBrandEl.textContent = brandVal;
        if (successEmailEl) successEmailEl.textContent = emailVal;
        if (successPhoneEl) successPhoneEl.textContent = phoneVal;
        if (successRefEl) successRefEl.textContent = trackingId;

        // Populate hidden inputs if needed
        const trackingInput = document.getElementById('form-tracking-id');
        if (trackingInput) trackingInput.value = trackingId;
        const subjectInput = document.getElementById('quote-form-subject');
        if (subjectInput) subjectInput.value = `New Luxnarr Quote Request: ${brandVal} (${trackingId})`;

        // Dispatch inquiry to luxnarr.ai@gmail.com via FormSubmit AJAX
        try {
          const payload = {
            Brand: brandVal,
            Email: emailVal,
            Phone: phoneVal,
            Tracking_ID: trackingId,
            Submitted_At: new Date().toLocaleString(),
            _subject: `New Luxnarr Quote Request: ${brandVal} (${trackingId})`,
            _template: 'table',
            _captcha: 'false'
          };

          fetch('https://formsubmit.co/ajax/luxnarr.ai@gmail.com', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Accept': 'application/json'
            },
            body: JSON.stringify(payload)
          }).then(res => res.json()).catch(err => {
            console.warn('Dispatch note:', err);
          });
        } catch (dispatchErr) {
          console.warn('Dispatch error:', dispatchErr);
        }

        // Store inquiry in local storage as backup
        try {
          const inquiries = JSON.parse(localStorage.getItem('luxnarr_inquiries') || '[]');
          inquiries.push({
            trackingId,
            brand: brandVal,
            email: emailVal,
            phone: phoneVal,
            submittedAt: new Date().toISOString()
          });
          localStorage.setItem('luxnarr_inquiries', JSON.stringify(inquiries));
        } catch (err) {
          console.warn('Storage error:', err);
        }

        if (formView) formView.style.display = 'none';
        if (successView) successView.style.display = 'block';
        quoteForm.reset();
      });
    }

    window.openLuxNarrQuote = openModal;
  }

  /* ==========================================================================
     6. SERVICES SHOWCASE MODAL
     ========================================================================== */
  function initServicesModal() {
    const servicesModal = document.getElementById('services-modal');
    const openBtns = document.querySelectorAll('.open-services-modal-btn');
    const closeBtn = document.getElementById('services-modal-close-btn');
    const quoteBtn = document.getElementById('services-modal-quote-btn');

    if (!servicesModal) return;

    function openServices() {
      servicesModal.classList.add('active');
      servicesModal.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
    }

    function closeServices() {
      servicesModal.classList.remove('active');
      servicesModal.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
    }

    openBtns.forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        openServices();
      });
    });

    if (closeBtn) closeBtn.addEventListener('click', closeServices);

    servicesModal.addEventListener('click', (e) => {
      if (e.target === servicesModal) closeServices();
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && servicesModal.classList.contains('active')) {
        closeServices();
      }
    });

    if (quoteBtn) {
      quoteBtn.addEventListener('click', () => {
        closeServices();
        if (typeof window.openLuxNarrQuote === 'function') {
          setTimeout(() => {
            window.openLuxNarrQuote();
          }, 150);
        }
      });
    }
  }

  /* ==========================================================================
     7. TERMS & CONDITIONS MODAL
     ========================================================================== */
  function initTermsModal() {
    const termsModal = document.getElementById('terms-modal');
    const openBtns = document.querySelectorAll('.open-terms-modal-btn');
    const closeBtn = document.getElementById('terms-modal-close-btn');

    if (!termsModal) return;

    function openTerms() {
      termsModal.classList.add('active');
      termsModal.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
    }

    function closeTerms() {
      termsModal.classList.remove('active');
      termsModal.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
    }

    openBtns.forEach((btn) => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        openTerms();
      });
    });

    if (closeBtn) closeBtn.addEventListener('click', closeTerms);

    termsModal.addEventListener('click', (e) => {
      if (e.target === termsModal) closeTerms();
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && termsModal.classList.contains('active')) {
        closeTerms();
      }
    });

  }

  /* ==========================================================================
     8. DYNAMIC COPYRIGHT YEAR
     ========================================================================== */
  function initDynamicYear() {
    const yearEl = document.getElementById('current-year');
    if (yearEl) {
      yearEl.textContent = new Date().getFullYear();
    }
  }
})();
