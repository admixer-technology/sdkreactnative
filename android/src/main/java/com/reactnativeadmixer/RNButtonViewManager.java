package com.reactnativeadmixer;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;

import com.facebook.react.bridge.ReadableMap;
import com.facebook.react.bridge.ReadableType;
import com.facebook.react.uimanager.SimpleViewManager;
import com.facebook.react.uimanager.ThemedReactContext;
import com.facebook.react.uimanager.annotations.ReactProp;

public class RNButtonViewManager extends SimpleViewManager<RNButton> {

  private static final String REACT_CLASS = "AdmixerButton";
  private static final String PROP_TITLE = "title";
  private static final String STYLE_COLOR = "color";
  private final String STYLE_BACKGROUND_COLOR = "backgroundColor";
  private final String STYLE_BORDER_COLOR = "borderColor";
  private final String STYLE_BORDER_WIDTH = "borderWidth";
  private final String STYLE_BORDER_RADIUS = "borderRadius";
  private final String STYLE_FONT_SIZE = "fontSize";
  private static final String PROP_BUTTON_ANDROID_STYLE = "buttonAndroidStyle";

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

  @ReactProp(name = PROP_BUTTON_ANDROID_STYLE)
  public void setButtonAndroidStyle(RNButton button, @Nullable ReadableMap style) {
    if(style == null) return;
    String color = null;
    String backgroundColor = null;
    String borderColor = null;
    int borderWidth = 0;
    int borderRadius = 0;
    int fontSize = 16;

    if (style.hasKey(STYLE_COLOR)) {
      color = style.getString(STYLE_COLOR);
    }

    if(style.hasKey(STYLE_BACKGROUND_COLOR)) {
      backgroundColor = style.getString(STYLE_BACKGROUND_COLOR);
    }

    if(style.hasKey(STYLE_BORDER_COLOR)) {
      borderColor = style.getString(STYLE_BORDER_COLOR);
    }

    if(style.hasKey(STYLE_BORDER_WIDTH)) {
      if(style.getType(STYLE_BORDER_WIDTH) == ReadableType.Number) {
        borderWidth = style.getInt(STYLE_BORDER_WIDTH);
      }
    }

    if(style.hasKey(STYLE_BORDER_RADIUS)) {
      if(style.getType(STYLE_BORDER_RADIUS) == ReadableType.Number) {
        borderRadius = style.getInt(STYLE_BORDER_RADIUS);
      }
    }

    if(style.hasKey(STYLE_FONT_SIZE)) {
      if(style.getType(STYLE_FONT_SIZE) == ReadableType.Number) {
        fontSize = style.getInt(STYLE_FONT_SIZE);
        button.setTextSize(fontSize);
      }
    }

    button.setButtonStyle(color, backgroundColor, borderColor, borderWidth, borderRadius);
  }

}
