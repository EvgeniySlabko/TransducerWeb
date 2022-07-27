import { Collapse, Modal } from 'antd';
import React from 'react';
import { CreateCsvFileDialog } from '../../Common/Common';
import { Snapshot } from '../../ReportListener/Snapshot';
import { SaveModalItem } from './SaveModalItem';
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

  constructor(prop: Props) {
    super(prop);
    this.state = {
      reportName: "Report.txt",
      csvName: "Report.csv",
    }
  }

  onCSVDownload = async (fileName: string) => {
    let currentFile = await CreateCsvFileDialog(fileName);
    let minAvgFactor = await this.props.maxAvgFactor();  //Переделать
    this.props.snapshot?.ToCSV(this.state.csvName, 1 / (5000 / minAvgFactor), currentFile);
  }

  onOk = () => {
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
              defaultName={this.state.csvName} />

          </div>
        </Modal>
      </div>
    )
  }
}
