import React, {Component, Suspense} from 'react';
import * as router from 'react-router-dom';
import {Redirect, Route, Switch} from 'react-router-dom';
import {Container, DropdownItem, DropdownMenu, DropdownToggle} from 'reactstrap';

import {
  AppBreadcrumb2 as AppBreadcrumb,
  AppFooter,
  AppHeader,
  AppHeaderDropdown,
  AppSidebar,
  AppSidebarFooter,
  AppSidebarForm,
  AppSidebarHeader,
  AppSidebarMinimizer,
  AppSidebarNav2 as AppSidebarNav,
} from '@coreui/react';
// sidebar nav config
import navigationAdmin from '../../_navAdministrator';
import navigationRegular from '../../_navRegular';
import navigationBasic from '../../_navBasic';
// routes config
import routes from '../../routes';
import {logout} from "../../logOut/logoutActions";
import {connect} from "react-redux";
import {fetchUserRole} from "../../user/ActionsUserRole";

const DefaultFooter = React.lazy(() => import('./DefaultFooter'));
const DefaultHeader = React.lazy(() => import('./DefaultHeader'));

class DefaultLayout extends Component {

  loading = () => <div className="animated fadeIn pt-1 text-center">Loading
    ...</div>

  signOut(e) {
    e.preventDefault()
    logout(e)
    this.props.history.push('/')
    this.state = {
      showPopup: false
    };
  }

  getUserRole() {
    fetchUserRole()
  }

