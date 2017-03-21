content_css:        ../swagger/css/custom.css
content_javascript: ../swagger/lib/custom.js
                    ../swagger/lib/object-assign-pollyfill.js
                    ../swagger/lib/jquery.slideto.min.js
                    ../swagger/lib/jquery.wiggle.min.js
                    ../swagger/lib/jquery.ba-bbq.min.js
                    ../swagger/lib/handlebars-4.0.5.js
                    ../swagger/lib/lodash.min.js
                    ../swagger/lib/backbone-min.js
                    ../swagger/swagger-ui.min.js
                    ../swagger/lib/highlight.9.1.0.pack.js
                    ../swagger/lib/highlight.9.1.0.pack_extended.js
                    ../swagger/lib/jsoneditor.min.js
                    ../swagger/lib/marked.js
                    ../swagger/lib/swagger-oauth.js

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
    <div id="swagger-ui-container" class="swagger-ui-wrap" style="min-height: 250px;"></div>
  </div>
</div>

<script type="text/javascript">
  $(function () {
  	var url = '/swagger/issuer.yaml';

    // Pre load translate...
    if(window.SwaggerTranslator) {
        window.SwaggerTranslator.translate();
    }

    window.swaggerUi = new SwaggerUi({
      url: url,
      dom_id: "swagger-ui-container",
      supportedSubmitMethods: [],
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
      docExpansion: "none",
      apisSorter: "alpha",
      jsonEditor: false,
      defaultModelRendering: 'schema',
      showRequestHeaders: false,
      showOperationIds: false
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

    window.swaggerUi.load();

    function log() {
      if ('console' in window) {
        console.log.apply(console, arguments);
      }
    }
  });
</script>
