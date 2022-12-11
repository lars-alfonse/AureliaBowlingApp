import {bindable, observable} from 'aurelia-framework';
import { Frame } from 'types';

export class RollCardLine {
  @bindable callback = (x: any) => {}
  @bindable frame: Frame;
  @bindable index: number;
  @observable rolls: number[]
  @observable maxSecondRoll: number = 10;
  @observable maxThirdRoll: number = 10;
  private isLastFrame: boolean = false;

  frameChanged(newFrame: Frame){
    this.rolls = newFrame.rolls;
    this.frame = newFrame
  }

  indexChanged(newIndex: number){
    this.index = newIndex;
    this.isLastFrame = newIndex === 9;
  }

  inputUpdated(newValue: number, oldValue: number, i: number){
    this.rolls[i] = newValue;
    this.rollChanged();
  }

  rollChanged(){
    // gather initial values
    let updatedRolls = [...this.rolls];
    let firstRoll = updatedRolls[0];
    let secondRoll = updatedRolls[1];
    let isStrike = firstRoll == 10;
    let isSpare = firstRoll+secondRoll == 10;
    this.maxSecondRoll = 10-firstRoll;
    this.maxThirdRoll = 0;

    // handle last frame shenanigans 
    if(this.isLastFrame){
      if(isStrike){
        this.maxSecondRoll = 10;
        if(secondRoll == 10){
          this.maxThirdRoll = 10;
        }
        else{
          this.maxThirdRoll = 10-secondRoll;
        }
      }
      else if(isSpare){
        this.maxThirdRoll = 10;
      }

    }

    // handle if rolls are larger than max
    if(this.rolls[1]>this.maxSecondRoll){
      updatedRolls[1] = this.maxSecondRoll;
    }
    if(this.rolls[2] && this.rolls[2] > this.maxThirdRoll){
      updatedRolls[2] = this.maxThirdRoll;
    }

    // handle if rolls are less than zero
    for(let i = 0; i<updatedRolls.length; i++){
      if(updatedRolls[i] < 0 ){
        updatedRolls[i] = 0;
      }
    }

    this.rolls = updatedRolls;
    
    //let parent know rolls changed
    this.callback({index: this.index, rolls: this.rolls});
  }
}
