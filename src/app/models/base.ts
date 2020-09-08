export interface MessageResponse {
  message: string;
}

export interface StatusResponse extends MessageResponse {
  status: string;
}

export interface Response extends StatusResponse {
  payload: any;
}
