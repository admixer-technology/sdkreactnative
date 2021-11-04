import React, { Component } from "react";
import { findNodeHandle, requireNativeComponent, UIManager } from "react-native";
import BatchedBridge from "react-native/Libraries/BatchedBridge/BatchedBridge";
import { defaultAd, NativeAdContext } from "./NativeContext";
import Wrapper from "./Wrapper";

const Banner = requireNativeComponent('AdmixerNativeAdView');

export default class NativeAdView extends Component {

    constructor(props) {
        super(props);
        this.state =  {
            nativeAd: defaultAd,
            nativeAdView: null,
        };
        this.nativeAdRef;
        this.currentId = 0;
        this.componentMouted = false;
        this.ad = defaultAd;
    }

    messagingModuleName = `NativeAdMessageHandler${Date.now() + Math.random()}`;

    _onAdFailedToLoad = (event) => {
        if(this.props.onAdFailedToLoad) this.props.onAdFailedToLoad(event.nativeEvent);
    }

    _onAdLoaded = (event) => {
        if(this.props.onAdLoaded) this.props.onAdLoaded(event.nativeEvent)
    }

    onNativeAdLoaded = (event) => {
        this.ad = event.nativeEvent;
        console.log("### imageUrl ", this.ad.imageUrl);
        if(this.componentMounted) {
            this.updateAd();
            if(this.props.onNativeAdLoaded) {
                this.props.onNativeAdLoaded(this.ad);
            }
        }
    }

    updateAd() {
        if (this.componentMounted) {
            this.setState({
                nativeAd: this.ad,
            });
        }
    }

    componentDidMount() {
        try {
            this.componentMounted = true;
            this.updateAd(this.ad);
            console.log("###registerCallableModule ", this.messagingModuleName);
            BatchedBridge.registerCallableModule(this.messagingModuleName, this);
        } catch (e) {}
    }

    componentWillUnmount() {
        this.componentMounted = false;
    }

    _getRef = (ref) => {
        this.nativeAdRef = ref;
        return this.nativeAdRef;
    }

    loadAd = () => {
        console.log("loadAd");
        UIManager.dispatchViewManagerCommand(
            findNodeHandle(this.nativeAdRef),
            UIManager.getViewManagerConfig("AdmixerNativeAdView").Commands.loadAd,
            undefined
        );
    }

    render() {
        const { nativeAd, nativeAdView } = this.state;

        // return (
        //     <NativeAdContext.Provider value={{ nativeAd, nativeAdView }}>
        //         <Banner
        //             ref={this._getRef}
        //             adUnitID={this.props.adUnitID}
        //             onAdLoaded={this.props._onAdLoaded}
        //             onAdFailedToLoad={this.props._onAdfailedToLoad}
        //             messagingModuleName={this.props.messagingModuleName}
        //         >
        //             <Wrapper
        //                 onLayout={(event) => {
        //                     this.setState({
        //                         nativeAdView: this.nativeAdRef,
        //                     });
        //                 }}
        //             >
        //                 {this.props.children}
        //             </Wrapper>
        //         </Banner>
        //     </NativeAdContext.Provider>
        // );

        return (
            <NativeAdContext.Provider value={{ nativeAd, nativeAdView }}>
                <Banner
                ref={this._getRef}
                messagingModuleName={this.messagingModuleName}
                zoneId={this.props.zoneId}
                assets={this.props.assets}
                onNativeAdLoaded={this.onNativeAdLoaded}
                >
                    <Wrapper
                        onLayout={(event) => {
                            this.setState({
                                nativeAdView: this.nativeAdRef,
                            });
                        }}>
                        {this.props.children}
                    </Wrapper>
                </Banner>
            </NativeAdContext.Provider>
        );
    }

}