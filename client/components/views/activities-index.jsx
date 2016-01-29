ActivitiesIndex = React.createClass({
  mixins: [ ReactMeteorData ],
  getMeteorData() {
    let query = {};

    if ( this.props.tag ) {
      Meteor.subscribe( 'tagsIndex', this.props.tag );
      query = { tags: { $in: [ this.props.tag ] } };
    } else {
      Meteor.subscribe( 'activitiesIndex' );
    }

    return {
      activities: Activities.find( query, { sort: { updated: -1 } } ).fetch()
    };
  },
  renderHeader() {
    if ( this.props.tag ) {
      return <Jumbotron className="tags-header">
        <h4>Activities tagged with: { this.props.tag }.</h4>
      </Jumbotron>;
    } else {
      return <Jumbotron className="blog-header">
        <h2>Piple App</h2>
        <h4>A new application to reconnect to your friends in real life.</h4>
      </Jumbotron>;
    }
  },
  renderActivities() {
    if ( this.data.activities.length > 0 ) {
      return this.data.activities.map( ( activity ) => {
        return <Activity key={ activity._id } activity={ activity } />;
      });
    } else {
      return <WarningAlert>No activities found.</WarningAlert>;
    }
  },
  render() {
    return <div className="activities">
      <GridRow>
        <GridColumn className="col-xs-12 col-sm-8 col-sm-offset-2">
          { this.renderHeader() }
          { this.renderActivities() }
        </GridColumn>
      </GridRow>
    </div>;
  }
});
