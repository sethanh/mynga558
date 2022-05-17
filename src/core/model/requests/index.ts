export interface ActionProps {
  type: string
  payload: any
  callback?: (data?: any) => void
}

export interface SignInRequestProps {
  email: string
  password: string
}