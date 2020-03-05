import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Container, Header, Loader, Grid, Icon, Divider } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';


/** Renders a table containing all of the Stuff documents. Use <StuffItem> to render each row. */
class UserHome extends React.Component {

  /** If the subscription(s) have been received, render the page, otherwise show a loading icon. */
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  /** Render the page once subscriptions have been received. */
  renderPage() {
    return (
        <div className="connect-background">
          <div className="page-layer">
            <Container>
              <Header as="h1" textAlign="center" inverted>Registered User Home Page</Header>
              <Divider/>
              <Grid container centered columns={3}>
                <Grid.Row>
                  <Grid.Column textAlign='center' className='landingText'>
                    <Icon size='huge' name='graduation cap' inverted/>
                    <Header as='h1' inverted>Problems with password security?</Header>
                    <Header as='h3' inverted>Password management can be a hassle...</Header>
                  </Grid.Column>
                  <Grid.Column textAlign='center' className='landingText'>
                    <Icon size='huge' name='address card' inverted/>
                    <Header as='h1' inverted>Password Management</Header>
                    <Header as='h3' inverted>Start by saving your passwords here.</Header>
                  </Grid.Column>
                  <Grid.Column textAlign='center' className='landingText'>
                    <Icon size='huge' name='handshake' inverted/>
                    <Header as='h1' inverted>Generate secure passwords!</Header>
                    <Header as='h3' inverted>Use our secure password generator to secure your accounts today!</Header>
                  </Grid.Column>
                </Grid.Row>
              </Grid>
            </Container>
          </div>
        </div>
    );
  }
}

/** Require an array of Stuff documents in the props. */
UserHome.propTypes = {
  // profiles: PropTypes.array.isRequired,
  ready: PropTypes.bool.isRequired,
};

/** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
export default withTracker(() => {
  // Get access to Stuff documents.
  const subscription = Meteor.subscribe('StuffItem');
  return {
    // profiles: Profiles.find({}).fetch(),
    ready: subscription.ready(),
  };
})(UserHome);
