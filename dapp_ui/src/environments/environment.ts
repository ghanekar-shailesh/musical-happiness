// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  rpc_provider_url: 'http://localhost:8545',
  contractAddress: {
    carWallet: '0xC89Ce4735882C9F0f0FE26686c53074E09B0D550',
    driveToken: '0xCfEB869F69431e42cdB54A4F4f105C19C080A601',
    subscriptionServive: '0x254dffcd3277C0b1660F6d42EFbB754edaBAbC2B'
  },
  decimals: 10 ** 18,
  overrides: {
    gasPrice: 20000000000,
    gasLimit: 6721975
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
