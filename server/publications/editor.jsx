Meteor.publish( 'editor', ( activityId ) => {
  check( activityId, String );

  return [
    Activities.find( { _id: activityId } ),
    Meteor.users.find( {}, { fields: { profile: 1 } } )
  ];
});
