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
    console.log('###onNativeAdClicked ', event ? event.clickUrl : "");
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

  const showInterstitial = () => {
    // Interstitial
    AdmixerInterstitial.initInterstitial("e6822eec-8954-4ddc-a6b5-4f791b6603fd").then(
      (a:any) => { 
        AdmixerInterstitial.loadAd();
        AdmixerInterstitial.setClickThroughAction("return_url");
      }
    );
  }

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

    // AdmixerInterstitial.addEventListener("onAdLoaded", (a:any) => {
    //   console.log("Interstitial onAdLoaded");
    //   AdmixerInterstitial.showAd();
    // });
    // AdmixerInterstitial.addEventListener("onAdClicked", (a:any) => {
    //   console.log("Interstitial onAdClicked "+a.clickUrl);
    // });
    // AdmixerInterstitial.addEventListener("onAdLoadFailed", (a:any) => {
    //   console.log("Interstitial onAdLoadFailed");
    // });

    return (
      <SafeAreaView >
      <StatusBar  />
      <ScrollView>
        <View>
          <Button
            onPress={showInterstitial}
            title="Show interstitial"
          />
          <AdmixerBanner
            config={{
              zoneId: "f9a26255-08a2-40ec-9667-3ab35e69625a",
              bannerWidth: 300,
              bannerHeight: 250,
              sizes:[[300, 250],[320, 50]]
            }}
            onAdLoaded={onAdLoaded}
            onAdLoadFailed={onAdLoadFailed}/>
          
        </View>
      </ScrollView>
    </SafeAreaView>
    );
  
  //Native

  // const nativeAdRef = React.useRef();

  // React.useEffect(() => {
  //   nativeAdRef.current?.loadAd();
  // }, []);

  // return (
  //   <SafeAreaView>
  //     <StatusBar />
  //     <ScrollView>
  //       <View>
  //         <Text>Test native</Text>
  //         <NativeAdView
  //           ref={nativeAdRef}
  //           zoneId="6b360dcf-4220-405b-8571-38434724945d"
  //           assets={["title", "description", "image_main", "sponsored"]}
  //           optAssets={["cta", "image_icon", "desc2"]}
  //           onNativeAdLoaded={onNativeAdLoaded}
  //           onNativeAdFailed={onNativeAdFailed}
  //           onNativeAdClicked={onNativeAdClicked}>
  //           <View>
  //             <View style={{flexDirection:"row",
  //                           flexWrap:"wrap",
  //                           margin:10}}>
  //             <NativeIconView
  //               style={{
  //                 width: 100,
  //                 height: 100
  //               }}/>
  //                 <View style={{margin:10}}>
  //                   <NativeHeadlineView 
  //                     style={{fontSize:18,
  //                       fontWeight:'bold'
  //                       }}/>
  //                   <NativeBodyView style={{fontSize:14, color:'gray'}}/>
  //                 </View>
  //             </View>
  //             <NativeImageView
  //               style={{
  //                 width: 300,
  //                 height: 250,
  //                 marginLeft:10,
  //                 marginRight:10,
  //                 marginBottom:10
  //               }}/>
  //             <NativeCallToActionView 
  //             style={{marginLeft: 10, 
  //                     marginRight:10,
  //                     width: 350, 
  //                     height: 50,
  //                     backgroundColor: '#24a0ed',
  //                     justifyContent: 'center',
  //                     alignItems: 'center',
  //                     elevation: 10,
  //                     borderRadius: 5}}
  //                 buttonIOSStyle={{
  //                   color:"#ffffff",
  //                   fontSize:20
  //                 }}
  //                 buttonAndroidStyle={{
  //                   backgroundColor: '#24a0ed',
  //                   color:'#ffffff',
  //                   fontSize: 20
  //                 }}/>
  //           </View>
  //         </NativeAdView>
  //       </View>
  //     </ScrollView>
  //   </SafeAreaView>
  // );

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
});

export default App;
