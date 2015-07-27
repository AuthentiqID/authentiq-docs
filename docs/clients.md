content_javascript: ../static/js/authentiq-console.js

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