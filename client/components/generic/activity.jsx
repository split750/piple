Activity = React.createClass({
  getActivityTitle() {
    let activity = this.props.activity;
    
    if ( this.props.singleActivity ) {
      return <h3>{ activity.title }</h3>;
    } else {
      return <h3><a href={ `/activities/${ activity.slug }`}>{ activity.title }</a></h3>;
    }
  },
  getHTML( markdown ) {
    if ( markdown ) {
      return { __html: parseMarkdown( markdown ) };
    }
  },
  renderTags( tags ) {
    if ( tags ) {
      return <div className="tags">
        {tags.map( ( tag ) => {
          return <a className="tag" href={ `/tags/${ tag }` }>#{ tag }</a>;
        })}
      </div>;
    }
  },
  render() {
    let { formatLastUpdate } = ReactHelpers,
        activity             = this.props.activity;

    return <div className="activity">
      { this.getActivityTitle() }
      <p><strong>Last Updated:</strong> { formatLastUpdate( activity.updated ) } by { activity.author }</p>
      { this.renderTags( activity.tags ) }
      <div className="activity-body" dangerouslySetInnerHTML={ this.getHTML( activity.content ) } />
    </div>;
  }
});
