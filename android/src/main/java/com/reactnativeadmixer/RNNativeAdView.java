package com.reactnativeadmixer;

import android.content.Context;
import android.util.Log;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.CatalystInstance;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.WritableArray;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.bridge.WritableNativeArray;
import com.facebook.react.bridge.WritableNativeMap;

import net.admixer.sdk.ClickThroughAction;
import net.admixer.sdk.NativeAdAsset;
import net.admixer.sdk.NativeAdEventListener;
import net.admixer.sdk.NativeAdRequest;
import net.admixer.sdk.NativeAdRequestListener;
import net.admixer.sdk.NativeAdResponse;
import net.admixer.sdk.NativeAdView;
import net.admixer.sdk.ResultCode;

import java.util.EnumSet;

public class RNNativeAdView extends NativeAdView implements NativeAdRequestListener {

  private Context context;
  private NativeAdRequest adRequest;
  private NativeAdResponse adResponse;
  private CatalystInstance catalystInstance;
  private String messagingModuleName;
  private String zoneId = "";
  private ClickThroughAction clickThroughAction = ClickThroughAction.OPEN_SDK_BROWSER;
  private EnumSet<NativeAdAsset> assets;
  private EnumSet<NativeAdAsset> optAssets;

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

  public void setClickThroughAction(ClickThroughAction action) {
    this.clickThroughAction = action;
    setupAdRequest();
  }

  public void setAssets(EnumSet<NativeAdAsset> assets) {
    this.assets = assets;
    if(assets == null) return;
    if(adRequest != null) {
      adRequest.setRequiredAssets(assets);
    } else {
      setupAdRequest();
    }
  }

  public void setOptAssets(EnumSet<NativeAdAsset> optAssets) {
    this.optAssets = optAssets;
    if(optAssets == null) return;
    if(adRequest != null) {
      adRequest.setOptionalAssets(optAssets);
    } else {
      setupAdRequest();
    }
  }

  public void setupAdRequest() {
    adRequest = new NativeAdRequest(context, zoneId);
    adRequest.setListener(this);
    adRequest.setClickThroughAction(clickThroughAction);

    if(assets != null) {
      adRequest.setRequiredAssets(assets);
    }

    if(optAssets != null) {
      adRequest.setOptionalAssets(optAssets);
    }
  }

  public void loadAd() {
    adRequest.loadAd();
  }

  @Override
  public void onAdLoaded(NativeAdResponse nativeAdResponse) {
      if(nativeAdResponse != null) {
        this.adResponse = nativeAdResponse;
        this.adResponse.registerViews(this, new NativeAdEventListener() {
          @Override
          public void onAdWasClicked() {
            sendDirectMessage(RNNativeAdViewViewManager.EVENT_NATIVE_AD_CLICKED, null);
          }

          @Override
          public void onAdWillLeaveApplication() {

          }

          @Override
          public void onAdWasClicked(String s, String s1) {
            try {
              WritableMap args = Arguments.createMap();
              args.putString("clickUrl", s);
              sendDirectMessage(RNNativeAdViewViewManager.EVENT_NATIVE_AD_CLICKED, args);
            } catch (Exception e) {
              e.printStackTrace();
              sendDirectMessage(RNNativeAdViewViewManager.EVENT_NATIVE_AD_CLICKED, null);
            }
          }
        });
        setNativeAdResponseToJS(nativeAdResponse);
      }
  }

  @Override
  public void onAdFailed(ResultCode resultCode) {
    if(resultCode != null) {
      try {
        WritableMap args = Arguments.createMap();
        args.putString("errorCode", resultCode.toString());
        sendDirectMessage(RNNativeAdViewViewManager.EVENT_NATIVE_AD_ERROR, args);
      } catch (Exception e) {
        e.printStackTrace();
        sendDirectMessage(RNNativeAdViewViewManager.EVENT_NATIVE_AD_ERROR, null);
      }
    } else {
      sendDirectMessage(RNNativeAdViewViewManager.EVENT_NATIVE_AD_ERROR, null);
    }
  }

  private void setNativeAdResponseToJS(NativeAdResponse adResponse) {
    try {
      WritableMap args = Arguments.createMap();
      args.putString("headline", adResponse.getTitle());
      args.putString("body", adResponse.getDescription());
      args.putString("advertiser", adResponse.getSponsoredBy());
      args.putString("callToAction", adResponse.getCallToAction());
      args.putString("imageUrl", adResponse.getImageUrl());
      args.putString("iconUrl", adResponse.getIconUrl());

      sendDirectMessage(RNNativeAdViewViewManager.EVENT_NATIVE_AD_LOADED, args);
    } catch (Exception e) {
      e.printStackTrace();
      sendDirectMessage(RNNativeAdViewViewManager.EVENT_NATIVE_AD_ERROR, null);
    }
  }

  public void setMessagingModuleName(String messagingModuleName) {
    this.messagingModuleName = messagingModuleName;
  }

  protected void sendDirectMessage(String eventName, WritableMap data) {
    WritableNativeMap event = new WritableNativeMap();
    event.putMap("nativeEvent", data);
    WritableNativeArray params = new WritableNativeArray();
    params.pushMap(event);

    if(catalystInstance != null) {
      catalystInstance.callFunction(messagingModuleName, eventName, params);
    }
  }
}
