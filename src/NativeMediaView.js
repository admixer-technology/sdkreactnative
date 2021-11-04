import React, { useCallback, useContext, useEffect, useRef } from "react";
import { findNodeHandle, requireNativeComponent } from "react-native";
import { NativeAdContext } from "./NativeContext";

const NativeMediaView = (props) => {
    const { nativeAd, nativeAdView } = useContext(NativeAdContext);
    adMediaViewRef = useRef();
    const _onLayout = useCallback(() => {
        if(!nativeAdView) return;

        let nodeHandle = findNodeHandle(adMediaViewRef.current);
        nativeAdView.setNativeProps({
            mediaView: nodeHandle,
        });
    }, [nativeAdView, adMediaViewRef]);

    useEffect(() => {
        _onLayout();
    }, [nativeAd, nativeAdView]);
    
    return (
        <AdMediaView
            {...props}
            style={{
                width: 300,
                height: 250
            }}
            ref={adMediaViewRef}
            onLayout={_onLayout}
        />
    );

};

const AdMediaView = requireNativeComponent("NativeMediaView", NativeMediaView);

export default NativeMediaView;