import React, { useState } from 'react';
import Button from '../button';
import Modal from '../Modal';
import './style.css';


export default function ModalConfirmation({ header, deleted, isLoading, message, send, catched, ...props }) {
  const [name, setName] = useState('')
  
  return (
    <Modal className='root-confimation' {...props}>
      {/*<img alt="close" onClick={props.onClose} src="/assets/ic-close.svg" />*/}
      {/*<img alt="" src="/assets/ilu-ask.svg" />*/}
      {header && <h4>{header}</h4>}
      {message && <p>{message}</p>}
      <section>
        {catched && <input type="text" name='name' placeholder='Your Pokemon Name' onChange={(e) => setName(e.target.value)} />}
      </section>
      <footer>
        <Button onClick={props.onClose} size="medium" variant="outlined" label={catched ?'Cancel' : 'Try Again'} className='outlined'></Button>
        {catched && <Button isLoading={isLoading} onClick={() => send(name)} size="medium" label={'Keep It!'} className={deleted? 'delete':''} >Yakin</Button>}
      </footer>
    </Modal>
  );
}
