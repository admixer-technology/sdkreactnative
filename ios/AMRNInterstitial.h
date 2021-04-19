//
//  AMRNInterstitial.h
//  Admixer
//
//  Created by Ivan Ganzha on 14.04.2021.
//  Copyright © 2021 Facebook. All rights reserved.
//

#ifndef AMRNInterstitial_h
#define AMRNInterstitial_h

#import <React/RCTBridgeModule.h>
#import <React/RCTEventEmitter.h>
#import <AdmixerSDK/AdmixerSDK.h>
#import "AMRNEvents.h"

@interface AMRNInterstitial : RCTEventEmitter<RCTBridgeModule, AMInterstitialAdDelegate>
@end

#endif /* AMRNInterstitial_h */
