import React, { useCallback, useContext, useEffect, useRef } from "react";
import { findNodeHandle, Text } from "react-native";
import { NativeAdContext } from "./NativeContext";

const NativeSponsoredView = (props) => {
    const { nativeAd, nativeAdView } = useContext(NativeAdContext);
    const sponsoredRef = useRef();
    const _onLayout = useCallback(() => {
        if(!nativeAdView) return;

        let handle = findNodeHandle(sponsoredRef.current);
        nativeAdView.setNativeProps({
            sponsored: handle,
        });
    }, [nativeAd, nativeAdView]);

    useEffect(() => {
        _onLayout();
    }, [nativeAd, nativeAdView]);

    return (
        <Text {...props} nativeID="adSponsoredView" onLayout={_onLayout}>
            {nativeAd
                ? props.allCaps
                    ? nativeAd.sponsored?.toUpperCase()
                    : nativeAd.sponsored
                : null}
        </Text>
    );
};

export default NativeSponsoredView;