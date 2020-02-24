import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Container, Card, Header, Loader } from 'semantic-ui-react';
import { Stuffs } from '/imports/api/stuff/stuff';
import { Positions } from '/imports/api/position/position';
import { Profiles } from '/imports/api/profile/StudentProfile';
import StuffItemAdmin from '/imports/ui/components/StuffItemAdmin';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import Profile from '../components/Profile';
import PositionCardAdmin from '../components/PositionCardAdmin';
import ProfileAdmin from '../components/ProfileAdmin';

/** Renders a table containing all of the Stuff documents. Use <StuffItem> to render each row. */
class AdminHome extends React.Component {

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
            <Header as="h1" textAlign="center" inverted>Registered Users</Header>
            <Card.Group>
              {this.props.positions.map((position, index)=> <PositionCardAdmin key={index} position={position}/>)}
            </Card.Group>
            <br></br>
          </Container>
        </div>
      </div>
    );
  }
}

/** Require an array of Stuff documents in the props. */
AdminHome.propTypes = {
  profiles: PropTypes.array.isRequired,
  positions: PropTypes.array.isRequired,
  ready: PropTypes.bool.isRequired,
};

/** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
export default withTracker(() => {
  // Get access to Stuff documents.
  const subscription = Meteor.subscribe('ProfileAdmin');
  const subscription2 = Meteor.subscribe('PositionAdmin');
  return {
    profiles: Profiles.find({}).fetch(),
    positions: Positions.find({}).fetch(),
    ready: (subscription.ready() && subscription2.ready()),
  };
})(AdminHome);
