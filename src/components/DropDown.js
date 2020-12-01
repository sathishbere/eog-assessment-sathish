import React from 'react';
import FormGroup from '@material-ui/core/FormGroup';
import FormControl from '@material-ui/core/FormControl';
import { useDispatch, useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core';
import { Dropdown } from 'semantic-ui-react'
import { selectedMetricActions } from '../Features/SelectedPressureReducer';

const useStyles = makeStyles(theme => ({
  highlight: {
    float: 'right',
    paddingRight: '10px'
  },
  skillList: {
    padding: '10px',
    '& .ui.fluid.dropdown': {
      width: '400px'
    }
  }
}));


export const DropDown = () => {
  const classes = useStyles();
  const heartBeat = useSelector(state => state.heartbeat);
  const dispatch = useDispatch();
  const options = [
    { key: 'casingPressure', text: 'casingPressure', value: 'casingPressure' },
    { key: 'flareTemp', text: 'flareTemp', value: 'flareTemp' },
    { key: 'injValveOpen', text: 'injValveOpen', value: 'injValveOpen' },
    { key: 'oilTemp', text: 'oilTemp', value: 'oilTemp' },
    { key: 'tubingPressure', text: 'tubingPressure', value: 'tubingPressure' },
    { key: 'waterTemp', text: 'waterTemp', value: 'waterTemp' }]
  const selectedList = useSelector(state => state.selectedActiveMetrics.selectedMetrics);
  const getList = (event, {value}) => {
    let selectedValue = event.target.textContent;
    if (selectedValue) {
      dispatch(
        selectedMetricActions.active({
          metricName: selectedValue,
          before: heartBeat.current,
          after: heartBeat.past,
        }),
      );
    } else {
     const metricIndex = selectedList.filter(element => {
        if(!value.includes(element.metricName)){
          return element
        }
     })
     dispatch(selectedMetricActions.remove(metricIndex && metricIndex[0].metricName));
    }
  }

  return (
    <div className={classes.highlight}>
      <FormControl component="fieldset">
        <FormGroup aria-label="position" row>
          <div className="skills-list" className={classes.skillList}>
            <Dropdown on placeholder='MetricList' onChange={getList} fluid multiple selection options={options} />
          </div>
        </FormGroup>
      </FormControl>
    </div>
  );
}

export default DropDown;
