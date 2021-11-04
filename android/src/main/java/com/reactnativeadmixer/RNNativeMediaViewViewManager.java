package com.reactnativeadmixer;

import android.util.Log;

import com.facebook.react.uimanager.SimpleViewManager;
import com.facebook.react.uimanager.ThemedReactContext;
import com.facebook.react.uimanager.annotations.ReactProp;

import net.admixer.sdk.NativeMediaView;

public class RNNativeMediaViewViewManager extends SimpleViewManager<NativeMediaView> {

  public static final String REACT_CLASS = "NativeMediaView";

  @Override
  public String getName() {
    return REACT_CLASS;
  }

  @Override
  protected NativeMediaView createViewInstance(ThemedReactContext reactContext) {
    RNNativeMediaView mediaView = new RNNativeMediaView(reactContext.getCurrentActivity());
    return mediaView;
  }
}

