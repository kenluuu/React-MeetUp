import React, { Component } from 'react';
import { CSSTransitionGroup } from 'react-transition-group';
import '../../styles/app.css';
const PageShell = (WrappedComponent) => {
  return class PageShell extends Component {
    render() {
      return (
        <div>
          <CSSTransitionGroup
            transitionAppear={true}
            transitionAppearTimeout={500}
            transitionName="SlideIn"
            transitionEnter={false}
            transitionLeave={false}
          >
            <WrappedComponent {...this.props} />
          </CSSTransitionGroup>
        </div>
      )
    }
  }
}

export default PageShell;
