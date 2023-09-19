import { Button, notification } from "antd";
import React, { useEffect, useMemo, useState } from "react";
import { keyCodes as keyCode } from "../Common/KeyCodes";
import { SetupPlotManager } from "../Common/PlotManagerHelpers";
import { CeateSensorWorker } from "../Sensor/SensorFactory";
import { PlotsManager } from "../uPlot/PlotManager";
import { useAppDispatch, useAppSelector, usePlotManager, useRecordManager, useSensorContexts, useSensorsService } from "../hooks/hook";
import { Snapshot } from "../ReportListener/Snapshot";
import { pause, reset, setStreamingView, showReport, toggleSettingsScreenModal, toggleTutorialScreenModal, toogleStreaming } from "../store/uiSlice";
import { sleep } from "../Common/Common";
import { SetupGroup } from "../Common/GroupHelpers";
import { CreateCsvFileDialog, FileWorker } from "../Common/FileHelpers";
import { ArrowLeftOutlined, BorderOutlined, CameraOutlined, CaretRightOutlined, FileSyncOutlined, FolderOpenOutlined, PauseOutlined, QuestionOutlined, SaveOutlined, SettingOutlined } from "@ant-design/icons";
import { Group } from "../store/groupsSlice";
import { AddSensor } from "./AddSensor";
import { AppSettingsTab } from "./Modals/AppSettings";
import { TutorialTab } from "./Modals/Tutorial";
import styles from "./Navbar.module.scss";
import { InvisibleContainer } from "../Components/InvisibleContainer";

