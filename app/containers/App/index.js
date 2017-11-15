/**
 *
 * App.react.js
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 *
 * NOTE: while this component should technically be a stateless functional
 * component (SFC), hot reloading does not currently support SFCs. If hot
 * reloading is not a necessity for you then you can refactor it and remove
 * the linting exception.
 */

import React from 'react';
import Helmet from 'react-helmet';
import Payments from "containers/Payments";
import Footer from 'components/Footer';
import withProgressBar from 'components/ProgressBar';
import '!!style-loader!css-loader!./app.css';

class App extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function

  static propTypes = {
    children: React.PropTypes.node,
  };

  render() {
    return (
      <div>
        <Helmet
          titleTemplate="%s - Mookh | Making Commerce Social"
          defaultTitle="Mookh | Making Commerce Social"
          meta={[
            { name: 'description', content: 'Mookh | Making Commerce Social' },
          ]}
        />
        <div className="main">
          {React.Children.toArray(this.props.children)}
          <Payments />
        </div>
        <Footer />
      </div>
    );
  }
}

export default withProgressBar(App);

