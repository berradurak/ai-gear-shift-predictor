export interface TelemetryData {
  speedKmh: number;
  rpm: number;
  throttlePct: number;
  engineLoadPct: number;
}

export enum PredictionState {
  IDLE = 'IDLE',
  LOADING = 'LOADING',
  SUCCESS = 'SUCCESS',
  ERROR = 'ERROR'
}

export interface AnalysisResult {
  analysis: string;
  drivingStyle: string;
}

export enum NavView {
  PREDICTOR = 'PREDICTOR',
  README = 'README'
}
