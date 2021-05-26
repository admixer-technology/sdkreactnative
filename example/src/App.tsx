import * as React from 'react';

import {   SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Button, } from 'react-native';

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


  showInterstitial(){
    // Interstitial
    AdmixerInterstitial.initInterstitial("c744a785-272b-4b85-8a93-5eb581d74565").then(
      (a:any) => { 
        AdmixerInterstitial.loadAd();
        AdmixerInterstitial.setClickThroughAction("return_url");
      }
    );
    AdmixerInterstitial.addEventListener("onAdLoaded", (a:any) => {
      AdmixerInterstitial.showAd();
    });
    AdmixerInterstitial.addEventListener("onAdClicked", (a:any) => {
      console.log("onAdClicked "+a.clickUrl);
    })
  }

  render() {

    return (
      <SafeAreaView >
      <StatusBar  />
      <ScrollView>
        <Header />
        <View>
          <Button
            onPress={this.showInterstitial}
            title="Show interstitial"
          />
          <AdmixerBanner
            config={{
              zoneId: "c744a785-272b-4b85-8a93-5eb581d74565",
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
  }
});

export default App;
