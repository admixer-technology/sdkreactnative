package com.reactnativeadmixer;

import com.facebook.react.uimanager.ThemedReactContext;
import com.facebook.react.uimanager.SimpleViewManager;
import com.facebook.react.uimanager.annotations.ReactProp;
import com.facebook.react.common.MapBuilder;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReadableMap;
import com.facebook.react.bridge.ReadableArray;

import java.util.Map;
import java.util.ArrayList;

import android.os.Handler;
import android.view.ViewGroup;
import android.widget.Toast;

import net.admixer.sdk.AdSize;
import net.admixer.sdk.ClickThroughAction;

public class AdmixerBannerViewManager extends SimpleViewManager<AdmixerBanner> {
    public static final String REACT_CLASS = "AdmixerBanner";
    public static final String ZONE_ID_KEY = "zoneId";
    public static final String SIZES_KEY = "sizes";
    public static final String CLICK_THROUGH_KEY = "clickThrough";
    public static final String AUTO_REFRESH_KEY = "autoRefresh";
    private ReactContext reactContext;

    public AdmixerBannerViewManager(ReactContext rc) {
        super();
        reactContext = rc;

    }

    @Override
    public String getName() {
        return REACT_CLASS;
    }

    @Override
    public AdmixerBanner createViewInstance(ThemedReactContext context) {
        return new AdmixerBanner(context);
    }

    @ReactProp(name = "config")
    public void setConfig(final AdmixerBanner adView, ReadableMap config) {
        String zoneId = config.getString(ZONE_ID_KEY);
        adView.setPlacementID(zoneId);

        ReadableArray sizes_ = config.getArray(SIZES_KEY);
        ArrayList<AdSize> adSizes = new ArrayList();
        for (int sizeIndex = 0; sizeIndex < sizes_.size(); sizeIndex++) {
            ReadableArray size = sizes_.getArray(sizeIndex);
            adSizes.add(new AdSize(size.getInt(0), size.getInt(1)));
        }
        adView.setAdSizes(adSizes);

        if (config.hasKey(CLICK_THROUGH_KEY)) {
            String clickThrough = config.getString(CLICK_THROUGH_KEY);
            switch (clickThrough) {
                case "return_url":
                    adView.setClickThroughAction(ClickThroughAction.RETURN_URL);
                    break;
                case "open_sdk_browser":
                    adView.setClickThroughAction(ClickThroughAction.OPEN_SDK_BROWSER);
                    break;
                case "open_device_browser":
                    adView.setClickThroughAction(ClickThroughAction.OPEN_DEVICE_BROWSER);
                    break;
            }
        }

        // TODO
//        adView.setAutoRefreshInterval(
//                config.hasKey(AUTO_REFRESH_KEY) ? config.getInt(AUTO_REFRESH_KEY) : 0
//        );

        new Handler().postDelayed(new Runnable() {
            @Override
            public void run() {
                adView.loadAd();
            }
        }, 0);
    }

    @Override
    public Map getExportedCustomBubblingEventTypeConstants() {
        return MapBuilder.builder()
                .put(
                        AdmixerJSEvent.ON_RESIZE_EVENT,
                        MapBuilder.of(
                                "phasedRegistrationNames",
                                MapBuilder.of("bubbled", AdmixerJSEvent.ON_RESIZE_EVENT)))
                .put(
                        AdmixerJSEvent.ON_AD_REQUEST_FAILED_EVENT,
                        MapBuilder.of(
                                "phasedRegistrationNames",
                                MapBuilder.of("bubbled", AdmixerJSEvent.ON_AD_REQUEST_FAILED_EVENT)))
                .put(
                        AdmixerJSEvent.ON_AD_LOADED_EVENT,
                        MapBuilder.of(
                                "phasedRegistrationNames",
                                MapBuilder.of("bubbled", AdmixerJSEvent.ON_AD_LOADED_EVENT)))
                .put(
                        AdmixerJSEvent.ON_AD_EXPANDED_EVENT,
                        MapBuilder.of(
                                "phasedRegistrationNames",
                                MapBuilder.of("bubbled", AdmixerJSEvent.ON_AD_EXPANDED_EVENT)))
                .put(
                        AdmixerJSEvent.ON_AD_COLLAPSED_EVENT,
                        MapBuilder.of(
                                "phasedRegistrationNames",
                                MapBuilder.of("bubbled", AdmixerJSEvent.ON_AD_COLLAPSED_EVENT)))
                .put(
                        AdmixerJSEvent.ON_AD_CLICKED_EVENT,
                        MapBuilder.of(
                                "phasedRegistrationNames",
                                MapBuilder.of("bubbled", AdmixerJSEvent.ON_AD_CLICKED_EVENT)))
                .build();
    }
}
