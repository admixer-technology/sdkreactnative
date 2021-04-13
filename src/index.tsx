import { requireNativeComponent, ViewStyle } from 'react-native';

type AdmixerProps = {
  color: string;
  style: ViewStyle;
};

export const AdmixerViewManager = requireNativeComponent<AdmixerProps>(
'AdmixerView'
);

export default AdmixerViewManager;
