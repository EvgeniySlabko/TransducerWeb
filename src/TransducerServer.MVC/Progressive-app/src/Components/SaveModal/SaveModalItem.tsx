import React from 'react';
import { Button, Checkbox, Collapse, Input, InputNumber, Modal, notification } from 'antd';
import { SaveOutlined, VerticalAlignBottomOutlined } from '@ant-design/icons';
const { Panel } = Collapse;

  export interface Props {
    label: string,
    placeHolder: string,
    defaultName?: string;
    download: (fileName: string) => void
  }

  interface IState {
    reportName: string,
}

  export class SaveModalItem extends React.Component<Props, IState>{
    
    constructor(prop: Props)
    {
      super(prop);
      this.state ={
        reportName: "Report.txt",
      }
    }

    onChange = (fileName: string) =>{
        this.state = {
            reportName: fileName
          }
    }
    render() {
      return (
        <>

        <div className='vertical-flex margin'>
                <label className='margin vertical-alignment'>{this.props.label}</label>
                <div className='horizontal-flex'>
                    <Input className='margin' 
                           style={{height: "32px"}} 
                           defaultValue={this.props.defaultName ? this.props.defaultName : "Report.txt"}
                           onChange={(e) => this.onChange(e.target.value)}
                           placeholder={this.props.placeHolder} />
     
                    <Button onClick={ (event) =>  this.props.download(this.state.reportName) } 

                    icon={<SaveOutlined  onClick={ (event) => this.props.download(this.state.reportName) } />}></Button>
                </div>
            </div>
        </>
      )
    }
  }
  