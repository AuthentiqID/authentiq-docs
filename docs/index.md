# Introduction

Authentiq Connect is an easy-to-use Identity Provider built on top of OpenID Connect that makes it easy for websites and apps to move beyond usernames and passwords while safeguarding the end-user’s privacy. 

Continue reading to explore [features](#features), [integrations](#integrations), to browse use cases and [frequently asked questions](faq.md). 

Alternatively, learn more about [Authentiq](https://www.authentiq.com/developers/?utm_source=docs&utm_medium=docs&utm_campaign=index){:target="_blank"} first, or check out a code example by signing into the [Dashboard](https://dashboard.authentiq.com/?utm_source=docs&utm_medium=docs&utm_campaign=index){:target="_blank"} straight away. 

## Basics

Authentiq Connect...

- is built on top of OpenID Connect, supporting [many](#supported-standards) open standards;
- leverages *scopes* to request [identity claims](#identity-claims) from end users;
- supports both *passwordless authentication* (Authentiq ID) and *two-step verification* (TOTP); and <!-- ### use cases -->
- works well with server side, JavaScript (SPA's), native and hybrid applications.

It is usually a matter of minutes to configure your favorite OAuth 2.0 or OIDC [client library or framework](#integrations) for Authentiq Connect. Try it now, or continue reading...

<a href="https://dashboard.authentiq.com/?utm_source=docs&utm_medium=index&utm_campaign=tryitnow" class="btn btn-default btn-outline btn-cta" data-theme=“basic”>Try it now</a>

# Features

## Supported standards

Authentiq Connect is based on [OpenID Connect](https://openid.net/connect){:target="_blank"} and a growing list of supplementary standards to support integrating any type of application with the best possible user experience. 

**Standard** | **Status** | **Description**
:----------- | :--------- | :--------------
[OAuth 2.0](https://tools.ietf.org/html/rfc6749){:target="_blank"} | Supported | Authentiq supports all classic OAuth 2.0 flows.
[OIDC Core](http://openid.net/specs/openid-connect-core-1_0.html){:target="_blank"} | Supported | Authentiq supports all server side, JavaScript, native and hybrid app flows defined by OIDC.
[OIDC Discovery](http://openid.net/specs/openid-connect-discovery-1_0.html){:target="_blank"} | Supported | The Authentiq Connect Provider Configuration can be found [here](https://connect.authentiq.io/.well-known/openid-configuration){:target="_blank"}, with WebFinger support on the road map.
[OIDC Dynamic Client Registration](http://openid.net/specs/openid-connect-registration-1_0.html){:target="_blank"} | Supported | Authentiq Connect's Client Registration Endpoint is [described in the API Reference](api-provider.md).
[OIDC Session Management](http://openid.net/specs/openid-connect-session-1_0.html){:target="_blank"} | Supported | Authentiq's JavaScript snippet supports OIDC Session Management via iframes out of the box.
[OIDC Back-Channel Logout](http://openid.net/specs/openid-connect-backchannel-1_0.html){:target="_blank"} | Supported | As an alternative logout mechanism, simply enter the URL of your app's logout endpoint in the Authentiq Dashboard.
[OAuth 2.0 Multiple Response Types](http://openid.net/specs/oauth-v2-multiple-response-types-1_0.html){:target="_blank"} | Supported | Fine tune your users' authentication experience by using these response types for hybrid (server+browser) apps.
[OAuth 2.0 Form Post Response Mode](http://openid.net/specs/oauth-v2-form-post-response-mode-1_0.html){:target="_blank"} | Supported | Authentiq Connect is able to POST back the authentication response in case your app requires that. Contact support to learn how to enable it.
[Proof Key for Code Exchange](https://tools.ietf.org/html/rfc7636){:target="_blank"} | Planned | Mitigate some attack vectors for your native app. Contact us for more details.
[Security Event Tokens](https://tools.ietf.org/html/draft-hunt-idevent-token){:target="_blank"} | Planned | Respond to authentication events in a customized fashion. Contact support if you are interested in participating in the beta.

## Identity claims

Authentiq Connect leverages [predefined](http://openid.net/specs/openid-connect-core-1_0.html#ScopeClaims){:target="_blank"} and custom scopes to request identity details from the end user.

**Scope name** | **Description**
:------------- | :--------------
`openid` | Required to indicate support for OIDC
`profile` | A user's typical profile, including name
`email` | A user's verified email address
`phone` | A user's verified phone number
`address` | A user's home address
`aq:name` | A user's full name
`aq:location` | A user's current location
`aq:username` | A user's preferred username
`aq:locale` | A user's preferred locale
`aq:zoneinfo` | A user's preferred timezone
`aq:push` | To enable one-click sign in

Requested scopes are *optional* by default, leaving the choice of providing any of the details to the end-user, who will be able to opt out of the requested scopes on the Authentiq ID consent screen.

It is possible to mark essential scopes as *required* by appending `~r`.

Individual scopes are concatenated in a space separated list. A typical scope parameter might look like:

    openid profile email~r aq:locale aq:zoneinfo aq:push

## Authentiq ID

The Authentiq ID mobile app (available on [Android](https://play.google.com/store/apps/details?id=com.authentiq.authentiqid) and [iOS](https://itunes.apple.com/us/app/authentiq-id/id964932341)) are the key to your end-user's privacy. It acts as a mobile identity wallet that can be used to identify to websites. A user's Authentiq ID can be seen as their personal cryptographic passport that holds profile information.

When signing in, the user decides what information will be shared.
Phone number and email address will already have been verified by Authentiq so that the website doesn't have to.

Authentiq ID is also a TOTP secret manager, like Google Authenticator, but with many extra features, such as backing up TOTP secrets online and on paper.

## One click Sign-In

One Click Sign-In lets users sign into your website by just tapping a notification on their phone on subsequent logins. 

To enable it, simply include the `aq:push` value in the scope parameter. 

## Single Sign-On

On intranets authentication is often synchronized between applications. Contact us to configure Authentiq Connect for Single Sign-on to support this.

Dashboard support for Single Sign-on is planned. In the mean time, let us know how you would like to configure your apps.
 
## Remote Sign-Out

When a user signs in with Authentiq ID, the website's authentication session is linked to the mobile app. Authentiq lets you sign out from a website remotely, and in the future just by walking away from a computer.

To enable this feature, either 

- use the Authentiq JS snippet;
- include OIDC-compatible RP iframe on your website; or
- enter a Backend Logout URL for your client in the Authentiq Dashboard.

## Webhooks

Create rich integrations by listening to Authentiq's [Security Event Token](https://tools.ietf.org/html/draft-ietf-secevent-token) webhooks. Use a webhook, for instance, to add new users to your newsletter easily. Coming soon!

# Use cases

By enabling Authentiq you make the following authentication methods available to your site's users.

Authentication Method | Application |  Type  | Support
:-------------------- | :---------- | :----- | :------
Passwordless          | Authentiq ID | QR code, PN, Handle | Supported
Virtual 2FA | Authentiq ID, Google Authenticator | TOTP | Supported
Physical 2FA | YubiKey | USB Token | Coming soon
One-time authentication | Email | Magic link | Coming soon

These methods can work in addition to or conjunction with your existing login system.

We often see sites that already integrate with social login providers adding passwordless authentication via Authentiq ID, this way providing their users with a privacy-aware alternative to signing in with Google or Facebook.

Another common pattern is to use Authentiq Connect to effortlessly add two-step verification on top of usernames and passwords that are kept in-house.

# Integrations

Your favorite OAuth 2.0 or OIDC client library should work out of the box with Authentiq Connect. Do let us know if this is the case, or not.

Below is a list of frameworks that we have native integrations for, or that are otherwise known to work well. 

**Name** | **Language**
:------- | :-----------
[ASP .NETCore](https://github.com/AuthentiqID/example-aspnetcore-mvc) | C#
[ForgeRock](https://github.com/AuthentiqID/forgerock-social-authentiq-node) | Java
Authentiq JS | JavaScript
[Meteor JS](https://github.com/AuthentiqID/meteor-authentiq) | JavaScript
[Passport JS](https://github.com/AuthentiqID/passport-authentiq) | JavaScript
[Nginx](https://github.com/AuthentiqID/authentiq-proxy/) / [Jenkins](https://github.com/AuthentiqID/authentiq-proxy/tree/master/jenkins)| LUA
[HybridAuth](https://github.com/AuthentiqID/hybridauth) | PHP
[OAuth2 Client](https://github.com/AuthentiqID/oauth2-authentiq-php) | PHP
[WordPress native](https://github.com/AuthentiqID/wordpress-authentiq) | PHP
[WordPress Social Login](https://github.com/AuthentiqID/wordpress-social-login) | PHP
[Zend](https://github.com/AuthentiqID/zend-framework-1-oauth-2-library) | PHP
[Django](https://github.com/AuthentiqID/django-allauth) | Python
[Flask](https://github.com/AuthentiqID/examples-flask) | Python
[OAuthlib](https://oauthlib.readthedocs.io/en/latest/) | Python
[Requests-Oauthlib](https://requests-oauthlib.readthedocs.io/en/latest/) | Python
[GitLab](https://gitlab.com) | Ruby
[OmniAuth](https://github.com/AuthentiqID/omniauth-authentiq) | Ruby
[SalesForce](https://github.com/AuthentiqID/authentiq-salesforce-registration-handler) | Other

Also check our [GitHub pages](https://github.com/AuthentiqID/) for supported integrations and examples. 

# Support

What do you think? 

A penny for your thoughts... Get in touch with us on [support@authentiq.com](mailto:support@authentiq.com).

Please report security issues to [security@authentiq.com](mailto:security@authentiq.com).
