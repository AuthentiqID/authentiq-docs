---
content_css:
    - ../swagger/swagger-ui.css
    - ../swagger/css/custom.css
content_javascript:
    - ../swagger/swagger-ui-bundle.js
    - ../swagger/swagger-ui-standalone-preset.js
...

  <div id="temp-anchor-links" class="hidden">
# Delete
# Get
# Head
# Key
# Login
# Post
# Put
# Scope
  </div>

<div class="row">
  <div class="swagger-section col-md-12">
    <div id="message-bar" class="swagger-ui-wrap">&nbsp;</div>
    <div id="swagger-ui" class="swagger-ui-wrap" style="min-height: 250px;"></div>
  </div>
</div>

<script type="text/javascript">
  window.onload = function() {
    var ui = SwaggerUIBundle({
      url: '/swagger/issuer.yaml',
      dom_id: '#swagger-ui',
      deepLinking: true,
      onComplete: function(swaggerApi, swaggerUi){
        $('#temp-anchor-links').remove();

        $('pre code').each(function(i, e) {
          hljs.highlightBlock(e)
        });

        // addApiKeyAuthorization();

        if(window.SwaggerTranslator) {
          window.SwaggerTranslator.translate();
        }
      },
      onFailure: function(data) {
        log("Unable to Load SwaggerUI");
      },
      presets: [
        SwaggerUIBundle.presets.apis,
        SwaggerUIStandalonePreset
      ],
      plugins: [],
      docExpansion: "list",
      defaultModelRendering: 'example',
      showRequestHeaders: false,
      showOperationIds: false,
      supportedSubmitMethods: [],
    });

    function addApiKeyAuthorization(){
      var key;
      if ('authentiq' in window) {
        key = window.authentiq.Token.getAuthorizationHeader();
      }
      // var key = encodeURIComponent($('#input_apiKey')[0].value);
      if(key && key.trim() != "") {
          var token = new SwaggerClient.ApiKeyAuthorization("Authorization", key, "header");
          window.swaggerUi.api.clientAuthorizations.add("access_token", token);
          log("added key " + key);
      }
    }

    function log() {
      if ('console' in window) {
        console.log.apply(console, arguments);
      }
    }

    window.ui = ui;
  }
</script>
