import React, { Component } from "react";
import { editStream, fetchStream } from "../../actions";
import { connect } from "react-redux";
import StreamForm from "./StreamForm";
import _ from "lodash";

class StreamEdit extends Component {
  componentDidMount() {
    this.streamId = this.props.match.params.id;
    this.props.fetchStream(this.streamId);
  }

  onSubmit = (formValues) => {
    this.props.editStream(this.streamId, formValues);
  };

  render() {
    if (!this.props.stream) {
      return <div>Loading</div>;
    }

    return (
      <div>
        <h3>Edit a Stream</h3>
        <StreamForm
          initialValues={_.pick(this.props.stream, ["title", "description"])}
          onSubmit={this.onSubmit}
        />
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return { stream: state.streams[ownProps.match.params.id] };
};

export default connect(mapStateToProps, { fetchStream, editStream })(
  StreamEdit
);
