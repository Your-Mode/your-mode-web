export interface User {
  id: string
  name: string
  email: string
  bodyType: "웨이브" | "스트레이트" | "내추럴"
  height?: number
  weight?: number
  phone?: string
}

export interface UserStats {
  customContents: number
  favorites: number
  comments: number
}

export interface UserProfile extends User {
  stats: UserStats
}
