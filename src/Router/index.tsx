import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import { useCurrentUser } from 'User/currentUser'
import SignIn from 'User/Auth/SignIn'
import SignUp from 'User/Auth/SignUp'
import Layout from 'Layout'
import routes from 'routes'
import ForgotPassword from 'User/Auth/ForgotPassword'
import SignUpForm from 'User/Auth/SignUpForm'
import Home from 'Home'
import ClassesHome from 'Class/Home'
import ClassPage from 'Class/Page'
import Notifications from 'Notifications'
import Settings from 'Settings'

const AuthRoutes = () => (
  <Switch>
    <Route path={routes.signIn()} exact component={SignIn} />
    <Route path={routes.signUp()} exact component={SignUp} />
    <Route path={routes.forgotPassword()} exact component={ForgotPassword} />
    <Redirect to={routes.signIn()} />
  </Switch>
)

const UserRoutes = () => (
  <Switch>
    <Route path={routes.signUpForm()} exact component={SignUpForm} />
    <Route
      render={() => (
        <Layout>
          <Switch>
            <Route path={routes.home()} exact component={Home} />
            <Route path={routes.classes()} exact component={ClassesHome} />
            <Route path={routes.class()} exact component={ClassPage} />
            <Route
              path={routes.classSavedPosts()}
              exact
              component={ClassPage}
            />
            <Route
              path={routes.notifications()}
              exact
              component={Notifications}
            />
            <Route path={routes.settings()} exact component={Settings} />
            <Redirect to={routes.home()} />
          </Switch>
        </Layout>
      )}
    />
  </Switch>
)

export default function Router() {
  const [user] = useCurrentUser()

  return (
    <>
      {!user && <AuthRoutes />}
      {user && <UserRoutes />}
    </>
  )
}
