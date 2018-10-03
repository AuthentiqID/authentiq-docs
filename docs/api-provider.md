---
content_css:
    - ../swagger/swagger-ui.css
    - ../swagger/css/custom.css
content_javascript:
    - ../swagger/swagger-ui-bundle.js
    - ../swagger/swagger-ui-standalone-preset.js
...

  <div id="temp-anchor-links" class="hidden">
# Authentication
## GET /authorize
## POST /token
## GET /userinfo
# Client Management
## GET /client
## POST /client
## GET /client/&lcub;client_id&rcub;
## PUT /client/&lcub;client_id&rcub;
## DELETE /client/&lcub;client_id&rcub;
# Session Management
## GET /&lcub;client_id&rcub;/iframe
  </div>

<div class="row">
  <div class="swagger-section col-md-12">
    <div id="message-bar" class="swagger-ui-wrap">&nbsp;</div>
    <div id="swagger-ui" class="swagger-ui-wrap" style="min-height: 250px;"></div>
  </div>
</div>

<script>
window.onload = function() {

  // Build a system
  const ui = SwaggerUIBundle({
    url: "/swagger/provider.yaml",
    dom_id: '#swagger-ui',
    deepLinking: true,
    onComplete: function(swaggerApi, swaggerUi) {
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
        log("Unable to load the UI.");
    },
    presets: [
      SwaggerUIBundle.presets.apis,
      SwaggerUIStandalonePreset
    ],
    plugins: [],
    docExpansion: "list",
    defaultModelRendering: "example",
    supportedSubmitMethods: []
  })

  window.ui = ui
}
</script>
