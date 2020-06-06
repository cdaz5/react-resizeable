import * as React from 'react';

import { Parent } from './styles';
import { debounce } from './debounce';
import { median } from './median';

const Resizeable: React.FC<ReactResizeable.ParentProps> = ({
  children,
  as = 'div',
  flexDirection = 'row',
  height = '100%',
}) => {
  const parent = React.useRef<HTMLElement>(null);
  const minWidth = React.useRef(0);
  const medianRootWidth = React.useRef(0);
  const totalMinWidths = React.useRef(0);

  React.useEffect(() => {
    if (!parent.current) return;

    const widths = Array.from(parent.current.children).map(c =>
      Number(
        getComputedStyle(c)
          .getPropertyValue('min-width')
          .replace('px', '')
      )
    );

    minWidth.current = Math.min(...widths);

    totalMinWidths.current = widths.reduce((acc, val) => val + acc, 0);

    medianRootWidth.current = Math.ceil(Math.sqrt(median(widths)));
  }, [parent]);

  const onResize = React.useCallback(
    ({ totalMin }: { totalMin?: number } = {}) => {
      if (!parent.current) return;

      const minToMeasure = totalMin ?? totalMinWidths.current;

      if (minToMeasure > window.innerWidth) {
        parent.current.style.flexWrap = 'wrap';
      } else {
        parent.current.style.flexWrap = '';
      }
    },
    [parent, totalMinWidths.current]
  );

  React.useEffect(() => {
    const resizeableChildren = React.Children.map(children, (child, idx) => {
      if (!React.isValidElement(child)) return child;

      return child.props?.resize?.resizeable
        ? document.getElementById(`resizeable-${idx}`)
        : null;
    })?.filter(child => Boolean(child));

    const config = {
      attributes: true,
      attributeFilter: ['style'],
      attributeOldValue: true,
    };

    const callback: MutationCallback = mutationsList => {
      // Use traditional 'for loops' for IE 11
      for (let mutation of mutationsList) {
        if (mutation.type !== 'attributes') return;

        if (mutation.target instanceof HTMLElement) {
          const newTotalMin =
            totalMinWidths.current -
            minWidth.current +
            mutation.target.offsetWidth +
            medianRootWidth.current;

          if (newTotalMin >= window.innerWidth) {
            onResize({
              totalMin: newTotalMin,
            });
          }
        }
      }
    };
    const observer = new MutationObserver(callback);

    resizeableChildren?.forEach((el: any) => {
      observer.observe(el, config);
    });
    return () => {
      observer.disconnect();
    };
  });

  React.useEffect(() => {
    // on initial mount ensure proper flex layout
    onResize();
  }, [onResize]);

  React.useEffect(() => {
    // @ts-ignore it complains we're not typing the event but we don't care about it
    window.addEventListener('resize', debounce(onResize, 200));

    return () => {
      // @ts-ignore it complains we're not typing the event but we don't care about it
      window.removeEventListener('resize', onResize);
    };
  }, [onResize]);

  return (
    <Parent as={as} ref={parent} flexDirection={flexDirection} height={height}>
      {React.Children.map(children, (child, idx) => {
        if (!React.isValidElement(child)) return child;

        return React.cloneElement(child, {
          ...child.props,
          id: `resizeable-${idx}`,
        });
      })}
    </Parent>
  );
};

export default Resizeable;
