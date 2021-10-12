//
//  AMRNBannerAdViewDelegate.m
//  Admixer
//
//  Created by Ivan Ganzha on 12.10.2021.
//  Copyright © 2021 Facebook. All rights reserved.
//

#import <Foundation/Foundation.h>
#import "AMRNBannerAdViewDelegate.h"
#import "AMRNEvents.h"

@implementation AMRNBannerAdViewDelegate

- (id) initWithBridge:(RCTBridge *)bridge width:(NSInteger)containerWidth height:(NSInteger)containerHeight id:(NSInteger) bannerId {
    self = [super init];
    self.bridge = bridge;
    self.containerWidth = containerWidth;
    self.containerHeight = containerHeight;
    self.bannerId = bannerId;
    return self;
}

#pragma mark AMBannerAdViewDelegate

- (void) adDidReceiveAd:(id)ad {
    [self.bridge.eventDispatcher sendAppEventWithName:[NSString stringWithFormat: @"onAdLoadedAMBannerView%d", self.bannerId] body:@{@"event":ON_AD_LOADED_EVENT}];
    
    [self.bridge.eventDispatcher sendAppEventWithName:[NSString stringWithFormat: @"onResizeAMBannerView%d", self.bannerId] body:@{@"width":@(self.containerWidth),@"height":@(self.containerHeight)}];
}

- (void) ad:(id)ad requestFailedWithError:(NSError *)error {
    [self.bridge.eventDispatcher sendAppEventWithName:[NSString stringWithFormat: @"onAdLoadFailedAMBannerView%d", self.bannerId] body:@{@"event":ON_AD_LOAD_FAILED_EVENT,@"msg":error.localizedDescription}];
}

- (void) adDidPresent:(id)ad {
    [self.bridge.eventDispatcher sendAppEventWithName:[NSString stringWithFormat: @"onAdExpandedAMBannerView%d", self.bannerId] body:@{@"event":ON_AD_EXPANDED_EVENT}];
}

- (void) adDidClose:(id)ad {
    [self.bridge.eventDispatcher sendAppEventWithName:[NSString stringWithFormat: @"onAdCollapsedAMBannerView%d", self.bannerId] body:@{@"event":ON_AD_COLLAPSED_EVENT}];
}

- (void) adWasClicked:(id)ad {
    [self.bridge.eventDispatcher sendAppEventWithName:[NSString stringWithFormat: @"onAdClickedAMBannerView%d", self.bannerId] body:@{@"event":ON_AD_CLICKED_EVENT}];
}

- (void) adWasClicked:(AMAdView *)ad withURL:(NSString *)urlString {
    [self.bridge.eventDispatcher sendAppEventWithName:[NSString stringWithFormat: @"onAdClickedAMBannerView%d", self.bannerId] body:@{@"event":ON_AD_CLICKED_EVENT,@"clickUrl":urlString}];
}

@end
