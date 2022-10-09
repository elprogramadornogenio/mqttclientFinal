import { ISensor } from "./sensor";
import { IDato } from './datos';

export interface IDataSensor {
    ok: boolean;
    listaSensores?: ISensor[];
    datos?: IDato[];
}