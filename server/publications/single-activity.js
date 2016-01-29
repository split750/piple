Meteor.publish( 'singleActivity', ( activitySlug ) => {
  check( activitySlug, String );

  return Activities.find( { slug: activitySlug } );
});