import React from "react";
import SyntaxHighlighter from "react-syntax-highlighter";
import { docco } from "react-syntax-highlighter/dist/styles";
import Modal from "boron/OutlineModal";

import "react-joyride/lib/react-joyride-compiled.css";

const CloseButton = props => (
  <button style={{
            fontSize: "200%",
            fontWeight: "normal",
            padding: "5px",
            position: "absolute",
            right: 0,
            top: "-13px"
          }}
          onClick={ props.onClick }
  >×</button>
);
CloseButton.propTypes = {
  onClick: React.PropTypes.func
};

class AnatomyCard extends React.Component {
  render() {
    return (
      <div>
        { this.props.children }
        <br/>
        <a href="#"
           onClick={ () => this.refs.modal.show() }
           style={{
             paddingTop: "0.5em",
             display: "inline-block"
           }} >Show code</a>

        <Modal ref="modal"
               backdrop={ false }
               modalStyle={{ width: "145%" }}
               closeOnClick={ true } >
          <CloseButton onClick={ () => this.refs.modal.hide() } />
          <SyntaxHighlighter language="javascript"
                             style={ docco }
                             customStyle={{ height: 500 }}>{ this.props.code }</SyntaxHighlighter>
        </Modal>
      </div>
    );
  }
}
AnatomyCard.propTypes = {
  code: React.PropTypes.string
};

export default AnatomyCard
