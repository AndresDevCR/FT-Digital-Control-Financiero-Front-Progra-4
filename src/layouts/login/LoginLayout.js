import PropTypes from 'prop-types';
// @mui
import { Typography, Stack } from '@mui/material';
// components
import Logo from '../../components/logo';
import Image from '../../components/image';
//
import { StyledRoot, StyledSectionBg, StyledSection, StyledContent } from './styles';

// ----------------------------------------------------------------------

LoginLayout.propTypes = {
  title: PropTypes.string,
  children: PropTypes.node,
  illustration: PropTypes.string,
};

export default function LoginLayout({ children, illustration, title }) {
  return (
    <StyledRoot>
      <Logo
        sx={{
          zIndex: 9,
          position: 'absolute',
          mt: { xs: 1.5, md: 5 },
          ml: { xs: 2, md: 5 },
        }}
      />

      <StyledSection>
        {/* <Typography variant="h3" sx={{ mb: 10, maxWidth: 480, textAlign: 'center' }}>
          {title || 'Hi, Welcome back'}
        </Typography> */}

        <Image
          disabledEffect
          visibleByDefault
          alt="FT"
          src={illustration || '/assets/illustrations/FT-wa.jpeg'}
          sx={{
            width: { xs: 1, md: 'auto' },
            height: { xs: 1, md: 'auto' },
            maxWidth: { xs: '100%', md: '100%' },
            maxHeight: { xs: '100%', md: '100%' },
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            margin: 'auto',
          }}
        />

        <StyledSectionBg />
      </StyledSection>

      <StyledContent>
        <Stack sx={{ width: 1 }}> {children} </Stack>
      </StyledContent>
    </StyledRoot>
  );
}
