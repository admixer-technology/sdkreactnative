package com.reactnativeadmixer;

import android.util.Log;
import android.view.ViewGroup;
import android.widget.RelativeLayout;
import android.widget.Toast;
import android.app.Activity;
import android.view.View;

import androidx.annotation.Nullable;

import com.facebook.react.bridge.LifecycleEventListener;
import com.facebook.react.views.view.ReactViewGroup;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.uimanager.events.RCTEventEmitter;

import net.admixer.sdk.BannerAdView;
import net.admixer.sdk.AdListener;
import net.admixer.sdk.AdView;
import net.admixer.sdk.ResultCode;
import net.admixer.sdk.NativeAdResponse;

public class AdmixerBanner extends BannerAdView implements AdListener {
    private ReactContext reactContext;
    private Activity activity;

    public AdmixerBanner(ReactContext rc) {
        super(rc.getCurrentActivity());
        reactContext = rc;
        activity = rc.getCurrentActivity();
        setAdListener(this);
        setAutoRefreshInterval(0);
    }

    @Override
    public void onAdRequestFailed(AdView bav, ResultCode errorCode) {
        if (errorCode == null) {
            sendEvent(AdmixerJSEvent.ON_AD_REQUEST_FAILED_EVENT, null);
        } else {
            WritableMap event = Arguments.createMap();
            event.putString("errorCode", errorCode.toString());
            sendEvent(AdmixerJSEvent.ON_AD_REQUEST_FAILED_EVENT, event);
        }
    }

    @Override
    public void onAdLoaded(AdView bav) {
        int width = bav.getCreativeWidth();
        int height = bav.getCreativeHeight();

        WritableMap event = Arguments.createMap();
        event.putInt("width", width);
        event.putInt("height", height);

        sendEvent(AdmixerJSEvent.ON_RESIZE_EVENT, event);
        sendEvent(AdmixerJSEvent.ON_AD_LOADED_EVENT, null);
    }

    @Override
    public void onAdExpanded(AdView bav) {
        sendEvent(AdmixerJSEvent.ON_AD_EXPANDED_EVENT, null);
    }

    @Override
    public void onAdCollapsed(AdView bav) {
        sendEvent(AdmixerJSEvent.ON_AD_COLLAPSED_EVENT, null);
    }

    @Override
    public void onAdClicked(AdView bav) {
        sendEvent(AdmixerJSEvent.ON_AD_CLICKED_EVENT, null);
    }

    @Override
    public void onAdClicked(AdView adView, String clickUrl) {
        WritableMap event = Arguments.createMap();
        event.putString("clickUrl", clickUrl);
        sendEvent(AdmixerJSEvent.ON_AD_CLICKED_EVENT, event);
    }

    private void sendEvent(String eventName, @Nullable WritableMap event) {
        reactContext.getJSModule(RCTEventEmitter.class).receiveEvent(
                getId(),
                eventName,
                event);
    }
}
