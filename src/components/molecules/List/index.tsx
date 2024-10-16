import React, {
  Fragment,
  memo,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import {FlatList, useWindowDimensions} from 'react-native';
import Animated, {
  Easing,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import LottieView from 'lottie-react-native';
import {Logger, useCopy} from '@services';
import {screen_height} from '@utils/functions';
import {useResponseHandler} from '@hooks';
import {AnimatedListItem} from './components/AnimatedListItem';
import {NullableNumber} from './components/types';
import {BackButton, ListItem, Loader} from '@components/molecules';
import {
  ListContainer,
  StyledList,
  LoaderContainer,
  ScrollToTopContainer,
  ScrollToTopButtonContainer,
} from './styles';

interface ListProps {
  data: Array<any>;
  estimatedItemSize?: number;
  horizontal?: boolean;
  numColumns?: number;
  showsHorizontalScrollIndicator?: boolean;
  showsVerticalScrollIndicator?: boolean;
  scrollEnabled?: boolean;
  alignItems?: 'flex-start' | 'center' | 'flex-end';
  draggable?: boolean;
  renderItem?: ({item}: any) => JSX.Element;
  refreshHandler?: () => void;
  itemHeight?: number;
  footerComponent?: React.ReactElement;
  containerStyle?: any;
  filterBy?: string | string[];
}

export const List: React.FC<ListProps> = ({
  data,
  estimatedItemSize = 50,
  horizontal = false,
  numColumns = 1,
  showsHorizontalScrollIndicator = false,
  showsVerticalScrollIndicator = false,
  scrollEnabled = true,
  alignItems = 'center',
  draggable = false,
  renderItem,
  refreshHandler,
  itemHeight = 60,
  footerComponent,
  containerStyle,
  filterBy,
}) => {
  const {getCopyValue} = useCopy();
  const ref = useRef<FlatList>(null);
  const animationRef = useRef<LottieView>(null);
  const [offsetY, setOffsetY] = useState<number>(0);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [showScrollToButton, setShowScrollToButton] = useState<boolean>(false);
  const extraPaddingTop = useSharedValue(0);
  const {width: windowWidth} = useWindowDimensions();
  const {loading, setLoading} = useResponseHandler();

  const items = useMemo(() => data, [data]);
  const [filteredUsers, setFilteredUsers] = useState<Array<any>>(items);
  const contentContainerStyle: object = useMemo(() => {
    return {
      height: items.length * (itemHeight * (filterBy ? 1.05 : 1.025)),
    };
  }, [items.length, itemHeight, filteredUsers]);

  const calcNumColumns = useCallback(() => {
    const swidth = windowWidth / numColumns - 1;
    const smargin = 1;
    const cols = windowWidth / swidth;
    const colsFloor =
      Math.floor(cols) > numColumns ? Math.floor(cols) : numColumns;
    const colsMinusMargin = cols - 2 * colsFloor * smargin;
    return colsMinusMargin < colsFloor && colsFloor > numColumns
      ? colsFloor - 1
      : colsFloor;
  }, [windowWidth, numColumns]);

  const isDragging = useSharedValue<0 | 1>(0);
  const draggedItemId = useSharedValue<NullableNumber>(null);
  const getInitialPositions = () => {
    let positions: any = {};
    for (let i = 0; i < items.length; i++) {
      positions[i] = {
        updatedIndex: i,
        updatedTop: i * itemHeight,
      };
    }
    return positions;
  };

  const currentPositions = useSharedValue(getInitialPositions());

  const [numberColumns, setNumColumns] = useState<number>(calcNumColumns());

  const renderItemHandler = useCallback(
    ({item, index}: {item: any; index: number}): React.JSX.Element | null => {
      return draggable ? (
        <AnimatedListItem
          item={item}
          key={item.id}
          isDragging={isDragging}
          draggedItemId={draggedItemId}
          currentPositions={currentPositions}
          itemsLength={filteredUsers.length}
          itemHeight={itemHeight}>
          {renderItem && renderItem({item, index})}
        </AnimatedListItem>
      ) : renderItem ? (
        <Fragment>{renderItem({item, index})}</Fragment>
      ) : (
        <ListItem title={item.username} subtitle={item.post_title} />
      );
    },
    [items, filteredUsers, itemHeight, draggable, renderItem],
  );

  useEffect(() => {
    setNumColumns(calcNumColumns());
  }, [windowWidth, calcNumColumns]);

  const onRefresh = useCallback(() => {
    try {
      refreshHandler?.();
    } catch (error) {
      Logger.log('List onRefresh', {error});
    } finally {
      setTimeout(() => {
        setLoading(false);
      }, 3000);
    }
  }, [loading]);

  useEffect(() => {
    if (loading && refreshHandler) {
      animationRef.current?.play();
      if (offsetY <= -80) {
        extraPaddingTop.value = withTiming(50, {duration: 0});
        onRefresh();
      }
    } else {
      extraPaddingTop.value = withTiming(0, {
        duration: 400,
        easing: Easing.elastic(0.7),
      });
    }
  }, [loading, extraPaddingTop, refreshHandler, offsetY]);

  useEffect(() => {
    let updatedItems = items;
    if (searchQuery) {
      updatedItems = items.filter(item =>
        (Array.isArray(filterBy) ? filterBy : [filterBy || 'id']).some(key =>
          item[key]?.toLowerCase().includes(searchQuery.toLowerCase()),
        ),
      );
    }
    setFilteredUsers(updatedItems);
  }, [searchQuery, items]);

  let progress = 0;
  if (offsetY < 0 && !loading) {
    progress = offsetY / -50;
  }

  const scrollTo = useCallback(() => {
    ref?.current?.scrollToOffset({
      animated: true,
      offset: 0,
    });
  }, []);

  return (
    <Fragment>
      {/*
        {draggable ? (
          <>
            <Animated.ScrollView
              contentContainerStyle={{ height: items.length * itemHeight }}
            >
              {items.map((item, index) => (
                <AnimatedListItem
                  item={item}
                  key={item.id}
                  isDragging={isDragging}
                  draggedItemId={draggedItemId}
                  currentPositions={currentPositions}
                  itemsLength={items.length}
                  itemHeight={itemHeight}
                >
                  {renderItem && renderItem({ item, index })}
                </AnimatedListItem>
              ))}
            </Animated.ScrollView>
          </>
        ) : ( */}
      <ListContainer>
        <StyledList
          ref={ref}
          data={filteredUsers || items}
          keyExtractor={(_item, index) => `key${index}`}
          onEndReachedThreshold={0.1}
          contentContainerStyle={
            containerStyle
              ? containerStyle
              : (draggable || refreshHandler) && contentContainerStyle
          }
          numColumns={horizontal ? 1 : numberColumns}
          scrollEnabled={scrollEnabled}
          onScroll={({nativeEvent}) => {
            refreshHandler && setOffsetY(nativeEvent.contentOffset.y);
            setShowScrollToButton(
              nativeEvent.contentOffset.y > screen_height / 4,
            );
          }}
          onResponderRelease={() => {
            if (offsetY <= -80 && !loading) setLoading(true);
          }}
          ListHeaderComponent={
            <Animated.View style={{paddingTop: extraPaddingTop}}>
              {filteredUsers.length > 0 && loading && refreshHandler && (
                <LoaderContainer height={extraPaddingTop.value}>
                  <Loader
                    animationRef={animationRef}
                    width={180}
                    height={extraPaddingTop.value}
                    progress={progress}
                  />
                </LoaderContainer>
              )}
            </Animated.View>
          }
          refreshing={loading}
          // onRefresh={
          //   refreshHandler
          //     ? () => {
          //         setLoading(true);
          //         setTimeout(() => {
          //           refreshHandler?.();
          //           setLoading(false);
          //         }, 2000);
          //       }
          //     : undefined
          // }
          renderItem={renderItemHandler}
          showsHorizontalScrollIndicator={showsHorizontalScrollIndicator}
          showsVerticalScrollIndicator={showsVerticalScrollIndicator}
          horizontal={horizontal}
          keyboardDismissMode="interactive"
          ListFooterComponent={footerComponent || null}
          // estimatedItemSize={estimatedItemSize || itemHeight * items.length}
          // getItemType={(item: any) => (item.type ? item.type : 'Text')}
          // renderItem={({ item }) => renderItem && renderItem({ item })}
          // onLoad={onLoadListener}
          // onBlankArea={onBlankArea}
        />
      </ListContainer>
      {showScrollToButton && (
        <ScrollToTopContainer>
          <ScrollToTopButtonContainer>
            <BackButton onPress={() => scrollTo()} colorRowInverted />
          </ScrollToTopButtonContainer>
        </ScrollToTopContainer>
      )}
    </Fragment>
  );
};

export default memo(List);
