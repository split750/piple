LoginWithFacebook = React.createClass({

	handleClick() {
	    Meteor.loginWithFacebook({ 
	    		requestPermissions: ['email', 'public_profile', 'user_friends']
	    	},
	        (error)=> {
	    	  	if(error) {
	    			console.log(error);
	    	  	}	
	    	}
	    );
	},

	render() {

	    return <GridRow>
	      <GridColumn className="col-xs-12 col-sm-6 col-md-5 col-lg-4">
	        <PageHeader size="h4" label="Log In with facebook" />
	        
	        
	        <a href="#" onClick={this.handleClick}>
		        Click to log with facebook.
		    </a>

	      </GridColumn>
	    </GridRow>;
    }
});