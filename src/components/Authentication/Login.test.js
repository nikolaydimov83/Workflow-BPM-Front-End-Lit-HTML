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

test('Check login form to be rendered after login anchor is clicked ',()=>{
  render( 
    
    <BrowserRouter>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  
  </BrowserRouter>);
  const loginAnchor=screen.getByText(/Вход/i);
  act(()=>{
    loginAnchor.click()
    
  })
  
  const loginForm=screen.getByText(/Вход на потребител/i);
  expect(loginForm).toBeInTheDocument();
  expect(loginAnchor).toBeInTheDocument();
  
})

test('Check login inputs to respond properly on change',async ()=>{
  render( 
    
    <BrowserRouter>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  
  </BrowserRouter>);


  const usernameInput=await screen.findByPlaceholderText(/email/i);
  const passwordInput=await screen.findByPlaceholderText(/password/i);

  fireEvent.change(usernameInput,{target:{value:'ndimov@postbank.bg'}});
  fireEvent.change(passwordInput,{target:{value:'12'}});

  expect(usernameInput.value).toBe('ndimov@postbank.bg');
  expect(passwordInput.value).toBe('12');
})

test('Check login form upon submit with password that doesn\'t match the requested format',async ()=>{
  render( 
    
    <BrowserRouter>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  
  </BrowserRouter>);


  const usernameInput=await screen.findByPlaceholderText(/email/i);
  const passwordInput=await screen.findByPlaceholderText(/password/i);

  fireEvent.change(usernameInput,{target:{value:'ndimov@postbank.bg'}});
  fireEvent.change(passwordInput,{target:{value:'12'}});
  
  const submitButton=screen.getByText(/Вписване/i);
  await act(async ()=>{
    submitButton.click();
  
  })
  const errorMessage=await screen.findByText('password: Паролата следва да бъде поне 3 символа');
  expect(errorMessage).toBeInTheDocument();
  

})

test('Check login form upon submit with email that doesn\'t match the requested format',async ()=>{
  render( 
    
    <BrowserRouter>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  
  </BrowserRouter>);


  const usernameInput=await screen.findByPlaceholderText(/email/i);
  const passwordInput=await screen.findByPlaceholderText(/password/i);

  fireEvent.change(usernameInput,{target:{value:'ndimov@postbank.b'}});
  fireEvent.change(passwordInput,{target:{value:'123'}});
  
  const submitButton=screen.getByText(/Вписване/i);
  await act(async ()=>{
    submitButton.click();
  
  })
  const errorMessage=await screen.findByText('Мейла не е в очаквания формат username@postbank.bg!');
  expect(errorMessage).toBeInTheDocument();
  

})

test('Check login form upon submit with username and password that match the format',async ()=>{
  render( 
    
    <BrowserRouter>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  
  </BrowserRouter>);


  const usernameInput=await screen.findByPlaceholderText(/email/i);
  const passwordInput=await screen.findByPlaceholderText(/password/i);

  fireEvent.change(usernameInput,{target:{value:'ndimov@postbank.bg'}});
  fireEvent.change(passwordInput,{target:{value:'123'}});
  
  const submitButton=screen.getByText(/Вписване/i);
  await act(async ()=>{
    submitButton.click();
  
  });

  const navigationOption=await screen.findByText('Network request failed');
  expect(navigationOption).toBeInTheDocument();
  

})

