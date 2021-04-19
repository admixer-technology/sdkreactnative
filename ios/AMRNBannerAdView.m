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

- (id) initWithFrame:(CGRect)frame;
{
    self = [super initWithFrame:frame];
    return self;
}

- (id) initWithCoder:(NSCoder *)coder {
    self = [super initWithCoder:coder];
    return self;
}

- (void) setConfiguration:(NSString *)zoneId withBannerWidth:(NSInteger)bannerWidth withBannerHeight:(NSInteger)bannerHeight withClickThrough:(NSString *)clickThrough withSizes:(NSArray *)sizes withAutoRefresh:(NSInteger)autoRefresh {
    
    CGSize adSize = CGSizeMake(bannerWidth, bannerHeight);
    CGRect bannerFrame = CGRectMake(0, 0, bannerWidth, bannerHeight);
    adView = [[AMBannerAdView alloc] initWithFrame:bannerFrame placementId:zoneId adSize:adSize];
    adView.delegate = self;
    
    [adView loadAd];
    [self addSubview:adView];
}

- (void) adDidReceiveAd:(id)ad {
    self.onAdLoaded(@{@"a":@"b"});
}

@end
