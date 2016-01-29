Meteor.methods({
  deleteActivity( activity ) {
    check( activity, Object );

    let activityId = activity._id;
    if(activity.author !== Meteor.userId()) {
    	// make sure only the owner can delete it
        throw new Meteor.Error("not-authorized");
    }
    Activities.remove(activityId);
  }
});