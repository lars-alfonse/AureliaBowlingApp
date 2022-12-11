import {bindable} from 'aurelia-framework';

export class RollInput {
  @bindable callback = (x: any) => {}
  @bindable value;
  @bindable input;
  @bindable min: number;
  @bindable max: number;

  inputChanged(newinput: number){
    this.value = newinput;
    this.input = newinput
  }

  valueChanged(newValue){
    if(newValue){
      this.callback({newValue: parseInt(newValue), oldValue: this.input});
    }
  }
}
