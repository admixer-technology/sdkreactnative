import React, { useCallback, useContext, useEffect, useRef } from "react";
import { Button, findNodeHandle, Platform, requireNativeComponent, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { NativeAdContext } from "./NativeContext";

const NativeCallToActionView = ({
    style,
    buttonAndroidStyle
}) => {
    const { nativeAd, nativeAdView } = useContext(NativeAdContext);
    const callToActionRef = useRef();
    const _onLayout = useCallback(() => {
        if(!nativeAdView) return;

        let handle = findNodeHandle(callToActionRef.current);
        nativeAdView.setNativeProps({
            callToAction: handle,
        })
    }, [nativeAdView, callToActionRef]);

    useEffect(() => {
        _onLayout();
    }, [nativeAd, nativeAdView]);

    const renderText = (
        <Text>
            {nativeAd.callToAction}
        </Text>
    );

    return (
        <View style={styles.container}>

            <ButtonView
                style={style}
                buttonAndroidStyle={
                    Platform.OS === "android" ? buttonAndroidStyle : null
                }
                ref={callToActionRef}
                onLayout={_onLayout}
                title={nativeAd.callToAction}>
                    {Platform.OS !== "android" && renderText}
            </ButtonView>
        </View>
    );

};

const ButtonView = 
    Platform.OS === "android" ?
        requireNativeComponent("AdmixerButton") :
        TouchableOpacity;

const styles = StyleSheet.create({
    container: {
        justifyContent: "center",
        alignItems: "center"
    },
    textWrapper: {
        zIndex: 10,
        backgroundColor: '#0f0'
    }
});

export default NativeCallToActionView;