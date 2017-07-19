//only work for one ant
class History {

  constructor() {
    this.record = [];
    this.isRecording = false;
  }

  start() {
    this.isRecording = true;
  }

  reset() {
    this.record =  [];
    this.isRecording = false;
  }

  stop() {
    this.isRecording = false;
  }

  recordStep(step, ant, gridArray) {
    const { x, y } = ant;
    if(this.isRecording) {
      this.record[step] = { x, y, grid: gridArray };
    }
  }

  getTo(step) {
    if(!this.record[step]) {
      return null;
    }
    return this.record[step];
  }
  
}

export default History;