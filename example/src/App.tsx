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

import {AdmixerInterstitial, AdmixerBanner, NativeAdView, NativeAssets, 
    NativeMediaView, NativeHeadlineView, NativeBodyView, NativeCallToActionView, 
    NativeImageView, NativeIconView} from 'react-native-admixer';

const App = () => {

  const onNativeAdLoaded = (event: any) => {
    console.log("###onNativeAdLoaded");
  }  

  const onNativeAdFailed = (event: any) => {
    console.log('###onNativeAdFailed');
  }

  const onNativeAdClicked = (event: any) => {
    console.log('###onNativeAdClicked');
  }

  const onAdLoadFailed = (event: any) => {
    console.log("onAdFailed");
  }

  // onAdExpanded(event: any){
  //   console.log("onAdExpanded");
  // }

  // onAdCollapsed(event: any) {
  //   console.log("onAdCollapsed");
  // }

  // onAdClicked(event: any) {
  //   console.log("onAdClicked "+event.clickUrl);
  // }

  const onAdLoaded = (event: any) => {
    console.log("onAdLoaded");
  }

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
  //             zoneId: "ae667396-5982-4551-8085-11b2c9f51afb",
  //             bannerWidth: 300,
  //             bannerHeight: 250,
  //             sizes:[[300, 250],[320, 50]]
  //           }}
  //           onAdLoaded={onAdLoaded}
  //           onAdLoadFailed={onAdLoadFailed}/>
          
  //       </View>
  //     </ScrollView>
  //   </SafeAreaView>
  //   );
  // }
  
  //Native

const nativeAdRef = React.useRef();

  React.useEffect(() => {
    nativeAdRef.current?.loadAd();
  }, []);

  return (
    <SafeAreaView>
      <StatusBar />
      <ScrollView>
        <View>
          <Text>Test native</Text>
          <NativeAdView
            ref={nativeAdRef}
            zoneId="291d613c-3f80-44db-9003-8564eb5d7518"
            assets={["image_icon", "title", "description", "image_main", "cta", "sponsored"]}
            optAssets={["price"]}
            onNativeAdLoaded={onNativeAdLoaded}
            onNativeAdFailed={onNativeAdFailed}
            onNativeAdClicked={onNativeAdClicked}
          >
            <View>
              <View style={{flexDirection:"row",
                            flexWrap:"wrap",
                            margin:10}}>
              <NativeIconView
                style={{
                  width: 100,
                  height: 100
                }}/>
                  <View style={{margin:10}}>
                    <NativeHeadlineView 
                    style={{fontSize:18,
                        fontWeight:'bold'
                        }}/>
                    <NativeBodyView style={{fontSize:14, color:'gray'}}/>
                  </View>
              </View>
              <NativeImageView
                style={{
                  width: 300,
                  height: 250,
                  marginLeft:10,
                  marginRight:10,
                  marginBottom:10
                }}/>
              <NativeCallToActionView 
              style={{marginLeft: 10, 
                      marginRight:10,
                      width: 350, 
                      height: 50}}
                  buttonAndroidStyle={{
                    backgroundColor: '#24a0ed',
                    color:'#ffffff',
                    fontSize: 20
                  }}/>
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
