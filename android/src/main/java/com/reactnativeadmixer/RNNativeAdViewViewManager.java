package com.reactnativeadmixer;

import androidx.annotation.Nullable;

import com.facebook.react.bridge.ReadableArray;
import com.facebook.react.common.MapBuilder;
import com.facebook.react.uimanager.SimpleViewManager;
import com.facebook.react.uimanager.ThemedReactContext;
import com.facebook.react.uimanager.annotations.ReactProp;

import net.admixer.sdk.NativeAdView;

import java.util.Map;

public class RNNativeAdViewViewManager extends SimpleViewManager<RNNativeAdView> {

  public static final String REACT_CLASS = "AdmixerNativeAdView";

  @Override
  public String getName() {
    return REACT_CLASS;
  }

  @Override
  protected RNNativeAdView createViewInstance(ThemedReactContext reactContext) {
    RNNativeAdView adView = new RNNativeAdView(reactContext);
    return adView;
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
        root.loadAd();
        break;
    }
  }

  @ReactProp(name = "messagingModuleName")
  public void setMessagingModuleName(RNNativeAdView nativeAdView, String moduleName) {
    nativeAdView.setMessagingModuleName(moduleName);
  }

}
