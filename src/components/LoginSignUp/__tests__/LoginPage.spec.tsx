import React from 'react';
import LoginPage from 'components/LoginSignUp/LoginPage';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import * as Toast from 'contexts/ToastContext';
import * as Auth from 'contexts/AuthContext';

const ToastMock = jest.spyOn(Toast, 'useToast');
const setToast = jest.fn();
const AuthMock = jest.spyOn(Auth, 'useAuth');
AuthMock.mockReturnValue({
  loading: false,
  logout: jest.fn(),
  setLoggedIn: jest.fn(),
  user: { email: '', username: '' },
  isAuthenticated: false,
});
ToastMock.mockReturnValue({
  message: '',
  open: true,
  page: '/',
  type: 'SUCCESS',
  setToast,
});

const heading = 'Welcome back';
const subHeading = "You've been missed";
const oAuthText = 'Login with';
const buttonText = 'Login';
const credentialsText = 'Or login with credentials';

test('Props are rendered correctly', () => {
  const { getByText } = render(
    <LoginPage
      heading={heading}
      subHeading={subHeading}
      oAuthText={oAuthText}
      buttonText={buttonText}
      credentialsText={credentialsText}
    />,
  );
  expect(Toast.useToast).toHaveBeenCalled();
  expect(getByText(heading)).toBeInTheDocument();
  expect(getByText(subHeading)).toBeInTheDocument();
  expect(getByText(oAuthText)).toBeInTheDocument();
  expect(getByText(buttonText)).toBeInTheDocument();
  expect(getByText(credentialsText)).toBeInTheDocument();
});

test('Login button is disabled if clicked on without filling the form', async () => {
  const { getByRole, findByRole } = render(
    <LoginPage
      heading={heading}
      subHeading={subHeading}
      oAuthText={oAuthText}
      buttonText={buttonText}
      credentialsText={credentialsText}
    />,
  );
  expect(getByRole('button', { name: buttonText })).not.toBeDisabled();
  await userEvent.click(getByRole('button', { name: buttonText }));
  expect(await findByRole('button', { name: buttonText })).toBeDisabled();
});
