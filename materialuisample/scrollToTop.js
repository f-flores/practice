// =======================================================================
//
// Scrolls to top of page
// Description: Automatically scrolls to top of page when switching
//   between components. Should be placed right under <Router> and
//   closing tag just before </Router>. 
//
// =======================================================================

import {Component} from "react"
import {withRouter} from "react-router-dom";


class ScrollToTop extends Component {
  componentDidUpdate(prevProps) {
    // on a change of location, scroll to top of page
    if (this.props.location !== prevProps.location) {
      window.scrollTo(0, 0);
      document.body.scrollTop = 0;
    }
  }

  // do this for all routes within Scroll to Top
  render() {
    return this.props.children;
  }

}

export default withRouter(ScrollToTop);