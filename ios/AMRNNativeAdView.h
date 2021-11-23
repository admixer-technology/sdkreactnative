//
//  AMRNNativeAdView.h
//  Admixer
//
//  Created by Ivan Ganzha on 15.11.2021.
//  Copyright © 2021 Facebook. All rights reserved.
//

#ifndef AMRNNativeAdView_h
#define AMRNNativeAdView_h

@import React;
#import <Foundation/Foundation.h>
#import <UIKit/UIKit.h>
#import <AdmixerSDK/AdmixerSDK.h>

@interface AMRNNativeAdView: UIView<AMNativeAdRequestDelegate, AMNativeAdDelegate>

- (instancetype) initWithBridge: (RCTBridge *) bridge;
- (void) loadAd;

@property (nonatomic, copy) RCTDirectEventBlock onNativeAdLoaded;
@property (nonatomic, copy) RCTDirectEventBlock onNativeAdFailed;
@property (nonatomic, copy) RCTDirectEventBlock onNativeAdClicked;

@property (nonatomic, copy) NSNumber *headline;
@property (nonatomic, copy) NSNumber *body;
@property (nonatomic, copy) NSNumber *callToAction;
@property (nonatomic, copy) NSNumber *icon;
@property (nonatomic, copy) NSNumber *image;
@property (nonatomic, copy) NSNumber *mediaView;
@property (nonatomic, copy) NSNumber *price;
@property (nonatomic, copy) NSNumber *sponsored;
 
@property UIView * headlineView;
@property UIView* bodyView;
@property UIView* callToActionView;
@property UIView* iconView;
@property UIView* imageView;
@property UIView* mediaViewView;
@property UIView* priceView;
@property UIView* sponsoredView;

@end

#endif /* AMRNNativeAdView_h */
