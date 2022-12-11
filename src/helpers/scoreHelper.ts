import { Frame } from "types";

const getScore = (frames: Frame[]): Frame[] =>{
  console.log(frames);
  for(let i=0; i<10; i++){
    frames[i].score = getScoreForFrame(i, frames);
  }
  return frames;
}

const getNextRollsSum = (numberOfRolls: number, currentFrame: number, frames: Frame[]) => {
  let sum = 0;
  let currentRollIndex=0;
  let rollsRemaining = numberOfRolls;
  let isStrike = false;
  while(rollsRemaining>0){
    let frame = frames[currentFrame];
    if(!frame){
      rollsRemaining = 0;
      continue;
    }
    if(currentRollIndex>=frame.rolls.length){
      if(currentFrame == 10){
        rollsRemaining = 0;
        continue;
      }
      else{
        sum+=getNextRollsSum(rollsRemaining,currentFrame+1, frames);
        rollsRemaining = 0;
        continue;
      }
    }
    if(isStrike){
      if(currentFrame == 10){
        isStrike = false;
        continue;
      }
      sum+=getNextRollsSum(rollsRemaining,currentFrame+1, frames);
      rollsRemaining = 0;
      continue;
    }
    let currentRoll = frame.rolls[currentRollIndex];
    if(currentRoll == 10 && currentRollIndex ==0)
      isStrike = true;
    sum+=currentRoll;
    rollsRemaining--;
  }

  return sum;
}

const getScoreForFrame = (index: number, frames: Frame[]) => {
  let frame = frames[index];
  let isStrike = isFrameStrike(frame);
  let isSpare =  isFrameSpare(frame);
  if(index == 9 || (!isStrike && !isSpare)){
    return frame.rolls.reduce((sum,next)=>next+sum, 0);
  }
  else if(isStrike){
    return 10+getNextRollsSum(2, index+1, frames);
  }
  else if(isSpare){
    return 10+getNextRollsSum(1, index+1, frames);
  }
}

const isFrameStrike = (frame: Frame): boolean =>{
  return frame.rolls[0] == 10;
}

const isFrameSpare = (frame: Frame): boolean =>{
  return frame.rolls[0]+frame.rolls[1] == 10 && !isFrameStrike(frame);
}

export {getScore};