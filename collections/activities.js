Activities = new Mongo.Collection( 'activities' );

Activities.allow({
  insert: () => false,
  update: () => false,
  remove: () => false
});

Activities.deny({
  insert: () => true,
  update: () => true,
  remove: () => true
});

let ActivitiesSchema = new SimpleSchema({
  "published": {
    type: Boolean,
    label: "Is this activity published?",
    autoValue() {
      if ( this.isInsert ) {
        return false;
      }
    }
  },
  "author": {
    type: String,
    label: "The ID of the author of this activity.",
    autoValue() {
      let user = Meteor.users.findOne( { _id: this.userId } );
      if ( user ) {
        return `${ user.profile.name.first } ${ user.profile.name.last }`;
      }
    }
  },
  "updated": {
    type: String,
    label: "The date this activity was last updated on.",
    autoValue() {
      return ( new Date() ).toISOString();
    }
  },
  "title": {
    type: String,
    label: "The title of this activity.",
    defaultValue: "Untitled Activity"
  },
  "slug": {
    type: String,
    label: "The slug for this activity.",
    autoValue() {
      let slug              = this.value,
          existingSlugCount = Activities.find( { _id: { $ne: this.docId }, slug: new RegExp( slug ) } ).count(),
          existingUntitled  = Activities.find( { slug: { $regex: /untitled-activity/i } } ).count();

      if ( slug ) {
        return existingSlugCount > 0 ? `${ slug }-${ existingSlugCount + 1 }` : slug;
      } else {
        return existingUntitled > 0 ? `untitled-activity-${ existingUntitled + 1 }` : 'untitled-activity';
      }
    }
  },
  "content": {
    type: String,
    label: "The content of this activity.",
    optional: true
  },
  "tags": {
    type: [ String ],
    label: "The tags for this activity.",
    optional: true
  },
  "category": {
    type: String,
    label: "The category of this activity.",
    optional: false
  }
});

Activities.attachSchema( ActivitiesSchema );
