---
content_css:
    - ../swagger/css/custom.css
content_javascript:
    - ../swagger/lib/custom.js
    - ../swagger/lib/object-assign-pollyfill.js
    - ../swagger/lib/jquery.slideto.min.js
    - ../swagger/lib/jquery.wiggle.min.js
    - ../swagger/lib/jquery.ba-bbq.min.js
    - ../swagger/lib/handlebars-4.0.5.js
    - ../swagger/lib/lodash.min.js
    - ../swagger/lib/backbone-min.js
    - ../swagger/swagger-ui.min.js
    - ../swagger/lib/highlight.9.1.0.pack.js
    - ../swagger/lib/highlight.9.1.0.pack_extended.js
    - ../swagger/lib/jsoneditor.min.js
    - ../swagger/lib/marked.js
    - ../swagger/lib/swagger-oauth.js
...

  <div id="temp-anchor-links" class="hidden">
# Authentication
## /authorize
## /token
## /userinfo
# Client Management
## GET /client
## POST /client
## DELETE /client/&lt;client_id&gt;
## GET /client/&lt;client_id&gt;
## PUT /client/&lt;client_id&gt;
# Session Management
## /authorize/iframe
  </div>

<div class="row">
  <div class="swagger-section col-md-12">
    <div id="message-bar" class="swagger-ui-wrap">&nbsp;</div>
    <div id="swagger-ui" class="swagger-ui-wrap" style="min-height: 250px;"></div>
  </div>
</div>

<link rel="stylesheet" type="text/css" href="/swagger/swagger-ui.css" >
<link href="/swagger/css/custom.css" rel="stylesheet" type="text/css"/>

<script src="/swagger/swagger-ui-bundle.js"> </script>
<script src="/swagger/swagger-ui-standalone-preset.js"> </script>
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
    ],
    plugins: [
    ],
    docExpansion: "list",
    defaultModelRendering: "example",
    supportedSubmitMethods: []
  })

  window.ui = ui
}
</script>
