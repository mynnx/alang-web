import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import Correction from './Correction';
import {connect} from 'react-redux';

export const Results = React.createClass({
  mixins: [PureRenderMixin],
  render: function() {
    return <div className="container">
        {this.props.corrections.map(correction =>
          <div className="clearfix">
            <div className="pull-left">
              <p className="muted">You said:</p>
              <p className="speech incorrect">{correction.text}</p>
            </div>
            <div className="separator"></div>
            <div className="pull-right">
              <p className="muted">But you probably meant to say:</p>
              <p className="speech correct">{correction.result}</p>
            </div>
          </div>
        )}
    </div>
  }
});

function mapStateToProps(state) {
  return {
    corrections: state.get('corrections')
  }
}

export const ResultsContainer = connect(mapStateToProps)(Results);
