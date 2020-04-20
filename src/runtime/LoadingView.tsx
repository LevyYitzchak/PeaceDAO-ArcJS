import * as React from "react";
import Popup from "reactjs-popup";
import { ComponentLogs, ComponentListLogs } from "../../src";
import { Loader, RenderFunc } from "./Loader";
import * as R from "ramda";
import Spinner from "react-spinkit";

interface Props {
  logs: ComponentLogs | ComponentListLogs;
}

export default class LoadingView extends React.Component<Props> {
  private errors: string[] = [];

  private findErrorKeys = (value: any, key: any) => {
    if (value && value["_error"]) {
      const error = value["_error"].message;

      // make sure the error isn't a duplicate
      const found = this.errors.indexOf(error) > -1;

      if (!found) {
        this.errors.push(error);
      }
    }
  };

  public render() {
    const { logs } = this.props;

    R.forEachObjIndexed(this.findErrorKeys, logs);
    return (
      <Loader.Render>
        {(customLoader: RenderFunc) =>
          customLoader ? (
            customLoader({ errors: this.errors })
          ) : (
            <Popup
              trigger={
                <div style={{ width: "30px" }}>
                  <Spinner name="double-bounce" />
                </div>
              }
              position="right center"
              on="hover"
              contentStyle={{
                width: "auto",
                display: "flex",
                flexWrap: "wrap",
              }}
            >
              <div>{this.errors.map((error) => error)}</div>
            </Popup>
          )
        }
      </Loader.Render>
    );
  }
}
