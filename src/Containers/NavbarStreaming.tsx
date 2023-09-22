import { Button, notification } from "antd";
import React, { HTMLAttributes, useEffect, useMemo, useState } from "react";
import { keyCodes as keyCode } from "../Common/KeyCodes"; 
import { CeateSensorWorker } from "../Sensor/SensorFactory";
import { PlotsManager } from "../uPlot/PlotManager";
import { useAppDispatch, useAppSelector, usePlots, useRecordManager, useSensorContexts, useSensorsService } from "../hooks/hook";
import { Snapshot } from "../ReportListener/Snapshot";
import { pause, reset, showReport, toggleSettingsScreenModal, toggleTutorialScreenModal, toogleStreaming } from "../store/uiSlice";
import { SetupGroup } from "../Common/GroupHelpers";
import { CreateCsvFileDialog, FileWorker } from "../Common/FileHelpers";
import { BorderOutlined, CameraOutlined, CaretRightOutlined, FileSyncOutlined, FolderOpenOutlined, PauseOutlined, QuestionOutlined, SaveOutlined, SettingOutlined } from "@ant-design/icons";
import { Group } from "../store/groupsSlice";
import { AddSensor } from "./AddSensor";
import { AppSettingsTab } from "./Modals/AppSettings";
import { TutorialTab } from "./Modals/Tutorial";
import styles from "./Navbar.module.scss";

export interface Props extends HTMLAttributes<HTMLDivElement> {

}

export const NavbarStreaming = ({...rest}: Props) => {
    const dispatch = useAppDispatch();
    const [sensorService] = useSensorsService();
    const {firstStart, settings, streaming, tutorialVisible} = useAppSelector(state => state.ui);
    const groups = useAppSelector(state => state.groups.groups);

    const [plots] = usePlots();
    const pointsPerSecond = useAppSelector(x => x.groups.defaultPointsPerSecond);

    const [recordController] = useRecordManager();
    const [fileWorker] = useState<FileWorker>(new FileWorker());

    const enable = useMemo(() => groups.length > 0, [groups]);
    const [disableStart, setDisableStart] = useState(false);

    const [contexts] = useSensorContexts();

    //const disableStartClick = useMemo(() => (!enable && !viewingReport) || disableStart, [enable, disableStart])

    //const disableStartClick = () => (!enable && !viewingReport) || disableStart;
    //const disableClearClick = () => !enable || disableStart;
    //const disableAddClick = () => streaming;
    //const disableSaveClick = () => streaming || !recordController.thereIsData;

    const openFileHandler = async (file: File) => {
        let snapshot = new Snapshot();
        await snapshot.FromFile(file).catch(() => 
        notification.error({
            message: `Не удалось открыть отчет ${file.name}`,
            duration: 3,
        }));

        
        for (let i = 0; i < groups.length; i++) {
            await sensorService.RemoveSensor(contexts.get(groups[i].id)?.sensorController!)
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
        
        plots?.forEach(p => p.Clear());
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
        //if (werePlotSettingsChanges === true) {
         //   SetupPlotManager(plot as PlotsManager);
        //    clear();
        //}
    };

    const onStartClick = async () => {
        setDisableStart(true);
        
        streaming
            ? await stopHandler()
            : await starthandler();
    };

    const onClearClick = async () => {
        setDisableStart(true);
        await clear().finally(() => {
            setDisableStart(false);
        });
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
        await saveReport();
    };

    const onOpenReportClick = async () => {
        await handleOpenFile();
    };

    return(
        <div {...rest}>
            <Button title="Начать измерение. (Space)"
                size="large"
                id="Start"
                shape="default"
                disabled={false}
                icon={streaming ? <PauseOutlined /> : <CaretRightOutlined />}
                onClick={onStartClick}/>

            <Button title="Очистить результаты / Окончить эксперимент. (C)"
                size="large"
                id="clear"
                shape="default"
                icon={<BorderOutlined />}
                onClick={onClearClick} />

            <Button title="Сохранить как отчет. (R)"
                disabled={streaming || !recordController.thereIsData}
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

            <Button size="large"
                title="О программе"
                icon={<QuestionOutlined />}
                onClick={() => dispatch(toggleTutorialScreenModal())} />

            <AppSettingsTab />

            <AddSensor className={styles.add_sensor} />

            <TutorialTab visible={tutorialVisible}
                         onClose={() => dispatch(toggleTutorialScreenModal())} />
        </div>
    );
}