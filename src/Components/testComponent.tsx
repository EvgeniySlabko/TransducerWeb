import React from "react";
import { MapDispatchToProps, connect } from "react-redux";
import { Button } from "antd";
import { AnyAction } from "redux";
import { ThunkDispatch } from "redux-thunk";
import { CameraOutlined } from "@ant-design/icons";
import { useAppDispatch, useAppSelector } from "../hooks/hook";
import { toogleStreaming } from "../store/uiSlice";


interface PropsFromState {
  streaming: boolean;
  toggle: () => any
}

type AllProps = PropsFromState;

export const TestComponent = () => {
  const streaming = useAppSelector(state => state.ui.streaming)
  const dispatch = useAppDispatch();

  return (
      <>
          <Button size="large" shape="default" icon={<CameraOutlined />} onClick={() => dispatch(toogleStreaming())} />
          <h2>{streaming.toString()}</h2>
      </> 
  );
};
