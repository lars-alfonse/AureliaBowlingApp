import { ApplicationState } from "types";

export const initialState: ApplicationState = {
  rollCardState:{
    frames: [
      {
        rolls: [2,8],
        score: 0
      },
      {
        rolls: [10,0],
        score: 0
      },
      {
        rolls: [1,3],
        score: 0
      },
      {
        rolls: [0,3],
        score: 0
      },
      {
        rolls: [10, 0],
        score: 0
      },
      {
        rolls: [9,1],
        score: 0
      },
      {
        rolls: [8,2],
        score: 0
      },
      {
        rolls: [7,3],
        score: 0
      },
      {
        rolls: [10, 0],
        score: 0
      },
      {
        rolls: [10, 10, 0],
        score: 0
      }
    ]
  }
}