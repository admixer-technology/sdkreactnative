import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  requireNativeComponent,
  View,
  StyleSheet,
  NativeAppEventEmitter,
  Dimensions,
} from 'react-native';

const BannerPropTypes = {
  config: PropTypes.shape({
    zoneId: PropTypes.string.isRequired,
    bannerWidth: PropTypes.number.isRequired,
    bannerHeight: PropTypes.number.isRequired,
    sizes: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.number)).isRequired,
    clickThrough: PropTypes.oneOf([
      'open_sdk_browser',
      'open_device_browser',
      'return_url',
    ]),
    autoRefreshInterval: PropTypes.number,
    autoRefreshEnabled: PropTypes.bool,
    resizeAdToFitContainer: PropTypes.bool,
    loadMode: PropTypes.oneOf(['automatically', 'when_visible']),
  }).isRequired,
  loadAd: PropTypes.bool,
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
  propTypes: { ...BannerPropTypes },
});

export default class AdmixerBanner extends Component {
  static propTypes = {
    ...BannerPropTypes,
  };

  constructor(props) {
    super(props);
    this.state = {
      style: {
        width: this.props.config.bannerWidth,
        height: props.config.bannerHeight,
      },
      loadAd: false,
    };
    // For Android Start
    this._onResize = this._onResize.bind(this);
    this._onAdLoadFailed = this._onAdLoadFailed.bind(this);
    this._onAdLoaded = this._onAdLoaded.bind(this);
    this._onAdExpanded = this._onAdExpanded.bind(this);
    this._onAdCollapsed = this._onAdCollapsed.bind(this);
    this._onAdClicked = this._onAdClicked.bind(this);
    // For Android End

    // For iOS workaround Start
    this.bannerId = Math.floor(Math.random() * 100000);
    this.props.config.bannerId = this.bannerId;

    onAdLoadedSubscription = NativeAppEventEmitter.addListener(
      'onAdLoadedAMBannerView' + this.bannerId,
      (body) => {
        if (this.props.onAdLoaded) {
          this.props.onAdLoaded();
        }
      }
    );

    onResizeSubscription = NativeAppEventEmitter.addListener(
      'onResizeAMBannerView' + this.bannerId,
      (body) => {
        this.setState({
          ...this.state,
          style: {
            width: body.width,
            height: body.height,
          },
        });
      }
    );

    onAdLoadFailedSubscription = NativeAppEventEmitter.addListener(
      'onAdLoadFailedAMBannerView' + this.bannerId,
      (body) => {
        if (this.props.onAdLoadFailed) {
          this.props.onAdLoadFailed(body.errorCode);
        }
      }
    );

    onAdExpandedSubscription = NativeAppEventEmitter.addListener(
      'onAdExpandedAMBannerView' + this.bannerId,
      (body) => {
        if (this.props.onAdExpanded) {
          this.props.onAdExpanded();
        }
      }
    );

    onAdCollapsedSubscription = NativeAppEventEmitter.addListener(
      'onAdCollapsedAMBannerView' + this.bannerId,
      (body) => {
        if (this.props.onAdCollapsed) {
          this.props.onAdCollapsed();
        }
      }
    );

    onAdClickedSubscription = NativeAppEventEmitter.addListener(
      'onAdClickedAMBannerView' + this.bannerId,
      (body) => {
        if (this.props.onAdClicked) {
          this.props.onAdClicked(body);
        }
      }
    );
    // For iOS workaround end
  }

  // For Android start
  _onResize(event) {
    this.setState({
      ...this.state,
      style: {
        width: event.nativeEvent.width,
        height: event.nativeEvent.height,
      },
    });
  }
  _onAdLoadFailed(event) {
    var errorCode = '';
    if (event && event.nativeEvent && event.nativeEvent.errorCode) {
      errorCode = event.nativeEvent.errorCode;
    }
    if (this.props.onAdLoadFailed) {
      this.props.onAdLoadFailed(errorCode);
    }
  }
  _onAdLoaded() {
    if (this.props.onAdLoaded) {
      this.props.onAdLoaded();
    }
  }
  _onAdExpanded() {
    if (this.props.onAdExpanded) {
      this.props.onAdExpanded();
    }
  }
  _onAdCollapsed() {
    if (this.props.onAdCollapsed) {
      this.props.onAdCollapsed();
    }
  }
  _onAdClicked(event) {
    if (this.props.onAdClicked) {
      this.props.onAdClicked(event);
    }
  }
  // For Android end

  componentDidMount() {
    if (this.props?.config?.loadMode === 'when_visible') {
      this.startWatchingVisibility();
    }
  }

  componentWillUnmount() {
    this.stopWatchingVisibility();
  }

  startWatchingVisibility() {
    if (this.interval) {
      return;
    }
    this.interval = setInterval(() => {
      if (!this.viewRef) {
        return;
      }
      this.viewRef.measure((x, y, width, height, pageX, pageY) => {
        const isVisible = this.isInViewPort(
          pageY,
          pageY + height,
          pageX + width
        );
        if (isVisible === true && this.state.loadAd === false) {
          this.setState({
            ...this.state,
            loadAd: true,
          });
        }
      });
    }, 300);
  }

  stopWatchingVisibility() {
    this.interval = clearInterval(this.interval);
  }

  isInViewPort(rectTop, rectBottom, rectWidth) {
    const window = Dimensions.get('window');
    return (
      ((rectTop > 0 && rectTop < window.height) ||
        (rectBottom > 0 && rectBottom < window.height)) &&
      rectWidth > 0 &&
      rectWidth <= window.width
    );
  }

  render() {
    return (
      <View
        collapsable={false}
        ref={(component) => {
          this.viewRef = component;
        }}
      >
        <Banner
          style={StyleSheet.create(this.state.style)}
          config={{ ...this.props.config, bannerId: this.bannerId }}
          loadAd={this.state.loadAd}
          onResize={this._onResize}
          onAdLoadFailed={this._onAdLoadFailed}
          onAdLoaded={this._onAdLoaded}
          onAdExpanded={this._onAdExpanded}
          onAdCollapsed={this._onAdCollapsed}
          onAdClicked={this._onAdClicked}
        />
      </View>
    );
  }

  // For iOS workaround start
  componentWillUnmount() {
    onAdLoadedSubscription.remove();
    onResizeSubscription.remove();
    onAdLoadFailedSubscription.remove();
    onAdExpandedSubscription.remove();
    onAdCollapsedSubscription.remove();
    onAdClickedSubscription.remove();
  }
  // For iOS workaround end
}
