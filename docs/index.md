# Introduction

Authentiq Connect is an easy-to-use Identity Provider built on top of [OpenID Connect](http://openid.net/connect/) that makes it easy for websites and apps to move beyond usernames and passwords while safeguarding the end-user's privacy. 

Continue reading on to explore [features](#features), use cases and frequently asked questsion. 

Alternatively, learn more about [Authentiq](https://www.authentiq.com/developers/?utm_source=docs&utm_medium=docs&utm_campaign=index){:target="_blank"} first, or check out a code example by signing into the [Dashboard](https://dashboard.authentiq.com/?utm_source=docs&utm_medium=docs&utm_campaign=index){:target="_blank"} straight away. 

# Features

## Supported standards

Authentiq Connect supports a growing number of web standards to integrate applications with the best possible user experience. 

Standard | Support
:------- | :------
[OAuth 2.0](https://tools.ietf.org/html/rfc6749) | code, token
[OIDC Core](http://openid.net/specs/openid-connect-core-1_0.html) | code, id_token, hybrid
[OIDC Discovery](http://openid.net/specs/openid-connect-discovery-1_0.html) | Supported
[OIDC Dynamic Client Registration](http://openid.net/specs/openid-connect-registration-1_0.html) | Supported
[OIDC Session Management](http://openid.net/specs/openid-connect-session-1_0.html) | Supported
[OIDC Back-Channel Logout](http://openid.net/specs/openid-connect-backchannel-1_0.html) | Supported
[OAuth 2.0 Multiple Response Types](http://openid.net/specs/oauth-v2-multiple-response-types-1_0.html) | Supported
[OAuth 2.0 Form Post Response Mode](http://openid.net/specs/oauth-v2-form-post-response-mode-1_0.html) | Supported
[Security Event Tokens](https://tools.ietf.org/html/draft-ietf-secevent-token-02) | Coming soon

*[OIDC Session Management]: An extension to OIDC that describes a communications channel between the website and the authentication server to facilitate SSO and enable remote logout.
*[OIDC Back-Channel Logout]: An alternative remote logout mechanism using a server-to-server API.

## Authentication methods

By enabling Authentiq you make the following authentication methods available to your site's users.

Authentication Method | Application |  Type  | Support
:-------------------- | :---------- | :----- | :------
Passwordless          | Authentiq ID | QR code, PN, Handle | Supported
Virtual 2FA | Authentiq ID, Google Authenticator | TOTP | Supported
Physical 2FA | YubiKey | USB Token | Coming soon
One-time authentication | Email | Magic link | Coming soon

*[Passwordless]: Sign in without a password using your Authentiq ID.
*[Virtual 2FA]: Sign in with two-step verification and an authenticator app.
*[Physical 2FA]: Sign in with two-step verification and a hardware token.
*[One-time authentication]: Sign in via a one-time link sent to your email account.
*[Authentiq ID]: Your personal mobile identity wallet.
*[PN]: Push Notification

These methods can work in addition to or conjunction with your existing login system.

We often see sites that already integrate with social login providers adding passwordless authentication via Authentiq ID, this way providing their users with a privacy-aware alternative to signing in with Google or Facebook.

Another common pattern is to use Authentiq Connect to effortlessly add two-step verification on top of usernames and passwords that are kept in-house.

## Authentiq ID

The Authentiq ID mobile app (available on [Android](https://play.google.com/store/apps/details?id=com.authentiq.authentiqid) and [iOS](https://itunes.apple.com/us/app/authentiq-id/id964932341)) are the key to your end-user's privacy. It acts as a mobile identity wallet that can be used to identify to websites. A user's Authentiq ID can be seen as their personal cryptographic passport that holds profile information.

When signing in, the user decides what information will be shared.
Phone number and email address will already have been verified by Authentiq so that the website doesn't have to.

## Remote Sign-Out

When a user signs in with Authentiq ID, the website session is also visible in the mobile app. Walking away from a computer

## Webhooks

Create rich integrations by listening to Authentiq's [Security Event Token](https://tools.ietf.org/html/draft-ietf-secevent-token) webhooks. Use a webhook, for instance, to add new users to your newsletter easily. Coming soon.


## Single Sign-On

On intranets authentication is often synchronized between applications. You can configure Authentiq Connect for Single Sign-on to support this. Coming soon.

## Pairwise UUIDs

The ability to get a different user ID for every site you log in to, protecting your privacy better in case a site is breached. Coming soon.

# Identity claims

Authentiq Connect leverages OIDC's scopes to specify what profile information to request from a user.

 [scopes from OIDC](http://openid.net/specs/openid-connect-core-1_0.html#ScopeClaims) where possible.

Scope name | Description | Verified
:--------- | :---------- | :-------
`profile` | A user's typical profile, including name | No
`email` | A user's (verified) email address | Yes
`phone` | A user's (verified) phone number | Yes
`address` | A user's home address | No
`aq:name` | A user's full name | No
`aq:location` | A user's current location | No
`aq:username` | A user's preferred username | No

Requested scopes are *optional* by default, leaving the choice of providing any of the details to the end-user, who will be able to opt out of the requested scopes on the Authentiq ID consent screen.

As a website it is possible to mark essential scopes as required too, by appending `~r`.

# Support

Get in touch with us on [support@authentiq.com](mailto:support@authentiq.com).

Please report security issues to [security@authentiq.com](mailto:security@authentiq.com).


*[2FA]: Two-factor authentication
*[IdP]: Identity Provider
*[TOTP]: Time-based one-time passwords.
*[UX]: User experience
