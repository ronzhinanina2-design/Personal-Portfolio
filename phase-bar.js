(function () {
  var MOBILE_QUERY = "(max-width: 743px)";

  function isMobile() {
    return window.matchMedia(MOBILE_QUERY).matches;
  }

  function closeAll() {
    document.querySelectorAll(".ph-step.is-open").forEach(function (step) {
      step.classList.remove("is-open");
    });
    document.body.classList.remove("ph-lock");
  }

  function openStep(step) {
    closeAll();
    step.classList.add("is-open");
    document.body.classList.add("ph-lock");
  }

  document.addEventListener("click", function (e) {
    var trigger = e.target.closest(".ph-trigger");
    var closeBtn = e.target.closest(".ph-tip-close");

    if (closeBtn) {
      closeAll();
      return;
    }

    if (trigger && isMobile()) {
      e.preventDefault();
      var step = trigger.closest(".ph-step");
      if (step.classList.contains("is-open")) {
        closeAll();
      } else {
        openStep(step);
      }
      return;
    }

    // Tapping the dimmed area around the modal card (not the card itself)
    var openTip = e.target.closest(".ph-tip");
    if (!openTip && !trigger) {
      closeAll();
    }
  });

  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") closeAll();
  });

  window.addEventListener("resize", function () {
    if (!isMobile()) closeAll();
  });
})();
