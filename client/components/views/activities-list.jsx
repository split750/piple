ActivitiesList = React.createClass({
  mixins: [ ReactMeteorData ],
  getMeteorData() {
    Meteor.subscribe( 'activitiesList' );

    return {
      activities: Activities.find().fetch().map( ( activity ) => {
        return { uid: activity._id, href: `/activities/${ activity._id }/edit`, label: activity.title };
      })
    };
  },
  handleNewActivity() {
    Meteor.call( 'newActivity', ( error, activityId ) => {
      if ( error ) {
        Bert.alert( error.reason, 'danger' );
      } else {
        FlowRouter.go( `/activities/${ activityId }/edit` );
        Bert.alert( 'All set! Get to typin\'', 'success' );
      }
    });
  },
  renderActivitiesList() {
    if ( this.data.activities.length > 0 ) {
      return <ListGroup linked={ true } items={ this.data.activities } />;
    } else {
      return <WarningAlert>No activities found.</WarningAlert>;
    }
  },
  render() {
    return <GridRow>
      <GridColumn className="col-xs-12 col-sm-8 col-sm-offset-2">
        <SuccessButton type="button" label="New Activity" onClick={ this.handleNewActivity } />
        <PageHeader size="h4" label="Activities" />
        { this.renderActivitiesList() }
      </GridColumn>
    </GridRow>;
  }
});
