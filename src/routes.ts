export default {
  home: () => '/',
  classes: () => '/classes',
  notifications: () => '/notifications',
  settings: () => '/settings',
  signIn: () => '/sign-in',
  signUp: () => '/sign-up',
  signUpForm: () => '/sign-up-form',
  forgotPassword: () => '/forgot-password',
  user: (id: number) => `/users/${id}`,
  class: (id: number) => `/class/${id}`,
  studyFlow: (id: number) => `/studyflows/${id}`,
}
