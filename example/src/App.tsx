import * as React from 'react';

import {   SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Button,
  FlatList, } from 'react-native';

import {
  Header
} from 'react-native/Libraries/NewAppScreen';

import {AdmixerInterstitial, BodyView, CallToActionView, HeadlineView, IconView, ImageView, NativeAdView, NativeAssets, NativeMediaView} from 'react-native-admixer';

const App = () => {

  const onNativeAdLoaded = (event: any) => {
    console.log("###onNativeAdLoaded");
  }  

  // onAdLoadFailed(event: any) {
  //   console.log("onAdFailed");
  // }

  // onAdExpanded(event: any){
  //   console.log("onAdExpanded");
  // }

  // onAdCollapsed(event: any) {
  //   console.log("onAdCollapsed");
  // }

  // onAdClicked(event: any) {
  //   console.log("onAdClicked "+event.clickUrl);
  // }

  // onNativeAdLoaded(event: any) {
  //   console.log("onNativeAdLoaded");
  // }

  // onNativeAdFailed(event: any) {
  //   console.log("onNativeAdFailed");
  // }

  // showInterstitial(){
  //   // Interstitial
  //   AdmixerInterstitial.initInterstitial("c744a785-272b-4b85-8a93-5eb581d74565").then(
  //     (a:any) => { 
  //       AdmixerInterstitial.loadAd();
  //       AdmixerInterstitial.setClickThroughAction("return_url");
  //     }
  //   );
  // }

  // Banner in list
  // render2() {

  //   let nativeAdRequest = AdmixerNativeAdRequest("123");
  //   nativeAdRequest.loadAd();

  //   AdmixerInterstitial.addEventListener("onAdLoaded", (a:any) => {
  //     console.log("Interstitial onAdLoaded");
  //     AdmixerInterstitial.showAd();
  //   });
  //   AdmixerInterstitial.addEventListener("onAdClicked", (a:any) => {
  //     console.log("Interstitial onAdClicked "+a.clickUrl);
  //   });

  //   const data = [{id: 1, title: "One"},{id: 2, title: "Two"},{id: 3, title: "Three"},{id: 4, title: "Four"},{id: 5, title: "Five"},{id: 6, title: "Six"},{id: 7, title: "Seven"},{id: 8, title: "Eight"},{id: 9, title: "Nine"},{id: 10, title: "Ten"}];
  //   const Item = ({title}) => (
  //     <View>
  //       <Text>{title}</Text>
  //     </View>
  //   );
  //   const renderItem = ({ item }) => (
  //     <View>


  //   <Item title={item.title}/>
  //   <AdmixerBanner
  //           config={{
  //             zoneId: "f9a26255-08a2-40ec-9667-3ab35e69625a",
  //             bannerWidth: 300,
  //             bannerHeight: 250,
  //             sizes:[[300, 250],[320, 50]],
  //             autoRefreshInterval: item.id
  //           }}
  //           onAdLoaded={this.onAdLoaded}
  //           onAdLoadFailed={this.onAdLoadFailed}
  //           onAdClicked={this.onAdClicked}/>
  //     </View>
  //   );

  //   return (
  //     <SafeAreaView >
  //     <StatusBar  />
  //     <ScrollView>
  //       <View>
  //         <Button
  //           onPress={this.showInterstitial}
  //           title="Show interstitial"
  //         />
  //         <FlatList
  //           data={data}
  //           renderItem={ renderItem }
  //         />
          
  //       </View>
  //     </ScrollView>
  //   </SafeAreaView>
  //   );
  // }

  // Single banner
  // render1() {

  //   AdmixerInterstitial.addEventListener("onAdLoaded", (a:any) => {
  //     console.log("Interstitial onAdLoaded");
  //     AdmixerInterstitial.showAd();
  //   });
  //   AdmixerInterstitial.addEventListener("onAdClicked", (a:any) => {
  //     console.log("Interstitial onAdClicked "+a.clickUrl);
  //   });

  //   return (
  //     <SafeAreaView >
  //     <StatusBar  />
  //     <ScrollView>
  //       <View>
  //         <Button
  //           onPress={this.showInterstitial}
  //           title="Show interstitial"
  //         />
  //   <AdmixerBanner
  //           config={{
  //             zoneId: "f9a26255-08a2-40ec-9667-3ab35e69625a",
  //             bannerWidth: 300,
  //             bannerHeight: 250,
  //             sizes:[[300, 250],[320, 50]]
  //           }}
  //           onAdLoaded={this.onAdLoaded}
  //           onAdLoadFailed={this.onAdLoadFailed}
  //           onAdClicked={this.onAdClicked}/>
          
  //       </View>
  //     </ScrollView>
  //   </SafeAreaView>
  //   );
  // }
  
  //Native

const nativeAdRef = React.useRef();

  console.log("###render");
  React.useEffect(() => {
    console.log("### React.useEffect");
    nativeAdRef.current?.loadAd();
  }, []);

  return (
    <SafeAreaView>
      <StatusBar />
      <ScrollView>
        <View>
          <Text>Hello</Text>
          <NativeAdView
            ref={nativeAdRef}
            zoneId="291d613c-3f80-44db-9003-8564eb5d7518"
            assets={["img"]}
            onNativeAdLoaded={onNativeAdLoaded}
          >
            <View>
              <HeadlineView></HeadlineView>
              <BodyView></BodyView>
              <CallToActionView></CallToActionView>
              <ImageView
                style={{
                  width: 300,
                  height: 250,
                }}
              ></ImageView>
              <IconView
                style={{
                  width: 100,
                  height: 100
                }}></IconView>
            </View>
          </NativeAdView>
        </View>
      </ScrollView>
    </SafeAreaView>
  );

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
});

export default App;
