# Introduction

This page describes how to allow your users to sign in with Authentiq ID on your website in minutes.

Authentiq Connect is compatible with both [OAuth 2.0](http://oauth.net/2/) and [OpenID Connect 1.0 (OIDC)](http://openid.net/), and as such it should feel familiar to anyone having implemented an OAuth 2.0 authorization flow before. In case your application already accepts users from other OAuth 2.0 identity providers (such as Google, Facebook, …), it should be trivial to enable Authentiq ID as another source of verified users using your existing OAuth 2.0 client implementation.

Alternatively, our [native Authentiq Connect SDK](#native-sdk) allows you to implement a rich authentication experience in minutes. We recommend this option if you are looking to enhance your registration and sign-in flows, or want to add strong passwordless two-factor authentication to your website.

There are a few important differences to consider when evaluating integration options.

Our native Authentiq Connect SDK is easy to use and leverages features of OpenID Connect to obtain a rich authentication experience. But our protocol also works with many of the great third-party OAuth 2.0 client libraries out there already. Deciding what works best for you depends heavily on your situation. In practice, generic OAuth 2.0 libraries tend to work well, but will be less optimized in terms of performance and user experience.

OpenID Connect is an extention to OAuth 2.0 that standardizes user authentication and forms the basis of Authentiq Connect. 
{: class="alert alert-success" role="alert" }

## Obtaining a Client ID

Whether or not your integration is going to be native or third-party, you will need to [register your application](clients.md) with an Authentiq Connect Provider and obtain a unique client identifier. Use the `client_id` in your preferred OAuth 2.0 client library, or when customizing your native Authentiq Connect snippet below. 


## Integration comparison


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

# Native SDK

In terms of end-user experience, the smoothest integration option is to simply include our Authentiq Connect snippet on your page. Use the snippet configurator to easily generate cusomtized snippet code for your situation, or copy paste and adjust the example snippet below.

## Configurator

Create your own Authentiq button with the Button Configurator.

## Example

```html5
    <script src="//cdn.authentiq.io/authentiq.io/1.0/authentiq.js"></script>
    <button class="authentiq-button"
            data-client-id="62a90b31-db29-4510-adf4-3d4d7d932d14"
            data-provider-uri="https://connect.authentiq.io/authorize"
            data-scopes="email~rs aq:name aq:push">
      Sign in with Authentiq ID
    </button>
```

## Options

The following `data-*` options are available.

Name | Description | Default 
---- | ----------- | -------
client_id | Your registered application ID. | None, obtain a unique ID from the [Client Console](clients.md).
provider_uri | Provider Authorization URL. | `https://connect.authentiq.io/authorize`
response_type | OIDC response type. Valid options are `code`, `code id_token`, `id_token`. | `id_token`
response_mode | OIDC response mode. Valid options are `query`, `fragment`. | Depends on response type.
redirect_uri | OAuth 2.0 redirect URL. | The current page, from *window.href.location*.
scope | Profile scopes to request from user, as a space-separated list. Valid scopes are `email`, `phone`, `aq:name`, `aq:address`, `aq:location` and `aq:push`. Append `~r` to indicate that a scope is required and/or `~s` to indicate the scope should have a valid signature from a trusted Authentiq Issuer. | The default scopes registered for the client application.
display | Authorization display mode. Valid choices are `page`, `popup` or `modal`. | `page`
prompt | Preferred prompt method in Authentiq ID. Valid choices are `login`, `consent`. Providing `consent` overrides *One click sign-in* and prompts user for (re-)consent. | `login`
ui_locales | Preferred laguage to display the authorization page in, represented as a space-separated list of BCP47 [RFC5646] language tag values, ordered by preference. Currently only `en` is supported. | `en`
state | Client application state. | 32 bytes from *crypto.getRandomValues()*
client_response_uri | URL to POST the received authorization response to for server side validation or processing. Method should return 200 or 400. This parameter is only used when `response_mode=fragment`, since otherwise . | None 

### Server side processing

If the response mode is set to `fragment` (recommended), then `client_response_uri` can be used to still proxy the authorization response to your backend servers, as if you had specified `query` response mode. The backend server may do one or more of the following tasks:  

- Validate the ID Token, if present, using cryptographic functions available on the server and return a 400 response in case of a validation error.
- Consume the authorization code, if present, and exchange it for an access and/or refresh token at the Authentiq Connect token endpoint.

The endpoint should return one of the following status codes. 

HTTP status code | Action
---------------- | ------
200 | Token validated; the success callback will be called.
400 | Token error; a message will be displayed and the error callback invoked.


# Third-party integrations



Typical option | What to fill in
-------------- | ---------------
`client_id` | The client_id you obtained above.  
`scope` | Space delimited list of [Authentiq Connect scopes](index.md#scopes).
`redirect_uri` | The URL in *your* application that the Provider should redirect to after authenticating a user.
`authorize_uri` | `https://connect.authentiq.io/authorize`
`token_uri` | `https://connect.authentiq.io/token`
`userinfo_uri` | `https://connect.authentiq.io/userinfo`

## Client-side frameworks

A list of client libraries using OAuth's *implicit* grant type. Please add relevant solutions to this list if they are missing.


### Hello.js

There is a [fork of HelloJS](https://github.com/skion/hello.js) that includes an [Authentiq Connect plugin](https://github.com/skion/hello.js/blob/master/src/modules/authentiq.js). HelloJS abstracts away the implementation differences between a large number of standard OAuth 2.0 identity providers. We'll aim to get Authentiq Connect included as a supported provider soon.

### Angular JS

At least two OAuth 2.0 modules exist for AngularJS, both of which have been tested to work with Authentiq Connect.

- [OAuth-ng](https://github.com/andreareginato/oauth-ng/blob/master/README.md) 
- [Angular-OAuth](https://github.com/seegno/angular-oauth2)


## Server-side frameworks

A list of libraries to be used with server applications, supporting (at least) OAuth's *authorization_code* grant type. Please add relevant solutions to this list if they are missing.


### Flask

There are several authentication extensions for Flask... [TBD]

# Other integrations

As support for OpenID Connect increases, we expect to see more and more sites that will allow administrators to configure external OIDC identity provider for user authentication, vastly improving the ecosystem for Authentiq ID integrations as well. We already see companies like Amazon and SalesForce making this possible.   

## Amazon AWS

Amazon allows an administrator to configure an external OpenID Connect identity provider as a source for their [AWS](http://aws.amazon.com/) console. We're planning to supporting this integration at a later stage so that teams will be able to sign in to AWS using their Authentiq ID. 

## Amazon Cognito

Amazon allows mobile app developers to configure [Cognito](http://aws.amazon.com/cognito/) with external OpenID Connect identity providers, enabling an app to authenticate users from social networks and a variety of sources. We're planning to supporting this integration at a later stage so that mobile app developers will be able to register and authenticate users by their Authentiq ID. 

## SalesForce

[SalesForce](http://salesforce.com/) allows an administrator configure up an external OpenID Connect identity provider as a source for company employees. We're planning to supporting this integration at a later stage so that companies will be able to let their employees sign into SalesForce using their Authentiq ID.
