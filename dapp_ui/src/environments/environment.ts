// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

const protocol = window.location.protocol;

export const environment = {
  production: false,
  rpc_provider_url: protocol + "//" + window.location.hostname + ":8545/",
  contractAddress: {
    carWallet: '0x59d3631c86BbE35EF041872d502F218A39FBa150', // Replace with actual
    driveToken: '0x9561C133DD8580860B6b7E504bC5Aa500f0f06a7', // Replace with actual
    subscriptionServive: '0xe982E462b094850F12AF94d21D470e21bE9D0E9C' // Replace with actual
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
