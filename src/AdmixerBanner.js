import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {requireNativeComponent, View, StyleSheet, NativeAppEventEmitter} from 'react-native';

const BannerPropTypes = {
  config: PropTypes.shape({
    zoneId: PropTypes.string.isRequired,
    bannerWidth: PropTypes.number.isRequired,
    bannerHeight: PropTypes.number.isRequired,
    sizes: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.number)).isRequired,
    clickThrough: PropTypes.oneOf(["open_sdk_browser", "open_device_browser", "return_url"]),
    autoRefreshInterval: PropTypes.number,
    autoRefreshEnabled: PropTypes.bool,
    resizeAdToFitContainer: PropTypes.bool,
  }).isRequired,
  onAdLoadFailed: PropTypes.func,
  onAdLoaded: PropTypes.func,
  onAdExpanded: PropTypes.func,
  onAdCollapsed: PropTypes.func,
  onAdClicked: PropTypes.func,
  ...View.propTypes,
};

var onAdLoadedSubscription;
var onResizeSubscription;
var onAdLoadFailedSubscription;
var onAdExpandedSubscription;
var onAdCollapsedSubscription;
var onAdClickedSubscription;

const Banner = requireNativeComponent('AdmixerBanner', {
  name: 'Banner',
  propTypes: {...BannerPropTypes},
});

export default class AdmixerBanner extends Component {
  static propTypes = {
    ...BannerPropTypes,
  };
  constructor(props) {
    super(props);
    this.state = {
      style: {width: 0, height: 0},
    };

    onAdLoadedSubscription = NativeAppEventEmitter.addListener('onAdLoadedAMBannerView',
      (body) => {
        if(this.props.onAdLoaded) {
          this.props.onAdLoaded();
        }
      });

    onResizeSubscription = NativeAppEventEmitter.addListener('onResizeAMBannerView',
      (body) => {
        this.setState({
          ...this.state,
          style: {
            width: body.width,
            height: body.height,
          }
        });
      }
    );

    onAdLoadFailedSubscription = NativeAppEventEmitter.addListener('onAdLoadFailedAMBannerView',
    (body) => {
      if(this.props.onAdLoadFailed) {
        this.props.onAdLoadFailed(body.errorCode);
      }
    });

    onAdExpandedSubscription = NativeAppEventEmitter.addListener('onAdExpandedAMBannerView',
      (body) => {
        if(this.props.onAdExpanded) {
          this.props.onAdExpanded();
        }
    });

    onAdCollapsedSubscription = NativeAppEventEmitter.addListener('onAdCollapsedAMBannerView',
      (body) => {
        if(this.props.onAdCollapsed) {
          this.props.onAdCollapsed();
        }
      });

    onAdClickedSubscription = NativeAppEventEmitter.addListener('onAdClickedAMBannerView',
      (body) => {
        if(this.props.onAdClicked) {
          this.props.onAdClicked(body);
        }
      });

  }

  render() {
    return (
      <View>
        <Banner
          style={StyleSheet.create(this.state.style)}
          config={this.props.config}
        />
      </View>
    );
  }
  componentWillUnmount(){
    console.log('componentWillUnmount');
    onAdLoadedSubscription.remove();
    onResizeSubscription.remove();
    onAdLoadFailedSubscription.remove();
    onAdExpandedSubscription.remove();
    onAdCollapsedSubscription.remove();
    onAdClickedSubscription.remove();
  }
}
