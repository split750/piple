SingleActivity = React.createClass({
  mixins: [ ReactMeteorData ],
  getMeteorData() {
    let sub = Meteor.subscribe( 'singleActivity', this.props.slug );

    return {
      activity: Activities.findOne( { slug: this.props.slug } ),
      ready: sub.ready()
    };
  },
  render() {
    if ( !this.data ) { return <div />; }
    return <GridRow>
      <GridColumn className="col-xs-12 col-sm-8 col-sm-offset-2">
        <Activity singleActivity={ true } activity={ this.data.ready && this.data && this.data.activity } />
      </GridColumn>
    </GridRow>;
  }
});