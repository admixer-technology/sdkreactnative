import { NativeModules } from "react-native";

const { RNNativeAdRequest }  = NativeModules;

export default class AdmixerNativeAdReqeust {
    
    zoneId;

    constructor(zoneId) {
        this.zoneId = zoneId;

        RNNativeAdRequest.init(zoneId);
    }

    loadAd() {
        RNNativeAdRequest.loadAd();
    }

}