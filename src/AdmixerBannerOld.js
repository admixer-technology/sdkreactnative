import { requireNativeComponent, View } from "react-native";
import React from "react";
import PropTypes from 'prop-types';

class AdmixerBanner extends React.Component {

    static propTypes;
    props;

    constructor(props) {
        super(props);
        this.state = {
            style: {width: 0, height: 0}
        };
    }

    _onResize(event) {
        this.setState({
            ...this.state,
            style: {
                width: event.nativeEvent.width,
                height: event.nativeEvent.height,
            }
        });
    }

    _onAdLoaded = (event) => {
        if(!this.props.onAdLoaded) {
            return;
        }

        this.props.onAdLoaded(event.nativeEvent);
    }

    render() {
        return (
            <View>
                <Banner
                {...this.props}
                onAdLoaded={this._onAdLoaded}
                onResize={this._onResize.bind(this)}/>
            </View>
        );
    }
}

AdmixerBanner.propTypes = {
    config: PropTypes.shape({
        zoneId: PropTypes.string.isRequired,
        bannerWidth: PropTypes.number.isRequired,
        bannerHeight: PropTypes.number.isRequired,
        sizes: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.number)).isRequired,
        clickThrough: PropTypes.oneOf(["open_sdk_browser","open_device_browser","return_url"]),
        autoRefresh: PropTypes.number
    }).isRequired,
    onAdLoaded: PropTypes.func,
    onResize: PropTypes.func,
}

// @ts-ignore
const Banner = requireNativeComponent('AdmixerBanner', AdmixerBanner, {});

export default AdmixerBanner;