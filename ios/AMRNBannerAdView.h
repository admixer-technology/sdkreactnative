//
//  AMRNBannerAdView.h
//  Admixer
//
//  Created by Ivan Ganzha on 13.04.2021.
//  Copyright © 2021 Facebook. All rights reserved.
//

#ifndef AMRNBannerAdView_h
#define AMRNBannerAdView_h

#import <UIKit/UIKit.h>
#import <React/RCTComponent.h>
#import <AdmixerSDK/AdmixerSDK.h>

@interface AMRNBannerAdView : UIView <AMBannerAdViewDelegate>

@property (nonatomic, assign) NSDictionary* config;
@property (nonatomic, copy) RCTBubblingEventBlock onAdLoaded;
@property (nonatomic, copy) RCTBubblingEventBlock onAdRequestFailed;
@property (nonatomic, copy) RCTBubblingEventBlock onAdExpanded;
@property (nonatomic, copy) RCTBubblingEventBlock onAdCollapsed;
@property (nonatomic, copy) RCTBubblingEventBlock onAdClicked;

- (void) setConfiguration: (NSString*) zoneId withBannerWidth: (NSInteger) bannerWidth withBannerHeight: (NSInteger) bannerHeight withClickThrough: (NSString*) clickThrough withSizes: (NSArray*) sizes withAutoRefresh: (NSInteger) autoRefresh withAutoRefreshEnabled: (bool) autoRefreshEnabled withResizeAdToFitContainer: (bool) resizeAdToFitContainer;

@end

#endif /* AMRNBannerAdView_h */
