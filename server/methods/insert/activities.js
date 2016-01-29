Meteor.methods({
  newActivity() {
    return Activities.insert( {} );
  }
});