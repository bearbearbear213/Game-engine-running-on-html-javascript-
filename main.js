var taglist = (name) => {
    var objects = document.getElementsByTagName(name);
    for (var n in [...Array(objects.length)]) {
      objects[n] = objects[n];
    }
    return objects;
  };
  function col(rect1, rect2) {
    //     { x: 左上のx座標, y: 左上のy座標, width: 幅, height: 高さ }
    return !(
      rect1.x + rect1.width / 2 < rect2.x - rect2.width / 2 ||
      rect2.x + rect2.width / 2 < rect1.x - rect1.width / 2 ||
      rect1.y + rect1.height / 2 < rect2.y - rect2.height / 2 ||
      rect2.y + rect2.height / 2 < rect1.y - rect1.height / 2
    );
  }
  class use_drag_object {
    constructor(objectnames = ["draggable"]) {
      document.body.style += `width:100vw;height:100vh;overflow:hidden;`;
      this.objects2 = [];
      for (this.m of objectnames) {
        this.objects = document.getElementsByTagName(this.m);
        this.mouse_positionX;
        this.mouse_positionY;
        this.target_object = null;
        for (this.n in [...Array(this.objects.length)]) {
          this.objects2.push(this.objects[this.n]);
        }
      }
      this.objects = this.objects2;
      for (this.k of this.objects) {
        this.k.style.position = "absolute";
        this.k.addEventListener("pointerdown", (e) => {
          if (this.objects.includes(e.target)) {
            this.target_object = e.target;
            this.mouse_positionX =
              e.clientX - e.target.getBoundingClientRect().x;
            this.mouse_positionY =
              e.clientY - e.target.getBoundingClientRect().y;
          }
        });
        this.k.addEventListener("pointermove", (e) => {
          if (
            !(this.target_object == null) &&
            e.target == this.target_object
          ) {
            this.target_object.style.left =
              ((e.clientX -
                e.target.parentNode.getBoundingClientRect().x -
                this.mouse_positionX) /
                this.target_object.parentNode.getBoundingClientRect().width) *
              100 +
              "%";
            this.target_object.style.top =
              ((e.clientY -
                e.target.parentNode.getBoundingClientRect().y -
                this.mouse_positionY) /
                this.target_object.parentNode.getBoundingClientRect()
                  .height) *
              100 +
              "%";
          }
        });
        this.k.addEventListener("pointerup", (e) => {
          if (
            !(this.target_object == null) &&
            e.target == this.target_object
          ) {
            this.target_object.style.left =
              ((e.clientX -
                e.target.parentNode.getBoundingClientRect().x -
                this.mouse_positionX) /
                this.target_object.parentNode.getBoundingClientRect().width) *
              100 +
              "%";
            this.target_object.style.top =
              ((e.clientY -
                e.target.parentNode.getBoundingClientRect().y -
                this.mouse_positionY) /
                this.target_object.parentNode.getBoundingClientRect()
                  .height) *
              100 +
              "%";
            this.target_object = null;
          }
        });
        this.k.addEventListener("touchstart", (e) => {
          if (this.objects.includes(e.target)) {
            this.target_object = e.target;
            this.mouse_positionX =
              e.touches[0].clientX - e.target.getBoundingClientRect().x;
            this.mouse_positionY =
              e.touches[0].clientY - e.target.getBoundingClientRect().y;
          }
        });
        this.k.addEventListener("touchmove", (e) => {
          if (
            !(this.target_object == null) &&
            e.target == this.target_object
          ) {
            this.target_object.style.left =
              ((e.changedTouches[0].clientX -
                e.target.parentNode.getBoundingClientRect().x -
                this.mouse_positionX) /
                this.target_object.parentNode.getBoundingClientRect().width) *
              100 +
              "%";
            this.target_object.style.top =
              ((e.changedTouches[0].clientY -
                e.target.parentNode.getBoundingClientRect().y -
                this.mouse_positionY) /
                this.target_object.parentNode.getBoundingClientRect()
                  .height) *
              100 +
              "%";
          }
        });
        this.k.addEventListener("touchend", (e) => {
          if (
            !(this.target_object == null) &&
            e.target == this.target_object
          ) {
            this.target_object.style.left =
              ((e.changedTouches[0].clientX -
                e.target.parentNode.getBoundingClientRect().x -
                this.mouse_positionX) /
                this.target_object.parentNode.getBoundingClientRect().width) *
              100 +
              "%";
            this.target_object.style.top =
              ((e.changedTouches[0].clientY -
                e.target.parentNode.getBoundingClientRect().y -
                this.mouse_positionY) /
                this.target_object.parentNode.getBoundingClientRect()
                  .height) *
              100 +
              "%";
            this.target_object = null;
          }
        });
      }
    }
  }
  class controller {
    constructor() {
      document.body.innerHTML += `<controller_sub
      style="
        width: 15vmin;
        height: 1.5vmin;
        background: rgba(150, 150, 150, 0.5);
        top:70%;
        right:20%;
      ">
      <controller_sub_btn
        style="
          position: absolute;
          width: 100%;
          height: 1000%;
          border-radius: 50%;
          background: rgba(150, 150, 150, 0.5);
          left: 0%;
          top: 120%;
        "></controller_sub_btn>
      </controller_sub>
    <controller_main
      style="
        width: 25vmin;
        height: 2.5vmin;
        background: rgba(150, 150, 150, 0.5);
        top:60%;
        left:20%;
      "
    >
    <controller_change
    style="
          position: absolute;
          width: 10%;
          height: 100%;
          background: rgba(0, 0, 150, 0.5);
          left: 0%;
          top: 0%;
          display:block
        "></controller_change>
    <controller_dis
    style="
          position: absolute;
          width: 10%;
          height: 100%;
          background: rgba(150, 0, 0, 0.5);
          right: 0%;
          top: 0%;
          display:block
        "></controller_dis>
      <controller_btns style="
          position: absolute;
          left: 0%;
          top: 120%;
          height:100%;
          width:100%;
          background:rgba(0,0,0,0);
          display:none">
          <controller_btn1
      style="
            position: absolute;
            width: 25%;
            height: 250%;
            background: rgba(150, 150, 150, 0.5);
            left: 37.5%;
            top: 120%;
          display:block
          "></controller_btn1>
          <controller_btn2
      style="
            position: absolute;
            width: 25%;
            height: 250%;
            background: rgba(150, 150, 150, 0.5);
            left: 37.5%;
            top: 740%;
          display:block
          "></controller_btn2>
          <controller_btn4
      style="
            position: absolute;
            width: 25%;
            height: 250%;
            transform: rotate(0.25turn);
            background: rgba(150, 150, 150, 0.5);
            left: 70%;
            top: 425%;
          display:block
          "></controller_btn4>
          <controller_btn3
      style="
            position: absolute;
            width: 25%;
            height: 250%;
            background: rgba(150, 150, 150, 0.5);
            left: 5%;
            transform: rotate(-0.25turn);
            top: 425%;
          display:block
          "></controller_btn3>
      </controller_btns>
      <controller_boder
        style="
          position: absolute;
          width: 100%;
          height: 1000%;
          border-radius: 50%;
          background: rgba(150, 150, 150, 0.5);
          left: 0%;
          top: 120%;
          display:block
        "
      >
        <controller_key_dis
          style="
            position: absolute;
            width: 40%;
            height: 40%;
            border-radius: 50%;
            background: rgba(150, 150, 150, 0.5);
          "
        ></controller_key_dis>
        <controller_key
          style="
            width: 40%;
            height: 40%;
            border-radius: 50%;
            background: rgba(150, 150, 150, 0);
          "
        ></controller_key>
      </controller_boder>
    </controller_main>`;
      document.body.innerHTML += ``;
      this.fps = 0;
      this.start = Date.now();
      this.frame = 0;
      new use_drag_object([
        "controller_key",
        "controller_main",
        "controller_sub",
      ]);
      this.stick = taglist("controller_key")[0];
      this.boder = taglist("controller_boder")[0];
      this.main = taglist("controller_main")[0];
      this.stick_dis = taglist("controller_key_dis")[0];
      this.keys = taglist("controller_btns")[0];
      this.btn1 = taglist("controller_btn1")[0];
      this.btn2 = taglist("controller_btn2")[0];
      this.btn3 = taglist("controller_btn3")[0];
      this.btn4 = taglist("controller_btn4")[0];
      this.btnflag = [false, false, false, false];
      this.change = taglist("controller_change")[0];
      this.dis = taglist("controller_dis")[0];
      this.having = false;
      this.type = false;
      this.display = true;
      this.sub = taglist("controller_sub")[0];
      this.sub_btn = taglist("controller_sub_btn")[0];
      this.sub_dis = taglist("controller_sub_dis")[0];
      this.sub_display = true;
      this.keybord = [false, false, false, false, false]
      document.addEventListener("keydown", (e) => {
        if (["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].includes(e.code)) {
          this.btnflag[["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].indexOf(e.code)] = true
        } if (["KeyW", "KeyS", "KeyA", "KeyD"].includes(e.code)) {
          this.btnflag[["KeyW", "KeyS", "KeyA", "KeyD"].indexOf(e.code)] = true
        }
        if (["", "Space"].includes(e.code)) {
          this.btn = true
        }
      })
      document.addEventListener("keyup", (e) => {
        if (["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].includes(e.code)) {
          this.btnflag[["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].indexOf(e.code)] = false
        } if (["KeyW", "KeyS", "KeyA", "KeyD"].includes(e.code)) {
          this.btnflag[["KeyW", "KeyS", "KeyA", "KeyD"].indexOf(e.code)] = false
        }
        if (["", "Space"].includes(e.code)) {
          this.btn = false
        }
      })
      this.btn = false;
      this.sub_btn.addEventListener("mousedown", () => {
        this.btn = true;
      });
      this.sub_btn.addEventListener("mouseleave", () => {
        this.btn = false;
      });
      this.sub_btn.addEventListener("mouseup", () => {
        this.btn = false;
      });
      this.sub_btn.addEventListener("touchstart", () => {
        this.btn = true;
      });
      this.sub_btn.addEventListener("touchend", () => {
        this.btn = false;
      });
      this.change.addEventListener("mousedown", () => {
        this.type = !this.type;
      });
      this.dis.addEventListener("mousedown", () => {
        this.display = !this.display;
      });
      this.stick.addEventListener("touchstart", (e) => {
        this.having = true;
      });
      this.stick.addEventListener("touchend", (e) => {
        this.having = false;
      });
      this.stick.addEventListener("mousedown", (e) => {
        this.having = true;
      });
      this.stick.addEventListener("mouseup", (e) => {
        this.having = false;
      });
      this.stick.addEventListener("mouseleave", () => {
        this.having = false;
      });
      this.btn1.addEventListener("mousedown", () => {
        this.btnflag[0] = true;
      });
      this.btn1.addEventListener("mouseleave", () => {
        this.btnflag[0] = false;
      });
      this.btn1.addEventListener("mouseup", () => {
        this.btnflag[0] = false;
      });
      this.btn1.addEventListener("touchstart", () => {
        this.btnflag[0] = true;
      });
      this.btn1.addEventListener("touchend", () => {
        this.btnflag[0] = false;
      });
      this.btn2.addEventListener("mousedown", () => {
        this.btnflag[1] = true;
      });
      this.btn2.addEventListener("mouseup", () => {
        this.btnflag[1] = false;
      });
      this.btn2.addEventListener("touchstart", () => {
        this.btnflag[1] = true;
      });
      this.btn2.addEventListener("touchend", () => {
        this.btnflag[1] = false;
      });
      this.btn1.addEventListener("mouseleave", () => {
        this.btnflag[1] = false;
      });
      this.btn3.addEventListener("mousedown", () => {
        this.btnflag[2] = true;
      });
      this.btn3.addEventListener("mouseup", () => {
        this.btnflag[2] = false;
      });
      this.btn3.addEventListener("touchstart", () => {
        this.btnflag[2] = true;
      });
      this.btn3.addEventListener("touchend", () => {
        this.btnflag[2] = false;
      });
      this.btn1.addEventListener("mouseleave", () => {
        this.btnflag[2] = false;
      });
      this.btn4.addEventListener("mousedown", () => {
        this.btnflag[3] = true;
      });
      this.btn4.addEventListener("mouseup", () => {
        this.btnflag[3] = false;
      });
      this.btn4.addEventListener("touchstart", () => {
        this.btnflag[3] = true;
      });
      this.btn4.addEventListener("touchend", () => {
        this.btnflag[3] = false;
      });
      this.btn1.addEventListener("mouseleave", () => {
        this.btnflag[3] = false;
      });
      this.keydown = [false, false, false, false, false]
      this.keycodes = { up: [], down: [], left: [], right: [], btn: [] }
      document.addEventListener("keydown", (e) => { })
      this.output = { x: 0, y: 0, distance: 0 };
      setInterval(() => {
        this.output.x = this.output.y = 0;
        if (!this.type) {
          this.frame++;
          this.fps = Math.round(
            (1000 * this.frame) / (Date.now() - this.start),
          );
          if (this.frame > 60) {
            this.start = Date.now();
            this.frame = 0;
          }
          if (!this.having) {
            this.stick.style.top = "30%";
            this.stick.style.left = "30%";
            this.output.x = this.output.y = 0;
          } else {
            this.output.x =
              ((this.stick.getBoundingClientRect().x -
                this.boder.getBoundingClientRect().x -
                (this.boder.getBoundingClientRect().width -
                  this.stick.getBoundingClientRect().width) /
                2) /
                this.boder.getBoundingClientRect().width) *
              2;
            this.output.y =
              ((this.stick.getBoundingClientRect().y -
                this.boder.getBoundingClientRect().y -
                (this.boder.getBoundingClientRect().height -
                  this.stick.getBoundingClientRect().height) /
                2) /
                this.boder.getBoundingClientRect().height) *
              2;
          }
        }
        if (this.btnflag[0]) {
          this.output.y = -100;
        } else if (this.btnflag[1]) {
          this.output.y = 100;
        }
        if (this.btnflag[2]) {
          this.output.x = -100;
        } else if (this.btnflag[3]) {
          this.output.x = 100;
        }
        this.output.distance = Math.sqrt(
          this.output.x ** 2 + this.output.y ** 2,
        );
        if (this.output.distance > 1) {
          this.output.x = this.output.x / this.output.distance;
          this.output.y = this.output.y / this.output.distance;
        }
        if (this.display) {
          this.change.style.display = this.sub.style.display = "block";
          this.boder.style.display = !this.type ? "block" : "none";
          this.keys.style.display = this.type ? "block" : "none";
        } else {
          this.change.style.display =
            this.boder.style.display =
            this.keys.style.display =
            this.sub.style.display =
            "none";
        }
        this.stick_dis.style.top = this.output.y * 50 + 30 + "%";
        this.stick_dis.style.left = this.output.x * 50 + 30 + "%";
      }, 16);
    }
    get() {
      return {
        x: Math.round(this.output.x * 100),
        y: Math.round(this.output.y * 100),
        btn: this.btn,
      };
    }
    info() {
      return `x:${this.get().x},y:${this.get().y},btn:${this.btn},fps:${this.fps}`;
    }
  }
  class Game {
    constructor(seen = {
      main: {
        background: {
          color: "rgb(255,255,0)",
        },camera: {
        x: 0,
        y: 0,
      },
        sprites: {}
      }
    }, fps = 60, startSeen = "main") {
      document.body.innerHTML += `<game_canvas style="overflow: hidden;background:rgb(0, 0, 0);width:160vh;height:100vh;position:absolute;top: 0px;left: 0px;"></game_canvas>`
      this.controller = new controller()
      this.main = taglist("game_canvas")[0]
      this.seenName = startSeen
      this.seens = seen
      this.fps = fps / 1000
      this.update
















      setInterval(() => {
        this.inner = ""
        try{
        for (this.self of Object.values(this.sprites)) {
          try {
              if(this.self.y - this.seen.camera.y>0&&this.self.y - this.seen.camera.y<100&&this.self.x - this.seen.camera.x>0&&this.self.x - this.seen.camera.x<160){
            this.inner += `<div style="overflow: hidden;position:absolute;
          top:${(this.self.y - this.seen.camera.y +50- (this.self.height / 2))}%;
          left:${(this.self.x - this.seen.camera.x +80- (this.self.width / 2)) / 1.6}%;
          width:${this.self.width / 1.6}%;
          height:${this.self.height}%;${this.self.output_rect ? "background:rgb(255,255,255)" : ""}">${this.self.img}</div>`
          }} catch (e) { }
          this.n++
        }
        this.main.innerHTML = this.inner
        }catch(e){}
      }, fps / 2)
    }
    addSprite(name, sprite) {
      this.aS = this.self
      this.self = this.seen.sprites[name] = sprite
      try { this.self.start(this.self) } catch (e) { }
      this.self = this.aS
    }
    deleteSprite(name) {
      delete this.seen.sprites[name]
    }
    start() {
      this.seen = this.seens[this.seenName]
      this.sprites = this.seen.sprites
      this.self = this.seen.background
      try { this.self.start(this.self) } catch (e) { }
      this.n = 0
      for (this.self of Object.values(this.sprites)) {
        this.self.name = Object.keys(this.sprites)[this.n]
        try { this.self.start(this.self) } catch (e) { }
        this.n++
      }
      this.restartUpdate()
    }
    stopUpdate() {
      clearInterval(this.update)
      this.stopping = true
    }
    restartUpdate() {
      this.stopping = false
      this.update = setInterval(() => {
        this.self = this.seen.background
        this.main.style.background = this.self.color
        try { this.self.update(this.self) } catch (e) { }
        if (this.stopping) { return }
        this.n = 0
        for (this.self of Object.values(this.sprites)) {
          this.playing = true
          this.self.name = Object.keys(this.sprites)[this.n]
          try { this.self.update(this.self) } catch (e) { }
          if (this.stopping) { return }
          this.n++
          this.playing = false
        }
      }, this.fps)
    }
    changeSeen(to) {
      this.stopUpdate()
      this.seenName = to
      this.seen = this.seens[this.seenName]
      this.sprites = this.seen.sprites
      this.self = this.seen.background
      try { this.self.start(this.self) } catch (e) { }
      this.n = 0
      for (this.self of Object.values(this.sprites)) {
        this.self.name = Object.keys(this.sprites)[this.n]
        try { this.self.start(this.self) } catch (e) { }
        this.n++
      }
      this.restartUpdate()
    }
  }
