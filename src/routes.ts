export default {
  home: () => '/',
  classes: () => '/classes',
  settings: {
    index: () => '/settings',
    profile: () => '/settings/profile',
    password: () => '/settings/password',
    termsOfUse: () => '/settings/terms-of-use',
    privacyPolicy: () => '/settings/privacy-policy',
  },
  signIn: () => '/sign-in',
  signUp: () => '/sign-up',
  signUpForm: () => '/sign-up-form',
  forgotPassword: () => '/forgot-password',
  user: (id?: number) => `/users/${id || ':id'}`,
  class: (id?: number) => `/classes/${id || ':id'}`,
  classSavedPosts: (id?: number) => `/classes/${id || ':id'}/saved_posts`,
  studyFlow: (id?: number) => `/studyflows/${id || ':id'}`,
}
