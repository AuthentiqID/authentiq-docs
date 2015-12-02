content_css:        ../swagger/css/custom.css
content_javascript: ../swagger/lib/jquery.slideto.min.js
                    ../swagger/lib/jquery.wiggle.min.js
                    ../swagger/lib/jquery.ba-bbq.min.js
                    ../swagger/lib/handlebars-2.0.0.js
                    ../swagger/lib/underscore-min.js
                    ../swagger/lib/backbone-min.js
                    ../swagger/swagger-ui.js
                    ../swagger/lib/highlight.7.3.pack.js
                    ../swagger/lib/marked.js
                    ../swagger/lib/swagger-oauth.js

  <div id="temp-anchor-links" class="hidden">
# Authentication
## /authorize
## /token
## /userinfo
# Client Management
## /client
## /client/&lt;client_id&gt;
# Session Management
## /authorize/logout
## /authorize/iframe
# Sessions
## /session
## /client/&lt;client_id&gt;/session
  </div>

<div class="row">
  <div class="swagger-section col-md-12">
    <div id="message-bar" class="swagger-ui-wrap">&nbsp;</div>
    <div id="swagger-ui-container" class="swagger-ui-wrap" style="min-height: 250px;"></div>
  </div>
</div>

<script type="text/javascript">
  $(function () {
    var url;
    
    url = '../swagger/provider.yaml';

    window.swaggerUi = new SwaggerUi({
      url: url,
      dom_id: "swagger-ui-container",
      supportedSubmitMethods: [],
      // supportedSubmitMethods: ['get', 'post', 'put', 'delete', 'patch'],
      onComplete: function(swaggerApi, swaggerUi){

        $('#temp-anchor-links').remove();

        $('body').scrollspy('refresh');

        $('pre code').each(function(i, e) {
          hljs.highlightBlock(e)
        });

        addApiKeyAuthorization();
      },
      onFailure: function(data) {
        log("Unable to Load SwaggerUI");
      },
      docExpansion: "none",
      apisSorter: "alpha",
      showRequestHeaders: false
    });

    function addApiKeyAuthorization(){
      var key;
      if ('authentiq' in window) {
        key = window.authentiq.Token.getAuthorizationHeader();
      }

      if(key && key.trim() != "") {
          var token = new SwaggerClient.ApiKeyAuthorization("authorization", key, "header");
          window.swaggerUi.api.clientAuthorizations.add("Authorization", token);
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
