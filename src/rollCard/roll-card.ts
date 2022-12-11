import {autoinject} from 'aurelia-dependency-injection';
import { Store } from 'aurelia-store';
import { getScore } from 'helpers/scoreHelper';
import { updateFrame } from 'state/app.actions';
import { ApplicationState } from 'types';


@autoinject()
export class RollCard {
  public state: ApplicationState;
  public score: number;
  private subscription: any;

  constructor(private store: Store<ApplicationState>) {  }

  onRollsChanged(index: number, rolls: number[]){
    this.store.dispatch(updateFrame, index, { rolls: rolls, score: 0})
  }

  bind() {
    this.subscription = this.store.state.subscribe(
      (state) => {
        state.rollCardState.frames = getScore(state.rollCardState.frames);
        this.score = state.rollCardState.frames.reduce((sum,next)=>+next.score+sum, 0);
        this.state = state;
      }
    );
    this.store.registerAction("UpdateFrame", updateFrame);
  }

  unbind(){
    this.subscription.unsubscribe();
    this.store.unregisterAction(updateFrame);
  }
}
