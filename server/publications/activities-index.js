Meteor.publish( 'activitiesIndex', function() {
  return Activities.find( { published: true } );
});

Meteor.publish( 'tagsIndex', function( tag ) {
  check( tag, String );
  return Activities.find( { published: true, tags: { $in: [ tag ] } } );
});