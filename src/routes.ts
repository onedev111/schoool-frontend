export default {
  home: () => '/',
  classes: () => '/classes',
  notifications: () => '/notifications',
  settings: () => '/settings',
  signIn: () => '/sign-in',
  signUp: () => '/sign-up',
  signUpForm: () => '/sign-up-form',
  forgotPassword: () => '/forgot-password',
  user: (id?: number) => `/users/${id || ':id'}`,
  class: (id?: number) => `/classes/${id || ':id'}`,
  studyFlow: (id?: number) => `/studyflows/${id || ':id'}`,
}
