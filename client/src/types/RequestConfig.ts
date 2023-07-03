export interface RequestConfig<D> {
  headers?: Record<string, string>,
  data?: D,
  overrideToken?: string,
  showToastOnError?: boolean,
}
