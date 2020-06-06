declare var ReactResizeable: ReactResizeable.ReactResizeable;

declare namespace ReactResizeable {
  interface ReactResizeable {}

  type As = keyof JSX.IntrinsicElements | React.ComponentType<any>;

  type ResizeDirection =
    | 'none'
    | 'both'
    | 'horizontal'
    | 'vertical'
    | 'initial'
    | 'inherit';

  interface ChildProps {
    resize: {
      width: string;
      resizeDir?: ResizeDirection;
      resizeable?: boolean;
      minWidth?: string;
      height?: string;
      minHeight?: string;
      as?: As;
    };
  }

  interface ParentProps {
    flexDirection?: 'row' | 'column';
    height?: string;
    as?: As;
  }
}
