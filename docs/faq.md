---
one_level_toc: true
...
Answers to the questions developers have asked us.  Please see the [general FAQ](https://www.authentiq.com/faq) for non-technical questions about Authentiq.

Do you have a different question? [Email us](mailto:ask@authentiq.com)!

# General

## What is an Authentiq ID?

When you download our app and create a profile, that is your very own Authentiq ID. Use it to sign into websites, or share your details in other ways.

## What is Authentiq Connect?

Authentiq Connect is the SDK you can use to let your users sign in to your stuff. On the server side it implements both the OAuth 2.0 and OpenID Connect protocols, giving developers the most flexible integration options. The AuthentiqJS snippet is basically an OIDC client, but specifically built for Authentiq.

## What is OpenID Connect?

[OpenID Connect 1.0](http://openid.net/connect/) is a set of extensions to OAuth 2.0, focusing on authentication as opposed to authorization. Many global players are backing OpenID Connect to authenticate users. OpenID Connect is technically very different from the older OpenID.

## Why not SAML?

Support for SAML is on our roadmap as we recognize the need to support integrations between Authentiq and existing enterprise systems.

But we also believe the future of authentication will converge towards the OpenID Connect family of standards. If you are building an application from scratch and have a choice, then you should consider OIDC.

## Who signs the Authentiq ID claims?

At the moment we verify and sign the email and phone number claims when a user registers their Authentiq ID, so that you don't have to. In the future we will open up our signing API to allow external signature providers to issue and sign additional claims to store in your *identity wallet*. Typical verifiable claims include an employee or student number, or a car registration.

## How does *One-click sign in* work?

With *One-click sign in* users can sign in to your site by simply tapping a notification. It works by saving a cryptographically signed token to the user's device in the browser. Centrally we persist only a mapping of the user's handle to the mobile Device ID.

# Use cases

[//]: # (Link to use case pages.)

Answers to questions about common use cases.

## Does Authentiq support scenario X?

Let's [find out](mailto:ask@authentiq.com?subject=Does+Authentiq+support...)! With Authentiq our goal is to make it easy for developers to do the *right thing*. Yet, every authentication use case is different. We are always keen to hear how we can make Authentiq work in your situation.

# Integrations

Answers to questions about specific client integrations.

## Does Authentiq support Framework X?

In general, if your framework includes a standard OAuth 2.0 or OIDC client library, then most likely yes, out of the box.

We have examples or native integrations for e.g. [Python Flask](https://github.com/AuthentiqID/examples-flask), [Ruby OmniAuth](https://github.com/AuthentiqID/omniauth-authentiq), or [PHP](https://github.com/AuthentiqID/oauth2-authentiq-php).

Alternatively, JavaScript applications can use the AuthentiqJS snippet and obtain the end user profile via a JavaScript event hook.

For server side applications you will need to create an HTTP endpoint that retrieves and validates the ID Token from the [Token Endpoint](/api-provider/#token).

## Can I use AuthentiqJS with a server application?

Yes, even though the AuthentiqJS snippet is running in the browser it supports the authorization code flow in two ways. First, you can let AuthentiqJS catch the authorization code from Authentiq Connect via a fragment redirect and then POST it to your own server side resource. This method is great for *hybrid* apps where both the user agent and the server must be authenticated. Alternatively, you can point the redirect URL directly to a server-side resource, bypassing the snippet entirely upon authentication and following the traditional OAuth 2.0 code flow.

# Privacy & Security

Answers to questions about how Authentiq manages a user's privacy. See our [Privacy Policy](https://www.authentiq.com/privacy) for details.

## How does Authentiq encrypt my data on my phone?

On iOS, your Authentiq ID is automatically encrypted by the OS when the phone is locked, and decrypted when the phone is unlocked. For this reason it is important that the device has a passcode set, even though the Authentiq ID app itself can be protected with a PIN.

## How does Authentiq encrypt data in transit?

At registration time, your email and phone number are transmitted over TLS for verification purposes, but not persisted afterwards. When signing in to a website, your profile is transmitted over an TLS connection to the Authentiq Connect Provider, which in turn will send the profile data to the client, also using TLS. Our hosted provider currently has an A rating on [SSL Labs](https://www.ssllabs.com/ssltest/analyze.html?d=connect.authentiq.io).

## What data does the Authentiq Connect Provider persist?

As little as possible. We are very privacy-aware ourselves and our goal is to avoid persisting any data when not needed, including metadata. We are making Authentiq compatible with the [GDPR](https://en.wikipedia.org/wiki/General_Data_Protection_Regulation) and also plan to offer a mode that supports end-to-end encryption between the phone and the client application. When used, the Authentiq Connect Provider will be unable to decrypt the ID Token that is transmitted and is merely acting as a gateway.
