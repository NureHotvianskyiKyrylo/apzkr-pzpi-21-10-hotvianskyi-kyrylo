import {Box, Button, Container, MenuItem, Paper, Select, TextField, Typography} from "@mui/material";
import { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import authService from '../features/authService';
import useAuth from '../hooks/useAuth';
import { AuthResultDto } from '../interfaces/account';
import { useTranslation } from "react-i18next";

const SignUp = () => {
  const { setAuth } = useAuth();
  const { t } = useTranslation();
  const navigate = useNavigate();

  const [currentStep, setCurrentStep] = useState(1);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [gender, setGender] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');

  const handleSignUp = async () => {
    let genderForRequest;
    if (gender === 'Male' || gender === 'Чоловіча') {
      genderForRequest = 'male';
    }
    else if (gender === 'Female' || gender === 'Жіноча')
      genderForRequest = 'female';
    else throw new Error('CRINGE');
    const result: AuthResultDto = await authService.signUp(email, password, firstName, lastName, genderForRequest, dateOfBirth)
    setAuth(result);
    saveToLocalStorage(result);
    navigate("/");
  };

  const saveToLocalStorage = async (authResult : AuthResultDto) => {
    localStorage.setItem('accessToken', authResult.bearer!);
    localStorage.setItem('userId', authResult.userId!);
    localStorage.setItem('role', authResult.role!);
  }

  const handleBack = () => {
    setCurrentStep(currentStep - 1);
  };

  const handleNext = () => {
    setCurrentStep(currentStep + 1);
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <>
            <Typography variant="h5" gutterBottom align="center" mb={2}>
              {t('createNewAccount')}
            </Typography>
            <Box display="flex" flexDirection="column" gap="15px" mb={3} px={3}>
              <TextField
                  label={t('firstName')}
                  variant="outlined"
                  fullWidth
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
              />
              <TextField
                  label={t('lastName')}
                  variant="outlined"
                  fullWidth
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
              />
              {/*<TextField*/}
              {/*    label={t('sex')}*/}
              {/*    variant="outlined"*/}
              {/*    fullWidth*/}
              {/*    value={sex}*/}
              {/*    onChange={(e) => setSex(e.target.value)}*/}
              {/*/>*/}
              <Select
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                  fullWidth
              >
                <MenuItem id="male" value={t('male')}>{t('male')}</MenuItem>
                <MenuItem id="female" value={t('female')}>{t('female')}</MenuItem>
              </Select>
              <TextField
                    label={t('dateOfBirth')}
                    variant="outlined"
                    fullWidth
                    value={dateOfBirth}
                    onChange={(e) => setDateOfBirth(e.target.value)}
              />
            </Box>
            <Box display="flex" justifyContent="space-between" flexDirection="row" mb={3} px={3}>
              <Button variant="contained" color="primary" onClick={handleNext}>
                  {t('next')}
              </Button>
            </Box>
            <Box display="flex" justifyContent="center" flexDirection="column" gap="15px" mb={3} px={10}>
              <Typography variant="h6" align="center">
                {t('alreadyRegistered')}
              </Typography>
              <Button variant="contained" color="primary" component={Link} to="/login">
                {t('logIn')}
              </Button>
            </Box>
          </>
        );
      case 2:
        return (
          <>
            <Typography variant="h5" gutterBottom align="center" mb={2}>
              {t('enterYourEmailAndPassword')}
            </Typography>
            <Box display="flex" flexDirection="column" gap="15px" mb={3} px={3}>
              <TextField
                  label={t('email')}
                  variant="outlined"
                  fullWidth
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
              />
              <TextField
                  label={t('password')}
                  variant="outlined"
                  fullWidth
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
              />
            </Box>
            <Box display="flex" justifyContent="space-between" flexDirection="row" mb={3} px={3}>
              <Button variant="outlined" color="primary" onClick={handleBack}>
                  {t('back')}
              </Button>
              <Button variant="contained" color="primary" onClick={handleSignUp}>
                  {t('signUp')}
              </Button>
            </Box>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <Container maxWidth="xs">
      <Paper elevation={3} style={{ padding: '20px', marginTop: '50px' }}>
        {renderStep()}
      </Paper>
    </Container>
  );
};

export default SignUp;