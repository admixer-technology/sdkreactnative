package com.reactnativeadmixer;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.uimanager.ThemedReactContext;
import com.facebook.react.uimanager.SimpleViewManager;
import com.facebook.react.uimanager.annotations.ReactProp;
import com.facebook.react.common.MapBuilder;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReadableMap;
import com.facebook.react.bridge.ReadableArray;
import com.facebook.react.uimanager.events.RCTEventEmitter;

import java.util.Map;
import java.util.ArrayList;

import android.os.Handler;
import android.view.ViewGroup;
import android.widget.Toast;
import android.util.Log;

import androidx.annotation.Nullable;

import net.admixer.sdk.AdListener;
import net.admixer.sdk.AdSize;
import net.admixer.sdk.AdView;
import net.admixer.sdk.BannerAdView;
import net.admixer.sdk.ClickThroughAction;
import net.admixer.sdk.ResultCode;

public class AdmixerBannerViewManager extends SimpleViewManager<BannerAdView> implements AdListener {
    public static final String REACT_CLASS = "AdmixerBanner";
    public static final String ZONE_ID_KEY = "zoneId";
    public static final String SIZES_KEY = "sizes";
    public static final String CLICK_THROUGH_KEY = "clickThrough";
    public static final String AUTO_REFRESH_INTERVAL_KEY = "autoRefreshInterval";
    public static final String AUTO_REFRESH_ENABLED_KEY = "autoRefreshEnabled";
    public static final String RESIZE_AD_TO_FIT_CONTAINER_KEY = "resizeAdToFitContainer";
    private ReactApplicationContext reactContext;
    private BannerAdView bannerAdView;

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
      bannerAdView = new BannerAdView(context.getCurrentActivity());
      bannerAdView.setAdListener(this);
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

  @Override
  public void onAdRequestFailed(AdView bav, ResultCode errorCode) {
    if (errorCode == null) {
      sendEvent(AdmixerJSEvent.ON_AD_LOAD_FAILED_EVENT, null);
    } else {
      WritableMap event = Arguments.createMap();
      event.putString("errorCode", errorCode.toString());
      sendEvent(AdmixerJSEvent.ON_AD_LOAD_FAILED_EVENT, event);
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
      bannerAdView.getId(),
      eventName,
      event);
  }
}
