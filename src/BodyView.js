import React, { useCallback, useContext, useEffect, useRef } from "react";
import { findNodeHandle, Text } from "react-native";
import { NativeAdContext } from "./NativeContext";

const BodyView = (props) => {
    const { nativeAd, nativeAdView } = useContext(NativeAdContext);
    const bodyRef = useRef();
    const _onLayout = useCallback(() => {
        if(!nativeAdView) return;

        let handle = findNodeHandle(bodyRef.current);
        nativeAdView.setNativeProps({
            body: handle
        });
    }, [nativeAdView, bodyRef]);

    useEffect(() => {
        _onLayout();
    }, [nativeAd, nativeAdView]);

    return (
        <Text {...props} ref={bodyRef} onLayout={_onLayout}>
            {nativeAd ? nativeAd.body : null}
        </Text>
    );

};

export default BodyView;