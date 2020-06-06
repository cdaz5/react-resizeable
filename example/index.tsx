import 'react-app-polyfill/ie11';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Resizeable, Child } from '../src';

const Content = () => (
  <>
    <p>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
      tempor incididunt ut labore et dolore magna aliqua. Amet facilisis magna
      etiam tempor orci eu lobortis elementum. Id volutpat lacus laoreet non
      curabitur gravida arcu ac. Quis lectus nulla at volutpat. Non arcu risus
      quis varius quam quisque. Molestie ac feugiat sed lectus vestibulum mattis
      ullamcorper velit sed. Bibendum enim facilisis gravida neque convallis.
      Nisl tincidunt eget nullam non nisi est sit amet facilisis. Vel facilisis
      volutpat est velit egestas dui id ornare arcu. Nec dui nunc mattis enim ut
      tellus elementum sagittis. Integer vitae justo eget magna fermentum
      iaculis eu.
    </p>
    <br />
    <p>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
      tempor incididunt ut labore et dolore magna aliqua. Amet facilisis magna
      etiam tempor orci eu lobortis elementum. Id volutpat lacus laoreet non
      curabitur gravida arcu ac. Quis lectus nulla at volutpat. Non arcu risus
      quis varius quam quisque. Molestie ac feugiat sed lectus vestibulum mattis
      ullamcorper velit sed. Bibendum enim facilisis gravida neque convallis.
      Nisl tincidunt eget nullam non nisi est sit amet facilisis. Vel facilisis
      volutpat est velit egestas dui id ornare arcu. Nec dui nunc mattis enim ut
      tellus elementum sagittis. Integer vitae justo eget magna fermentum
      iaculis eu.
    </p>
  </>
);

const App = () => {
  // you can even pass a ref!!
  const child = React.useRef();

  return (
    <Resizeable height="100vh" as="main">
      <Child
        ref={child}
        resize={{
          as: 'article',
          resizeable: true,
          resizeDir: 'both',
          width: '33%',
          minWidth: '300px',
          minHeight: '400px',
          height: '400px',
        }}
      >
        <Content />
      </Child>
      <Child
        resize={{
          as: 'header',
          resizeable: true,
          resizeDir: 'horizontal',
          width: '33%',
          minWidth: '250px',
          minHeight: '400px',
        }}
      >
        <Content />
      </Child>
      <Child
        resize={{
          width: '33%',
          minWidth: '400px',
        }}
      >
        <Content />
      </Child>
    </Resizeable>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
