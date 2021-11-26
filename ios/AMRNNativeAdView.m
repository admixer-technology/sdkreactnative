//
//  AMRNNativeAdView.m
//  Admixer
//
//  Created by Ivan Ganzha on 15.11.2021.
//  Copyright © 2021 Facebook. All rights reserved.
//

#import <Foundation/Foundation.h>
#import "AMRNNativeAdView.h"


@implementation AMRNNativeAdView: UIView

RCTBridge* bridge;
AMNativeAdRequest * request;
NSString * zoneId;
NSArray<NSNumber *> * reqAssets;
NSArray<NSNumber *> * optAssets;
NSInteger clickThroughAction;

- (instancetype) initWithBridge:(RCTBridge *)_bridge {
    if(self = [super init]) {
        bridge = _bridge;
    }
    return self;
}

// MARK: Attribute setters

- (void) setZoneId:(NSString*) zoneIdParam
{
    zoneId = zoneIdParam;
    [self setupAdRequest];
}

- (void) setAssets:(NSArray<NSString*>*) assets
{
    NSMutableArray<NSNumber *> * assetsNumber = [[NSMutableArray alloc] init];
    for(id asset in assets) {
        [assetsNumber addObject:[self getAssetByName:asset]];
    }
    reqAssets = assetsNumber;
    [self setupAdRequest];
}

- (void) setOptAssets:(NSArray<NSString*>*) assets
{
    NSMutableArray<NSNumber*>* assetsNumber = [[NSMutableArray alloc] init];
    for(id asset in assets) {
        [assetsNumber addObject:[self getAssetByName:asset]];
    }
    optAssets = assetsNumber;
    [self setupAdRequest];
}

- (void) setClickThrough:(NSString*) clickThrough
{
    if([clickThrough isEqualToString:@"open_sdk_browser"]) {
        clickThroughAction = AMClickThroughActionOpenSDKBrowser;
    } else
        if([clickThrough isEqualToString:@"open_device_browser"]) {
            clickThroughAction = AMClickThroughActionOpenDeviceBrowser;
        } else
            if([clickThrough isEqualToString:@"return_url"]) {
                clickThroughAction = AMClickThroughActionReturnURL;
            }
}

- (NSNumber *) getAssetByName:(NSString *) asset
{
    if([asset isEqualToString:@"image_icon"]) {
        return [NSNumber numberWithInt:AMNativeAdAssetIMAGE_ICON];
    } else
        if([asset isEqualToString:@"image_main"]) {
            return [NSNumber numberWithInt:AMNativeAdAssetIMAGE_MAIN];
        } else
            if([asset isEqualToString:@"title"]) {
                return [NSNumber numberWithInt:AMNativeAdAssetTITLE];
            } else
                if([asset isEqualToString:@"sponsored"]) {
                    return [NSNumber numberWithInt:AMNativeAdAssetSPONSORED];
                } else
                    if([asset isEqualToString:@"rating"]) {
                        return [NSNumber numberWithInt:AMNativeAdAssetRATING];
                    } else
                        if([asset isEqualToString:@"likes"]) {
                            return [NSNumber numberWithInt:AMNativeAdAssetLIKES];
                        } else
                            if([asset isEqualToString:@"downloads"]) {
                                return [NSNumber numberWithInt:AMNativeAdAssetDOWNLOADS];
                            } else
                                if([asset isEqualToString:@"price"]) {
                                    return [NSNumber numberWithInt:AMNativeAdAssetPRICE];
                                } else
                                    if([asset isEqualToString:@"saleprice"]) {
                                        return [NSNumber numberWithInt:AMNativeAdAssetSALEPRICE];
                                    } else
                                        if([asset isEqualToString:@"phone"]) {
                                            return [NSNumber numberWithInt:AMNativeAdAssetPHONE];
                                        } else
                                            if([asset isEqualToString:@"address"]) {
                                                return [NSNumber numberWithInt:AMNativeAdAssetADDRESS];
                                            } else
                                                if([asset isEqualToString:@"description2"]) {
                                                    return [NSNumber numberWithInt:AMNativeAdAssetDESC2];
                                                } else
                                                    if([asset isEqualToString:@"display_url"]) {
                                                        return [NSNumber numberWithInt:AMNativeAdAssetDISPLAYURL];
                                                    } else
                                                        if([asset isEqualToString:@"cta"]) {
                                                            return [NSNumber numberWithInt:AMNativeAdAssetCTA];
                                                        } else
                                                            if([asset isEqualToString:@"description"]) {
                                                                return [NSNumber numberWithInt:AMNativeAdAssetDESCRIPTION];
                                                            }
    return @-1;
}

// MARK: Operation methods

- (void) setupAdRequest {
    request = [AMNativeAdRequest alloc];
    request.placementId = zoneId;
    request.delegate = self;
    request.adType = AMAdTypeNative;
    [request setRequiredAssets:reqAssets];
    [request setOptionalAssets:optAssets];
}

- (void) loadAd {
    [request loadAd];
}

// MARK: AMNativeAdRequestDelegate callbacks

