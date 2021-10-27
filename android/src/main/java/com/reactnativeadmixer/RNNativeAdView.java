package com.reactnativeadmixer;

import android.content.Context;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.CatalystInstance;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.bridge.WritableNativeArray;
import com.facebook.react.bridge.WritableNativeMap;

import net.admixer.sdk.NativeAdRequest;
import net.admixer.sdk.NativeAdRequestListener;
import net.admixer.sdk.NativeAdResponse;
import net.admixer.sdk.NativeAdView;
import net.admixer.sdk.ResultCode;

public class RNNativeAdView extends NativeAdView implements NativeAdRequestListener {

  Context context;
  NativeAdRequest adRequest;
  NativeAdResponse adResponse;
  CatalystInstance catalystInstance;
  private String zoneId = "";

  public RNNativeAdView(ReactContext context) {
    super(context);
    this.context = context;
    this.catalystInstance = context.getCatalystInstance();
  }

  public void setZoneId(String id) {
    this.zoneId = id;
    if(id == null) return;
    setupAdRequest();
  }

  public void setupAdRequest() {
    adRequest = new NativeAdRequest(context, zoneId);
    adRequest.setListener(this);
  }

  public void loadAd() {
    adRequest.loadAd();
  }

  @Override
  public void onAdLoaded(NativeAdResponse nativeAdResponse) {
      if(nativeAdResponse != null) {
        this.adResponse = nativeAdResponse;

      }
  }

  @Override
  public void onAdFailed(ResultCode resultCode) {

  }

  private void setNativeAdResponseToJS(NativeAdResponse adResponse) {
    try {
      WritableMap args = Arguments.createMap();
      args.putString("headline", adResponse.getTitle());
      args.putString("body", adResponse.getDescription());
      args.putString("advertiser", adResponse.getSponsoredBy());
      args.putString("callToAction", adResponse.getCallToAction());

    } catch (Exception e) {

    }
  }

  protected void sendDirectMessage(WritableMap data) {
    WritableNativeMap event = new WritableNativeMap();
    event.putMap("nativeEvent", data);
    WritableNativeArray params = new WritableNativeArray();
    params.pushMap(event);

    if(catalystInstance != null) {
      catalystInstance.callFunction()
    }
  }

}
