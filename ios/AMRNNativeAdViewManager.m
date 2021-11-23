//
//  AMRNNativeAdViewManager.m
//  Admixer
//
//  Created by Ivan Ganzha on 15.11.2021.
//  Copyright © 2021 Facebook. All rights reserved.
//

#import <Foundation/Foundation.h>
@import React;
#import "AMRNNativeAdView.h"

@interface AMRNNativeAdViewManager: RCTViewManager

+ (NSString*) EVENT_AD_LOADED;
+ (NSString*) EVENT_AD_FAILED_TO_LOAD;
+ (NSString*) EVENT_AD_CLICKED;

@end

@implementation AMRNNativeAdViewManager

+ (NSString*) EVENT_AD_LOADED{return @"onAdLoaded";}
+ (NSString*) EVENT_AD_FAILED_TO_LOAD{return @"onAdFailedToLoad";}
+ (NSString*) EVENT_AD_CLICKED{return @"onAdClicked";}

AMRNNativeAdView * nativeAdView;

RCT_EXPORT_MODULE(AdmixerNativeAdView)

- (UIView *)view {
    CGRect rect = CGRectMake(0, 0, 300, 250);
    nativeAdView = [[AMRNNativeAdView alloc] initWithBridge:self.bridge];
    return nativeAdView;
}

RCT_EXPORT_METHOD(loadAd:(nonnull NSNumber*) reactTag)
{
    [self.bridge.uiManager addUIBlock:^(RCTUIManager *uiManager, NSDictionary<NSNumber *,AMRNNativeAdView *> *viewRegistry) {
        AMRNNativeAdView *view = viewRegistry[reactTag];
        if(![view isKindOfClass:[AMRNNativeAdView class]]) {
            RCTLogError(@"Invalid view returned from registry");
        } else {
            [view loadAd];
        }
    }];
}

RCT_EXPORT_VIEW_PROPERTY(zoneId, NSString)
RCT_EXPORT_VIEW_PROPERTY(assets, NSStringArray)
RCT_EXPORT_VIEW_PROPERTY(optAssets, NSStringArray)
RCT_EXPORT_VIEW_PROPERTY(clickThrough, NSString)

RCT_EXPORT_VIEW_PROPERTY(headline, NSNumber)
RCT_EXPORT_VIEW_PROPERTY(body, NSNumber)
RCT_EXPORT_VIEW_PROPERTY(callToAction, NSNumber)
RCT_EXPORT_VIEW_PROPERTY(icon, NSNumber)
RCT_EXPORT_VIEW_PROPERTY(image, NSNumber)
RCT_EXPORT_VIEW_PROPERTY(mediaView, NSNumber)
RCT_EXPORT_VIEW_PROPERTY(price, NSNumber)
RCT_EXPORT_VIEW_PROPERTY(sponsored, NSNumber)


RCT_EXPORT_VIEW_PROPERTY(onNativeAdLoaded, RCTDirectEventBlock)
RCT_EXPORT_VIEW_PROPERTY(onNativeAdFailed, RCTDirectEventBlock)
RCT_EXPORT_VIEW_PROPERTY(onNativeAdClicked, RCTDirectEventBlock)

@end
