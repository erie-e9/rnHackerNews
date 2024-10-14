import React, {memo, ReactNode} from 'react';
import {TextProps as NativeProps, TextStyle} from 'react-native';
import {useCopy} from '@services';
import {firstCapitalized, startsWithNumber} from '@utils/functions';
import {Text, TextProps} from './styles';

interface TypographyProps extends TextProps, NativeProps {
  children: ReactNode | ReactNode[];
}

const extractText = (
  node: ReactNode,
  getCopyValue: (key: string) => string,
): {text: string; props?: TextStyle & {onPress?: () => void}} => {
  if (typeof node === 'string' && !startsWithNumber(node)) {
    return {text: getCopyValue(node)};
  }

  if (typeof node === 'object' && node !== null) {
    const {children, ...restProps} = (node as any).props;

    if (children === ' ') {
      return {text: ' '};
    }

    const extractedText =
      typeof children === 'string' ? getCopyValue(children) : children;

    return {
      text: extractedText,
      props: restProps,
    };
  }

  return {text: String(node || '')};
};

const Typography: React.FC<TypographyProps> = ({children, ...restProps}) => {
  const {getCopyValue} = useCopy();

  const renderChildren = (childNodes: ReactNode | ReactNode[]) => {
    if (Array.isArray(childNodes)) {
      return childNodes.map((child, index) => {
        const {text, props} = extractText(child, getCopyValue);
        return (
          <Text {...restProps} {...props} key={index}>
            {restProps.firstCapitalized ? firstCapitalized(text) : text}
          </Text>
        );
      });
    }

    const {text, props} = extractText(childNodes, getCopyValue);
    return (
      <Text {...restProps} {...props}>
        {restProps.firstCapitalized ? firstCapitalized(text) : text}
      </Text>
    );
  };

  return <Text {...restProps}>{renderChildren(children)}</Text>;
};

export default memo(Typography);
