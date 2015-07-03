
# Introduction

If you are reading this you're probably curious how to implement [Authentiq](http://authentiq.com/) on your website. 

The easiest way to get started is by including our [JavaScript snippet](integration.md#native-sdk) on your page. Alternatively you can [point](integration.md#third-party) your favourite OAuth 2.0 or OpenID Connect client library at Authentiq.

As we run Authentiq Connect as a Service, there is no need to install or run anything locally.

Soon you will also be able to [install the Authentiq Connect daemon locally](installation.md){: .alert-link}, from source, or using pre-built packages for Debian 7.0, 8.0 and Ubuntu 15.04.
{: class="alert alert-success" role="alert" }

## Why Authentiq?

Why should I do this and what's so cool about the Authentiq technology again? In short,

* Authentiq is based on standards like OAuth 2.0 and OpenID Connect.
* Authentiq provides secure multi-factor authentication.
* Authentiq lets your end-users control their identity from their phone.
* Authentiq provides your site with fresh contact details every time a user signs in.
* Authentiq aims to avoid being a single point of failure for your product.
* Authentiq aims to avoid being another point of trust for your users.
* Authentiq aims to be reasonably priced, or free.
* Authentiq aims to minimize logging of (meta)data.



# Concepts

This section explains general concepts relating to Authentiq Connect.

## Scopes

Authentiq Connect leverages OAuth 2.0 scopes to specify what sections of a user's profile are being requested, inheriting [scopes from OIDC](http://openid.net/specs/openid-connect-core-1_0.html#ScopeClaims) where possible; and prefixing additional scopes with `aq:`.

### Identity claims

Using scopes, a client application can request the following identity claims from a user.

Label | Description | Claims | Can be marked required? | Can be signed?
----  | ----------- | ------ | ----------------------- | --------------
`email` | A user's (verified) email address.  | `email`, `email_verified` | Yes | Yes
`phone` | A user's (verified) phone number. | `phone_number`, `phone_number_verified` | Yes | Yes
`address` | A user's home address. | [`address`](http://openid.net/specs/openid-connect-core-1_0.html#AddressClaim) | Yes | No
`aq:name` | A user's full name. | `name`, `given_name`, `family_name`, `middle_name`, `nickname` | Yes | No
`aq:location` | A user's current location. | `aq:location` | Yes | No

Following OIDC, scopes are *optional* by default, leaving the choice of providing any of the details to the end-user, who will be able to opt out of the requested scopes on the Authentiq ID consent screen. The client application is then responsible to deal with the missing information.

Alternatively, Authentiq allows you to mark certain scopes as *required* and/or *requiring a signature* from a trusted issuer. 

#### Required claims

Identity scopes can be marked as being *required* by appending `~r` to the scope label, for instance `email~r` or `aq:name~r`. Doing so will prevent a user from opting out of the section when signing in from the Authentiq ID mobile app. We recommend using this flag sparingly and instead letting users opt-in to the information they share with you.  

#### Signed claims

Scopes can also be marked to *require a signature* from an externally trusted party. In fact, Authentiq is acting as a signature provider for the email and phone scopes, handling the confirmation of email addresses and phone number using a one-time verification code sent by email or text message.

Developers will be able to register their own signature providers soon. 
{: class="alert alert-success" role="alert" }

### Functional scopes

Authentiq Connect also uses scopes to indicate functional preferences. 

Label | Description 
----  | -----------
`aq:push` | Whether or not to offer *One click sign-in* to the user.


## Errors

When something goes wrong, Authentiq Connect redirects back to the client application as stipulated by OAuth 2.0, so that the error can be handled in the domain and using the UX of the client application. The Authentiq Connect SDK emits these errors in turn as an `aq:error` event. 

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

Let's get over some terminology used in this documentation.

Authentiq Connect
: The authentication protocol defined by Authentiq.
 
Authentiq Connect Provider
: The actual daemon that serves the Authentiq Connect protocol, acting as a bridge between website and app. The provider is packaged as `authentiqd` in the context of SysV-style init scripts.

Authentiq Connect SDK
: The combination of the hosted (or installable) Authentiq Connect Provider and client side JavaScript snippet.

Client or Relying Party
: The client website or application that end-users authenticate to. Both Client and Relying Party are used interchangeably in the OpenID Connect specifications.

Certificate Authority List
: A public list of signature authorities that allows a Relying Party to verify that a certain identity claim was signed by an active trusted party.

Certificate Revocation List
: A public list of unique end-user and (hashed) device identifiers that can be used by a Relying Party to verify that a user is still active and their device hasn't been revoked. 


# Support

## Email

Contact us via email at [support@authentiq.io](mailto:support@authentiq.io).

## Chat

Join the Authentiq team on IRC at [#authentiq@freenode.net](irc://freenode.net/#authentiq).

## Issues

Discuss bugs, issues and feature requests on our [GitHub project page](https://github.com/skion/authentiq-provider/issues).

