export type HTTPResponses = 'SUCCESS'
| 'CREATED' | 'INVALID_DATA' | 'UNAUTHORIZED' | 'NOT_FOUND' | 'UNPROCESSABLE';

export type ServiceResponseError = {
  message: string
};
export type ServiceResponse<T> = {
  status: HTTPResponses,
  data: ServiceResponseError | T
};