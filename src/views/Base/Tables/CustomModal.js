import React, { Component } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { withRouter } from "react-router-dom";
import { inject, observer } from "mobx-react";

@inject("tableStore")
@withRouter
@observer
class CustomModal extends Component {
    openModal = () => {
        this.props.tableStore.setVisible(true);
      };
  render() {
    

    const closeModal = () => {
      this.props.tableStore.setVisible(false);
    };
    const visible = this.props.tableStore.visible;
    console.log(visible);
    return (
      <div>
        <Button color="primary" onClick={this.openModal}>
          launch
        </Button>
        <Modal isOpen={visible} toggle={closeModal} className="modal-primary">
          <ModalHeader toggle={closeModal}>Modal title</ModalHeader>
          <ModalBody>test</ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={closeModal}>
              Do Something
            </Button>{" "}
            <Button color="secondary" onClick={closeModal}>
              Cancel
            </Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

export default CustomModal;
