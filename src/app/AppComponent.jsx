import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import posed, { PoseGroup } from 'react-pose'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import styled from 'styled-components'
import config from './App.config.js'

/**
 * * Routes
 */
import Home from './home/HomeContainer'
import About from './about/AboutComponent'
import FourOhFour from './common/FourOhFour'

/**
 * * App Components
 */
import CursorContainer from './cursor/CursorContainer'
import NavContainer from './nav/NavContainer'
import { ErrorScreenSize } from './common/Error'

const TransitionController = posed.div({
  mount: {
    progress: 0
  },
  enter: {
    progress       : 1,
    delay          : config.pageTransitionTime,
    beforeChildren : true,
    transition     : { duration: config.pageTransitionTime * 1.3 }
  },
  exit: {
    progress   : 2,
    transition : { duration: config.pageTransitionTime }
  }
})

const backgroundProps = {
  themeLight: {
    backgroundColor : config.colors.offWhite,
    delay           : config.pageTransitionTime,
    transition      : { duration: config.pageTransitionTime }
  },
  themeDark: {
    backgroundColor : config.colors.black,
    transition      : { duration: config.pageTransitionTime }
  }
}

const Background = styled(posed.div(backgroundProps))`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: -1;
`

const preventDefault = e => {
  e = e || window.event
  if (e.preventDefault) e.preventDefault()
  e.returnValue = false
}

class AppComponent extends PureComponent {
  componentDidMount () {
    // Disable scroll for application.
    if (window.addEventListener) {
      // older FF
      window.addEventListener('DOMMouseScroll', preventDefault, false)
    }
    window.onwheel = preventDefault // modern standard
    window.onmousewheel = document.onmousewheel = preventDefault // older browsers, IE
  }

  mouseMove = ({ target }) => {
    if (target.classList.contains('no-cursor') && !this.props.noCursor) {
      this.props.toggleCursor()
    }
    if (!target.classList.contains('no-cursor') && this.props.noCursor) {
      this.props.toggleCursor()
    }
  }

  render () {
    const {
      theme,
      startExitTransition,
      startEnterTransition,
      endTransition,
      stickyIndex,
      isExitTransition
    } = this.props
    return (
      <Router>
        <div
          onMouseMove={this.mouseMove}
          className={
            `app ${theme === 'light' ? 'theme--light ' : 'theme--dark '}` +
            (stickyIndex >= 0 && !isExitTransition ? 'pointer ' : '')
          }
        >
          <Background pose={theme === 'light' ? 'themeLight' : 'themeDark'} />
          <NavContainer />
          <main className="routes-wrap">
            <Route
              render={({ location }) => (
                <PoseGroup
                  flipMove={false}
                  preEnterPose="mount"
                  // animateOnMount={true}
                >
                  <TransitionController
                    className="routes-controller"
                    onValueChange={{
                      progress: v => {
                        /**
                         * First re-render from prop change causing
                         * onValue change to fire once per frame even
                         * though value doesn't change. Causing sticky
                         * to not work on first second
                         */
                        if (v === 0) startExitTransition()
                        if (v === 1) endTransition()
                        if (v === 2) startEnterTransition()
                      }
                    }}
                    key={location.pathname}
                  >
                    <Switch location={location}>
                      <Route path="/" exact component={Home} key="home" />
                      <Route path="/info" component={About} key="about" />
                      <Route component={FourOhFour} key="fourOhFour" />
                    </Switch>
                  </TransitionController>
                </PoseGroup>
              )}
            />
          </main>
          <CursorContainer />
          <div className="error-screen-size">
            <ErrorScreenSize />
          </div>
        </div>
      </Router>
    )
  }
}

AppComponent.propTypes = {
  theme                : PropTypes.string.isRequired,
  startExitTransition  : PropTypes.func.isRequired,
  startEnterTransition : PropTypes.func.isRequired,
  endTransition        : PropTypes.func.isRequired,
  toggleCursor         : PropTypes.func.isRequired,
  noCursor             : PropTypes.bool.isRequired,
  stickyIndex          : PropTypes.number.isRequired,
  isExitTransition     : PropTypes.bool.isRequired
}

export default AppComponent
