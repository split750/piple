AppHeader = React.createClass({
  mixins: [ ReactMeteorData ],
  getMeteorData() {
    return {
      brandLink: !!Meteor.user() ? '/activities' : '/',
      user: Meteor.user()
    };
  },
  render() {
    return <NavBar id="app-header" brandLink={ this.data.brandLink } brand="Piple">
      { this.props.hasUser ? <AuthenticatedNavigation user={ this.data.user } /> : <PublicNavigation /> }
    </NavBar>;
  }
});
