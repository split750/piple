Meteor.publish( 'activitiesList', () => {
  return Activities.find();
});