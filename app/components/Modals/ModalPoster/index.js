import React from "react";
import ReactModal from "react-modal";
import "!!!style-loader!css-loader!./modal-poster.css";

export default class ModalPoster extends React.PureComponent {
  state = {
    showModal: false
  };

  handleCloseModal = () => {
    this.setState({ showModal: false });
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.showModal !== this.state.showModal) {
      this.setState(() => ({showModal: nextProps.showModal}))
    }
  }

  render() {
    const { posterImage, posterMessage } = this.props;
    return (
      <div>
        <ReactModal
          isOpen={this.state.showModal}
          contentLabel="onRequestClose Example"
          onRequestClose={this.handleCloseModal}
          className="Modal"
          overlayClassName="Overlay"
        >
          <div className="mclosex-wrap">
            <button onClick={this.handleCloseModal}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="feather feather-x-circle"
              >
                <circle cx="12" cy="12" r="10" />
                <line x1="15" y1="9" x2="9" y2="15" />
                <line x1="9" y1="9" x2="15" y2="15" />
              </svg>
            </button>
          </div>
          <div className="mcontent-wrap">
            <img src={posterImage} alt={posterMessage} />
          </div>
        </ReactModal>
      </div>
    );
  }
}