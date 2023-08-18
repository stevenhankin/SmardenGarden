import './App.css';
import { useEffect, useState } from 'react';
import { Button } from '@mui/material';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

interface FacebookMeApiResponse {
  id: string;
  name: string;
}

const isFacebookMeApiResponse = (
  response: unknown
): response is FacebookMeApiResponse =>
  response !== null &&
  typeof response === 'object' &&
  'id' in response &&
  typeof response.id === 'string' &&
  'name' in response &&
  typeof response.name === 'string';

function App() {
  const [user, setUser] = useState<FacebookMeApiResponse>();
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    if (!user) {
      FB.getLoginStatus((response) => {
        console.log({ response });
        FB.api('/me', (response) => {
          if (isFacebookMeApiResponse(response)) {
            // console.log({ response });
            console.log('Good to see you, ' + response.name + '!!');
            setUser(response);
          }
          setChecked(true);
        });
      });
    } else {
      setChecked(true);
    }
  }, [user]);

  const login = () => {
    FB.login(function (response) {
      console.log({ response });
      if (response.authResponse) {
        console.log('Welcome!  Fetching your information.... ');
        FB.api('/me', function (response) {
          if (isFacebookMeApiResponse(response)) {
            console.log('Good to see you, ' + response.name + '.');
            setUser(response);
          }
          setChecked(true);
        });
      } else {
        setChecked(true);
        console.log('User cancelled login or did not fully authorize.');
      }
    });
  };

  return (
    <>
      <h1>Smarden Gardeners' Society</h1>

      {!checked ? null : !user ? (
        <Button variant='contained' onClick={login}>
          Login
        </Button>
      ) : (
        <h3>Hello {user.name}!</h3>
      )}
    </>
  );
}

export default App;
