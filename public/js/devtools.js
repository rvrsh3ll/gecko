(function() {
  const ext = window.browser || window.chrome;

  ext.devtools.panels.create(
      "Gecko",
      "gecko.png",
      "panel.html",
      function (panel) {}
  );
})();