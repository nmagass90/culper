# SAML

In production, eApp uses SAML to do auth rather than basic auth. To test this locally, you can run a local instance of WSO2 Identity Server, configure it, and configure eApp to communicate with it.

Running WSO2 locally for development:

1. Run the latest WSO2 docker image: `docker run -it -p 9443:9443 wso2/wso2is`
2. [Visit WSO2 console.](https://localhost:9443/carbon)
3. Click through the certificate warning in your browser.
4. Log in with username and password of `admin`.


Configuring SAML

To authenticate with SAML rather than the basic auth:

1. Generate certs for eApp to use to sign the SAML requests it makes and save them somewhere

```
openssl req \
      -newkey rsa:2048 -nodes -keyout saml.key \
      -x509 -days 365 -out saml.crt
```

1. Configure WSO2
    1. [Add a Service Provider](https://localhost:9443/carbon/application/add-service-provider.jsp) with the Name `localhost`.
    1. Add the newly made saml.crt as the client certificate, click update
    1. Go into the `Inbound Authentication Configuration`->`SAML2 Web SSO Configuration` section, then click `Configure`.
    1. Fill out the form.
        - Issuer: `localhost`
        - Assertion Consumer URLs: `http://localhost:3000/auth/saml/callback`, then click `Add` <!-- this should match SAML_CONSUMER_SERVICE_URL -->
        - Uncheck everything but `Enable Response Signing`, `Enable Signature Validation`, and `Enable Single Logout`
        - No need to set SLO request or response URLs
1. Copy the WSO2 certificate.
    1. [Go to `Identity Providers`->`Resident`.](https://localhost:9443/carbon/idpmgt/idp-mgt-edit-local.jsp)
    1. Expand `Inbound Authentication Configuration`, then `SAML2 Web SSO Configuration`.
    1. Click `Download SAML Metadata`.
    1. Open up the resulting SAML Metadata XML file that gets downloaded, and copy the contents of the `<X509Certificate>` element.
    1. Save that in `wso2.crt`.

        ```
        -----BEGIN CERTIFICATE-----
        <contents>
        -----END CERTIFICATE-----
        ```

1. Enable SAML in eApp
    1. Make sure your `.env` has the `SAML_*` defaults from `.env.example`.
    1. In your `.env`, set `BASIC_ENABLED=` and `SAML_ENABLED=1`.
1. In another terminal, start the server (or restart, if already running).

    ```shell
    make run
    ```

1. Visit [http://localhost:8080](http://localhost:8080).
1. `Log in with PIV/CAC`, with username and password of `admin`.

## Caveats

Note this is using an off-the shelf WSO2 server, which won't match production in that:

* It's not hardened
* Using an embedded database rather than an external one
    * **NOTE:** *If you delete the SAML server container the SAML Provider data will be lost along with the embedded database*
* The WSO2 verison may not match
* etc.
