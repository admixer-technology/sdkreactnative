import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {requireNativeComponent, View, StyleSheet} from 'react-native';

const BannerPropTypes = {
  config: PropTypes.shape({
    zoneId: PropTypes.string.isRequired,
    sizes: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.number)).isRequired,
    clickThrough: PropTypes.oneOf(["open_sdk_browser", "open_device_browser", "return_url"]),
    autoRefresh: PropTypes.number
  }).isRequired,
  onAdRequestFailed: PropTypes.func,
  onAdLoaded: PropTypes.func,
  onAdExpanded: PropTypes.func,
  onAdCollapsed: PropTypes.func,
  onAdClicked: PropTypes.func,
  ...View.propTypes,
};

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
    this._onResize = this._onResize.bind(this);
    this._onAdRequestFailed = this._onAdRequestFailed.bind(this);
    this._onAdLoaded = this._onAdLoaded.bind(this);
    this._onAdExpanded = this._onAdExpanded.bind(this);
    this._onAdCollapsed = this._onAdCollapsed.bind(this);
    this._onAdClicked = this._onAdClicked.bind(this);
  }
  _onResize(event) {
    this.setState({
      ...this.state,
      style: {
        width: event.nativeEvent.width,
        height: event.nativeEvent.height,
      },
    });
  }
  _onAdRequestFailed(event) {
    const errorCode = event.nativeEvent.errorCode;
    if (this.props.onAdRequestFailed) {
      this.props.onAdRequestFailed(errorCode);
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
    const clickUrl = event.nativeEvent.clickUrl;
    if (this.props.onAdClicked) {
      this.props.onAdClicked(clickUrl);
    }
  }
  render() {
    return (
      <View>
        <Banner
          style={StyleSheet.create(this.state.style)}
          config={this.props.config}
          onResize={this._onResize}
          onAdRequestFailed={this._onAdRequestFailed}
          onAdLoaded={this._onAdLoaded}
          onAdExpanded={this._onAdExpanded}
          onAdCollapsed={this._onAdCollapsed}
          onAdClicked={this._onAdClicked}
        />
      </View>
    );
  }
}
