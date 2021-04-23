import * as React from 'react';

import {   SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar, } from 'react-native';
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
    console.log("onAdClicked "+event.event);
  }

  render() {

  // Interstitial
  // AdmixerInterstitial.initInterstitial("e94817ae-5d00-4d2a-98d7-5e9600f55ad6").then(
  //   (a:any) => { AdmixerInterstitial.loadAd(); }
  // );
  // AdmixerInterstitial.addEventListener("onAdLoaded", (a:any) => {
  //   console.log("onAdLoaded");
  //   AdmixerInterstitial.showAd();
  // });
  // AdmixerInterstitial.addEventListener("onAdClicked", (a:any) => {
  //   console.log("onAdClicked");
  // })

    return (
      <View style={styles.container}>
        <AdmixerBanner
          config={{
            zoneId: "f9a26255-08a2-40ec-9667-3ab35e69625a",
            bannerWidth: 300,
            bannerHeight: 250,
            sizes:[[300, 250],[320, 50]],
            clickThrough: "return_url",
            autoRefresh: 15000,
            autoRefreshEnabled: true,
            resizeAdToFitContainer: true,
          }}
          onAdLoaded={this.onAdLoaded}
          onAdLoadFailed={this.onAdLoadFailed}
          onAdExpanded={this.onAdExpanded}
          onAdCollapsed={this.onAdCollapsed}
          onAdClicked={this.onAdClicked}/>
      </View>
    );

    // return (
    //   <>
    //   <StatusBar barStyle="dark-content" />
    //   <SafeAreaView>
    //     <ScrollView
    //         contentInsetAdjustmentBehavior="automatic"
    //         style={styles.scrollView}>
    //       <View style={styles.body}>
    //         <View style={styles.sectionContainer}>
    //           <Text style={styles.sectionTitle}>Step STEP</Text>
    //           <AdmixerBanner
    //               style={styles.banner}
    //               config={{
    //                 zoneId: 'e6822eec-8954-4ddc-a6b5-4f791b6603fd',
    //                 bannerWidth: 300,
    //                 bannerHeight: 250,
    //                 sizes: [[300, 250], [300, 600]],
    //                 clickThrough: 'open_device_browser',
    //                 autoRefresh: 15000,
    //               }}
    //           />
    //           <Text style={styles.sectionDescription}>
    //             Edit <Text style={styles.highlight}>App.js</Text> to change this
    //             screen and then come back to see your edits.
    //           </Text>
    //         </View>
    //       </View>
    //     </ScrollView>
    //   </SafeAreaView>
    // </>
    // );
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
  },
  // banner: {
  //   width: 300,
  //   height: 250
  // },
  // scrollView: {
  // },
  // engine: {
  //   position: 'absolute',
  //   right: 0,
  // },
  // body: {
  // },
  // sectionContainer: {
  //   marginTop: 32,
  //   paddingHorizontal: 24,
  // },
  // sectionTitle: {
  //   fontSize: 24,
  //   fontWeight: '600',
  //   width: 300,
  //   height: 250,
  // },
  // sectionDescription: {
  //   marginTop: 8,
  //   fontSize: 18,
  //   fontWeight: '400',
  // },
  // highlight: {
  //   fontWeight: '700',
  // },
  // footer: {
  //   fontSize: 12,
  //   fontWeight: '600',
  //   padding: 4,
  //   paddingRight: 12,
  //   textAlign: 'right',
  // },
});

export default App;
