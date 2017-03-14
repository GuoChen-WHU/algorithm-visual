const DURATION = 1000;

var animation = {
  queue: [],
  timer: null,
  setup: function (setFrame) {
    this.stop();
    this.setFrame = setFrame;
  },
  loop: function () {
    var frame = this.queue.shift();
    if (frame) {
      this.setFrame(frame);
      this.timer = setTimeout(this.loop.bind(this), DURATION);
    }
  },
  addFrame: function (frame) {
    this.queue.push(frame);
  },
  start: function () {
    this.loop();
  },
  pause: function () {
    clearTimeout(this.timer);
  },
  stop: function () {
    clearTimeout(this.timer);
    this.queue = [];
  }
};

export default animation;
