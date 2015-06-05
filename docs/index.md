
# Introduction

Hey, if you're reading this, then you are probably curious how to get started with implementing [Authentiq](http://authentiq.com/) on your website. 

Fortunately, as we run Authentiq Connect as a service, there is no need to install or run anything locally. Simply include our JavaScript snippet on your page or point your favourite OAuth 2.0 client library at our hosted instance. Dive right in by heading over to the [Getting started](gettingstarted.md) page.

Of course if you prefer to [install the Authentiq Connect daemon locally](installation.md), then we will have pre-built packages for Debian 7.0, 8.0 and Ubuntu 15.04 soon. You will also be able to install the Authentiq Connect Provider from PyPI or build it from [source](https://github.com/skion/authentiq-provider).

> Please see our licensing options before installing Authentiq Connect locally to make sure it matches your situation.


## Why Authentiq?

Why should I do this and what's so cool about the Authentiq technology again?

* Authentiq provides super secure multi-factor authentication.
* Authentiq provides you with fresh contact details every time a user signs in.
* Authentiq lets your end-users control their identity from their phone.
* Authentiq aims to avoid being a single point of failure for your product.
* Authentiq aims to avoid being another point of trust for your users.
* Authentiq aims to be reasonably priced, or free.

# Concepts 

This section attempts to explain general concepts relating to Authentiq Connect.

## Scopes

Authentiq Connect leverages OAuth 2.0 *scopes* to specify what sections of a user's profile are being requested. We mimic the [scopes from OIDC](http://openid.net/specs/openid-connect-core-1_0.html#ScopeClaims) as much as possible, and prefix additional scopes with a `aq:`.

### Identity scopes

Using scopes, a client application can request the following user details from a user.  

Label | Description | Claims | Can be marked required? | Can be signed?
----  | ----------- | ------ | ----------------------- | --------------
`email` | A user's (verified) email address.  | `email`, `email_verified` | Yes | Yes
`phone` | A user's (verified) phone number. | `phone_number`, `phone_number_verified` | Yes | Yes
`address` | A user's home address. | [`address`](http://openid.net/specs/openid-connect-core-1_0.html#AddressClaim) | Yes | No
`aq:name` | A user's full name. | `name`, `given_name`, `family_name`, `middle_name`, `nickname` | Yes | No
`aq:location` | A user's current location. | `aq:location` | Yes | No

Following OIDC, requested scopes are optional by default, meaning that a user will be able to opt out of a requested scope on the Authentiq ID user consent screen. In this case it is up to the client application to decide how to deal with the missing information. Alternatively, Authentiq allows a developer to mark certain scopes as required and/or requiring a signature from a trusted issuer. 

#### Required scopes

Identity scopes can be marked as being *required* by appending `~r`, for instance `email~r` or `aq:name~r`. Doing so will prevent a user from opting out of the section when signing in from the Authentiq ID app. We recommend to use this flag with care and instead let your users remain in control of the information they share with you.  

#### Signed scopes

Scopes can also be marked to *require a signature* from an externally trusted party. In fact, Authentiq is acting as a signature provider for the email and phone scopes, handling the confirmation of email addresses and phone number using a one-time verification code sent by email or text message.

### Functional scopes

Authentiq Connect also uses scopes to indicate functional preferences. 

Label | Description 
----  | -----------
`aq:push` | Whether or not to offer *One click sign-in* to the user.

## Errors

When something goes wrong, Authentiq Connect tries to direct back to the client application as stipulated by OAuth 2.0, so that the error can be handled in the domain and using the UX of the client application.

The native SDK handles all errors for you, however here is a list of things that may go wrong for reference.

Error | Origin | Grants | Description
----- | ------ | ------ | -----------
`invalid_XYZ` | OAuth 2.0 | Authorization code | 
`consent_required` | OIDC | Authorization code | The user did not The user did not The user did not The user did not 


# Terminology

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

