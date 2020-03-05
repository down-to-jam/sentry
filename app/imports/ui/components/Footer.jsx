import React from 'react';

/** The Footer appears at the bottom of every page. Rendered by the App Layout component. */
class Footer extends React.Component {
  render() {
    const divStyle = { backgroundColor: '#1B1C1D', paddingTop: '7px', paddingBottom : '9px', color: 'white' };
    return (
        <footer style={divStyle}>
          <div style={divStyle} className="ui center aligned container">
            <hr />
              Department of Information and Computer Sciences <br />
              University of Hawaii<br />
              Honolulu, HI 96822 <br />
          </div>
        </footer>
    );
  }
}

export default Footer;
