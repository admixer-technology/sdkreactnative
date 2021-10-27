package com.reactnativeadmixer;

import com.facebook.react.uimanager.SimpleViewManager;
import com.facebook.react.uimanager.ThemedReactContext;

import net.admixer.sdk.NativeIconView;

public class RNNativeIconViewViewManager extends SimpleViewManager<NativeIconView> {

  public static final String REACT_CLASS = "IconView";

  @Override
  public String getName() {
    return REACT_CLASS;
  }

  @Override
  protected NativeIconView createViewInstance(ThemedReactContext reactContext) {
    RNNativeIconView iconView = new RNNativeIconView(reactContext.getCurrentActivity());
    return iconView;
  }
}
