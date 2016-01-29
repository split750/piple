const publicRoutes = FlowRouter.group({
  name: 'public'
});

publicRoutes.route( '/', {
  name: 'index',
  action() {
    ReactLayout.render( App, { yield: <ActivitiesIndex /> } );
  }
});

publicRoutes.route( '/activities/:slug', {
  name: 'singleActivity',
  action( params ) {
    ReactLayout.render( App, { yield: <SingleActivity slug={ params.slug } /> } );
  }
});

publicRoutes.route( '/tags/:tag', {
  name: 'tagIndex',
  action( params ) {
    ReactLayout.render( App, { yield: <ActivitiesIndex tag={ params.tag } /> } );
  }
});

publicRoutes.route( '/login', {
  name: 'login',
  action() {
    ReactLayout.render( App, { yield: <Login /> } );
  }
});

publicRoutes.route( '/recover-password', {
  name: 'recoverPassword',
  action() {
    ReactLayout.render( App, { yield: <RecoverPassword /> } );
  }
});

publicRoutes.route( '/reset-password/:token', {
  name: 'resetPassword',
  action( params ) {
    ReactLayout.render( App, { yield: <ResetPassword token={ params.token } /> } );
  }
});

publicRoutes.route( '/loginWithFacebook', {
  name: 'loginWithFacebook',
  action() {
    ReactLayout.render( App, { yield: <LoginWithFacebook /> } );
  }
});