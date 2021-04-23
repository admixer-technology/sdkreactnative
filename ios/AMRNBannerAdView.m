//
//  AMRNBannerAdView.m
//  Admixer
//
//  Created by Ivan Ganzha on 13.04.2021.
//  Copyright © 2021 Facebook. All rights reserved.
//

#import <Foundation/Foundation.h>
#import "AMRNBannerAdView.h"
#import <AdmixerSDK/AdmixerSDK.h>

@implementation AMRNBannerAdView

AMBannerAdView* adView;

#pragma mark Constructors

- (id) initWithFrame:(CGRect)frame;
{
    self = [super initWithFrame:frame];
    return self;
}

- (id) initWithCoder:(NSCoder *)coder {
    self = [super initWithCoder:coder];
    return self;
}

#pragma mark Configuration

- (void) setConfiguration:(NSString *)zoneId withBannerWidth:(NSInteger)bannerWidth withBannerHeight:(NSInteger)bannerHeight withClickThrough:(NSString *)clickThrough withSizes:(NSArray *)sizes withAutoRefresh:(NSInteger)autoRefresh withAutoRefreshEnabled:(bool)autoRefreshEnabled withResizeAdToFitContainer:(bool)resizeAdToFitContainer {
    
    CGSize adSize = CGSizeMake(bannerWidth, bannerHeight);
    CGRect bannerFrame = CGRectMake(0, 0, bannerWidth, bannerHeight);
    adView = [[AMBannerAdView alloc] initWithFrame:bannerFrame placementId:zoneId adSize:adSize];
    adView.delegate = self;
    
    if(sizes.count > 0) {
        NSMutableArray* adSizes = [NSMutableArray arrayWithCapacity:sizes.count];
        
        for(id object in sizes) {
            float width = [object[0] floatValue];
            float height = [object[1] floatValue];
            CGSize size = CGSizeMake(width, height);
            NSValue* adSize = [NSValue valueWithCGSize:size];
            
            
            [adSizes addObject:adSize];
        }
        adView.adSizes = adSizes;
    }
    
    if(clickThrough != nil) {
        if([clickThrough isEqualToString:@"open_sdk_browser"]) {
            adView.clickThroughAction = AMClickThroughActionOpenSDKBrowser;
        } else
            if([clickThrough isEqualToString:@"open_device_browser"]) {
                adView.clickThroughAction = AMClickThroughActionOpenDeviceBrowser;
            } else
                if([clickThrough isEqualToString:@"return_url"]) {
                    adView.clickThroughAction = AMClickThroughActionReturnURL;
                }
    }
    
    if(autoRefresh > 1000) {
        autoRefresh = autoRefresh / 1000;
    }
    adView.autoRefreshInterval = autoRefresh;
    
    if(!autoRefreshEnabled) {
        adView.autoRefreshInterval = 0;
    }
    
    if(resizeAdToFitContainer) {
        adView.shouldResizeAdToFitContainer = true;
    } else {
        adView.shouldResizeAdToFitContainer = false;
    }
    
    [adView loadAd];
    [self addSubview:adView];
}

#pragma mark HandleClick

- (BOOL) pointInside:(CGPoint)point withEvent:(UIEvent *)event{
    if([adView pointInside:[self convertPoint:point toView:adView] withEvent:event]) {
        return YES;
    }
    return NO;
}

#pragma mark AMBannerAdViewDelegate

- (void) adDidReceiveAd:(id)ad {
    if(self.onAdLoaded != nil) {
        self.onAdLoaded(@{@"event":ON_AD_LOADED_EVENT});
    }
}

- (void) ad:(id)ad requestFailedWithError:(NSError *)error {
    if(self.onAdLoadFailed != nil) {
        self.onAdLoadFailed(@{@"event":ON_AD_LOAD_FAILED_EVENT,@"msg":error.localizedDescription});
    }
}

- (void) adDidPresent:(id)ad {
    if(self.onAdExpanded != nil) {
        self.onAdExpanded(@{@"event":ON_AD_EXPANDED_EVENT});
    }
}

- (void) adDidClose:(id)ad {
    if(self.onAdCollapsed != nil) {
        self.onAdCollapsed(@{@"event":ON_AD_COLLAPSED_EVENT});
    }
}

- (void) adWasClicked:(id)ad {
    if(self.onAdClicked != nil) {
        self.onAdClicked(@{@"event":ON_AD_CLICKED_EVENT});
    }
}

- (void) adWasClicked:(AMAdView *)ad withURL:(NSString *)urlString {
    if(self.onAdClicked != nil) {
        self.onAdClicked(@{@"event":ON_AD_CLICKED_EVENT,@"clickUrl":urlString});
    }
}

@end
