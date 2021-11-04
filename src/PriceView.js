import React, { useCallback, useContext, useEffect, useRef } from "react";
import { findNodeHandle, Text } from "react-native";
import { NativeAdContext } from "./NativeContext";

const PriceView = (props) => {
    const { nativeAd, nativeAdView } = useContext(NativeAdContext);
    const priceViewRef = useRef();
    const _onLayout = useCallback(() => {
        if(!nativeAdView) return;

        let handle = findNodeHandle(priceViewRef.current);
        nativeAdView.setNativeProps({
            price: handle
        });
    }, [nativeAd, nativeAdView]);

    useEffect(() => {
        _onLayout()
    }, [nativeAd, nativeAdView]);

    return (
        <Text {...props} ref={priceViewRef} onLayout={_onLayout}>
            {nativeAd ? nativeAd.price : null}
        </Text>
    );

};

export default PriceView;