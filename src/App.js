import React from 'react'

import { createStore , applyMiddleware, compose} from 'redux'
import { Provider } from 'react-redux'
import Learn2MessageReducers from './reducers/Learn2MessageReducers'
import thunk from 'redux-thunk'

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { Nav, Navbar, NavDropdown } from 'react-bootstrap'

import Home from './page/Home'
import Portfolio from './page/Portfolio'
import WorkArea from './page/Learn1-WorkArea'
import Message from './page/Learn2-Message'
import Pattern from './page/Learn3-Pattern'
import chatroom from './page/Learn4-chatroom'

import './style/style.scss'
import './style/Learn1-WorkAreaStyle.scss'
import './style/Learn2-MessageStyle.scss'

// 掛載redux的store
// 這一行是為了把redux在chrome上的除錯與compose包一起
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
// 然後這行是把剛剛包好的加上middleware  好讓我們可以在redux的action creator做fetch
const store = createStore(
  Learn2MessageReducers,
  composeEnhancers(applyMiddleware(thunk))
)


const App = () => {
  return (
    <>
      <div>
        {/* navbar */}
        <Navbar className="NavBg ff2 font4" expand="lg" fixed="top">
          <Navbar.Brand href="/">
            <div
              style={{ height: '50px', width: '50px', borderRadius: '50%' }}
              className="overflow-hidden"
            >
              <img
                className="h-100 w-100"
                src="http://localhost:3002/images/logo.jpg"
                alt="logo"
              />
            </div>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
              <Nav.Link href="/">主頁</Nav.Link>
              <Nav.Link href="/portfolio">作品/經歷</Nav.Link>
              <NavDropdown title="自我學習" id="basic-nav-dropdown">
                <NavDropdown.Item href="/workArea">
                  地點-Google Map Api
                </NavDropdown.Item>
                <NavDropdown.Item href="/message">留言-Redux</NavDropdown.Item>
                <NavDropdown.Item href="/Pattern">圖形</NavDropdown.Item>
                <NavDropdown.Item href="/chatroom">
                  聊天室-WebSocket
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action/3.4">
                  Separated link
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Navbar>

        <Router>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/Portfolio" component={Portfolio} />
            <Route path="/WorkArea" component={WorkArea} />
            {/* 綁定此頁的store的redux的store */}
            <Provider store={store}>
              <Route path="/Message" component={Message} />
            </Provider>
            <Route path="/Pattern" component={Pattern} />
            <Route path="/chatroom" component={chatroom} />
          </Switch>
        </Router>
      </div>
    </>
  )
}

export default App
