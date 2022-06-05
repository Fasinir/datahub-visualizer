import {ChartDataset} from "chart.js";
import {Outlier} from "./chart/outliers.model";

export class MobileData {
  name?: string;
  labels: string[] = [];
  datasets: ChartDataset[] = [];
  outliers: Outlier[] = [];
  colors: string[] = [];
  isSingleValue: boolean = false;
  singleValue?: number;
}
