class SuccessResponse {
  message: string;
  data: any;
  constructor({message, data}: {message: string; data: any} = {message: "Operation successful", data: null}) {
    this.message = message;
    this.data = data;
  }
}
export {SuccessResponse};
