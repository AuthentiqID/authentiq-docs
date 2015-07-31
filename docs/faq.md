# Frequently Asked Questions

Some answers to questions people have asked. Do you have a different question? Please [get in touch with us](index.md#support).

## General

### What is an Authentiq ID?

When you download our app and create a profile, that is your very own Authentiq ID. Use it to sign into websites, or share your details in other ways.

### What is Authentiq Connect?

Authentiq Connect is the SDK you can use to let your users sign in to your stuff. On the server side it implements both the OAuth 2.0 and OpenID Connect protocols, giving developers the most flexible integration options. The AuthentiqJS snippet is basically an OIDC client, but specifically built for Authentiq.

### What is OpenID Connect?

[OpenID Connect 1.0](http://openid.net/connect/) is a set of extensions to OAuth 2.0, focusing on authentication as opposed to authorization. Many global players are backing OpenID Connect to authenticate users. OpenID Connect is technically very different from the older OpenID.

### Who signs the Authentiq ID claims?

At the moment we verify and sign the email and phone number claims when a user registers their Authentiq ID, so that you don't have to time and money doing your own email and SMS verification. At some point in the future we will open up our signing APIs to allow external signature providers to issue and sign additional claims, for instance an employee number, or a car registration.

### How does *One-click sign in* work?

*One-click sign in* allows end-users, on repeated visits, to sign in to your site by simply tapping a push notification instead of scanning a QR code. It works by setting a cookie that links the user's browser and their phone. 


## Technical

### Can I use AuthentiqJS with a server application?

Yes, even though the AuthentiqJS snippet is running in the user agent it supports the authorization code flow in two ways. First, you can let AuthentiqJS catch the authorization code from the Authentiq Provider via a fragment redirect and then POST it to your own server side resource. This method is great for *hybrid* apps where both the user agent and the server must be authenticated. Alternatively, you can point the redirect URL directly to a server-side resource, bypassing the snippet entirely upon authentication and following the traditional OAuth 2.0 code flow.

### Can I use Authentiq Connect with Framework X?

If your framework includes a decent OAuth 2.0 or OIDC client library, then most likely yes, out of the box (we'd be super grateful if you can [contribute an example](https://github.com/AuthentiqID/authentiq-examples/) in this case!). If not, then you can use the AuthentiqJS snippet to initiate the *OAuth dance* and catch the user's profile via an [event listener](integration#events) in JavaScript. For server side applications you will need to code a HTTP endpoint that can validate the ID Token sent.

## Security

### How does Authentiq encrypt my data on my phone?

On iOS, your Authentiq ID is automatically encrypted by the OS when the phone is locked, and decrypted when the phone is unlocked. For this reason it is important that the device has a passcode set, even though the Authentiq ID app itself can be protected with a PIN.

### How does Authentiq encrypt my data in transit?

At registration time, your email and phone number are transmitted over TLS for verification purposes, but not persisted afterwards. When signing in to a website, your profile is transmitted over an TLS connection to the Authentiq Connect Provider, which in turn will send the profile data to the client, also using TLS. Our hosted provider currently has an A+ rating on [SSL Labs](https://www.ssllabs.com/ssltest/).

### What data does the Authentiq Connect Provider persist?

As little as possible, although we *are* still working on the details at the moment. We are very privacy-aware ourselves and our goal is to avoid persisting any data when not needed, including metadata. Pretty soon we will offer a mode that supports end-to-end encryption between the phone and the client application. When used, the Authentiq Connect Provider will be unable to decrypt the ID Token that is transmitted and is merely acting as a gateway. When it's finalized, we'll properly document it too.
