#import <Foundation/Foundation.h>
#import <React/RCTViewManager.h>
#import "AMRNBannerAdView.h"
#import "AMRNBannerAdViewDelegate.h"
#import "RCTBridge.h"

@interface AMRNViewManager : RCTViewManager

@property (nonatomic, copy) RCTBubblingEventBlock onAdLoadFailed;
@property (nonatomic, copy) RCTBubblingEventBlock onAdExpanded;
@property (nonatomic, copy) RCTBubblingEventBlock onAdCollapsed;
@property (nonatomic, copy) RCTBubblingEventBlock onAdClicked;

@end

@implementation AMRNViewManager

NSInteger containerWidth;
NSInteger containerHeight;
NSMutableArray* bannerDelegates;

RCT_EXPORT_MODULE(AdmixerBannerManager)

RCT_CUSTOM_VIEW_PROPERTY(config, NSDictionary, AMBannerAdView) {
    
    NSString* zoneId = [json objectForKey:@"zoneId"];
    NSInteger bannerWidth = [[json valueForKey:@"bannerWidth"] integerValue];
    NSInteger bannerHeight = [[json valueForKey:@"bannerHeight"] integerValue];
    NSArray* sizes = [json objectForKey:@"sizes"];
    NSString* clickThrough = [json objectForKey:@"clickThrough"];
    NSInteger autoRefresh = [[json valueForKey:@"autoRefreshInterval"] integerValue];
    bool autoRefreshEnabled = [[json valueForKey:@"autoRefreshEnabled"] boolValue];
    bool resizeAdToFitContainer = [[json valueForKey:@"resizeAdToFitContainer"] boolValue];
    NSInteger bannerId = [[json objectForKey:@"bannerId"] integerValue];
    
    containerWidth = bannerWidth;
    containerHeight = bannerHeight;
    CGSize adSize = CGSizeMake(bannerWidth, bannerHeight);
    CGRect bannerFrame = CGRectMake(0, 0, bannerWidth, bannerHeight);
    view.placementId = zoneId;
    view.adSize = adSize;
    AMRNBannerAdViewDelegate * adViewDelegate = [[AMRNBannerAdViewDelegate alloc] initWithBridge:self.bridge width:containerWidth height:containerHeight id:bannerId];
    if(!bannerDelegates) {
        bannerDelegates = [[NSMutableArray alloc] init];
    }
    [bannerDelegates addObject:adViewDelegate];
    view.delegate = adViewDelegate;
    
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

- (UIView *) view
{
    CGRect frame = CGRectMake(0, 0, 300, 250);
    AMBannerAdView* banner = [[AMBannerAdView alloc] initWithFrame:frame placementId:@""];
    return banner;
}


@end
