package com.reactnativeadmixer;

import android.content.Context;
import android.util.AttributeSet;

import androidx.annotation.Nullable;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.uimanager.events.RCTEventEmitter;
import com.facebook.react.bridge.Arguments;

import net.admixer.sdk.AdListener;
import net.admixer.sdk.AdView;
import net.admixer.sdk.BannerAdView;
import net.admixer.sdk.ResultCode;

public class BannerAdViewRN extends BannerAdView implements AdListener {

  private ReactApplicationContext reactContext;

  public BannerAdViewRN(Context context) {
    super(context);
  }

  public BannerAdViewRN(Context context, AttributeSet attrs) {
    super(context, attrs);
  }

  public BannerAdViewRN(Context context, AttributeSet attrs, int defStyle) {
    super(context, attrs, defStyle);
  }

  public BannerAdViewRN(Context context, int refresh_interval) {
    super(context, refresh_interval);
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
      getId(),
      eventName,
      event);
  }

  public void setReactContext(ReactApplicationContext reactContext) {
    this.reactContext = reactContext;
  }
}
