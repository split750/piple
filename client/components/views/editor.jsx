Editor = React.createClass({
  mixins: [ ReactMeteorData ],
  getMeteorData() {
    Meteor.subscribe( 'editor', this.props.activity );

    return {
      activity: Activities.findOne( { _id: this.props.activity } )
    };
  },
  validations() {
    let component = this;

    return {
      rules: {
        activityTitle: {
          required: true
        }
      },
      messages: {
        activityTitle: {
          required: "Hang on there, an activity title is required!"
        }
      },
      submitHandler() {
        let { getValue, isChecked } = ReactHelpers;

        let form = component.refs.editActivityForm.refs.form,
            activity = {
              _id: component.props.activity,
              title: getValue( form, '[name="activityTitle"]' ),
              slug: getValue( form, '[name="activitySlug"]' ),
              content: getValue( form, '[name="activityContent"]' ),
              published: isChecked( form, '[name="activityPublished"]' ),
              tags: getValue( form, '[name="activityTags"]' ).split( ',' ).map( ( string ) => {
                return string.trim();
              })
            };

        Meteor.call( 'saveActivity', activity, ( error, response ) => {
          if ( error ) {
            Bert.alert( error.reason, 'danger' );
          } else {
            Bert.alert( 'Activity saved!', 'success' );
            FlowRouter.go( 'activities' );
          }
        });
      }
    };
  },
  generateSlug( event ) {
    let { setValue } = ReactHelpers,
        form         = this.refs.editActivityForm.refs.form,
        title        = event.target.value;

    setValue( form, '[name="activitySlug"]', getSlug( title, { custom: { "'": "" } } ) );
  },
  getLastUpdate() {
    if ( this.data ) {
      let { formatLastUpdate } = ReactHelpers,
          activity             = this.data.activity;

      return `${ formatLastUpdate( activity.updated ) } by ${ activity.author }`;
    }
  },
  getTags() {
    let activity = this.data.activity;

    if ( activity && activity.tags ) {
      return activity.tags.join( ', ' );
    }
  },
  handleSubmit( event ) {
    event.preventDefault();
  },
  render() {
    if ( !this.data.activity ) { return <div />; }

    return <GridRow>
      <GridColumn className="col-xs-12 col-sm-8 col-sm-offset-2">
        <PageHeader size="h4" label="Edit Activity" />
        <Form ref="editActivityForm" id="edit-activity" className="edit-activity" validations={ this.validations() } onSubmit={ this.handleSubmit }>
          <p className="updated-date">
            <strong>Last Updated:</strong> { this.getLastUpdate() }
          </p>
          <FormGroup>
            <FormControl
              style="checkbox"
              name="activityPublished"
              id="#activity-published"
              label="Published?"
              defaultValue={ this.data.activity && this.data.activity.published }
            />
          </FormGroup>
          <FormGroup>
            <FormControl
              showLabel={ false }
              style="input"
              type="text"
              name="activityTitle"
              label="Title"
              onChange={ this.generateSlug }
              defaultValue={ this.data.activity && this.data.activity.title }
            />
          </FormGroup>
          <FormGroup>
            <FormControl
              disabled={ true }
              showLabel={ false }
              style="input"
              type="text"
              name="activitySlug"
              label="Slug"
              defaultValue={ this.data.activity && this.data.activity.slug }
            />
          </FormGroup>
          <FormGroup>
            <FormControl
              showLabel={ false }
              style="textarea"
              name="activityContent"
              label="Content"
              defaultValue={ this.data.activity && this.data.activity.content }
            />
          </FormGroup>
          <FormGroup>
            <FormControl
              showLabel={ false }
              style="input"
              type="text"
              name="activityTags"
              label="Tags"
              defaultValue={ this.getTags() }
            />
          </FormGroup>
          <FormGroup>
            <SuccessButton type="submit" label="Save Activity" />
          </FormGroup>
        </Form>
      </GridColumn>
    </GridRow>;
  }
});