  render() {
    this.getUserRole()
    console.log(localStorage.getItem("userRole"))
    if (localStorage.getItem("userRole") === null) {
      return (
        <div className="app">
          <AppHeader fixed>
            <Suspense fallback={this.loading()}>
              <DefaultHeader onLogout={e => this.signOut(e)}/>
            </Suspense>
          </AppHeader>
          <div className="app-body">
            <AppSidebar fixed display="lg">
              <AppSidebarHeader/>
              <AppSidebarForm/>
              <Suspense>
                <AppSidebarNav navConfig={navigationBasic} {...this.props} router={router}/>
              </Suspense>
              <AppHeaderDropdown direction="left">
                <DropdownToggle navigationAdmin>
                  <img src={'https://imgur.com/4YjW6pf.png'} className="img-avatar" alt="admin@bootstrapmaster.com"/>
                </DropdownToggle>
                <DropdownMenu right style={{right: 'auto'}}>
                  <DropdownItem> User: {localStorage.getItem("user")}</DropdownItem>
                  <DropdownItem onClick={e => this.signOut(e)}><i className="fa fa-lock"></i> Logout</DropdownItem>
                </DropdownMenu>
              </AppHeaderDropdown>
              <AppSidebarFooter/>
              <AppSidebarMinimizer/>

            </AppSidebar>
            <main className="main">
              <AppBreadcrumb appRoutes={routes} router={router}/>
              <Container fluid>
                <Suspense fallback={this.loading()}>
                  <Switch>
                    {routes.map((route, idx) => {
                      return route.component ? (
                        <Route
                          key={idx}
                          path={route.path}
                          exact={route.exact}
                          name={route.name}
                          render={props => (
                            <route.component {...props} />
                          )}/>
                      ) : (null);
                    })}
                    <Redirect from="/" to="/about"/>
                  </Switch>
                </Suspense>
              </Container>
            </main>
          </div>
          <AppFooter>
            <Suspense fallback={this.loading()}>
              <DefaultFooter/>
            </Suspense>
          </AppFooter>
        </div>
      );
    } else {
      if (localStorage.getItem("userRole") === "ADMIN") {
        return (
          <div className="app">
            <AppHeader fixed>
              <Suspense fallback={this.loading()}>
                <DefaultHeader onLogout={e => this.signOut(e)}/>
              </Suspense>
            </AppHeader>
            <div className="app-body">
              <AppSidebar fixed display="lg">
                <AppSidebarHeader/>
                <AppSidebarForm/>
                <Suspense>
                  <AppSidebarNav navConfig={navigationAdmin} {...this.props} router={router}/>
                </Suspense>
                <AppHeaderDropdown direction="left">
                  <DropdownToggle navigationAdmin>
                    <img src={'https://imgur.com/4YjW6pf.png'} className="img-avatar" alt="admin@bootstrapmaster.com"/>
                  </DropdownToggle>
                  <DropdownMenu right style={{right: 'auto'}}>
                    <DropdownItem> User: {localStorage.getItem("user")}</DropdownItem>
                    <DropdownItem onClick={e => this.signOut(e)}><i className="fa fa-lock"></i> Logout</DropdownItem>
                  </DropdownMenu>
                </AppHeaderDropdown>
                <AppSidebarFooter/>
                <AppSidebarMinimizer/>

              </AppSidebar>
              <main className="main">
                <AppBreadcrumb appRoutes={routes} router={router}/>
                <Container fluid>
                  <Suspense fallback={this.loading()}>
                    <Switch>
                      {routes.map((route, idx) => {
                        return route.component ? (
                          <Route
                            key={idx}
                            path={route.path}
                            exact={route.exact}
                            name={route.name}
                            render={props => (
                              <route.component {...props} />
                            )}/>
                        ) : (null);
                      })}
                      <Redirect from="/" to="/about"/>
                    </Switch>
                  </Suspense>
                </Container>
              </main>
            </div>
            <AppFooter>
              <Suspense fallback={this.loading()}>
                <DefaultFooter/>
              </Suspense>
            </AppFooter>
          </div>
        );
      } else {
        if (localStorage.getItem("userRole") === "REGULAR"||"POWER"||"ROOM") {
          return (
            <div className="app">
              <AppHeader fixed>
                <Suspense fallback={this.loading()}>
                  <DefaultHeader onLogout={e => this.signOut(e)}/>
                </Suspense>
              </AppHeader>
              <div className="app-body">
                <AppSidebar fixed display="lg">
                  <AppSidebarHeader/>
                  <AppSidebarForm/>
                  <Suspense>
                    <AppSidebarNav navConfig={navigationRegular} {...this.props} router={router}/>
                  </Suspense>
                  <AppHeaderDropdown direction="left">
                    <DropdownToggle navigationRegular style={{color:'#23282c',
                      backgroundColor: '#d8c2a5',
                      borderColor: '#d8c2a5'}}>
                      <img src={'https://imgur.com/4YjW6pf.png'} className="img-avatar"
                           alt="user" />
                    </DropdownToggle>
                    <DropdownMenu right style={{right: 'auto'}}>
                      <DropdownItem> User: {localStorage.getItem("user")}</DropdownItem>
                      <DropdownItem onClick={e => this.signOut(e)}><i className="fa fa-lock"></i> Logout</DropdownItem>
                    </DropdownMenu>
                  </AppHeaderDropdown>
                  <AppSidebarFooter/>
                  <AppSidebarMinimizer/>

                </AppSidebar>
                <main className="main">
                  <AppBreadcrumb appRoutes={routes} router={router}/>
                  <Container fluid>
                    <Suspense fallback={this.loading()}>
                      <Switch>
                        {routes.map((route, idx) => {
                          return route.component ? (
                            <Route
                              key={idx}
                              path={route.path}
                              exact={route.exact}
                              name={route.name}
                              render={props => (
                                <route.component {...props} />
                              )}/>
                          ) : (null);
                        })}
                        <Redirect from="/" to="/about"/>
                      </Switch>
                    </Suspense>
                  </Container>
                </main>
              </div>
              <AppFooter>
                <Suspense fallback={this.loading()}>
                  <DefaultFooter/>
                </Suspense>
              </AppFooter>
            </div>
          );

        } else {
          return this.props.history.replace('/');
        }
      }

    }
  }
}

const mapStateToProps = (state) => {
  return {
    userRole: state.ReducersUserRole.userRole,
  }
};


export default connect(
  mapStateToProps,
)(DefaultLayout);

