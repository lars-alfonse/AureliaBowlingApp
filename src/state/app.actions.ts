import { ApplicationState, Frame } from "types";

const updateFrame = (state: ApplicationState, index: number, frame: Frame): ApplicationState => {
  const newState = {...state}
  newState.rollCardState = {...state.rollCardState}
  newState.rollCardState.frames = state.rollCardState.frames.map((x,i)=>{
    if(i == index )
      return frame;
    else
      return x;
  });
  return newState;
}

export { updateFrame }