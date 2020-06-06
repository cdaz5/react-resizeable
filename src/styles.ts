import styled, { css } from 'styled-components';

export const Parent = styled.div<ReactResizeable.ParentProps>`
  position: relative;
  display: flex;
  flex-direction: ${({ flexDirection }) => (flexDirection ? 'row' : 'column')};
  height: ${({ height }) => height ?? 'auto'};
  flex-wrap: initial;
`;

export const StyledChild = styled.div<ReactResizeable.ChildProps['resize']>`
  border: 1px solid red;
  min-height: ${({ minHeight }) => minHeight ?? '100%'};
  height: ${({ height }) => height ?? '100%'};
  overflow: scroll;
  width: ${({ width }) => width};
  min-width: ${({ minWidth }) => minWidth ?? 'min-content'};
  flex-grow: 1;

  ${({ resizeable, resizeDir }) =>
    resizeable &&
    resizeDir &&
    css`
      resize: ${resizeDir};
      overflow: auto;
    `}
`;
