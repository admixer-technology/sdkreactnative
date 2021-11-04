package com.reactnativeadmixer;

import androidx.annotation.NonNull;

import com.facebook.react.uimanager.SimpleViewManager;
import com.facebook.react.uimanager.ThemedReactContext;
import com.facebook.react.uimanager.annotations.ReactProp;

public class RNButtonViewManager extends SimpleViewManager<RNButton> {

  private static final String REACT_CLASS = "AdmixerButton";
  private static final String PROP_TITLE = "title";

  @NonNull
  @Override
  public String getName() {
    return REACT_CLASS;
  }

  @NonNull
  @Override
  protected RNButton createViewInstance(@NonNull ThemedReactContext reactContext) {
    return new RNButton(reactContext);
  }

  @ReactProp(name = PROP_TITLE)
  public void setTitle(RNButton button, String title) {
    button.setText(title);
  }

}
