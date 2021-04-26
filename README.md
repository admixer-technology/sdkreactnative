# react-native-admixer

React Native module for Admixer SDK

## Installation

```sh
npm install react-native-admixer
```

## Usage

```js
import {AdmixerBanner, AdmixerInterstitial} from "react-native-admixer";
```

## Show Interstitial ad

```js
 AdmixerInterstitial.initInterstitial("YOUR_ZONE_ID").then(
    (a:any) => { AdmixerInterstitial.loadAd(); }
  );
  AdmixerInterstitial.addEventListener("onAdLoaded", (a:any) => {
    AdmixerInterstitial.showAd();
  });
```

