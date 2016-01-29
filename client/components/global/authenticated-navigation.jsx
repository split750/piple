AuthenticatedNavigation = React.createClass({
  mixins: [ ReactMeteorData ],
  getMeteorData() {
    let userName = Meteor.user().profile.name;

    return {
      items: {
        left: [
          { uid: 'activities', href: '/activities', label: 'Activities' }
        ],
        right: [
          {
            uid: 'currentUser',
            href: '#',
            label: userName,
            dropdown: true,
            dropdownItems: [
              { uid: 'logout', href: '#', label: 'Logout', action: () => {
                return Meteor.logout( () => {
                  FlowRouter.go( 'index' );
                });
              }}
            ]
          }
        ]
      }
    };
  },
  render() {
    return <div className="authenticated-navigation">
      <NavBarNav position={ `navbar-left` } items={ this.data.items.left } />
      <NavBarNav position={ `navbar-right` } items={ this.data.items.right } />
    </div>;
  }
});
