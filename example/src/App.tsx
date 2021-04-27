import * as React from 'react';

import {   SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar, } from 'react-native';

import {
  Header
} from 'react-native/Libraries/NewAppScreen';

import {AdmixerBanner, AdmixerInterstitial} from 'react-native-admixer';

class App extends React.Component {

  onAdLoaded(event: any) {
    console.log("onAdLoaded");
  }  

  onAdLoadFailed(event: any) {
    console.log("onAdFailed");
  }

  onAdExpanded(event: any){
    console.log("onAdExpanded");
  }

  onAdCollapsed(event: any) {
    console.log("onAdCollapsed");
  }

  onAdClicked(event: any) {
    console.log("onAdClicked "+event.nativeEvent.clickUrl);
  }

  render() {

  // Interstitial
  // AdmixerInterstitial.initInterstitial("e94817ae-5d00-4d2a-98d7-5e9600f55ad6").then(
  //   (a:any) => { 
  //     AdmixerInterstitial.loadAd();
  //     AdmixerInterstitial.setClickThroughAction("return_url");
  //   }
  // );
  // AdmixerInterstitial.addEventListener("onAdLoaded", (a:any) => {
  //   AdmixerInterstitial.showAd();
  // });
  // AdmixerInterstitial.addEventListener("onAdClicked", (a:any) => {
  //   console.log("onAdClicked "+a.clickUrl);
  // })

    return (
      <SafeAreaView >
      <StatusBar  />
      <ScrollView>
        <Header />
        <View>
          <AdmixerBanner
            config={{
              zoneId: "e6822eec-8954-4ddc-a6b5-4f791b6603fd",
              bannerWidth: 300,
              bannerHeight: 250,
              sizes:[[300, 250],[320, 50]],
            }}/>
        </View>
      </ScrollView>
    </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  banner: {
    flex: 1,
    width: 300, 
    height: 250
  }
});

export default App;
