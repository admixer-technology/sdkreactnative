package com.reactnativeadmixer;

import android.util.Log;
import android.view.View;
import android.widget.TextView;

import androidx.annotation.Nullable;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReadableArray;
import com.facebook.react.common.MapBuilder;
import com.facebook.react.uimanager.SimpleViewManager;
import com.facebook.react.uimanager.ThemedReactContext;
import com.facebook.react.uimanager.ViewGroupManager;
import com.facebook.react.uimanager.annotations.ReactProp;

import net.admixer.sdk.NativeAdAsset;
import net.admixer.sdk.NativeAdView;
import net.admixer.sdk.NativeMediaView;

import java.util.EnumSet;
import java.util.Map;

public class RNNativeAdViewViewManager extends ViewGroupManager<RNNativeAdView> {

  public static final String REACT_CLASS = "AdmixerNativeAdView";

  public static final String EVENT_NATIVE_AD_LOADED = "onNativeAdLoaded";
  public static final String EVENT_NATIVE_AD_ERROR = "onNativeAdFailed";
  public static final String EVENT_NATIVE_AD_CLICKED = "onNativeAdClicked";
  public static final String PROP_HEADLINE_VIEW = "headline";
  public static final String PROP_MEDIA_VIEW = "mediaView";
  public static final String PROP_BODY_VIEW = "body";
  public static final String PROP_SPONSORED_VIEW = "sponsored";
  public static final String PROP_CALL_TO_ACTION_VIEW = "callToAction";
  public static final String PROP_ICON_VIEW = "icon";
  public static final String PROP_IMAGE_VIEW = "image";
  public static final String PROP_PRICE_VIEW = "price";

  private ReactApplicationContext reactContext;

  public RNNativeAdViewViewManager(ReactApplicationContext context) {
    super();
    this.reactContext = context;
  }

  @Override
  public String getName() {
    Log.d("MyCustomLog", "getName");
    return REACT_CLASS;
  }

  @Override
  protected RNNativeAdView createViewInstance(ThemedReactContext reactContext) {
    Log.d("MyCustomLog", "createViewInstance");
    RNNativeAdView adView = new RNNativeAdView(reactContext);
    return adView;
  }

  @Nullable
  @Override
  public Map<String, Object> getExportedCustomDirectEventTypeConstants() {
    Log.d("MyCustomLog", "getExportedCustomDirectEventTypeConstants");
    MapBuilder.Builder<String, Object> builder = MapBuilder.builder();
    String[] events = new String[]{
      EVENT_NATIVE_AD_LOADED,
      EVENT_NATIVE_AD_ERROR,
      EVENT_NATIVE_AD_CLICKED
    };
    for(String event : events) {
      builder.put(event, MapBuilder.of("registrationName", event));
    }
    return builder.build();
  }

  public static final int COMMAND_LOAD_AD = 1;

  @Nullable
  @Override
  public Map<String, Integer> getCommandsMap() {
    return MapBuilder.<String, Integer>builder()
      .put("loadAd", COMMAND_LOAD_AD)
      .build();
  }

  @Override
  public void receiveCommand(RNNativeAdView root, int commandId, @Nullable ReadableArray args) {
    switch (commandId) {
      case COMMAND_LOAD_AD:
        Log.d("MyCustomLog", "receive command loadAd");
        root.loadAd();
        break;
    }
  }

  @ReactProp(name = "messagingModuleName")
  public void setMessagingModuleName(RNNativeAdView nativeAdView, String moduleName) {
    nativeAdView.setMessagingModuleName(moduleName);
  }

  @ReactProp(name = "zoneId")
  public void setZoneId(RNNativeAdView nativeAdView, String zoneId) {
    nativeAdView.setZoneId(zoneId);
  }

  @ReactProp(name = "assets")
  public void setAssets(RNNativeAdView nativeAdView, ReadableArray array) {
    EnumSet<NativeAdAsset> assets = EnumSet.noneOf(NativeAdAsset.class);
    for(int i = 0; i < array.size();i++) {
      String asset = array.getString(i);
      assets.add(getAssetByName(asset));
    }
    nativeAdView.setAssets(assets);
  }

  @ReactProp(name= "optAssets")
  public void setOptAssets(RNNativeAdView nativeAdView, ReadableArray array) {
    EnumSet<NativeAdAsset> optAssets = EnumSet.noneOf(NativeAdAsset.class);
    for(int i = 0;i < array.size();i++) {
      String asset = array.getString(i);
      optAssets.add(getAssetByName(asset));
    }
    nativeAdView.setOptAssets(optAssets);
  }

  private NativeAdAsset getAssetByName(String name) {
    switch (name) {
      case "image_icon":
        return NativeAdAsset.IMAGE_ICON;
      case "image_main":
        return NativeAdAsset.IMAGE_MAIN;
      case "title":
        return NativeAdAsset.TITLE;
      case "sponsored":
        return NativeAdAsset.SPONSORED;
      case "description":
        return NativeAdAsset.DESCRIPTION;
      case "rating":
        return NativeAdAsset.RATING;
      case "likes":
        return NativeAdAsset.LIKES;
      case "downloads":
        return NativeAdAsset.DOWNLOADS;
      case "price":
        return NativeAdAsset.PRICE;
      case "saleprice":
        return NativeAdAsset.SALEPRICE;
      case "phone":
        return NativeAdAsset.PHONE;
      case "address":
        return NativeAdAsset.ADDRESS;
      case "description2":
        return NativeAdAsset.DESC2;
      case "display_url":
        return NativeAdAsset.DISPLAYURL;
      case "cta":
        return NativeAdAsset.CTA;
    }
    return null;
  }

  @ReactProp(name = PROP_HEADLINE_VIEW)
  public void setHeadlineView(RNNativeAdView adView, int id) {
    View view = adView.findViewById(id);
    adView.setTitleView(view);
  }

  @ReactProp(name = PROP_MEDIA_VIEW)
  public void setMediaView(RNNativeAdView adView, int id) {
    RNNativeMediaView mediaView = adView.findViewById(id);
    adView.setMediaView(mediaView);
  }

  @ReactProp(name = PROP_ICON_VIEW)
  public void setIconView(RNNativeAdView adView, int id) {
    View view = adView.findViewById(id);
    adView.setIconImageView(view);
  }

  @ReactProp(name = PROP_IMAGE_VIEW)
  public void setImageView(RNNativeAdView adView, int id) {
    View view = adView.findViewById(id);
    adView.setMainImageView(view);
  }

  @ReactProp(name = PROP_BODY_VIEW)
  public void setBodyView(RNNativeAdView adView, int id) {
    View view = adView.findViewById(id);
    adView.setDescriptionView(view);
  }

  @ReactProp(name = PROP_SPONSORED_VIEW)
  public void setSponsoredView(RNNativeAdView adView, int id) {
    View view = adView.findViewById(id);
    adView.setSponsoredView(view);
  }

  @ReactProp(name = PROP_CALL_TO_ACTION_VIEW)
  public void setCallToActionView(RNNativeAdView adView, int id) {
    View view = adView.findViewById(id);
    adView.setCallToActionView(view);
  }

  @ReactProp(name = PROP_PRICE_VIEW)
  public void setPriceView(RNNativeAdView adView, int id) {
    View view = adView.findViewById(id);
    adView.setPriceView(view);
  }

}
