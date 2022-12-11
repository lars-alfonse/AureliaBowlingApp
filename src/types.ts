
interface ApplicationState {
  rollCardState: RollCardState
}

interface RollCardState {
  frames: Frame[]
}

interface Frame {
  rolls: number[]
  score: number
}

export { Frame, RollCardState, ApplicationState }