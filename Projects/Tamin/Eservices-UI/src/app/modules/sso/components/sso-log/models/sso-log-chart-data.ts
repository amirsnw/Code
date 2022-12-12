export class SsoLogChartData {
  datasets: Array<SsoLogChartDataSet> = [];
  labels: Array<string>;
  title: string;
}

export class SsoLogChartDataSet {
  constructor(data: Array<number>, label: string, borderColor: any, backgroundColor: any) {
    this.data = data;
    this.label = label;
    this.borderColor = borderColor;
    this.backgroundColor = backgroundColor;
  }

  data: Array<number>;
  label: string;
  borderColor: any;
  backgroundColor: any;
}



