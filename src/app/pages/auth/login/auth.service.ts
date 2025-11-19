import { Injectable } from '@angular/core';
import { OAuthService, AuthConfig } from 'angular-oauth2-oidc';

export const googleAuthConfig: AuthConfig = {
    issuer: 'https://accounts.google.com',
    strictDiscoveryDocumentValidation: false,
    redirectUri: 'http://localhost:4200',
    clientId: '379178885686-s0c922eil8vu2omo03j11t177omjfbtr.apps.googleusercontent.com',
    scope: 'openid profile email',
    requireHttps: false,
};

// export const facebookAuthConfig: AuthConfig = {
//     // Facebook không có discovery document, cần chỉ định endpoint
//     loginUrl: 'https://www.facebook.com/v18.0/dialog/oauth',
//     tokenEndpoint: 'https://graph.facebook.com/v18.0/oauth/access_token',
//     userinfoEndpoint: 'https://graph.facebook.com/me?fields=id,name,email,picture',
//     clientId: '4572303052873912',
//     redirectUri: 'http://localhost:4200/auth/login',
//     responseType: 'token',
//     scope: 'public_profile email',
//     oidc: false, // Facebook không phải OIDC provider
//     requireHttps: false,
// }

export const facebookAuthConfig: AuthConfig = {
    // Không dùng issuer, chỉ định loginUrl/tokenEndpoint
    loginUrl: 'https://www.facebook.com/v18.0/dialog/oauth',
    tokenEndpoint: 'https://graph.facebook.com/v18.0/oauth/access_token',
    userinfoEndpoint: 'https://graph.facebook.com/me?fields=id,name,email,picture',
    clientId: '4572303052873912',
    redirectUri: 'http://localhost:4200/auth/login',
    responseType: 'token',   // Implicit Flow
    scope: 'public_profile email',
    oidc: false,             // Facebook không phải OIDC
    requireHttps: false,     // Cho phép HTTP localhost
};


@Injectable({ providedIn: 'root' })
export class AuthServiceProxyLogin {
    constructor(private oauthService: OAuthService) {
    }


    async handleAuthCallback() {
        // Google flow
        await this.oauthService.loadDiscoveryDocumentAndTryLogin();

        // Facebook flow
        await this.oauthService.tryLogin();
    }

    loginWithGoogle() {
        this.oauthService.configure(googleAuthConfig);
        this.oauthService.loadDiscoveryDocumentAndTryLogin().then(() => {
            if (!this.oauthService.hasValidAccessToken()) {
                this.oauthService.initLoginFlow(); // redirect Google
            }
        });
    }

    loginFacebook() {
        this.oauthService.configure(facebookAuthConfig);
        this.oauthService.initLoginFlow(); // redirect Facebook
    }

    logout() {
        this.oauthService.logOut();
    }


    getGoogleUser() {
        if (this.oauthService.hasValidIdToken()) {
            return this.oauthService.getIdentityClaims() as any;
        }
        return null;
    }

    async getFacebookUser() {
        debugger;
        if (this.oauthService.hasValidAccessToken()) {
            const profile: any = await this.oauthService.loadUserProfile();
            return profile.info;
        }
        return null;
    }

    get identityClaims() {
        return this.oauthService.getIdentityClaims();
    }
}
