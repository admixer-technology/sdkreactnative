package com.reactnativeadmixer;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.uimanager.ThemedReactContext;
import com.facebook.react.uimanager.SimpleViewManager;
import com.facebook.react.uimanager.annotations.ReactProp;
import com.facebook.react.common.MapBuilder;
import com.facebook.react.bridge.ReadableMap;
import com.facebook.react.bridge.ReadableArray;

import java.util.Map;
import java.util.ArrayList;

import android.os.Handler;

import net.admixer.sdk.AdSize;
import net.admixer.sdk.BannerAdView;
import net.admixer.sdk.ClickThroughAction;

public class AdmixerBannerViewManager extends SimpleViewManager<BannerAdView> {
    public static final String REACT_CLASS = "AdmixerBanner";
    public static final String ZONE_ID_KEY = "zoneId";
    public static final String SIZES_KEY = "sizes";
    public static final String CLICK_THROUGH_KEY = "clickThrough";
    public static final String AUTO_REFRESH_INTERVAL_KEY = "autoRefreshInterval";
    public static final String AUTO_REFRESH_ENABLED_KEY = "autoRefreshEnabled";
    public static final String RESIZE_AD_TO_FIT_CONTAINER_KEY = "resizeAdToFitContainer";
    private ReactApplicationContext reactContext;

    public AdmixerBannerViewManager(ReactApplicationContext rc) {
        super();
        reactContext = rc;

    }

    @Override
    public String getName() {
        return REACT_CLASS;
    }

    @Override
    public BannerAdView createViewInstance(ThemedReactContext context) {
      RNBannerAdView bannerAdView = new RNBannerAdView(context.getCurrentActivity());
      bannerAdView.setReactContext(reactContext);
      bannerAdView.setAdListener(bannerAdView);
      return bannerAdView;
    }

    @ReactProp(name = "config")
    public void setConfig(final BannerAdView adView, ReadableMap config) {
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

        if(config.hasKey(AUTO_REFRESH_INTERVAL_KEY)) {
            int autoRefresh = config.getInt(AUTO_REFRESH_INTERVAL_KEY);
            adView.setAutoRefreshInterval(autoRefresh);
        }

        if(config.hasKey(AUTO_REFRESH_ENABLED_KEY)) {
            boolean autoRefreshEnabled = config.getBoolean(AUTO_REFRESH_ENABLED_KEY);
            if(autoRefreshEnabled) {
              adView.setAutoRefresh(true);
            } else {
              adView.setAutoRefresh(false);
            }
        }

        if(config.hasKey(RESIZE_AD_TO_FIT_CONTAINER_KEY)) {
          boolean resizeAdToFitContainer = config.getBoolean(RESIZE_AD_TO_FIT_CONTAINER_KEY);
          if(resizeAdToFitContainer) {
            adView.setResizeAdToFitContainer(true);
          } else {
            adView.setResizeAdToFitContainer(false);
          }
        }

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
                        AdmixerJSEvent.ON_AD_LOAD_FAILED_EVENT,
                        MapBuilder.of(
                                "phasedRegistrationNames",
                                MapBuilder.of("bubbled", AdmixerJSEvent.ON_AD_LOAD_FAILED_EVENT)))
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
