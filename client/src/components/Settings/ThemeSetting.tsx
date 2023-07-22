import styled from '@emotion/styled';
import { useRecoilState } from 'recoil';
import { TempDarkMode } from '../../recoil/atoms/atoms';
import MaterialUISwitch from './MaterialUISwitch';
import { useEffect, useMemo, useState } from 'react';
import { useTheme } from '@mui/material/styles';
import { LIGHT, DARK } from '../../theme/theme';

  const Container = styled.div({
    display: 'flex',
    flexDirection: 'column',
    margin: '10px 0px 40px 20px',
  })
  const ContentContainer = styled.div({
    display: 'flex',
    alignItems: 'center',
    width: '300px',
    gap: '10px',
    margin: '0px 40px',
    fontWeight: 'bold'
  })

const ThemeSetting = () => {
  const theme = useTheme();
  const defaultMode = theme.palette.mode === DARK ? DARK : LIGHT;
  const [mode, setMode] = useState<'light' | 'dark'>(defaultMode);
  
  const colorMode = useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === LIGHT ? DARK : LIGHT));
      },
    }),
    [],
  );

  const [, setTempDarkMode] = useRecoilState(TempDarkMode);
  useEffect(() => { 
    if (mode === LIGHT) { setTempDarkMode(false); }
    else if (mode === DARK) { setTempDarkMode(true); }
  }, [mode]);

  
  return (
    <Container>
      <h2>테마</h2>
      <ContentContainer>
        <label>밝게</label>
        {theme.palette.mode === DARK
          ? <MaterialUISwitch onClick={colorMode.toggleColorMode} defaultChecked />
          : <MaterialUISwitch onClick={colorMode.toggleColorMode} />}
        <label>어둡게</label>
      </ContentContainer>
    </Container>
  )
};
export default ThemeSetting;