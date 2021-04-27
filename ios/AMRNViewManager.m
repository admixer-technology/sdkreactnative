#import <Foundation/Foundation.h>
#import <React/RCTViewManager.h>
#import "AMRNBannerAdView.h"

@interface AMRNViewManager : RCTViewManager
@end

@implementation AMRNViewManager

RCT_EXPORT_MODULE(AdmixerBannerManager)

RCT_CUSTOM_VIEW_PROPERTY(config, NSDictionary, AMRNBannerAdView) {
    NSString* zoneId = [json objectForKey:@"zoneId"];
    NSInteger bannerWidth = [[json valueForKey:@"bannerWidth"] integerValue];
    NSInteger bannerHeight = [[json valueForKey:@"bannerHeight"] integerValue];
    NSArray* sizes = [json objectForKey:@"sizes"];
    NSString* clickThrough = [json objectForKey:@"clickThrough"];
    NSInteger autoRefresh = [[json valueForKey:@"autoRefreshInterval"] integerValue];
    bool autoRefreshEnabled = [[json valueForKey:@"autoRefreshEnabled"] boolValue];
    bool resizeAdToFitContainer = [[json valueForKey:@"resizeAdToFitContainer"] boolValue];
    
    [view setConfiguration:zoneId withBannerWidth:bannerWidth withBannerHeight:bannerHeight withClickThrough:clickThrough withSizes:sizes withAutoRefresh:autoRefresh withAutoRefreshEnabled:autoRefreshEnabled withResizeAdToFitContainer:resizeAdToFitContainer];
}

RCT_EXPORT_VIEW_PROPERTY(onAdLoaded, RCTBubblingEventBlock)
RCT_EXPORT_VIEW_PROPERTY(onAdLoadFailed, RCTBubblingEventBlock)
RCT_EXPORT_VIEW_PROPERTY(onAdExpanded, RCTBubblingEventBlock)
RCT_EXPORT_VIEW_PROPERTY(onAdCollapsed, RCTBubblingEventBlock)
RCT_EXPORT_VIEW_PROPERTY(onAdClicked, RCTBubblingEventBlock)
RCT_EXPORT_VIEW_PROPERTY(onResize, RCTBubblingEventBlock)

- (UIView *) view
{
    CGRect frame = CGRectMake(0, 0, 300, 250);
    AMRNBannerAdView* banner = [[AMRNBannerAdView alloc] initWithFrame:frame];
    return banner;
}

@end
