//
//  AMRNInterstitial.m
//  Admixer
//
//  Created by Ivan Ganzha on 14.04.2021.
//  Copyright © 2021 Facebook. All rights reserved.
//

#import "AMRNInterstitial.h"

@implementation AMRNInterstitial

AMInterstitialAd* interstitial;

RCT_EXPORT_MODULE(AdmixerInterstitial);

RCT_EXPORT_METHOD(initInterstitial:(NSString*) zoneId
                  withResolver:(RCTPromiseResolveBlock) resolve
                  withRejecter:(RCTPromiseRejectBlock) reject)
{
    dispatch_async(dispatch_get_main_queue(), ^{
        interstitial = [[AMInterstitialAd alloc] initWithPlacementId:zoneId];
        interstitial.delegate = self;
        resolve(@{@"done":@"true"});
    });
}
RCT_EXPORT_METHOD(loadAd)
{
    dispatch_async(dispatch_get_main_queue(), ^{
        if(interstitial) {
            [interstitial loadAd];
        }
    });
}
RCT_EXPORT_METHOD(showAd)
{
    dispatch_async(dispatch_get_main_queue(), ^{
        if(interstitial) {
            [interstitial displayFrom:[UIApplication sharedApplication].keyWindow.rootViewController];
        }
    });
}
RCT_EXPORT_METHOD(setClickThroughAction:(NSString*) clickThroughAction) {
    dispatch_async(dispatch_get_main_queue(), ^{
        if(interstitial) {
            if([clickThroughAction isEqualToString:@"open_sdk_browser"]) {
                interstitial.clickThroughAction = AMClickThroughActionOpenSDKBrowser;
            } else
                if([clickThroughAction isEqualToString:@"open_device_browser"]) {
                    interstitial.clickThroughAction = AMClickThroughActionOpenDeviceBrowser;
                } else
                    if([clickThroughAction isEqualToString:@"return_url"]) {
                        interstitial.clickThroughAction = AMClickThroughActionReturnURL;
                    }
        }
    });
}

#pragma mark AMInterstitialAdDelegate

- (void) adDidReceiveAd:(id)ad {
    [self sendEventWithName:ON_AD_LOADED_EVENT body:@{@"event": ON_AD_LOADED_EVENT}];
}

- (void) ad:(id)ad requestFailedWithError:(NSError *)error {
    [self sendEventWithName:ON_AD_LOAD_FAILED_EVENT body:@{@"event":ON_AD_LOAD_FAILED_EVENT,@"msg":error.localizedDescription}];
}

- (void) adWillPresent:(id)ad {
    [self sendEventWithName:ON_AD_EXPANDED_EVENT body:@{@"event": ON_AD_EXPANDED_EVENT}];
}

- (void) adWillClose:(id)ad {
    [self sendEventWithName:ON_AD_COLLAPSED_EVENT body:@{@"event": ON_AD_COLLAPSED_EVENT}];
}

- (void) adWasClicked:(id)ad {
    [self sendEventWithName:ON_AD_CLICKED_EVENT body:@{@"event": ON_AD_CLICKED_EVENT}];
}

- (void) adWasClicked:(AMAdView *)ad withURL:(NSString *)urlString {
    [self sendEventWithName:ON_AD_CLICKED_EVENT body:@{@"event": ON_AD_CLICKED_EVENT, @"clickUrl": urlString}];
}

#pragma mark RCTEventEmitter

- (NSArray<NSString*>*)supportedEvents {
    return @[ON_AD_LOADED_EVENT,ON_AD_LOAD_FAILED_EVENT,ON_AD_EXPANDED_EVENT,ON_AD_COLLAPSED_EVENT,ON_AD_CLICKED_EVENT];
}

@end
