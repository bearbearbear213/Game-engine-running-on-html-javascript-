    function shuffle(array) {
    array.sort(() => Math.random() - 0.5);
  }
  var shuffleDict = (dict) => {
    var a = Object.keys(dict)
    shuffle(a)
    var b = {}
    for (var n of a) {
      b[n] = dict[n]
    }
    return b
  }
  var random = (max, min) => { return Math.floor(Math.random() * (max - min)) + min; }
  var copy = _.cloneDeep
  var make_angle = (angle, speed = 10) => {
    const x = speed * Math.cos(angle)
    const y = speed * Math.sin(angle)
    return { x: x, y: y };
  }

  var taglist = (name) => {
    var objects = document.getElementsByTagName(name);
    for (var n in [...Array(objects.length)]) {
      objects[n] = objects[n];
    }
    return objects;
  };

  var gameEngineMakeMap = (engine, mapTile, mapDict, size = 10, objectName = "object") => {
    for (n in mapTile) {
      for (m in mapTile[n]) {
        if (!(mapDict[mapTile[n][m]] == "air")) {
          engine.addSprite(`${objectName}${n}/${m}`, copy(mapDict[mapTile[n][m]]))
          engine.seen.sprites[`${objectName}${n}/${m}`].x = m * size
          engine.seen.sprites[`${objectName}${n}/${m}`].y = n * size
          engine.seen.sprites[`${objectName}${n}/${m}`].width = engine.seen.sprites[`object${n}/${m}`].height = size
        }
      }
    }
  }
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
        document.addEventListener("pointermove", (e) => {
          if (
            !(this.target_object == null) &&
            e.target == this.target_object
          ) {
            this.target_object.style.left =
              ((e.clientX -
                e.target.parentNode.getBoundingClientRect().x -
                this.mouse_positionX) /
                e.target.parentNode.getBoundingClientRect().width) *
              100 +
              "%";
            this.target_object.style.top =
              ((e.clientY -
                e.target.parentNode.getBoundingClientRect().y -
                this.mouse_positionY) /
                e.target.parentNode.getBoundingClientRect()
                  .height) *
              100 +
              "%";
          }
        });
        this.k.addEventListener("pointerleave", (e) => {
          if (
            !(this.target_object == null) &&
            e.target == this.target_object
          ) {
            this.target_object.style.left =
              ((e.clientX -
                e.target.parentNode.getBoundingClientRect().x -
                this.mouse_positionX) /
                e.target.parentNode.getBoundingClientRect().width) *
              100 +
              "%";
            this.target_object.style.top =
              ((e.clientY -
                e.target.parentNode.getBoundingClientRect().y -
                this.mouse_positionY) /
                e.target.parentNode.getBoundingClientRect()
                  .height) *
              100 +
              "%";
          }
        });
        document.addEventListener("pointerup", (e) => {
          if (
            !(this.target_object == null)
          ) {
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
        document.addEventListener("touchmove", (e) => {
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
  class keyboard {
    constructor() {
      this.keyboard = {}
      this.keycodes = {}
      var n
      for (n of `QAZWSXEDCRFVTGBYHNUJMIKOLP`.split("")) {
        this.keycodes[`Key${n}`] = n
      }
      for (n of `Up/Down/Left/Right`.split("/")) {
        this.keycodes[`Arrow${n}`] = n
      }
      for (n of `Space/Enter`.split("/")) {
        this.keycodes[`${n}`] = n
      }
      for (n of Object.values(this.keycodes)) {
        this.keyboard[n] = false
      }
      document.addEventListener("keydown", (e) => {
        if (Object.keys(this.keycodes).includes(e.code)) {
          this.keyboard[Object.keys(this.keyboard)[Object.keys(this.keycodes).indexOf(e.code)]] = true
        }
      })
      document.addEventListener("keyup", (e) => {
        if (Object.keys(this.keycodes).includes(e.code)) {
          this.keyboard[Object.keys(this.keyboard)[Object.keys(this.keycodes).indexOf(e.code)]] = false
        }
      })
    }
    input() {
      return this.keyboard
    }
  }
  class Game {
    constructor(seen = {
      main: {
        background: {
          color: "rgb(255,255,0)",
        }, camera: {
          x: 0,
          y: 0,
        },
        sprites: {}
      }
    }, fps = 60, startSeen = "main", useController = true) {
      console.log('gameEngineLoaded!');
      this.keyboard = new keyboard()
      document.body.innerHTML += `<test style="overflow: hidden;background:rgb(0, 0, 0);width:160vh;height:100vh;position:absolute;top: 0px;left: 0px;"></test><canvas width="1600"height="1000"style="overflow: hidden;background:rgba(0,0, 0, 0);width:160vh;height:100vh;position:absolute;top: 0px;left: 0px;"></canvas>`
      if (useController) { this.controller = new controller() }
      this.main = taglist("canvas")[0];
      this.ctx = this.main.getContext('2d');
      this.test = taglist("test")[0]
      this.seenName = startSeen;
      this.seens = seen;
      this.fps = fps
      this.update;
      this.drawingMain = setInterval(() => {
      }, 1000 / this.fps)
      this.basemouse = { x: 0, y: 0, width: 1, height: 1 }
      this.mouse = { x: 0, y: 0, width: 1, height: 1, click: false }
      this.mouseposition = (e) => {
        this.basemouse.x = ((e.clientX / this.main.getBoundingClientRect().width) * 1.6) * 100
        this.basemouse.y = (e.clientY / this.main.getBoundingClientRect().height) * 100
        this.mouse.x = (this.basemouse.x) + this.seen.camera.x
        this.mouse.y = (this.basemouse.y) + this.seen.camera.y
      }
      this.another=()=>{}
      this.main.addEventListener("pointermove", this.mouseposition)
      this.main.addEventListener("pointerdown", this.mouseposition)
      this.main.addEventListener("pointerdown", () => { this.mouse.click = true })
      this.main.addEventListener("pointerup", () => { this.mouse.click = false })
      this.main.addEventListener("pointerleave", () => { this.mouse.click = false })
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
      this.update = setInterval(async () => {
        if (!this.stopping) {
          this.playing = true
          this.self = this.seen.background
          try {
            try {
              await this.self.update(this.self)
            } catch (e) {
              this.self.update(this.self)
            }
          } catch (e) { }
          this.n = 0
          for (this.self of Object.values(this.sprites)) {
            if (this.stopping) { break }
            this.self.name = Object.keys(this.sprites)[this.n]
            try {
              try {
                await this.self.update(this.self)
              } catch (e) {
                this.self.update(this.self)
              }
            } catch (e) { }
            this.n++
          }
          this.playing = false
        }
        this.self = this.seen.background
        this.inner = ""
        this.inner += `<div style="position:absolute;top:0%;left:0%;width:100%;height:100%;background:${this.self.color}"></div>`
        try {
          for (this.self of Object.values(this.sprites)) {
            try {
              if (col(this.self, { width: 160, height: 100, x: this.seen.camera.x + 80, y: this.seen.camera.y + 50 }) || (this.self.Mustdrawing == true)) {
                this.inner += `<div style="position:absolute;
          top:${(this.self.y - this.seen.camera.y - (this.self.height / 2))}%;
          left:${(this.self.x - this.seen.camera.x - (this.self.width / 2)) / 1.6}%;
          width:${this.self.width / 1.6}%;
          height:${this.self.height}%;${this.self.output_rect ? "background:rgb(255,255,255)" : ""}">${this.self.img}</div>`
              }
            } catch (e) { }
            this.n++
          }
        } catch (e) { }
        this.another()
        if(false){
          const data = `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0, 0, ${1600}, ${1000}' width='${1600}' height='${1000}'><foreignObject width='100%' height='100%'><div xmlns="http://www.w3.org/1999/xhtml">${(new XMLSerializer).serializeToString(new DOMParser().parseFromString(this.inner, "text/html"))}</div></foreignObject></svg>`;

          const svg = new Blob([data], { type: "image/svg+xml;charset=utf-8" });

          // svgを生成した後、それをimgで読みたいため、urlを生成する
          const DOMURL = self.URL || self.webkitURL || self;
          const url = DOMURL.createObjectURL(svg);

          const img = new Image();
          img.src = url;

          // GO!!
          img.onload = () => {
            this.ctx.drawImage(img, 0, 0);
            // urlを破棄する
            DOMURL.revokeObjectURL(url);
          }
        }else{
          this.test.innerHTML=this.inner
        }
      }, 1000 / this.fps)
    }
    async stopUpdate() {
      this.stopping = true
      await new Promise((resolve) => {
        var n = setInterval(() => {
          if (!this.playing) {
            clearInterval(n)
            resolve()
          }
        })
      })
    }
    restartUpdate() {
      this.stopping = false
    }
    async changeSeen(to) {
      await this.stopUpdate()
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


  var textChange = (text,A="/") => {
    return text.split(A)
  }
  class novelGame extends Game {
    constructor(seen, fps, statrSeen, useController = true) {
      super(seen, fps, statrSeen, useController);
      this.speechColor = "rgb(0,0,0)";
      this.speechOpening = false;
      this.speechText = "";
      this.speechCharacter = "";
      this.more = ""
      this.moremore = ""


      this.changeSpeech("", "", "")
      
      this.another=()=>{this.inner += `${this.moremore}<speech style="  position:absolute;  top:65%;  left:10%;  height:30%;  width:80%;  background:rgba(255,255,255,0.7);  border-radius: 5vh;  border: 1vh solid rgb(0,0,0);  overflow: auto;  font-size:5vh;  color:${this.speechColor};  display:${this.speechOpening ? "block" : "none"}"><p>  ${this.speechText}</p></speech><div style="  position:absolute;  top:60%;  left:5%;  height:10%;  width:30%;  background:rgba(255,255,255,0.7);  border-radius: 5vh;  border: 1vh solid rgb(0,0,0);  overflow: auto;  font-size:7vh;  color:${this.speechColor};  display:${this.speechOpening ? "block" : "none"}"><div>  ${this.speechCharacter}</div></div><div style="font-size:10vh">${this.more}</div>`;}
    }
    setCharacters(characters = {}) {
      this.charactersData = characters
    }
    drawCharacters(left, right = "", light = 1, lx = 0, rx = 0) {
      /*imagesize=1:1*/
      this.moremore = ""
      this.moremore += `<img src="${this.charactersData[left]}" width="1000"height="1000"style="position:absolute;${!light == 1 ? "filter: grayscale(80%);top:-10%;" : "top:-20%;"}width:200vh;height:200vh;left:${lx - 40}%;"></img>`
      this.moremore += `<img src="${this.charactersData[right]}" width="1000"height="1000"style="position:absolute;${!light == 1 ? "top:-20%;" : "filter: grayscale(80%);top:-10%;"}width:200vh;height:200vh;right:${rx - 40}%;"></img>`
    }
    stopDrawCharacters() {
      this.moremore = ""
    }
    setSpeech() {
    }
    openSpeech() {
      this.speechOpening = true;
    }
    closeSpeech() {
      this.speechOpening = false;
    }
    changeSpeech(
      character,
      text,
      color = "rgb(0,0,0)",
    ) {
      this.speechCharacter = character;
      this.speechText = text;
      this.speechColor = color;
    }
    async talkSpeech(
      character = "character",
      texts = ["this is text", "this is second text"],
      color = "rgb(0,0,0)",
      waitTime = 100
    ) {
      this.openSpeech();
      this.stopUpdate();
      var l = "";
      var k = 0;
      var j = 0;
      this.o = this.controller.get().btn || this.mouse.click
      var bd = Date.now()
      await new Promise((resolve) => {
        var sm = 0
        var m = setInterval(() => {
          sm++
          this.stopUpdate()
          if (texts[j].length == k) {
            if ((this.controller.get().btn || this.mouse.click) && !this.o) {
              l = "";
              k = 0;
              j++;
            }
          } else {
            if ((bd + waitTime) < Date.now()) {
              l += texts[j][k];
              k++;
              bd = Date.now()
            }
            if ((this.controller.get().btn || this.mouse.click) && !this.o) {
              k = texts[j].length;
              l = texts[j];
            }
            this.changeSpeech(character, l, color);
          }
          if (texts.length == j) {
            resolve();
            clearInterval(m);
          }
          this.o = this.controller.get().btn || this.mouse.click
        }, 1);
      });

      await new Promise((resolve) => {
        var o = setInterval(() => {
          this.stopUpdate()
          if (!(this.controller.get().btn || this.mouse.click)) {
            this.restartUpdate();
            this.closeSpeech();
            resolve();
            clearInterval(o);
          }
        })
      })
    }

    async questionSpeech(answers = ["1st answer", "2nd answer", "3rd answer"],) {
      this.openSpeech()
      this.stopUpdate();
      var serecting = 0
      var k = this.controller.get().y == 0
      var p = this.controller.get().btn || this.mouse.click
      await new Promise((resolve) => {
        var o = setInterval(() => {
          this.stopUpdate()
          if (this.controller.get().btn && !p) {
            resolve();
            clearInterval(o);
          }
          p = this.controller.get().btn
          var m = 0
          this.more = `<div style="background:rgba(0,0,0,0.5);position:absolute;left:0%;top:0%;width:100%;height:100%;"></div>`
          for (var n of answers) {
            this.more += `<div style="
            position:absolute;
            background:rgba(255,255,255,0.7);
            border-radius: 5vh;
            border: 1vh solid rgb(0,0,0);
            overflow: auto;
            font-size:7vh;
            height:14%;
            width:98%;
            color:rgb(0,0,0);
          "><div>`
            if (m == serecting || m == Math.trunc(this.basemouse.y / 14)) {
              this.more += "・"
              if (this.mouse.click && !p && m == Math.trunc(this.basemouse.y / 14)) {
                serecting = m
                resolve();
                clearInterval(o);
              }
            } else {
              this.more += "　"
            }
            this.more += `${n}</div></div>`
            m++
            this.more += "<br/>"
          }
          if ((!this.controller.get().y == 0) && k) {
            if (this.controller.get().y < 0) {
              serecting--
            } else {
              serecting++
            }
            if (serecting == answers.length) {
              serecting = 0
            } else if (serecting == -1) {
              serecting = answers.length - 1
            }
          }
          k = this.controller.get().y == 0
        })
      })
      this.more = ""
      await new Promise((resolve) => {
        var o = setInterval(() => {
          this.stopUpdate()
          if (!(this.controller.get().btn || this.mouse.click)) {
            this.restartUpdate();
            this.closeSpeech();
            resolve();
            clearInterval(o);
          }
        })
      })
      return serecting
    }
  }
  class novelGameToTouch extends novelGame {
    constructor(seen, fps, statrSeen) {
      super(seen, fps, statrSeen, false);

      this.talkSpeech = async (
        character = "character",
        texts = ["this is text", "this is second text"],
        color = "rgb(0,0,0)",
        waitTime = 100
      ) => {
        this.openSpeech();
        this.stopUpdate();
        var l = "";
        var k = 0;
        var j = 0;
        this.o = this.mouse.click
        var bd = Date.now()
        await new Promise((resolve) => {
          var sm = 0
          var m = setInterval(() => {
            sm++
            this.stopUpdate()
            if (texts[j].length == k) {
              if ((this.mouse.click) && !this.o) {
                l = "";
                k = 0;
                j++;
              }
            } else {
              if ((bd + waitTime) < Date.now()) {
                l += texts[j][k];
                k++;
                bd = Date.now()
              }
              if ((this.mouse.click) && !this.o) {
                k = texts[j].length;
                l = texts[j];
              }
              this.changeSpeech(character, l, color);
            }
            if (texts.length == j) {
              resolve();
              clearInterval(m);
            }
            this.o = this.mouse.click
          }, 1);
        });

        await new Promise((resolve) => {
          var o = setInterval(() => {
            this.stopUpdate()
            if (!(this.mouse.click)) {
              this.restartUpdate();
              this.closeSpeech();
              resolve();
              clearInterval(o);
            }
          })
        })
      }

      this.questionSpeech = async (answers = ["1st answer", "2nd answer", "3rd answer"],) => {
        this.openSpeech()
        this.stopUpdate();
        var serecting = 0
        var p = this.mouse.click
        await new Promise((resolve) => {
          var o = setInterval(() => {
            this.stopUpdate()
            var m = 0
            this.more = `<div style="background:rgba(0,0,0,0.5);position:absolute;left:0%;top:0%;width:100%;height:100%;"></div>`
            for (var n of answers) {
              this.more += `<div style="
            position:absolute;
            background:rgba(255,255,255,0.7);
            border-radius: 5vh;
            border: 1vh solid rgb(0,0,0);
            overflow: auto;
            font-size:7vh;
            height:14%;
            width:98%;
            color:rgb(0,0,0);
          "><div>`
              if (m == Math.trunc(this.basemouse.y / 14)) {
                this.more += "・"
                if (this.mouse.click && !p && m == Math.trunc(this.basemouse.y / 14)) {
                  serecting = m
                  resolve();
                  clearInterval(o);
                }
              } else {
                this.more += "　"
              }
              this.more += `${n}</div></div>`
              m++
              this.more += "<br/>"
            }
          })
        })
        this.more = ""
        await new Promise((resolve) => {
          var o = setInterval(() => {
            this.stopUpdate()
            if (!(this.mouse.click)) {
              this.restartUpdate();
              this.closeSpeech();
              resolve();
              clearInterval(o);
            }
          })
        })
        return serecting
      }
    }
  }
  var sampleTitle = (name = "title", to = "main", backgroungColor = "rgb(0,0,0)", backgroundImg = "") => {
    return {
      flag: false,
      background: {
        color: backgroungColor,
        start: () => {
          game.addSprite("title", {
            titleName: name,
            to: to,
            x: 80,
            y: 60,
            width: 160,
            height: 60,
            output_rect: false,
            a: 0,
            b: 0,
            c: 0,
            img: ``,
            start: (self) => {
              game.deleteSprite("A")
              game.seen.d = 0
            },
            update: (self) => {
              if ((game.seen.d == 1)) {
                self.y -= 2;
                if (self.y < -100) {
                  game.changeSeen(self.to)
                  game.deleteSprite("A")
                  self.x = 80
                  self.y = 60
                }
              } else {
                if (self.a < 1) {
                  self.img = `<div style="text-align: center;color:rgba(255,0,0,${self.a});font-size:25vh"><b>${self.titleName}</b></div>`
                  self.a += 0.02
                } else if (self.b < 25) {
                  self.img = `<div style="text-align: center;color:rgba(255,0,0,1);font-size:${25 - (self.b * 0.2)}vh"><b>${self.titleName}</b></div>`
                  self.y -= 0.8
                  self.b++
                } else {
                  if (self.c == 0) {
                    self.c = 1
                    game.addSprite("A", {
                      a: 0, x: 80, y: 70, width: 160, height: 20, update: (self) => {
                        if (self.a < 1) {
                          self.img = `<div style="font-size:10vh;color:rgba(255,255,255,${self.a});text-align: center;">click/touch to start</div>`
                          self.a += 0.05
                        } else {
                          if (game.mouse.click) {
                            game.seen.d = 1
                          }
                        }
                        if ((game.seen.d == 1 && self.y > -100)) {
                          self.y -= 2;
                        }
                      }
                    })
                  }
                }
              }
            }
          })
        },
        update: (self) => {
        }
      }, camera: {
        x: 0,
        y: 0,
      },
      d: 0,
      sprites: {
        b: { x: 80, y: 50, width: 160, height: 50, img: backgroundImg },
      }
    }
  }
