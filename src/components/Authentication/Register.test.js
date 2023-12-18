import { fireEvent, render, screen } from '@testing-library/react';

import { BrowserRouter } from 'react-router-dom';
import React from 'react';
import { act } from 'react-dom/test-utils';
import App from '../../App';


test('Render home screen for not logged user',()=>{
  render( 
    
    <BrowserRouter>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  
  </BrowserRouter>);
  const loginAnchor=screen.getByText(/Вход/i);
  expect(loginAnchor).toBeInTheDocument();
  
})

test('Check register form to be rendered after register anchor is clicked ',()=>{
  render( 
    
    <BrowserRouter>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  
  </BrowserRouter>);
  const registerAnchor=screen.getByText(/Регистрация/i);
  act(()=>{
    registerAnchor.click()
    
  })
  
  const registerForm=screen.getByText(/Регистрация на потребител/i);
  expect(registerForm).toBeInTheDocument();
  expect(registerAnchor).toBeInTheDocument();
  
})

test('Check register inputs to respond properly on change',async ()=>{
  render( 
    
    <BrowserRouter>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  
  </BrowserRouter>);


  const usernameInput=await screen.findByPlaceholderText(/email/i);

  const passwordInput=await screen.findAllByPlaceholderText(/password/i);
  //Change the Email
  fireEvent.change(usernameInput,{target:{value:'ndimov@postbank.bg'}});
  //Change the password
  fireEvent.change(passwordInput[0],{target:{value:'1234'}});
  //Change the repeat paasword
  fireEvent.change(passwordInput[1],{target:{value:'123'}});

  expect(usernameInput.value).toBe('ndimov@postbank.bg');
  expect(passwordInput[0].value).toBe('1234');
  expect(passwordInput[1].value).toBe('123');
})

test('Check register form submit with Password and Repassword - does not match',async ()=>{
  render( 
    
    <BrowserRouter>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  
  </BrowserRouter>);


  const usernameInput=await screen.findByPlaceholderText(/email/i);

  const passwordInput=await screen.findAllByPlaceholderText(/password/i);
  //Change the Email
  fireEvent.change(usernameInput,{target:{value:'ndimov@postbank.bg'}});
  //Change the password
  fireEvent.change(passwordInput[0],{target:{value:'1234'}});
  //Change the repeat paasword
  fireEvent.change(passwordInput[1],{target:{value:'123'}});

  expect(usernameInput.value).toBe('ndimov@postbank.bg');
  expect(passwordInput[0].value).toBe('1234');
  expect(passwordInput[1].value).toBe('123');

  const submitButton=await screen.findByRole('button', { name: 'Регистрация', type: 'submit' });
  await act(async ()=>{
    submitButton.click();
  
  })
  const errorMessage=await screen.findByText('Passwords do not match!');
  expect(errorMessage).toBeInTheDocument();
})


test('Check register form submit with password in bad format',async ()=>{
  render( 
    
    <BrowserRouter>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  
  </BrowserRouter>);


  const usernameInput=await screen.findByPlaceholderText(/email/i);

  const passwordInput=await screen.findAllByPlaceholderText(/password/i);
  //Change the Email
  fireEvent.change(usernameInput,{target:{value:'ndimov@postbank.bg'}});
  //Change the password
  fireEvent.change(passwordInput[0],{target:{value:'12'}});
  //Change the repeat paasword
  fireEvent.change(passwordInput[1],{target:{value:'123'}});

  expect(usernameInput.value).toBe('ndimov@postbank.bg');
  expect(passwordInput[0].value).toBe('12');
  expect(passwordInput[1].value).toBe('123');

  const submitButton=await screen.findByRole('button', { name: 'Регистрация', type: 'submit' });
  await act(async ()=>{
    submitButton.click();
  
  })
  const errorMessage=await screen.findByText('password: Паролата следва да бъде поне 3 символа');
  expect(errorMessage).toBeInTheDocument();
})

test('Check register form submit with email in bad format',async ()=>{
  render( 
    
    <BrowserRouter>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  
  </BrowserRouter>);


  const usernameInput=await screen.findByPlaceholderText(/email/i);

  const passwordInput=await screen.findAllByPlaceholderText(/password/i);
  //Change the Email
  fireEvent.change(usernameInput,{target:{value:'ndimov@postbank.b'}});
  //Change the password
  fireEvent.change(passwordInput[0],{target:{value:'123'}});
  //Change the repeat paasword
  fireEvent.change(passwordInput[1],{target:{value:'123'}});



  const submitButton=await screen.findByRole('button', { name: 'Регистрация', type: 'submit' });
  await act(async ()=>{
    submitButton.click();
  
  })
  const errorMessage=await screen.findByText('Мейла не е в очаквания формат username@postbank.bg!');
  expect(errorMessage).toBeInTheDocument();
})

test('Check register form submit with email in bad format',async ()=>{
  render( 
    
    <BrowserRouter>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  
  </BrowserRouter>);


  const usernameInput=await screen.findByPlaceholderText(/email/i);

  const passwordInput=await screen.findAllByPlaceholderText(/password/i);
  //Change the Email
  fireEvent.change(usernameInput,{target:{value:'ndimov@postbank.bg'}});
  //Change the password
  fireEvent.change(passwordInput[0],{target:{value:'123'}});
  //Change the repeat paasword
  fireEvent.change(passwordInput[1],{target:{value:'123'}});



  const submitButton=await screen.findByRole('button', { name: 'Регистрация', type: 'submit' });
  await act(async ()=>{
    submitButton.click();
  
  })
  const errorMessage=await screen.findByText('Network request failed');
  expect(errorMessage).toBeInTheDocument();
})


