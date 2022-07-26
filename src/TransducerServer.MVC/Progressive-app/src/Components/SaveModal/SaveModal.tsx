import React from 'react';
import { Button, Checkbox, Collapse, Input, InputNumber, Modal, Slider } from 'antd';
import { Snapshot } from '../../ReportListener/Snapshot';
import { SaveModalItem } from './SaveModalItem';
import { CreateCsvFileDialog, CreateTxtFileDialog } from '../../Common/Common';

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

    onCSVDownload = async (fileName: string) =>
    {
        let currentFile = await CreateCsvFileDialog(fileName);
        let minAvgFactor = await this.props.maxAvgFactor();  //Переделать
		    this.props.snapshot?.ToCSV(this.state.csvName, 1 / (5000 / minAvgFactor), currentFile);
    }

    onReportSaveAS = () =>
    {
        
    }

    onReportDownload = () =>
    {
        //var snapshot = this.props.recordController.StopListening();
		    //this.props.snapshot?.ToFile(this.state.reportName);
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

            <SaveModalItem download={this.onCSVDownload}
                           label='Сохранить в формате CSV:'
                           placeHolder="Имя отчета"
                           defaultName='Report.csv'

                           ></SaveModalItem>

            </div>
          </Modal>
        </div>
      )
    }
  }


  /*
  <div className='vertical-flex'>
                {
                  this.props.snapshot?.GetTrackData().map(t => 
                      {
                          return <Checkbox defaultChecked = {true}>{t.style.legendTitle}</Checkbox>
                      })
                }
            </div>
  <InputNumber step={0.01 * this.props.group.node.fullSensorInfo.MaxValue}
            style={{ width: "auto" }}
            min={0} max={this.props.group.node.fullSensorInfo.MaxValue}
            value={this.state.treshold} onChange={this.tresholdChanged} />
  */
