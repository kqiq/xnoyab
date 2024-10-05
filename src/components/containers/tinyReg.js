import React from 'react';
import { Form, Button, ButtonToolbar, Schema, Panel, FlexboxGrid } from 'rsuite';
import { Whisper} from 'rsuite';
const { StringType, NumberType } = Schema.Types;

const model = Schema.Model({
  name: StringType().isRequired('This field is required.'),
  password: StringType().isRequired('This field is required.'),
  verifyPassword: StringType()
    .addRule((value, data) => {
      console.log(data);

      if (value !== data.password) {
        return false;
      }

      return true;
    }, 'The two passwords do not match')
    .isRequired('This field is required.')
});

const TextField = React.forwardRef((props, ref) => {
  const { name, label, accepter, ...rest } = props;
  return (
    <Form.Group controlId={`${name}-4`} ref={ref}>
      <Form.ControlLabel>{label} </Form.ControlLabel>
      <Form.Control name={name} accepter={accepter} {...rest} />
    </Form.Group>
  );
});

 const TinyReg = (props) =>{ 
    const formRef = React.useRef();
    const [formError, setFormError] = React.useState({});
    const [formValue, setFormValue] = React.useState({
      name: '',
      password: '',
      verifyPassword: ''
    });
  
    const handleSubmit = () => {
      if (!formRef.current.check()) {
        console.error('Form Error');
        return;
      }
      console.log(formValue, 'Form Value');
    };
  
    const handleCheckEmail = () => {
      formRef.current.checkForField('email', checkResult => {
        console.log(checkResult);
      });
    };
  
    return (
      <FlexboxGrid>
        <FlexboxGrid.Item colspan={12}>
          <Form
            ref={formRef}
            onChange={setFormValue}
            onCheck={setFormError}
            formValue={formValue}
            model={model}
          >
            <TextField name="name" label="Username" />
            <TextField name="email" label="Email" />
            <TextField name="age" label="Age" />
            <TextField name="password" label="Password" type="password" autoComplete="off" />
            <TextField
              name="verifyPassword"
              label="Verify password"
              type="password"
              autoComplete="off"
            />
  
            <ButtonToolbar>
              <Button appearance="primary" onClick={handleSubmit}>
                Submit
              </Button>
  
              <Button onClick={handleCheckEmail}>Check Email</Button>
            </ButtonToolbar>
          </Form>
        </FlexboxGrid.Item>
        <FlexboxGrid.Item colspan={12}>
         
        </FlexboxGrid.Item>
      </FlexboxGrid>
    );
}

const Overlay = React.forwardRef(({ style, onClose, ...rest }, ref) => {
    const styles = {
      ...style,
      color: '#000',
      background: '#fff',
      width: 200,
      padding: 10,
      borderRadius: 4,
      position: 'absolute',
      border: '1px solid #ddd',
      boxShadow: '0 3px 6px -2px rgba(0, 0, 0, 0.6)'
    };
  
    return (
      <div {...rest} style={styles} ref={ref}>
        <TinyReg/>
        <hr />
        <button onClick={onClose}>close</button>
      </div>
    );
  });

  export const TinyAuth = (props)=> { 

    return (

        <Whisper
        trigger="click"
        speaker={(props, ref) => {
          const { className, left, top, onClose } = props;
          return <Overlay style={{ left, top }} onClose={onClose} className={className} ref={ref} />;
        }}
      >
        <Button>Reg</Button>
      </Whisper>
    )


  }