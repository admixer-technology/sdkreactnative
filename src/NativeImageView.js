import React, { useCallback, useContext, useEffect, useRef } from "react";
import { findNodeHandle, Image } from "react-native";
import { NativeAdContext } from "./NativeContext";

const NativeImageView = (props) => {
    const { nativeAd, nativeAdView } = useContext(NativeAdContext)
    const imageViewRef = useRef();
    const _onLayout = useCallback(() => {
        if(!nativeAdView) return;

        let handle = findNodeHandle(imageViewRef.current);
        nativeAdView.setNativeProps({
            image: handle,
        });
    }, [nativeAdView, imageViewRef]);

    useEffect(() => {
        _onLayout();
    }, [nativeAd, nativeAdView]);

    return <Image
            {...props}
            ref={imageViewRef}
            onLayout={_onLayout}
            source={{uri: nativeAd.imageUrl}}
        />;
}

export default NativeImageView;