import React from 'react';
import { Button, Checkbox, Collapse, Input, InputNumber, Modal, Slider } from 'antd';
import { VerticalAlignBottomOutlined } from '@ant-design/icons';
import { RecordController } from '../RecordController';
import { Snapshot } from '../ReportListener/Snapshot';

const { Panel } = Collapse;

  export interface Props {
    snapshot?: Snapshot,
    visible: boolean;
    onClose: () => void;
    maxAvgFactor: () => Promise<number>;
  }

  interface IState {
    reportName: string,
    csvName: string,
  }

  export class SaveModal extends React.Component<Props, IState>{
    
    constructor(prop: Props)
    {
      super(prop);
      this.state = {
        reportName: "Report.txt",
        csvName: "Report.csv",
      }
    }

    onCSVSaveAS = () =>
    {

    }

    onCSVDownload = async () =>
    {
        //var snapshot = this.props.recordController.StopListening();
        let minAvgFactor = await this.props.maxAvgFactor();
		    this.props.snapshot?.ToCSV(this.state.csvName, 1 / (5000 / minAvgFactor));
    }

    onReportSaveAS = () =>
    {
        
    }

    onReportDownload = () =>
    {
        //var snapshot = this.props.recordController.StopListening();
		  this.props.snapshot?.ToFile(this.state.reportName);
    }


    onOk = () =>
    {
        this.props.onClose();
    }

    render() {
      return (
        <div onClick={e => e.stopPropagation()}>
          <Modal title="Сохранить отчет: " 
          visible={this.props.visible} 
          onCancel={this.props.onClose} 
          onOk={this.props.onClose}
          centered={false}>
            <div className='vertical-flex'>

            <div className='vertical-flex margin'>
                <label className='margin vertical-alignment'>Сохранить в формате CSV: </label>
                <div className='horizontal-flex'>


                <Input className='margin' defaultValue={this.state.csvName} placeholder="Имя отчета" />  

                
                    <Button 
                    onClick={event => this.onCSVDownload } className='margin'  
                    icon={<VerticalAlignBottomOutlined onClick={ this.onCSVDownload } />}></Button>
             
                </div>
            </div>

            <div className='vertical-flex margin'>
                <label className='margin vertical-alignment'>Сохранить в формате отчета: </label>

                <div className='horizontal-flex'>
                    <Input className='margin' defaultValue={this.state.reportName} placeholder="Имя отчета" />
     
                    <Button 
                    onClick={event => this.onReportDownload } className='margin'  
                    icon={<VerticalAlignBottomOutlined onClick={ this.onReportDownload } />}></Button>
                </div>
            
            </div>
            
            <div className='vertical-flex'>
                {
                  this.props.snapshot?.GetTrackData().map(t => 
                      {
                          return <Checkbox defaultChecked = {true}>{t.style.legendTitle}</Checkbox>
                      })
                }
            </div>
            </div>
          </Modal>
        </div>
      )
    }
  }


  /*
  <InputNumber step={0.01 * this.props.group.node.fullSensorInfo.MaxValue}
            style={{ width: "auto" }}
            min={0} max={this.props.group.node.fullSensorInfo.MaxValue}
            value={this.state.treshold} onChange={this.tresholdChanged} />
  */
