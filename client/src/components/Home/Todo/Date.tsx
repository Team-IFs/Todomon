import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { today } from '../../../utils/today';
import styled from '@emotion/styled'

import dayjs from 'dayjs';
export default function Date() {
  const DateContainer = styled.div`
  width: 100%;
`
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer components={['SingleInputDateRangeField']}>
        <DateContainer>
          <DatePicker
            defaultValue={dayjs(today('datepicker'))}/>
        </DateContainer>
      </DemoContainer>
      </LocalizationProvider>
  );
}