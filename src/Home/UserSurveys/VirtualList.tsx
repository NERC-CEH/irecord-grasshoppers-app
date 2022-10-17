import { FC, useEffect, useState, useRef, forwardRef } from 'react';
import { VariableSizeList as List } from 'react-window';
import { useIonViewDidEnter } from '@ionic/react';

// eslint-disable-next-line react/no-unstable-nested-components
const VirtualList: FC<any> = ({
  itemSize,
  Item,
  topPadding = 0,
  bottomPadding = 0,
  ...props
}) => {
  const contentRef = useRef<any>();
  const listRef = useRef<any>();
  const [listHeight, setListHeight] = useState<number>(1); // some positive number

  const setCurrentContentHeight = () => {
    if (listHeight <= 1 && contentRef?.current?.clientHeight) {
      setListHeight(contentRef.current.clientHeight);
    }
  };
  useIonViewDidEnter(setCurrentContentHeight); // before mounting the first time list has no height
  useEffect(setCurrentContentHeight, [contentRef.current]);

  // eslint-disable-next-line react/no-unstable-nested-components
  const ItemWithPadding = ({ style, ...itemProps }: any) => (
    <Item
      style={{ ...style, top: style.top + topPadding, height: 'auto' }}
      {...itemProps}
    />
  );

  const divPadding = ({ style, ...rest }: any, ref: any) => (
    <div
      ref={ref}
      style={{
        ...style,
        height: `${parseFloat(style.height) + topPadding + bottomPadding}px`,
      }}
      {...rest}
    />
  );

  // Add bottom padding
  const innerElementType = forwardRef(divPadding);

  const resetIfItemsChange = () => {
    if (listRef?.current) {
      listRef.current.resetAfterIndex(0);
    }
  };
  useEffect(resetIfItemsChange, [itemSize]);

  return (
    <div style={{ height: '100%' }} ref={contentRef}>
      <List
        ref={listRef}
        height={listHeight}
        itemSize={itemSize}
        innerElementType={bottomPadding ? innerElementType : undefined}
        width="100%"
        {...props}
      >
        {ItemWithPadding}
      </List>
    </div>
  );
};

export default VirtualList;
