# react-native-admixer

React Native module for Admixer SDK

## Installation

```sh
npm install react-native-admixer
```

## Usage

```js
import {AdmixerBanner, AdmixerInterstitial} from "react-native-admixer";

// ...

## Show Interstitial ad

```js
 AdmixerInterstitial.initInterstitial("e94817ae-5d00-4d2a-98d7-5e9600f55ad6").then(
    (a:any) => { AdmixerInterstitial.loadAd(); }
  );
  AdmixerInterstitial.addEventListener("onAdLoaded", (a:any) => {
    AdmixerInterstitial.showAd();
  });

  // ...

