package com.reactnativeadmixer;

import android.widget.Toast;
import androidx.annotation.Nullable;
import android.os.Handler;

import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.bridge.WritableNativeMap;
import com.facebook.react.modules.core.DeviceEventManagerModule;

import net.admixer.sdk.InterstitialAdView;
import net.admixer.sdk.AdListener;
import net.admixer.sdk.AdView;
import net.admixer.sdk.ResultCode;
import net.admixer.sdk.NativeAdResponse;


public class AdmixerInterstitial extends ReactContextBaseJavaModule implements AdListener {

    private final ReactApplicationContext reactContext;
    private InterstitialAdView iav;
    public AdmixerInterstitial
(ReactApplicationContext reactContext) {
        super(reactContext);
        this.reactContext = reactContext;
    }

    @Override
    public String getName() {
        return "AdmixerInterstitial";
    }

    @ReactMethod
    public void initInterstitial(final String zoneId, final Promise promise) {
        final AdmixerInterstitial
     self = this;
        getCurrentActivity().runOnUiThread(new Runnable() {
            @Override
            public void run() {
                iav = new InterstitialAdView(getCurrentActivity());
                iav.setPlacementID(zoneId);
                iav.setAdListener(self);
                promise.resolve(null);
            }
        });
    }
    @ReactMethod
    public void loadAd() {
        new Handler().postDelayed(new Runnable() {
            @Override
            public void run() {
                iav.loadAd();
            }
        }, 0);
    }
    @ReactMethod
    public void showAd() {
        iav.show();
    }
    @ReactMethod
    public void setCloseButtonDelay(int delay) {
        iav.setCloseButtonDelay(delay);
    }
    @Override
    public void onAdLoaded(AdView av) {
        sendEvent(AdmixerJSEvent.ON_AD_LOADED_EVENT);
    }

    @Override
    public void onAdRequestFailed(AdView av, ResultCode rc) {
        sendEvent(AdmixerJSEvent.ON_AD_LOAD_FAILED_EVENT, rc.toString());
    }

    @Override
    public void onAdClicked(AdView av) {
        sendEvent(AdmixerJSEvent.ON_AD_CLICKED_EVENT);
    }

    @Override
    public void onAdClicked(AdView adView, String clickUrl) {
      WritableMap map =Arguments.createMap();
      map.putString("clickUrl", clickUrl);
        sendEvent(AdmixerJSEvent.ON_AD_CLICKED_EVENT, map);
    }

    @Override
    public void onAdCollapsed(AdView av) {
        sendEvent(AdmixerJSEvent.ON_AD_COLLAPSED_EVENT);
    }

    @Override
    public void onAdExpanded(AdView av) {
        sendEvent(AdmixerJSEvent.ON_AD_EXPANDED_EVENT);
    }
    private void sendEvent(String eventName) {
        reactContext.getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class).emit(eventName, null);
    }
    private void sendEvent(String eventName, WritableMap event) {
        reactContext.getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class).emit(eventName, event);
    }
    private void sendEvent(String eventName, String event) {
        reactContext.getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class).emit(eventName, event);
    }
}
