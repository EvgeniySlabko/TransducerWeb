import { ArrowLeftOutlined, BorderOutlined, CameraOutlined, CaretRightOutlined, FileSyncOutlined, FolderOpenOutlined, PauseOutlined, QuestionOutlined, SaveOutlined, SettingOutlined } from "@ant-design/icons";
import { Button } from "antd";
import React from "react";
import { keyCodes as keyCode } from "../Common/KeyCodes";
import { SetupPlotManager } from "../Common/PlotManagerHelpers";
import { RecordManager } from "../ReportListener/RecordManager";
import { CeateSensorWorker } from "../Sensor/SensorFactory";
import { SensorController } from "../Sensor/SensorsManager/SensorsManager";
import { PlotsManager } from "../uPlot/PlotManager";
import { AddSensor } from "./AddSensor/AddSensor";
import { Group } from "./App";
import { AppSettingsTab } from "./AppSettings/AppSettingsTab";
import { PlotControlPanel } from "./ControlPanel/PlotControlPanel";
import { TutorialTab } from "./Tutorial/TutorialTab";

export interface Props {
    sensorService: SensorController;
    recordController: RecordManager;
    plotsManager?: PlotsManager;
    groups: Group[];
    enable: boolean;
    streaming: boolean;
    reportVieving: boolean;
    allowSettings: boolean;
    thereAreDataForSaving: boolean;
    
    saveReport: () => Promise<void>;
    clear: () => Promise<void>;
    toggleStreaming: () => Promise<void>;
    openReportCallback: (file: File) => void;
    setStreamingModeView: () => void;
    exportCsv: () => void;
}

interface IState {
    settings: boolean;
    disableStart: boolean;
    tutorialVisible: boolean;
}

export class Navbar extends React.Component<Props, IState> {
    constructor(prop: Props) {
        super(prop);

        this.state = {
            settings: false,
            disableStart: false,
            tutorialVisible: false,
        };

        document.addEventListener(
            "keydown",
            async (event: any) => {
                switch (event.keyCode) {
                    case keyCode.SPACE:
                        await this.onStartClick();
                        break;
                    case keyCode.KEY_C:
                        await this.onClearClick();
                        break;
                    case keyCode.KEY_S:
                        await this.onScreenShotClick();
                        break;
                    case keyCode.KEY_R:
                        await this.onSaveClick();
                        break;
                    case keyCode.KEY_O:
                        await this.onOpenReportClick();
                        break;
                    default:
                        break;
                }
            },
            false
        );
    }

    handleOpenFile = async () => {
        let input = document.createElement("input");
        input.type = "file";
        input.onchange = async () => {
            if (input.files && input.files?.length !== 1) return;
            let file = input.files?.item(0);
            if (!file) return;

            this.props.openReportCallback(file);
        };

        input.click();
    };

    handleFakerClick = async () => {
        let sensorWorker = await CeateSensorWorker("Faker");
        await this.props.sensorService.AddSensor(sensorWorker);
    };

    handleScreen = async () => {
        let screen = await this.props.plotsManager?.MakeScreen();
        if (screen) {
            let anchor = document.createElement("a");
            anchor.setAttribute("download", "screen.png");
            anchor.setAttribute("href", screen);
            anchor.click();
        }
    };

    handleSettings = () => this.setState({ settings: true });
    handleSettingsClose = (werePlotSettingsChanges: boolean) => {
        this.setState({ settings: false });
        if (werePlotSettingsChanges === true) {
            SetupPlotManager(this.props.plotsManager as PlotsManager);
            this.props.clear();
        }
    };

    private disableStartClick = () => (!this.props.enable && !this.props.reportVieving) || this.state.disableStart;
    private disableClearClick = () => !this.props.enable || this.state.disableStart;
    private disableAddClick = () => this.props.streaming || this.props.reportVieving;
    private disableSaveClick = () => this.props.streaming || this.props.reportVieving || !this.props.thereAreDataForSaving;

    private onStartClick = () => {
        if (!this.disableStartClick()) {
            if (this.props.reportVieving) this.props.setStreamingModeView();
            else {
                this.setState({ disableStart: true });
                this.props.toggleStreaming().finally(() => {
                    this.setState({ disableStart: false });
                });
            }
        }
    };

    private onClearClick = () => {
        if (!this.disableClearClick()) {
            this.setState({ disableStart: true });
            this.props.clear().finally(() => {
                this.setState({ disableStart: false });
            });
        }
    };

    private onScreenShotClick = async () => {
        await this.handleScreen();
    };

    private onSaveClick = async () => {
        if (!this.disableSaveClick()) {
            await this.props.saveReport();
        }
    };

    private onOpenReportClick = async () => {
        await this.handleOpenFile();
    };

    render() {
        return (
            <div className="nav-tab-container">
                <Button title="Начать измерение. (Space)" size="large" id="Start" shape="default" disabled={this.disableStartClick()} icon={this.props.reportVieving ? <ArrowLeftOutlined /> : this.props.streaming ? <PauseOutlined /> : <CaretRightOutlined />} onClick={this.onStartClick} />

                <Button title="Очистить результаты / Окончить эксперимент. (C)" disabled={this.disableClearClick()} size="large" id="clear" shape="default" icon={<BorderOutlined />} onClick={this.onClearClick} />

                <Button title="Сохранить как отчет. (R)" disabled={this.disableSaveClick()} size="large" id="screen" shape="default" icon={<SaveOutlined />} onClick={this.props.saveReport} />

                <Button title="Сделать скриншот. (S)" size="large" id="screen" shape="default" icon={<CameraOutlined />} onClick={this.onScreenShotClick} />

                <Button title="Открыть отчет. (O)" size="large" id="openfile" shape="default" icon={<FolderOpenOutlined />} onClick={this.onOpenReportClick} />

                <Button title="Настройки." disabled={this.props.streaming || !this.props.allowSettings} size="large" id="openfile" shape="default" icon={<SettingOutlined />} onClick={this.handleSettings} />



                {!this.props.reportVieving ? <></> : <Button title="Сохранить как CSV файл." size="large" id="openfile" shape="default" icon={<FileSyncOutlined />} onClick={this.props.exportCsv} />}

 
                <Button size="large" title="О программе" icon={<QuestionOutlined />} onClick={() => this.setState({tutorialVisible: true})} />

                <PlotControlPanel plotsManager={this.props.plotsManager} reportVieving={this.props.reportVieving} />
                <AppSettingsTab visible={this.state.settings} onClose={this.handleSettingsClose} />

                <AddSensor enabled={!this.disableAddClick()} sensorService={this.props.sensorService} />
              
                <TutorialTab visible={this.state.tutorialVisible}  onClose={() => this.setState({tutorialVisible: false})}/>
            </div>
        );
    }
}