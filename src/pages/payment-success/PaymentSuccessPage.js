import React from 'react';
import { styled } from '@mui/system';
import { useNavigate } from "react-router-dom";


const CustomButton = styled('button')({
  marginTop: '1.25rem',
  padding: '0.75rem 1.5rem',
  borderRadius: '0.375rem',
  backgroundColor: '#5271FF',
  color: 'white',
  fontSize: '1rem',
  fontWeight: '500',
  transition: 'background-color 300ms ease-in-out',
  cursor: 'pointer',
  border: 'none',
  '&:hover': {
    backgroundColor: '#6574cd',
  },
  '&:focus': {
    outline: 'none',
    boxShadow: '0 0 0 2px #4854a3',
  },
});

const PaymentSuccessPage = () => {

  const navigate = useNavigate();

  return (
    <div className="h-screen d-flex items-center justify-center bg-white" style={{marginTop: 300, flexDirection: 'column'}}>
      <div className="text-center">
        <div className="mx-auto flex items-center justify-center h-24 w-24 rounded-full bg-[#E0E7FF]">
          <i className='fa-solid fa-circle-check' style={{ fontSize: 48, color: '#5271FF' }} />
        </div>
        <h1 className="mt-3 text-lg font-semibold text-gray-900">Payment Successful!</h1>
        <p className="mt-2 text-base text-gray-600">Thank you for your purchase.</p>
        <CustomButton onClick={()=> {navigate('/home')}}>
          Continue Shopping!
        </CustomButton>
      </div>
    </div>
  );
};

export default PaymentSuccessPage;