package com.reactnativeadmixer;

import android.os.Handler;

import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

import net.admixer.sdk.NativeAdRequest;

public class RNNativeAdRequest extends ReactContextBaseJavaModule {

  private final String CLASS_NAME = "RNNativeAdRequest";

  private NativeAdRequest adRequest;

  public RNNativeAdRequest(ReactApplicationContext reactContext) {
    super(reactContext);
  }

  @Override
  public String getName() {
    return CLASS_NAME;
  }

  @ReactMethod
  public void init(String zoneId) {
    getCurrentActivity().runOnUiThread(new Runnable() {
      @Override
      public void run() {
        adRequest = new NativeAdRequest(getCurrentActivity(), zoneId);
      }
    });
  }

  @ReactMethod
  public void loadAd() {
    new Handler().postDelayed(new Runnable() {
      @Override
      public void run() {
        if(adRequest != null) {
          adRequest.loadAd();
        }
      }
    }, 0);
  }

}
