const authenticatedRoutes = FlowRouter.group({
  name: 'authenticated'
});

authenticatedRoutes.route( '/activities', {
  name: 'activities',
  action() {
    ReactLayout.render( App, { yield: <ActivitiesList /> } );
  }
});

authenticatedRoutes.route( '/activities/:_id/edit', {
  name: 'activityEditor',
  action( params ) {
    ReactLayout.render( App, { yield: <Editor activity={ params._id } /> } );
  }
});