export const NavbarReport = () => {
    const dispatch = useAppDispatch();
    const [sensorService] = useSensorsService();

    const firstStart = useAppSelector(state => state.ui.firstStart);
    const settings = useAppSelector(state => state.ui.settings);
    const viewingReport = useAppSelector(state => state.ui.viewingReport);
    const groups = useAppSelector(state => state.groups.groups);
    const streaming = useAppSelector(state => state.ui.streaming);
    const snapshot = useAppSelector(state => state.ui.snapshot);
    const tutorialVisible = useAppSelector(state => state.ui.tutorialVisible);
    const [plot, setPlot] = usePlotManager();
    const {pointsPerSecond} = useAppSelector(x => x.plot);

    const [recordController] = useRecordManager();
    const [fileWorker] = useState<FileWorker>(new FileWorker());

    const enable = useMemo(() => groups.length > 0, [groups]);
    const [disableStart, setDisableStart] = useState(false);

    const [contexts] = useSensorContexts();

    const openFileHandler = async (file: File) => {
        let snapshot = new Snapshot();
        await snapshot.FromFile(file).catch(() => 
        notification.error({
            message: `Не удалось открыть отчет ${file.name}`,
            duration: 3,
        }));

        if (!viewingReport)
        {
            for (let i = 0; i < groups.length; i++) {
                await sensorService.RemoveSensor(contexts.get(groups[i].id)?.sensorController!)
            }
        }


        try {
            //plotsManager?.UploadSnapshot(snapshot);
        } catch (ex) {
            notification.error({
                message: `Не удалось отобразить отчет: ${ex}`,
                duration: 3,
            });

            return;
        }

        dispatch(showReport(snapshot));

        notification.success({
            message: `Просмотр отчета ${file.name}`,
            duration: 2,
        });
    };

    const clear = async () => {
        if (streaming) 
            await stopHandler();
        
        plot?.Clear();
        //plot?.ClearLabels();
        //plot?.RebuildIfNessesary();
        groups.forEach((x: Group) => contexts.get(x.id)?.pipelineController.resetPeackAnalizer());

        dispatch(reset());
    };

    const starthandler = async (): Promise<void> => {
        await recordController.StartListening();
        //this.state.plotsManager?.RebuildIfNessesary();
        if (firstStart) {
            await sensorService.SetT0();
        }

        await sensorService.StartAll();


        const pipelines = Array.from(contexts.values()).map(x => x.pipelineController);
        SetupGroup(pipelines, pointsPerSecond); //настраиваем выравнивание даных согласно сетке графика.

        dispatch(toogleStreaming());
    };

    const stopHandler = async () => {
        await sensorService.StopAll();

        dispatch(pause());
    };

    const handleStartClick = async (): Promise<void> => {

        if (viewingReport) {
            dispatch(setStreamingView());
        }
        else {
            streaming
                ? await stopHandler()
                : await starthandler();
        }
    };

    useEffect(() => {
        const onKeyDown = async (event: KeyboardEvent) => {
            switch (event.keyCode) {
                case keyCode.SPACE:
                    await onStartClick();
                    break;
                case keyCode.KEY_C:
                    await onClearClick();
                    break;
                case keyCode.KEY_S:
                    await onScreenShotClick();
                    break;
                case keyCode.KEY_R:
                    await onSaveClick();
                    break;
                case keyCode.KEY_O:
                    await onOpenReportClick();
                    break;
                default:
                    break;
            }
        }

        document.addEventListener('keydown', onKeyDown, false);

        return () => {
            document.removeEventListener('keydown', onKeyDown);
        }
    }, []);

    const handleOpenFile = async () => {
        let input = document.createElement("input");
        input.type = "file";
        input.onchange = async () => {
            if (input.files && input.files?.length !== 1) return;
            let file = input.files?.item(0);
            if (!file) return;

            await openFileHandler(file);
        };

        input.click();
    };

    const handleFakerClick = async () => {
        let sensorWorker = await CeateSensorWorker("Faker");
        await sensorService.AddSensor(sensorWorker);
    };

    const handleScreen = async () => {
        //let screen = await plotsManager?.MakeScreen();
        //if (screen) {
        //    let anchor = document.createElement("a");
        //    anchor.setAttribute("download", "screen.png");
        //    anchor.setAttribute("href", screen);
        //    anchor.click();
        //}
    };

    const handleSettings = () => dispatch(toggleSettingsScreenModal());

    const handleSettingsClose = (werePlotSettingsChanges: boolean) => {
        dispatch(toggleSettingsScreenModal());
        if (werePlotSettingsChanges === true) {
            SetupPlotManager(plot as PlotsManager);
            clear();
        }
    };

    const disableStartClick = () => (!enable && !viewingReport) || disableStart;
    const disableClearClick = () => !enable || disableStart;
    const disableAddClick = () => streaming || viewingReport;
    const disableSaveClick = () => streaming || viewingReport || !recordController.thereIsData;

    const setStreamingModeView = () => {

        notification.info({
            message: "Режим графика реального времени.",
            duration: 4,
        });
    };


    const onStartClick = async () => {
        
        if (viewingReport)
            setStreamingModeView();
        else {
            setDisableStart(true);

            await handleStartClick().finally(() => {
                setDisableStart(false);
            });
        }
        
    };

    const onClearClick = async () => {
        if (!disableClearClick()) {
            setDisableStart(true);
            await clear().finally(() => {
                setDisableStart(false);
            });
        }
    };

    const saveReport = async () => {
        await fileWorker.OpenFile();
        let snapshot = recordController.StopListening();
        if (fileWorker.File) await snapshot.ToFile(fileWorker.File);

        notification.success({
            message: `Данные записаны в файл ${fileWorker.File?.name}`,
            duration: 4,
        });
    };

    const onScreenShotClick = async () => {
        await handleScreen();
    };

    const onSaveClick = async () => {
        if (!disableSaveClick()) {
            await saveReport();
        }
    };

    const onOpenReportClick = async () => {
        await handleOpenFile();
    };

    const onCSVDownload = async () => {
        let currentFile = await CreateCsvFileDialog();
        snapshot?.ToCSV(currentFile);
    };

    //
    //disableStartClick()
    //onClick={onStartClick}
    return(
        <div className={styles.nav_tab_container}>
            <Button title="Начать измерение. (Space)"
                size="large"
                id="Start"
                shape="default"
                disabled={false}
                icon={viewingReport ? <ArrowLeftOutlined /> : streaming ? <PauseOutlined /> : <CaretRightOutlined />}
                onClick={onStartClick}/>

            <Button title="Очистить результаты / Окончить эксперимент. (C)"
                disabled={disableClearClick()}
                size="large"
                id="clear"
                shape="default"
                icon={<BorderOutlined />}
                onClick={onClearClick} />

            <Button title="Сохранить как отчет. (R)"
                disabled={disableSaveClick()}
                size="large"
                id="screen"
                shape="default"
                icon={<SaveOutlined />}
                onClick={saveReport} />

            <Button title="Сделать скриншот. (S)"
                size="large"
                id="screen"
                shape="default"
                icon={<CameraOutlined />}
                onClick={onScreenShotClick} />

            <Button title="Открыть отчет. (O)"
                size="large"
                id="openfile"
                shape="default"
                icon={<FolderOpenOutlined />}
                onClick={onOpenReportClick} />

            <Button title="Настройки."
                disabled={streaming || !(!streaming && firstStart)}
                size="large"
                id="openfile"
                shape="default"
                icon={<SettingOutlined />}
                onClick={handleSettings} />

            
            <InvisibleContainer visible={viewingReport}>
                <Button title="Сохранить как CSV файл."
                    size="large"
                    id="openfile"
                    shape="default"
                    icon={<FileSyncOutlined />}
                    onClick={onCSVDownload} />
            </InvisibleContainer>

            <Button size="large"
                title="О программе"
                icon={<QuestionOutlined />}
                onClick={() => dispatch(toggleTutorialScreenModal())} />

            <AppSettingsTab />

            <AddSensor />

            <TutorialTab visible={tutorialVisible}
                         onClose={() => dispatch(toggleTutorialScreenModal())} />
        </div>
    );
}