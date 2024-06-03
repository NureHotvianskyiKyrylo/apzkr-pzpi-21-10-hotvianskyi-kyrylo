import { useTranslation } from 'react-i18next';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { Box, Button, Container, IconButton, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import BathtubIcon from '@mui/icons-material/Bathtub';
import BeachAccessIcon from '@mui/icons-material/BeachAccess';

const Home = () => {
 const { t } = useTranslation();

 return (
   <Container>
     <Box textAlign="center" mt={10}>
       <Typography variant="h4" gutterBottom>
         {t('homePageTitle')}
       </Typography>
       <Typography variant="subtitle1" color="textSecondary" paragraph>
         {t('homePageSubtitle1')}
       </Typography>

       <Box mt={4}>
         <IconButton color="primary">
           <BathtubIcon fontSize="large" />
         </IconButton>
         <IconButton color="primary">
           <BeachAccessIcon fontSize="large" />
         </IconButton>
       </Box>

       <Box mt={5}>
         <Button
           variant="contained"
           color="primary"
           size="large"
           endIcon={<ArrowForwardIcon />}
           component={Link}
           to="/sign-up"
         >
           {t('getStarted')}
         </Button>
       </Box>
     </Box>
   </Container>
 );
};

export default Home;
