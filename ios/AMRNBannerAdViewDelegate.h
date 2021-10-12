//
//  AMRNBannerAdViewDelegate.h
//  Admixer
//
//  Created by Ivan Ganzha on 12.10.2021.
//  Copyright © 2021 Facebook. All rights reserved.
//

#ifndef AMRNBannerAdViewDelegate_h
#define AMRNBannerAdViewDelegate_h

#import <AdmixerSDK/AdmixerSDK.h>
#import "RCTBridge.h"
#import "RCTEventDispatcher.h"

@interface AMRNBannerAdViewDelegate : NSObject<AMBannerAdViewDelegate>

@property (nonatomic, weak) RCTBridge* bridge;
@property (nonatomic) NSInteger containerWidth;
@property (nonatomic) NSInteger containerHeight;
@property (nonatomic) NSInteger bannerId;
- (id) initWithBridge:(RCTBridge*) bridge width: (NSInteger) containerWidth height: (NSInteger) containerHeight id:(NSInteger) bannerId;

@end

#endif /* AMRNBannerAdViewDelegate_h */
