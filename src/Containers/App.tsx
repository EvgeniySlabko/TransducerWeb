import React, {  } from "react";
import styles from "./App.module.scss";
import { Snapshot } from "../ReportListener/Snapshot";
import { SensorWorker } from "../Sensor/SensorWorker";
import { GroupsContainer } from "./ChannelCells/GroupsContainer";
import { useAppSelector } from "../hooks/hook";
import { NavbarStreaming } from "./NavbarStreaming";
import { Plot } from "./Plot";
import Switch, { Case } from "react-switch-case";

export interface Props {
    currentSnapshot: Snapshot | undefined;

    resetUi: () => void
    showSnapshot: (snapshot: Snapshot) => void
    pause: () => void
    setStreamingView: () => void
}

const App = () => {
    const { streaming, firstStart, viewingReport } = useAppSelector(state => state.ui)

    const sensorCloseHandler = async (sensorWorker: SensorWorker, args: string) => {
        //let index = groups.findIndex((g) => g.worker === sensorWorker);
        //console.debug("Removing sensor with id: ", groups[index].fullSensorInfo.SensorId);
        //setGroups(groups.splice(index, 1));

        if (!streaming && firstStart) {
            //plotsManager?.Rebuild();
        }

        //await this.props.sensorService.StopAll();
        //if (this.state.groups.length === 0) {
        //    this.setState({
        //        streaming: false,
        //    });
        //}

        //this.forceUpdate();
    };

    /*
    const saveReport = async () => {
        await fileWorker.OpenFile();
        let snapshot = recordController.StopListening();
        if (fileWorker.File) await snapshot.ToFile(fileWorker.File);

        notification.success({
            message: `Данные записаны в файл ${fileWorker.File?.name}`,
            duration: 4,
        });
    };
*/
     return(
         <>
             <Switch condition={viewingReport}>
                <Case value={true}>
                    <span>Report</span>
                </Case>
                <Case value={false}> 
                    <NavbarStreaming className={styles.nav_tab_container} />
                    <div className={ styles.middle_container }>
                        <GroupsContainer className={styles.left_container} />
                        <Plot className={styles.streaming_plot} />
                    </div>
                </Case>
            </Switch>

        </>
    )
}
    
export default App;

