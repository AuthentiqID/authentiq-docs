content_javascript: js/app.1e2f5878f1a2af7653fc.js

# Client management

To allow people to sign in using Authentiq ID, you need to register your application as a client with the Provider.

Visit the [Provider Console](/console) to manage your "clients".


<hr />
<div ng-app="AQProviderConsole">
    <div class="row">
        <div class="col-md-12">
            <div ui-view></div> <!-- This is where our views will load -->
        </div>
    </div>
</div>

<script>
    authentiq.subscribe('authorized:access_token', function(token) {
      if(typeof token.expires_in !== 'undefined') {
        var expires_at = new Date();

        // 60 seconds less to secure browser and response latency
        expires_at.setSeconds(expires_at.getSeconds() + parseInt(token.expires_in) - 60);
        
        token.expires_at = expires_at;
      }

      // store the access_token in localStorage
      localStorage['authentiq.access_token'] = token;
    });

    authentiq.subscribe('concluded', function(token) {
      // delete the access token
      delete localStorage['authentiq.access_token'];
    });
</script>