- (void)adRequest:(AMNativeAdRequest *)request didReceive:(AMNativeAdResponse *)response
{
    NSMutableDictionary *dic = [NSMutableDictionary dictionary];
    [dic setValue:response.title forKey:@"headline"];
    [dic setValue:response.body forKey:@"body"];
    [dic setValue:response.callToAction forKey:@"callToAction"];
    [dic setValue:response.sponsoredBy forKey:@"sponsored"];
    [dic setValue:response.mainImageURL.absoluteString forKey:@"imageUrl"];
    [dic setValue:response.iconImageURL.absoluteString forKey:@"iconUrl"];
    
    
    self.onNativeAdLoaded(dic);
    
    NSMutableArray<UIView *> * clickables = [@[] mutableCopy];
    if(self.headlineView != nil) {
        [clickables addObject:self.headlineView];
    }
    if(self.bodyView != nil) {
        [clickables addObject:self.bodyView];
    }
    if(self.callToActionView != nil) {
        [clickables addObject:self.callToActionView];
    }
    if(self.iconView != nil) {
        [clickables addObject:self.iconView];
    }
    if(self.imageView != nil) {
        [clickables addObject:self.imageView];
    }
    if(self.mediaViewView != nil) {
        [clickables addObject:self.mediaViewView];
    }
    if(self.priceView != nil) {
        [clickables addObject:self.priceView];
    }
    if(self.sponsoredView != nil) {
        [clickables addObject:self.sponsoredView];
    }
    
    response.clickThroughAction = clickThroughAction;
    response.delegate = self;
    [response registerViewForTracking:self withRootViewController:[[[[UIApplication sharedApplication] delegate] window] rootViewController] clickableViews:clickables];
}

- (void)adRequest:(AMNativeAdRequest *)request didFailToLoadWithError:(NSError *)error with:(AMAdResponseInfo *)adResponseInfo
{
    NSMutableDictionary *dic = [NSMutableDictionary dictionary];
    [dic setValue:error.description forKey:@"errorCode"];
    self.onNativeAdFailed(dic);
}

// MARK: AMNativeAdDelegate callbacks

- (void) adWasClicked:(id)response
{
    NSMutableDictionary *dic = [NSMutableDictionary dictionary];
    self.onNativeAdClicked(dic);
}

- (void) adWasClicked:(id)response withURL:(NSString *)clickURLString fallbackURL:(NSString *)clickFallbackURLString
{
    NSMutableDictionary *dic = [NSMutableDictionary dictionary];
    [dic setValue:clickURLString forKey:@"clickUrl"];
    self.onNativeAdClicked(dic);
}

// MARK: Views setters

- (void) setHeadline:(NSNumber *) headline
{
    dispatch_async(RCTGetUIManagerQueue(), ^{
        [bridge.uiManager addUIBlock:^(RCTUIManager *uiManager, NSDictionary<NSNumber *,UIView *> *viewRegistry) {
            UIView *headlineView = viewRegistry[headline];
            
            if(headlineView != nil) {
                self.headlineView = headlineView;
            }
        }];
    });
}

- (void) setBody:(NSNumber *)body
{
    dispatch_async(RCTGetUIManagerQueue(), ^{
        [bridge.uiManager addUIBlock:^(RCTUIManager *uiManager, NSDictionary<NSNumber *,UIView *> *viewRegistry) {
            UIView *bodyView = viewRegistry[body];
            
            if(bodyView != nil) {
                self.bodyView = bodyView;
            }
        }];
    });
}

- (void) setCallToAction:(NSNumber *)callToAction
{
    dispatch_async(RCTGetUIManagerQueue(), ^{
        [bridge.uiManager addUIBlock:^(RCTUIManager *uiManager, NSDictionary<NSNumber *,UIView *> *viewRegistry) {
            UIView *callToActionView = viewRegistry[callToAction];
            
            if(callToActionView != nil) {
                self.callToActionView = callToActionView;
            }
        }];
    });
}

- (void) setIcon:(NSNumber *)icon
{
    dispatch_async(RCTGetUIManagerQueue(), ^{
        [bridge.uiManager addUIBlock:^(RCTUIManager *uiManager, NSDictionary<NSNumber *,UIView *> *viewRegistry) {
            UIView *iconView = viewRegistry[icon];
            
            if(iconView != nil) {
                self.iconView = iconView;
            }
        }];
    });
}

- (void) setImage:(NSNumber *)image
{
    dispatch_async(RCTGetUIManagerQueue(), ^{
        [bridge.uiManager addUIBlock:^(RCTUIManager *uiManager, NSDictionary<NSNumber *,UIView *> *viewRegistry) {
            UIView *imageView = viewRegistry[image];
            
            if(imageView != nil) {
                self.imageView = imageView;
            }
        }];
    });
}

- (void) setMediaView:(NSNumber *)mediaView
{
    dispatch_async(RCTGetUIManagerQueue(), ^{
        [bridge.uiManager addUIBlock:^(RCTUIManager *uiManager, NSDictionary<NSNumber *,UIView *> *viewRegistry) {
            UIView *mediaViewView = viewRegistry[mediaView];
            
            if(mediaViewView != nil) {
                self.mediaViewView = mediaViewView;
            }
        }];
    });
}

- (void) setPrice:(NSNumber *)price
{
    dispatch_async(RCTGetUIManagerQueue(), ^{
        [bridge.uiManager addUIBlock:^(RCTUIManager *uiManager, NSDictionary<NSNumber *,UIView *> *viewRegistry) {
            UIView *priceView = viewRegistry[price];
            
            if(priceView != nil) {
                self.priceView = priceView;
            }
        }];
    });
}

- (void) setSponsored:(NSNumber *)sponsored
{
    dispatch_async(RCTGetUIManagerQueue(), ^{
        [bridge.uiManager addUIBlock:^(RCTUIManager *uiManager, NSDictionary<NSNumber *,UIView *> *viewRegistry) {
            UIView *sponsoredView = viewRegistry[sponsored];
            
            if(sponsoredView != nil) {
                self.sponsoredView = sponsoredView;
            }
        }];
    });
}

@end
