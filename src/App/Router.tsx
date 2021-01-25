import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import { useCurrentUser } from 'User/currentUser'
import SignIn from 'User/Auth/SignIn'
import SignUp from 'User/Auth/SignUp'
import Layout from 'App/Layout'
import routes from 'routes'
import ForgotPasswordPage from 'User/Auth/ForgotPasswordPage'
import SignUpFormPage from 'User/Auth/SignUpFormPage'
import Home from 'Home'
import ClassesHome from 'Class/Home'
import ClassPage from 'Class/Page'
import UserPage from 'User/Page'
import SettingsLayout from 'Settings/Layout'
import ProfilePage from 'Settings/ProfilePage'
import PasswordPage from 'Settings/PasswordPage'
import TermsOfUsePage from 'Settings/TermsOfUsePage'
import PrivacyPolicyPage from 'Settings/PrivacyPolicyPage'
import SettingsPasswordForgotPage from 'Settings/PasswordForgotPage'

const AuthRoutes = () => (
  <Switch>
    <Route path={routes.signIn()} exact component={SignIn} />
    <Route path={routes.signUp()} exact component={SignUp} />
    <Route
      path={routes.forgotPassword()}
      exact
      component={ForgotPasswordPage}
    />
    <Redirect to={routes.signIn()} />
  </Switch>
)

const UserRoutes = () => (
  <Switch>
    <Route path={routes.signUpForm()} exact component={SignUpFormPage} />
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
              path={[routes.user(), routes.userSavedPosts()]}
              exact
              component={UserPage}
            />
            <Route
              path={routes.settings.index()}
              render={() => (
                <SettingsLayout>
                  <Switch>
                    <Route
                      path={routes.settings.profile()}
                      exact
                      component={ProfilePage}
                    />
                    <Route
                      path={routes.settings.password()}
                      exact
                      component={PasswordPage}
                    />
                    <Route
                      path={routes.settings.passwordForgot()}
                      exact
                      component={SettingsPasswordForgotPage}
                    />
                    <Route
                      path={routes.settings.termsOfUse()}
                      exact
                      component={TermsOfUsePage}
                    />
                    <Route
                      path={routes.settings.privacyPolicy()}
                      exact
                      component={PrivacyPolicyPage}
                    />
                    <Redirect to={routes.home()} />
                  </Switch>
                </SettingsLayout>
              )}
            />
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
