export default (context) => {

    if (!context.app.context.app.$cookies.get('auth')) {
      return context.redirect('/login');
    }
}
  