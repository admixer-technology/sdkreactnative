#import <Foundation/Foundation.h>
#import <React/RCTViewManager.h>
#import "AMRNBannerAdView.h"
#import "RCTBridge.h"

@interface AMRNViewManager : RCTViewManager<AMBannerAdViewDelegate>

@property (nonatomic, copy) RCTBubblingEventBlock onAdLoadFailed;
@property (nonatomic, copy) RCTBubblingEventBlock onAdExpanded;
@property (nonatomic, copy) RCTBubblingEventBlock onAdCollapsed;
@property (nonatomic, copy) RCTBubblingEventBlock onAdClicked;

@end

@implementation AMRNViewManager

RCT_EXPORT_MODULE(AdmixerBannerManager)

RCT_CUSTOM_VIEW_PROPERTY(config, NSDictionary, AMBannerAdView) {
    NSLog(@"MyCustomLog set config");
    
    NSString* zoneId = [json objectForKey:@"zoneId"];
    NSInteger bannerWidth = [[json valueForKey:@"bannerWidth"] integerValue];
    NSInteger bannerHeight = [[json valueForKey:@"bannerHeight"] integerValue];
    NSArray* sizes = [json objectForKey:@"sizes"];
    NSString* clickThrough = [json objectForKey:@"clickThrough"];
    NSInteger autoRefresh = [[json valueForKey:@"autoRefreshInterval"] integerValue];
    bool autoRefreshEnabled = [[json valueForKey:@"autoRefreshEnabled"] boolValue];
    bool resizeAdToFitContainer = [[json valueForKey:@"resizeAdToFitContainer"] boolValue];
    
    containerWidth = bannerWidth;
    containerHeight = bannerHeight;
    CGSize adSize = CGSizeMake(bannerWidth, bannerHeight);
    CGRect bannerFrame = CGRectMake(0, 0, bannerWidth, bannerHeight);
    view.placementId = zoneId;
    view.adSize = adSize;
    view.delegate = self;
    
    if(sizes.count > 0) {
        NSMutableArray* adSizes = [NSMutableArray arrayWithCapacity:sizes.count];
        
        for(id object in sizes) {
            float width = [object[0] floatValue];
            float height = [object[1] floatValue];
            CGSize size = CGSizeMake(width, height);
            NSValue* adSize = [NSValue valueWithCGSize:size];
            
            
            [adSizes addObject:adSize];
        }
        view.adSizes = adSizes;
    }
    
    if(clickThrough != nil) {
        if([clickThrough isEqualToString:@"open_sdk_browser"]) {
            view.clickThroughAction = AMClickThroughActionOpenSDKBrowser;
        } else
            if([clickThrough isEqualToString:@"open_device_browser"]) {
                view.clickThroughAction = AMClickThroughActionOpenDeviceBrowser;
            } else
                if([clickThrough isEqualToString:@"return_url"]) {
                    view.clickThroughAction = AMClickThroughActionReturnURL;
                }
    }
    
    if(autoRefresh > 1000) {
        autoRefresh = autoRefresh / 1000;
    }
    view.autoRefreshInterval = autoRefresh;
    
    if(!autoRefreshEnabled) {
        view.autoRefreshInterval = 0;
    }
    
    if(resizeAdToFitContainer) {
        view.shouldResizeAdToFitContainer = true;
    } else {
        view.shouldResizeAdToFitContainer = false;
    }
    
    [view loadAd];
}

NSInteger containerWidth;
NSInteger containerHeight;

- (UIView *) view
{
    CGRect frame = CGRectMake(0, 0, 300, 250);
    AMBannerAdView* banner = [[AMBannerAdView alloc] initWithFrame:frame placementId:@""];
    NSLog(@"MyCustomLog create banner");
    return banner;
}

#pragma mark AMBannerAdViewDelegate

- (void) adDidReceiveAd:(id)ad {
    NSLog(@"MyCustomLog adDidReceiveAd");
    [self.bridge.eventDispatcher sendAppEventWithName:@"onAdLoadedAMBannerView" body:@{@"event":ON_AD_LOADED_EVENT}];
    
    [self.bridge.eventDispatcher sendAppEventWithName:@"onResizeAMBannerView" body:@{@"width":@(containerWidth),@"height":@(containerHeight)}];
}

- (void) ad:(id)ad requestFailedWithError:(NSError *)error {
    [self.bridge.eventDispatcher sendAppEventWithName:@"onAdLoadFailedAMBannerView" body:@{@"event":ON_AD_LOAD_FAILED_EVENT,@"msg":error.localizedDescription}];
}

- (void) adDidPresent:(id)ad {
    [self.bridge.eventDispatcher sendAppEventWithName:@"onAdExpandedAMBannerView" body:@{@"event":ON_AD_EXPANDED_EVENT}];
}

- (void) adDidClose:(id)ad {
    [self.bridge.eventDispatcher sendAppEventWithName:@"onAdCollapsedAMBannerView" body:@{@"event":ON_AD_COLLAPSED_EVENT}];
}

- (void) adWasClicked:(id)ad {
    [self.bridge.eventDispatcher sendAppEventWithName:@"onAdClickedAMBannerView" body:@{@"event":ON_AD_CLICKED_EVENT}];
}

- (void) adWasClicked:(AMAdView *)ad withURL:(NSString *)urlString {
    [self.bridge.eventDispatcher sendAppEventWithName:@"onAdClickedAMBannerView" body:@{@"event":ON_AD_CLICKED_EVENT,@"clickUrl":urlString}];
}


@end
