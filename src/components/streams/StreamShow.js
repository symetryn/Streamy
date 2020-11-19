import React, { useEffect } from "react";
import { connect } from "react-redux";
import { fetchStream } from "../../actions";

const StreamShow = (props) => {
  useEffect(() => {
    props.fetchStream(props.match.params.id);
  }, []);

  if (!props.stream) {
    return "Loading";
  }
  const { title, description } = props.stream;

  return (
    <div className="ui container">
      <h1 className="header">Stream Title : {title}</h1>
      <h5 className="description"> {description}</h5>
    </div>
  );
};

const mapStateToProp = (state, ownProps) => {
  return { stream: state.streams[ownProps.match.params.id] };
};

export default connect(mapStateToProp, { fetchStream })(StreamShow);
