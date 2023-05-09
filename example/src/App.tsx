import * as React from 'react';

import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Button,
  FlatList,
  Dimensions,
} from 'react-native';

import {
  Header
} from 'react-native/Libraries/NewAppScreen';

import {
  AdmixerInterstitial, AdmixerBanner, NativeAdView, NativeAssets,
  NativeMediaView, NativeHeadlineView, NativeBodyView, NativeCallToActionView,
  NativeImageView, NativeIconView
} from 'react-native-admixer';

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

  const onAdLoaded = (event: any) => {
    console.log("onAdLoaded");
  }

  const onAdClicked = () => {
    console.log("onAdClicked");
  }

  const showInterstitial = () => {
    // Interstitial
    AdmixerInterstitial.initInterstitial("e6822eec-8954-4ddc-a6b5-4f791b6603fd").then(
      (a: any) => {
        AdmixerInterstitial.loadAd();
        AdmixerInterstitial.setClickThroughAction("return_url");
      }
    );
  }

  // Banner in list

  const [data, setData] = React.useState([
    { id: 0 }, { id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }, { id: 5 }, { id: 6 }, { id: 7 }, { id: 8 }, { id: 9 }, { id: 10 },
    { id: 11 }, { id: 12 }, { id: 13 }, { id: 14 }, { id: 15 }, { id: 16 }, { id: 17 }, { id: 18 }, { id: 19 }, { id: 20 }
  ]);

  const addItemsPress = () => {
    const size = data.length;
    const newData = [];
    for (let i = size; i < size + 10; i++) {
      newData.push({ id: i });
    }
    setData(state => [...state, ...newData]);
  }

  const Item = ({ id }) => (
    <View>
      <Text>{`Item ${id}`}</Text>
    </View>
  );

  const renderItem = ({ item, index }) => {
    if (index % 5 === 0) {
      return (<View style={{ width: '100%', height: 300}}>
        <AdmixerBanner
          config={{
            zoneId: "f9a26255-08a2-40ec-9667-3ab35e69625a",
            bannerWidth: 300,
            bannerHeight: 250,
            sizes: [[300, 250]],
            loadMode: "when_visible",
          }}
          onAdLoaded={onAdLoaded}
          onAdLoadFailed={onAdLoadFailed}
          onAdClicked={onAdClicked} />
      </View>)
    } else {
      return (<View style={{ width: '100%', height: 300 }}>
        <Item id={item.id} />
      </View>);
    }
  }


  return (
    <SafeAreaView >
      <View>
        <Button
          style={{ backgroundColor: 'red' }}
          onPress={addItemsPress}
          title='Add items' />
        <FlatList
          data={data}
          keyExtractor={item => item.id.toString()}
          renderItem={renderItem}
        />
      </View>
    </SafeAreaView>
  );

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

  // return (
  //   <SafeAreaView >
  //   <StatusBar  />
  //   <ScrollView>
  //     <View>
  //       <Button
  //         onPress={showInterstitial}
  //         title="Show interstitial"
  //       />
  //       <AdmixerBanner
  //         config={{
  //           zoneId: "f9a26255-08a2-40ec-9667-3ab35e69625a",
  //           bannerWidth: 300,
  //           bannerHeight: 250,
  //           sizes:[[300, 250]],
  //         }}
  //         onAdLoaded={onAdLoaded}
  //         onAdLoadFailed={onAdLoadFailed}/>

  //     </View>
  //   </ScrollView>
  // </SafeAreaView>
  // );

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
