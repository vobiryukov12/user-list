export interface IList {
  id: number,
  name: string
}

export interface IUser {
  id: number,
  name: string,
  avatar: string,
  details: {
    city: string,
    company: string,
    position: string
  }
}
