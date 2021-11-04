import React, { useCallback, useContext, useEffect, useRef } from "react";
import { findNodeHandle, Image } from "react-native";
import { NativeAdContext } from "./NativeContext";

const IconView = (props) => {
    const { nativeAd, nativeAdView } = useContext(NativeAdContext);
    const iconViewRef = useRef();
    const _onLayout = useCallback(() => {
        if(!nativeAdView) return;

        let handle = findNodeHandle(iconViewRef.current);
        nativeAdView.setNativeProps({
            icon: handle
        });
    }, [nativeAdView, iconViewRef]);

    useEffect(() => {
        _onLayout();
    }, [nativeAd, nativeAdView]);

    return <Image
            {...props}
            ref={iconViewRef}
            onLayout={_onLayout}
            source={{uri: nativeAd.iconUrl}}
            />
}

export default IconView;