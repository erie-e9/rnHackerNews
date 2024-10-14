import { StyleProp, ViewStyle } from 'react-native';
import { AnimatedStyle } from 'react-native-reanimated';

export interface ScreenBackgroundProps {
    testID: string;
    colors?: string[];
    children: React.ReactElement;
    style?: StyleProp<AnimatedStyle<StyleProp<ViewStyle | any>>>;
    dimensions: object;
    isScreen?: boolean;
}