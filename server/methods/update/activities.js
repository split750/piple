Meteor.methods({
  saveActivity( activity ) {
    check( activity, Object );

    let activityId = activity._id;
    delete activity._id;

    Activities.upsert( activityId, { $set: activity } );
  }
});