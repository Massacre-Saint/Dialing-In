import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import Offcanvas from 'react-bootstrap/Offcanvas';
import PropTypes from 'prop-types';
import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import { createStep } from '../../utils/data/apiData/steps';

const initialSate = {
  direction: '',
};

export default function StepModal({ stepArray, recipeObj, onUpdate }) {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [formInput, setFormInput] = useState(initialSate);
  useEffect(() => {
    setFormInput(initialSate);
  }, [stepArray]);
  const createOrder = (array) => {
    const length = array.length + 1;
    return length;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = {
      ...formInput,
      recipeId: recipeObj.firebaseKey,
      order: createOrder(stepArray),
    };
    createStep(payload).then(() => {
      onUpdate();
    });
    handleClose();
  };
  return (
    <div className="steps-btn-container">
      <button type="button" className="btn-lg bottom-btn" onClick={handleShow}>Add Step</button>
      <Offcanvas
        show={show}
        onHide={handleClose}
        placement="bottom"
        style={{
          width: '100vw',
        }}
      >
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Descripe this step</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <div>
            <Form onSubmit={handleSubmit}>
              <FloatingLabel controlId="floatingInput1" label="Create Step" className="mb-3">
                <Form.Control type="text" value={formInput.direction} onChange={handleChange} placeholder="Example..." name="direction" required />
              </FloatingLabel>
              <Button type="submit" className="btn-lg">Submit</Button>
            </Form>
          </div>
        </Offcanvas.Body>
      </Offcanvas>
    </div>
  );
}
StepModal.propTypes = {
  stepArray: PropTypes.arrayOf((PropTypes.shape({
    direction: PropTypes.string,
    firebaseKey: PropTypes.string,
    order: PropTypes.number,
    recipeId: PropTypes.string,
  }))),
  recipeObj: PropTypes.shape({
    firebaseKey: PropTypes.string,
  }),
  onUpdate: PropTypes.func,
};
StepModal.defaultProps = {
  stepArray: PropTypes.arrayOf((PropTypes.shape({
    direction: '',
    firebaseKey: '',
    order: 0,
    recipeId: '',
  }))),
  recipeObj: PropTypes.shape({
    firebaseKey: '',
  }),
  onUpdate: () => {},
};
