import React, { HTMLAttributes, useMemo } from "react";
import { CellsCollapse } from "./CellsCollapse";
import { useAppSelector, useSensorContexts, useSensorsService } from "../../hooks/hook";
import { Group } from "../../store/groupsSlice";

export interface Props extends HTMLAttributes<HTMLDivElement>{

}

export const GroupsContainer = ({...rest}: Props) => {

    const groups = useAppSelector(state => state.groups.groups);
    const { streaming, firstStart } = useAppSelector(state => state.ui);
    const allowSettings = useMemo(() => !streaming && firstStart, [streaming, firstStart]);
    const [sensorService] = useSensorsService();
    const [contexts] = useSensorContexts()
    return(
        <div {...rest}>
            {
                groups.map((group, index) => <CellsCollapse
                                            pipelineController={contexts.get(group.id)!.pipelineController}
                                            key={group.fullSensorInfo.id} 
                                            allowSettings={allowSettings}
                                            group={group}/>)
            }
        </div>
    )
}
