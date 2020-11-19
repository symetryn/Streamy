import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import Modal from "../Modal";
import { fetchStream, deleteStream } from "../../actions";
import history from "../../history";

class StreamDelete extends Component {
  componentDidMount() {
    this.streamId = this.props.match.params.id;
    this.props.fetchStream(this.streamId);
  }

  renderActions = () => {
    return (
      <>
        <button
          className="ui button negative"
          onClick={() => this.props.deleteStream(this.streamId)}
        >
          Delete
        </button>
        <Link to="/" className="ui button">
          Cancel
        </Link>
      </>
    );
  };

  renderContent() {
    if (!this.props.stream) {
      return "Are you sure you want to delete this stream";
    }
    return (
      <>
        Are you sure you want to delete
        <span style={{ fontWeight: "bold" }}> {this.props.stream.title} </span>
        stream?`
      </>
    );
  }

  render() {
    return (
      <Modal
        title="Delete Stream"
        content={this.renderContent()}
        actions={this.renderActions()}
        onDismiss={() => history.push("/")}
      />
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return { stream: state.streams[ownProps.match.params.id] };
};

export default connect(mapStateToProps, { fetchStream, deleteStream })(
  StreamDelete
);
