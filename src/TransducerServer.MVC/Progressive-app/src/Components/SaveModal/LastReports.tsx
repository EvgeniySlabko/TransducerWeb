
import {  Segmented, Select } from "antd"

import React from "react"
import { Snapshot } from "../../ReportListener/Snapshot"

export interface Props {
    snapshots: Snapshot[]
}

  interface IState {
	saveDialog: boolean;
	startStop: boolean;
  }

  
  export class LastReports extends React.Component<Props, IState>
  {
	constructor(prop: Props)
	{
		super(prop);

		this.state = {
			saveDialog: false,
			startStop: false,
		  };
	}
	

	
	render(){
		return (
			<Segmented
				options={[
					'Daily',
					{ label: 'Weekly', value: 'Weekly', disabled: true },
					'Monthly',
					{ label: 'Quarterly', value: 'Quarterly', disabled: true },
					'Yearly',
				]}
			/>
		)
    }
  }