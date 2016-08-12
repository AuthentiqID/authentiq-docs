# Introduction

[TBD]

This page explains how to allow your users to sign in with Authentiq ID on your website in minutes. It shows how to [use AuthentiqJS with both client and server side applications](#authentiqjs), but also covers how to [use third-party OAuth 2.0 frameworks with Authentiq Connect](#third-party-frameworks).

Authentiq Connect is compatible with both [OAuth 2.0](http://oauth.net/2/) and [OpenID Connect 1.0 (OIDC)](http://openid.net/), and as such it should feel familiar to anyone having implemented an OAuth 2.0 authorization flow before. In case your application already accepts users from other OAuth 2.0 identity providers (such as Google, Facebook, ...), it should be easy to enable Authentiq ID as another source of verified users using your existing OAuth 2.0 client implementation.

Alternatively, our [native Authentiq Connect SDK](#native-sdk) allows you to implement a rich authentication experience in minutes. We recommend this option if you are looking to enhance your registration and sign-in flows, or want to add strong passwordless two-factor authentication to your website.

There are a few important differences to consider when evaluating integration options.

Our native Authentiq Connect SDK is easy to use and leverages features of OpenID Connect to obtain a rich authentication experience. But our protocol also works with many of the great third-party OAuth 2.0 client libraries out there already. Deciding what works best for you depends heavily on your situation. In practice, generic OAuth 2.0 libraries tend to work well, but will be less optimized in terms of performance and user experience.

OpenID Connect is an extention to OAuth 2.0 that standardizes user authentication and forms the basis of Authentiq Connect.
{: class="alert alert-success" role="alert" }

## Register a client

[TBD]

Whether or not your integration is going to be native or third-party, you will need to [register your application](clients.md) with an Authentiq Connect Provider and obtain a unique client identifier. Use the `client_id` in your preferred OAuth 2.0 client library, or when customizing your AuthentiqJS snippet below.


# AuthentiqJS

In terms of user experience, the smoothest integration option is to simply include our AuthentiqJS snippet on your page. You can use the snippet configurator to easily generate cusomtized snippet code for your application, or copy and adjust the example snippet below.

## Button

<!-- <div class="panel panel-default">
  <div class="panel-heading">
    <h3 class="panel-title">1. Pick an Authentiq client <small>[Sign in first]</small></h3>
  </div>
  <div class="panel-body">
    <form class="form-inline">
      <div class="form-group col-md-6">
        <label class="sr-only" for="existing-client-id">Select existing client ID</label>
        <select class="form-control" id="existing-client-id" disabled data-authentiq-key="client-id" data-script-opt="1">
          <option value="PLACEHOLDER_CLIENT_ID">Select an existing client ID</option>
        </select>
      </div>
      <a href="#/clients/add" id="add-client-button" class="btn btn-primary disabled" data-toggle="modal" data-angular-link data-target="#add-client">Create new client</a>
    </form>
  </div>
</div> -->

<div class="panel panel-default">
  <div class="panel-heading">
    <h3 class="panel-title">Button options</h3>
  </div>
  <div class="panel-body">
    <form class="form-horizontal">
      <div class="form-group">
        <label for="opts-display" class="col-sm-2 control-label">Display</label>
        <div class="col-md-4">
          <select class="form-control" id="opts-display" data-authentiq-key="display">
            <option value="">Modal</option>
            <option value="page">Page</option>
            <option value="popup">Popup</option>
          </select>
        </div>
        <label for="opts-theme" class="col-sm-2 control-label">Theme</label>
        <div class="col-md-4">
          <select class="form-control" id="opts-theme" data-authentiq-key="theme">
            <option value="none">Plain</option>
            <option value="">Basic</option>
            <option value="orange">Orange</option>
            <option value="grey">Grey</option>
            <option value="white">White</option>
          </select>
        </div>
      </div>
      <div class="form-group">
        <label for="opts-sign-in-text" class="col-sm-2 control-label">Sign in text</label>
        <div class="col-md-4">
          <input type="text" id="opts-sign-in-text" class="form-control" placeholder="Sign in" data-authentiq-key="sign_in_text">
        </div>
        <label for="opts-sign-out-text" class="col-sm-2 control-label">Sign out text</label>
        <div class="col-md-4">
          <input type="text" id="opts-sign-out-text" class="form-control" placeholder="Sign out" data-authentiq-key="sign_out_text">
        </div>
      </div>
      <hr />
      <div class="checkbox">
        <label class="control-label">
          <input type="checkbox" value="" data-authentiq-key="direct_events" data-script-opt="1">
          Direct events, will fire any events even before DOM is ready
        </label>
      </div>
    </form>
  </div>
</div>

<div class="well text-center">
  <button id="authentiq" class="btn authentiq-button" data-theme="none">
    Sign in
  </button>
</div>

<!-- Button trigger modal -->
<button type="button" id="get-code-button" class="btn btn-primary btn-lg btn-block" data-toggle="modal" data-target="#get-code-modal">Get code!</button>


<!-- Modal -->
<div class="modal fade" id="get-code-modal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
        <h4 class="modal-title" id="myModalLabel">Get the code</h4>
      </div>
      <div class="modal-body">
        <p class="lead">1. Copy the script tag in your site <code>&lt;head&gt;</code>.</p>
        <div class="alert alert-info" role="alert">You might have to replace the <code>PLACEHOLDER_CLIENT_ID</code> with your apps' client ID</div>
        <textarea id="script-snippet" class="form-control" rows="2" style="resize: none;" disabled></textarea>
        <hr />
        <p class="lead">2. Copy the button in the position you want it to be displayed.</p>
        <textarea id="button-snippet" class="form-control" rows="3" style="resize: none;" disabled></textarea>
      </div>
    </div>
  </div>
</div>

<div class="modal fade" id="add-client" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
        <h4 class="modal-title" id="myModalLabel">Create a new client</h4>
      </div>
      <div class="modal-body">
        <iframe src="/console.html/#/clients/add" frameborder="0" width="100%" height="100%"></iframe>
      </div>
    </div>
  </div>
</div>

## Example

```html5
    <script src="//cdn.authentiq.io/authentiqjs/0.1.0/authentiq.js"></script>
    <button class="authentiq-button"
            data-client-id="62a90b31-db29-4510-adf4-3d4d7d932d14"
            data-provider-uri="https://connect.authentiq.io/authorize"
            data-scopes="email~rs aq:name aq:push">
      Sign in with Authentiq ID
    </button>
```

## Options

The following `data-*` attributes are available for the AuthentiqJS `<script>` and `<button>` tags.

Attribute | Description | Default value
--------- | ----------- | -------------
client-id | Your registered application ID. | None, obtain a unique ID from the [Client Console](clients.md).
provider-uri | Provider Authorization URL. Change this for [self-hosted installs](installation.md). | `https://connect.authentiq.io/authorize`
scope | [Scopes](index.md#scopes) to request from user, as a space-separated list. Append `~r` to indicate that a scope is required and/or `~s` to indicate the scope should have a valid signature from a trusted Authentiq Issuer. | The scopes registered as defaults for the application.
display | Authorization display mode. Valid choices are `page` (full page redirect), `popup` (popup window) and `modal` (modal iframe). | `modal`
prompt | Preferred prompt method in Authentiq ID. Valid choices are `login` and `consent`. Providing `consent` essentially overrides *One click sign-in* and always prompts user for consent. | `login`
response-type | OIDC response type. Valid options are `id_token`, `code` and `code id_token`. You will want to use `id_token` for client-side apps and `code id_token` for server-side or hybrid applications. Please make sure that your app is registered with the correct application type. | `id_token`
response-mode | OIDC response mode. Valid options are `query` and `fragment`. Can usually be left alone, unless you need need to bypass AuthentiqJS and redirect directly to a server endpoint; in that case manually select `query`. | Usually `fragment`.
redirect-uri | OAuth 2.0 redirect URL. Unless you need to redirect to a server side endpoint you can leave this alone and let AuthentiqJS use the URL of the current page. | The current page, from *window.href.location*.
state | Client application state to prevent [cross site request forgeries (XSRF)](http://en.wikipedia.org/wiki/Cross-site_request_forgery). To support [older browsers](http://caniuse.com/#feat=getrandomvalues) it is possible to pass in a server generated nonce. | 32 bytes from *crypto.getRandomValues()*.
client-response-uri | URL to POST the received authorization response to for server side validation or processing. Method should return 200 or 400. This parameter is only used when `response_mode=fragment`, since otherwise . | None

## Events

AuthentiqJS allows you to subscribe to a number of events during the authentication flow.

Event name | Description | Callback parameters
---------- | ----------- | -------------------
`authorized` | Emitted after successful authentication. | An object containing the URL fragments the provider sent upon successful authentication, e.g. one or more of `code`, `id_token`, `access_token`, `expires_in`, `expires_at` and `state`.
`authorized:code` | Emitted after successful authentication when the response included an authorization code as is the case with response type `code` or `code id_token`. | The authorization `code` received from the provider.
`authorized:access_token` | Emitted after successful authentication when the response included an access token as is the case with response type `token` or `token id_token`. | The `access_token` and `expires_in` values returned by the provider.
`authorized:id_token` | Emitted after successful authentication when the response included an ID Token as is the case with response type `id_token` or `code id_token`. | The un-decoded `id_token` as a JWT.
`profile` | Emitted after successful authentication when the response included an ID Token the token was validated and decoded successfully. | The decoded `id_token` object.
`concluded` | Emitted when the authentication session was concluded by the user signing out on the website, or terminating the session from the Authentiq ID mobile app. | N/A
`error` | Emitted when an error occurs. Possible errors are liste. Note that depending on the [`show_errors` option](#ss) the error may have already been shown to the user by the provider. In this case, you may still find this event useful to silently gather error statistics. | The `error` code and `error_description` as defined by the OAuth 2.0, OIDC or Bearer Token RFCs.

### Example

To subscribe to an event, use a pattern like the following.

    <script>
      authentiq.subscribe('profile', function(profile) {

        // Profile
        // {
        //   "scope": "email aq:name",
        //   "name": "George Orwell",
        //   "given_name": "George",
        //   "family_name": "Orwell",
        //   "email": "george@1984.net",
        //   "email_verified": false
        // }

      });

      authentiq.subscribe('error', function(error) {

        // Error
        // {
        //   "error": "client_error",
        //   "error_description": "Invalid state parameter"
        // }

      });
    </script>

You can see how events work in another [live example](examples/events.html).

The code that subscribes to the events must be placed after the AuthentiqJS script tag itself.
{: class="alert alert-info" role="alert" }


## Server side processing

If the response mode is set to `fragment` (recommended), then `client_response_uri` can be used to still proxy the authorization response to your backend servers, as if you had specified `query` response mode. The backend server may do one or more of the following tasks:

- Validate the ID Token, if present, using cryptographic functions available on the server and return a 400 response in case of a validation error.
- Consume the authorization code, if present, and exchange it for an access and/or refresh token at the Authentiq Connect token endpoint.

The endpoint should return one of the following status codes.

HTTP status code | Action
---------------- | ------
200 | Token validated; the success callback will be called.
400 | Token error; a message will be displayed and the error callback invoked.


# Third-party integrations

TBD

Typical option | What to fill in
-------------- | ---------------
`client_id` | The client_id you obtained above.
`scope` | Space delimited list of [Authentiq Connect scopes](index.md#scopes).
`redirect_uri` | The URL in *your* application that the Provider should redirect to after authenticating a user.
`authorize_uri` | `https://connect.authentiq.io/authorize`
`token_uri` | `https://connect.authentiq.io/token`
`userinfo_uri` | `https://connect.authentiq.io/userinfo`


## HelloJS

There is a [fork of HelloJS](https://github.com/skion/hello.js) that includes an [Authentiq Connect plugin](https://github.com/skion/hello.js/blob/master/src/modules/authentiq.js). HelloJS abstracts away the implementation differences between a large number of standard OAuth 2.0 identity providers. We'll aim to get Authentiq Connect included as a supported provider soon.

## AngularJS

At least two OAuth 2.0 modules exist for AngularJS, both of which have been tested to work with Authentiq Connect.

- [OAuth-ng](https://github.com/andreareginato/oauth-ng/blob/master/README.md)
- [Angular-OAuth](https://github.com/seegno/angular-oauth2)

## Flask

There are several authentication extensions for Flask... [TBD]

# Other integrations

As support for OpenID Connect increases, we expect to see more and more sites that will allow administrators to configure external OIDC identity provider for user authentication, vastly improving the ecosystem for Authentiq ID integrations as well. We already see companies like Amazon and SalesForce making this possible.

## Amazon AWS

Amazon allows an administrator to configure an external OpenID Connect identity provider as a source for their [AWS](http://aws.amazon.com/) console. We're planning to supporting this integration at a later stage so that teams will be able to sign in to AWS using their Authentiq ID.

## Amazon Cognito

Amazon allows mobile app developers to configure [Cognito](http://aws.amazon.com/cognito/) with external OpenID Connect identity providers, enabling an app to authenticate users from social networks and a variety of sources. We're planning to supporting this integration at a later stage so that mobile app developers will be able to register and authenticate users by their Authentiq ID.

## SalesForce

[SalesForce](http://salesforce.com/) allows an administrator configure up an external OpenID Connect identity provider as a source for company employees. We're planning to supporting this integration at a later stage so that companies will be able to let their employees sign into SalesForce using their Authentiq ID.

<style>
  .progress-bar-anim {
    -webkit-transition: width 2.6s ease;
         -o-transition: width 2.6s ease;
            transition: width 2.6s ease;
  }

  #authentiq.authentiq-button {
    font-family: Montserrat,"Helvetica Neue",Helvetica,Arial,sans-serif;
  }
</style>

<script>
  (function(aq, $){
    // Whole-script strict mode syntax
    'use strict';

    function generate_button() {
      var $button = $('#authentiq'),
          opts = {},
          button, key, val, text;

      text = $('[data-authentiq-key="sign_in_text"]').val() || 'Sign in';

      $button.replaceWith('<button id="authentiq" class="btn authentiq-button">' + text + '</button>');
      $button = $('#authentiq');

      // $button.removeData('authentiq-button');

      $('[data-authentiq-key]').each(function(index){
        key = $(this).data('authentiq-key');
        val = $(this).val();

        if (val != '') {
          opts[key] = val;
        }
      });

      button = new authentiq.Button($button[0], opts);
    }

    function fetch_clients(callback) {
      var token = JSON.parse(localStorage['ngStorage-authentiq.access_token'] || '{}');
      if (typeof token.access_token !== 'undefined' && !!token.expires_at && new Date(token.expires_at) > new Date()) {

        var base_url = authentiq._defaults.provider.base_url || 'https://connect.authentiq.io';

        $.ajax({
          url: base_url + '/client',
          headers: {
            'Authorization': token.token_type + ' ' + token.access_token
          },
          dataType: 'json'
        })
        .done(function(data) {
          var select = $('#existing-client-id');

          // clear old entries
          select.html('');

          if (data.length > 0) {
            $.each(data, function(key, client) {
              select.append(
                            $('<option></option>')
                              .attr('value', client.client_id)
                              .text(client.client_name));
            });

            select.prop('disabled', false);
          } else {
            select.append(
                            $('<option></option>')
                              .attr('value', 'PLACEHOLDER_CLIENT_ID')
                              .text('No clients found'));
          }

          if (typeof callback !== 'undefined') {
            callback();
          }
        })
        .fail(function() {
          console.info('Clients can\'t be loaded');
        });
      }
    }

    function console_iframe_loaded() {

      var self = $('#add-client');
      var iframe = self.find('iframe').contents();
      var app = iframe.find('#app');
      self.find('iframe').css('height', app.height());

      app.find('.page-header').hide();

      iframe.find('.progress').hide().find('.progress-bar').width('0%');
      app.show();

      app.on('click', '#save-button', function(){
        app.hide();
        iframe.find('.progress').show().find('.progress-bar').addClass('progress-bar-anim').width('100%');
        self.find('iframe').css('height', '50px');

        // wait a bit for
        setTimeout(function() {
          self.modal('hide');

          self.find('.progress').remove();
          self.find('.modal-body').children().show();

          fetch_clients(function(){
            $('#existing-client-id option:last-child').attr('selected', 'selected');
          });
        }, 3000);
      });

      app.on('click', '#cancel-button', function(){
        self.modal('hide');
      });
    };
    aq.console_iframe_loaded = console_iframe_loaded;

    authentiq.subscribe('profile', function(profile) {
      $('#add-client-button').removeClass('disabled');

      // redirect iframe to add view
      $('#add-client iframe')[0].contentWindow.location.hash = '/clients/add';

      fetch_clients();
    });

    authentiq.subscribe('concluded', function() {
      $('#existing-client-id').prop('disabled', true);
      $('#add-client-button').addClass('disabled');
    });

    $(function() {
      if (!authentiq.Provider.isSignedIn()) {
        $('#existing-client-id').prop('disabled', true);
      }

      $('[data-authentiq-key]').on('change', function(){
        // handle checkbox options
        if ($(this).is(':checkbox')) {
          $(this).val($(this).is(':checked') ? '1' : '');
        }

        generate_button();
      });

      generate_button();


      $('#add-client')
        .on('show.bs.modal', function(e) {
          console_iframe_loaded();
        })

        .on('hidden.bs.modal', function(e) {
          $(this).find('iframe')[0].contentWindow.location.hash = '/clients/add';
        });

      $('#get-code-modal').on('show.bs.modal', function(e) {
        var button_opts = {}, script_opts = {},
          key, val, opt, code = '', button_text;

        $('[data-authentiq-key]').each(function(index){
          key = $(this).data('authentiq-key');
          val = $(this).val();

          if (val != '') {
            if ($(this).attr('data-script-opt')) {
              script_opts[key] = val;
            } else {
              button_opts[key] = val;
            }
          };
        });

        for (opt in script_opts) {
          code += ' data-' + opt.split('_').join('-') + '="' + script_opts[opt] + '"';
        }

        $('#script-snippet').html('&lt;script src="authentiq-js/authentiq.js"' + code +
          '&gt;&lt;/script&gt;');

        code = '';
        for (opt in button_opts) {
          code += ' data-' + opt.split('_').join('-') + '="' + button_opts[opt] + '"';
        }

        button_text = $('[data-authentiq-key="sign_in_text"]').val() || 'Sign in';

        $('#button-snippet').html('&lt;button' + code +
          '&gt;' + button_text + '&lt;/button&gt;');

        // $(this).find('.modal-content #script-snippet').html('ds');
      });

      // $('#add-client-button').trigger('click');
    });
  })(window.authentiq = window.authentiq || {}, jQuery);
</script>
