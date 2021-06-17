import { NativeModules, NativeEventEmitter } from 'react-native';
const { AdmixerInterstitial } = NativeModules;
const eventEmitter = new NativeEventEmitter(AdmixerInterstitial);

  const AdmixerInterstitialModule = AdmixerInterstitial;

function initInterstitial(zoneId) {
    return AdmixerInterstitialModule.initInterstitial(zoneId);
} 

function loadAd() {
    AdmixerInterstitialModule.loadAd();
}

function showAd() {
    AdmixerInterstitialModule.showAd();
}

function setClickThroughAction(action) {
    AdmixerInterstitialModule.setClickThroughAction(action);
}

function addEventListener(eventName, callback) {
    eventEmitter.addListener(eventName, callback);
}

export default {
    initInterstitial,
    loadAd,
    showAd,
    setClickThroughAction,
    addEventListener
}