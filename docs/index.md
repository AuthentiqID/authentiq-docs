# Introduction

If you are reading this you're probably curious how to integrate [Authentiq](http://authentiq.com/) on your website. 

The easiest to get started is to include the [AuthentiqJS snippet](#show-me-the-code) on your page as described below. Alternatively you can point your [favourite OAuth 2.0 or OpenID Connect client library](integration.md#third-party-integrations) at Authentiq.

As we run Authentiq Connect as a Service, there is no need to install or run anything locally.

Soon you will also be able to [install the Authentiq Connect daemon locally](installation.md){: .alert-link}, from source, or using pre-built packages for Debian 7.0, 8.0 and Ubuntu 15.04.
{: class="alert alert-success" role="alert" }


## Show me the code!

[Register an app](integration.md#configurator) and paste the following code into an HTML page at the point where you want render a Sign in button. Replace the placeholder with the Client ID of your new application.

    <script src="https://developers.authentiq.io/js/authentiq.js"
            class="authentiq-snippet"
            data-client-id="<YOUR-CLIENT-ID>"
            data-button="yes">
    </script>

You can view a [live demo](/examples/signin.html) of the above code wrapped in some basic HTML.

Make sure to register the app as a [client-side or hybrid](#application-types) application, and to paste the exact URL your example is loaded on (e.g. `http://localhost:8000/authentiq.html`) in the `Redirect URI` field. This is an essential security measure for the Authentiq Connect server. An easy way to serve local files is by executing `python3 -m http.server` in the same directory.
{: class="alert alert-info" role="alert" }

## Next steps

Great, let's dive a bit deeper. Some suggestions:

- Check the different [identity claims](#identity-claims) you can request from a user, and add them to the example including a `data-scope` attribute.
- Play with some of the other [script tag attributes](integration.md#authentiqjs-attributes), such as `data-display`, `data-sign-in-text`, `data-sign-out-text` and `data-sign-out-claim`.
- Add a "profile" [event handler](integration.md#event-handlers) to the example and print the identity claims it receives.

To develop a more complete application, 

- Check the [third-party integrations](integration#third-party-integrations) and browse the [example code](https://github.com/AuthentiqID/authentiq-examples/). 
- Understand whether you are building a [client-side, server-side or hybrid application](#application-type).
- Fine tune your application's configuration, attach a title and a logo, in the [client console](yourapps.md).
- Finally, [let us know](#support) how it went or [help fix a documentation error](https://github.com/AuthentiqID/authentiq-docs/)!

# Protocol

TBD

# Concepts

This section explains general concepts relating to Authentiq Connect.

## Authentiq ID

The Authentiq mobile app (currently on iOS) is the key to the end-user's privacy. The app creates and maintains a mobile identity---Authentiq ID---that can be used to authenticate. An Authentiq ID can be seen as a secure cryptographic passport that can hold various bits of profile information. Some of the information, like phone number and email address, are verified by Authentiq so that the website doesn't have to. The user still decides what to share and with whom.

## Application types

TBD

## Integration types

The following table highlights key differences between the protocol variants.

Feature | Authentiq Connect | OpenID Connect | OAuth 2.0
------- | ----------------- | -------------- | ---------
[Authorization code grant](https://tools.ietf.org/html/rfc6749#section-1.3.1) | Yes | Yes | Yes
[Implicit grant](https://tools.ietf.org/html/rfc6749#section-1.3.2) | Yes | Yes | Yes
[ID Token](http://openid.net/specs/openid-connect-core-1_0.html#IDToken) support | Yes | Yes | No
Rich authentication UX | Standard | With some effort | Less
Need to fetch user information with separate HTTP request | No | No | Yes
End-to-end verification of user information | Yes | No | No 
End-to-end encryption of user information | Soon | No | No 
Authentiq Connect Provider needs to be trusted by client | No | Yes | Yes
Authentiq Connect Provider needs to persist user information | No | Depends | Yes


## Scopes

Authentiq Connect leverages OAuth 2.0 scopes to specify what sections of a user's profile are being requested, inheriting [scopes from OIDC](http://openid.net/specs/openid-connect-core-1_0.html#ScopeClaims) where possible.

### Identity claims

Using scopes, a client application can request the following [identity claims](http://openid.net/specs/openid-connect-core-1_0.html#StandardClaims) from a user.

Scope name | Description | Claims included | Can be marked required? | Can be signed?
----  | ----------- | ------ | ----------------------- | --------------
`name` | A user's full name. | `name`, `given_name`, `family_name`, `middle_name`, `nickname` | Yes | No
`email` | A user's (verified) email address  | `email`, `email_verified` | Yes | Yes
`phone` | A user's (verified) phone number | `phone_number`, `phone_number_verified` | Yes | Yes
`address` | A user's home address | [`address`](http://openid.net/specs/openid-connect-core-1_0.html#AddressClaim) | Yes | No
`location` | A user's current location. | `aq:location` | Yes | No

Following OIDC, scopes are *optional* by default, leaving the choice of providing any of the details to the end-user, who will be able to opt out of the requested scopes on the Authentiq ID consent screen. The client application is then responsible to deal with the missing information.

Alternatively, Authentiq allows you to mark certain scopes as *required* and/or *requiring a signature* from a trusted issuer.

#### Required claims

Identity scopes can be marked as being *required* by appending `~r` to the scope label, for instance `email~r` or `phone~r`. Doing so will prevent a user from opting out of the section when signing in from the Authentiq ID mobile app. We recommend using this flag sparingly and instead letting users opt-in to the information they share with you.

#### Signed claims

Scopes can also be marked to *require a signature* from an externally trusted party. In fact, Authentiq is acting as a signature provider for the email and phone claims, handling the confirmation of email addresses and phone number using a one-time verification code sent by email or text message.

Developers will be able to register their own signature providers soon. 
{: class="alert alert-success" role="alert" }

### Functional scopes

Authentiq Connect also uses scopes to indicate *functional* preferences. 

Label | Description 
----  | -----------
`aq:push` | Whether or not to offer *One click sign-in* to the user. With this convenient feature enabled, the end-user will be given the option to skip the QR code for subsequent logins using the same browser.


## Errors

When something goes wrong, Authentiq Connect redirects back to the client application as stipulated by OAuth 2.0, so that the error can be handled in the domain and using the UX of the client application. The Authentiq Connect SDK emits these errors in turn as an `error` event. Below is a gathering of all possible error codes and their descriptions.

Error | Origin | Resource | Description
----- | ------ | -------- | -----------
`interaction_required` | [OIDC](http://openid.net/specs/openid-connect-core-1_0.html#AuthError) | Authorize | The Authorization Server requires End-User interaction of some form to proceed. This error MAY be returned when the prompt parameter value in the Authentication Request is none, but the Authentication Request cannot be completed without displaying a user interface for End-User interaction. 
`login_required` | [OIDC](http://openid.net/specs/openid-connect-core-1_0.html#AuthError) | Authorize | The Authorization Server requires End-User authentication. This error MAY be returned when the prompt parameter value in the Authentication Request is none, but the Authentication Request cannot be completed without displaying a user interface for End-User authentication. 
`account_selection_required` | [OIDC](http://openid.net/specs/openid-connect-core-1_0.html#AuthError) | Authorize | The End-User is REQUIRED to select a session at the Authorization Server. The End-User MAY be authenticated at the Authorization Server with different associated accounts, but the End-User did not select a session. This error MAY be returned when the prompt parameter value in the Authentication Request is none, but the Authentication Request cannot be completed without displaying a user interface to prompt for a session to use. 
`consent_required` | [OIDC](http://openid.net/specs/openid-connect-core-1_0.html#AuthError) | Authorize | The Authorization Server requires End-User consent. This error MAY be returned when the prompt parameter value in the Authentication Request is none, but the Authentication Request cannot be completed without displaying a user interface for End-User consent. 
`invalid_request_uri` | [OIDC](http://openid.net/specs/openid-connect-core-1_0.html#AuthError) | Authorize | The request_uri in the Authorization Request returns an error or contains invalid data. 
`invalid_request_object` | [OIDC](http://openid.net/specs/openid-connect-core-1_0.html#AuthError) | Authorize | The request parameter contains an invalid Request Object. 
`request_not_supported` | [OIDC](http://openid.net/specs/openid-connect-core-1_0.html#AuthError) | Authorize | The OP does not support use of the request parameter defined in Section 6. 
`request_uri_not_supported` | [OIDC](http://openid.net/specs/openid-connect-core-1_0.html#AuthError) | Authorize | The OP does not support use of the request_uri parameter defined in Section 6. 
`registration_not_supported` | [OIDC](http://openid.net/specs/openid-connect-core-1_0.html#AuthError) | Authorize | The OP does not support use of the registration parameter defined in Section 7.2.1. 
`invalid_request` | [OAuth2](https://tools.ietf.org/html/rfc6749#section-5.2) | Authorize, Token | The request is missing a required parameter, includes an invalid parameter value, includes a parameter more than once, or is otherwise malformed.
`unauthorized_client` | [OAuth2](https://tools.ietf.org/html/rfc6749#section-5.2) | Authorize, Token | The client is not authorized to request an authorization code using this method.
`access_denied` | [OAuth2](https://tools.ietf.org/html/rfc6749#section-5.2) | Authorize, Token | The resource owner or authorization server denied the request.
`unsupported_response_type` | [OAuth2](https://tools.ietf.org/html/rfc6749#section-5.2) | Authorize, Token | The authorization server does not support obtaining an authorization code using this method.
`invalid_scope` | [OAuth2](https://tools.ietf.org/html/rfc6749#section-5.2) | Authorize, Token | The requested scope is invalid, unknown, or malformed. 
`server_error` | [OAuth2](https://tools.ietf.org/html/rfc6749#section-5.2) | Authorize, Token | The authorization server encountered an unexpected condition that prevented it from fulfilling the request.
`temporarily_unavailable` | [OAuth2](https://tools.ietf.org/html/rfc6749#section-5.2) | Authorize, Token | The authorization server is currently unable to handle the request due to a temporary overloading or maintenance of the server.
`invalid_request` | [Bearer](http://tools.ietf.org/html/rfc6750#section-3.1) | UserInfo | The request is missing a required parameter, includes an unsupported parameter or parameter value, repeats the same parameter, uses more than one method for including an access token, or is otherwise malformed.  The resource server SHOULD respond with the HTTP 400 (Bad Request) status code.
`invalid_token` | [Bearer](http://tools.ietf.org/html/rfc6750#section-3.1) | UserInfo | The access token provided is expired, revoked, malformed, or invalid for other reasons.  The resource SHOULD respond with the HTTP 401 (Unauthorized) status code.  The client MAY request a new access token and retry the protected resource request.
`insufficient_scope` | [Bearer](http://tools.ietf.org/html/rfc6750#section-3.1) | UserInfo | The request requires higher privileges than provided by the access token.  The resource server SHOULD respond with the HTTP 403 (Forbidden) status code and MAY include the "scope" attribute with the scope necessary to access the protected resource.



## Terminology

Some terminology used in this documentation.

Authentiq ID
: The name of the Authentiq mobile app that manages the mobile cryptographic identity of the end-user. Authentiq ID is currently available on iOS, but will also be ported to Android.

AuthentiqJS
: The name of the Authentiq native JavaScript snippet.

Authentiq Connect
: The authentication protocol defined by Authentiq.
 
Authentiq Connect Provider
: The daemon that serves the Authentiq Connect protocol, acting as a bridge between website and app. The provider is packaged as `authentiqd` in the context of SysV-style init scripts.

Authentiq Connect SDK
: The combination of the hosted (or installable) Authentiq Connect Provider and AuthentiqJS.

Third-party Integration
: The combination of the hosted (or installable) Authentiq Connect Provider and a third-party OAuth 2.0 or OIDC client library.

App, Client, or Relying Party
: The client website or application that end-users authenticate to. Client and Relying Party are used interchangeably in the OpenID Connect specification.

Certificate Authority List
: A public list of signature authorities that allows a Relying Party to verify that a certain identity claim was signed by an active trusted party.

Certificate Revocation List
: A public list of unique end-user and (hashed) device identifiers that can be used by a Relying Party to verify that a user is still active and their device hasn't been revoked. 


# Support

Nothing is perfect right from the start, but we're here to help and we're listening too! These are the best ways to contact us...

## Chat

Join Authentiq on IRC at [#authentiq@freenode.net](irc://freenode.net/#authentiq) to discuss general topics, or to let us know your joys or pains with Authentiq. We're quite an accessible bunch of friends.

## Email

You can contact us via email at [support@authentiq.com](mailto:support@authentiq.com).

## Tweet

Sometimes a simple [tweet](https://twitter.com/AuthentiqID) is best.

## Hack

Discuss bugs or new features on [GitHub](https://github.com/AuthentiqID/authentiq-provider/issues).

## Write

Spotted an error in this documentation? Let us know or fork [this repository](https://github.com/AuthentiqID/authentiq-docs/) straight away and press Edit.

## Security

Please report security issues by email [security@authentiq.com](mailto:security@authentiq.com).

We'll set up a GPG key for the security team soon.
{: class="alert alert-warning" role="alert" }
