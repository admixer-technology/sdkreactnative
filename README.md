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

## Show Banner ad

```js
  <View style={styles.container}>
    <AdmixerBanner
      config={{
        zoneId: "c744a785-272b-4b85-8a93-5eb581d74565",
        bannerWidth: 300,
        bannerHeight: 250,
        sizes:[[300, 250],[320, 50]],
      }}
      onAdLoaded={this.onAdLoaded}
      onAdLoadFailed={this.onAdLoadFailed}/>
  </View>
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

