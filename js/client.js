var googleUser = {};
var serverURL = "";
var serverProtocol = window.origin === "http://agario.loc" ? "http" : "https";
var maxWeight = 0;
var sec = 0;
var food_eaten = 0;
var top_leaderboard_position = 1000;
let uData = {};
if (location.hostname === "sigmally.com" || location.hostname === "beta.sigmally.com") {
  var googleClientID = "1063846395656-tkpcrm37hfklkkq7sf7o3vran20qm0ji.apps.googleusercontent.com";
} else if (location.hostname == "fr-agario.com") {
  var googleClientID = "792427553623-5vqc913odjjdgoq5mmg8lehtqiutg8kg.apps.googleusercontent.com";
  document.getElementById("gamemode").innerHTML += '<option id="option_3" value="fr-agario.com/ws/">test</option>';
  document.getElementById("gamemode").innerHTML += '<option id="option_4" value="u2.fr-agario.com/ws/">test2</option>';
}
let captchaVerified = false;
const recaptchaV2SiteKey = "6Lck1wsmAAAAACmj_46s4DLFaLoFwJCXkzh6HEaM";
const recaptchaV3SiteKey = "6LeqgRYdAAAAABO1HoCmpDhZRhqATZTwT6wKZjE_";
const gScript = document.createElement("script");
gScript.src = `https://www.google.com/recaptcha/api.js?render=${recaptchaV3SiteKey}`;
gScript.async = true;
document.head.appendChild(gScript);
const virusImages = [];
const players = {};
let backgroundImage = null;
(function () {
  "use strict";
  console.log("test");
  if (
    typeof WebSocket === "undefined" ||
    typeof DataView === "undefined" ||
    typeof ArrayBuffer === "undefined" ||
    typeof Uint8Array === "undefined"
  ) {
    alert("Your browser does not support required features, please update your browser or get a new one.");
    window.stop();
  }
  const K = {
    " ": 17,
    w: 21,
    q: 18,
    e: 22,
    r: 23,
    t: 24,
    p: 25,
  };
  for (let i = 0; i < 5; ++i) {
    (virusImages[i] = new Image()).src = window.origin + `/assets/images/viruses/${i}.png`;
  }
  (backgroundImage = new Image()).src = window.origin + `/assets/images/bg.png`;

  function byId(id) {
    return document.getElementById(id);
  }

  function byClass(clss, parent) {
    return (parent || document).getElementsByClassName(clss);
  }

  function Sound(src, volume, maximum) {
    this.src = src;
    this.volume = typeof volume == "number" ? volume : 0.5;
    this.maximum = typeof maximum == "number" ? maximum : Infinity;
    this.elms = [];
  }
  Sound.prototype.play = function (vol) {
    if (typeof vol == "number") this.volume = vol;
    var toPlay;
    for (var i = 0; i < this.elms.length; i++) {
      var elm = this.elms[i];
      if (elm.paused) {
        toPlay = elm;
        break;
      }
    }
    if (!toPlay) toPlay = this.add();
    toPlay.volume = this.volume;
    toPlay.play();
  };
  Sound.prototype.add = function () {
    if (this.elms.length >= this.maximum) {
      return this.elms[0];
    }
    var elm = new Audio(this.src);
    this.elms.push(elm);
    return elm;
  };
  var LOAD_START = Date.now();
  Array.prototype.remove = function (a) {
    var i = this.indexOf(a);
    if (i !== -1) this.splice(i, 1);
    return i !== -1;
  };
  Element.prototype.hide = function () {
    this.style.display = "none";
    if (this.style.opacity == 1) this.style.opacity = 0;
  };
  Element.prototype.show = function (seconds) {
    this.style.display = "";
    var that = this;
    if (seconds) {
      this.style.transition = "opacity " + seconds + "s ease 0s";
      setTimeout(function () {
        that.style.opacity = 1;
      }, 20);
    }
  };
  if (!Array.prototype.includes) {
    Array.prototype.includes = function (val) {
      for (var i = 0; i < this.length; i++) {
        if (this[i] === val) return true;
      }
      return false;
    };
  }
  (function () {
    var ctxProto = CanvasRenderingContext2D.prototype;
    if (ctxProto.resetTransform) return;
    ctxProto.resetTransform = function () {
      this.setTransform(1, 0, 0, 1, 0, 0);
    };
  })();

  function bytesToHex(r, g, b) {
    return "#" + ((1 << 24) | (r << 16) | (g << 8) | b).toString(16).slice(1);
  }

  function colorToBytes(color) {
    var c = color.slice(1);
    if (c.length === 3)
      c = c.split("").map(function (a) {
        return a + a;
      });
    if (c.length !== 6) throw new Error("invalid color " + color);
    var v = parseInt(c, 16);
    return {
      r: (v >>> 16) & 255,
      g: (v >>> 8) & 255,
      b: v & 255,
    };
  }

  function darkenColor(color) {
    var a = colorToBytes(color);
    return bytesToHex(a.r * 0.9, a.g * 0.9, a.b * 0.9);
  }

  function cleanupObject(object) {
    for (var i in object) delete object[i];
  }
  var __buf = new DataView(new ArrayBuffer(8));

  function Writer(littleEndian) {
    this._e = littleEndian;
    this.reset();
    return this;
  }
  Writer.prototype = {
    writer: true,
    reset: function (littleEndian) {
      this._b = [];
      this._o = 0;
    },
    setUint8: function (a) {
      if (a >= 0 && a < 256) this._b.push(a);
      return this;
    },
    setInt8: function (a) {
      if (a >= -128 && a < 128) this._b.push(a);
      return this;
    },
    setUint16: function (a) {
      __buf.setUint16(0, a, this._e);
      this._move(2);
      return this;
    },
    setInt16: function (a) {
      __buf.setInt16(0, a, this._e);
      this._move(2);
      return this;
    },
    setUint32: function (a) {
      __buf.setUint32(0, a, this._e);
      this._move(4);
      return this;
    },
    setInt32: function (a) {
      __buf.setInt32(0, a, this._e);
      this._move(4);
      return this;
    },
    setFloat32: function (a) {
      __buf.setFloat32(0, a, this._e);
      this._move(4);
      return this;
    },
    setFloat64: function (a) {
      __buf.setFloat64(0, a, this._e);
      this._move(8);
      return this;
    },
    _move: function (b) {
      for (var i = 0; i < b; i++) this._b.push(__buf.getUint8(i));
    },
    setStringUTF8: function (s) {
      var bytesStr = unescape(encodeURIComponent(s));
      for (var i = 0, l = bytesStr.length; i < l; i++) this._b.push(bytesStr.charCodeAt(i));
      this._b.push(0);
      return this;
    },
    build: function () {
      return new Uint8Array(this._b);
    },
  };

  function Reader(view, offset, littleEndian) {
    this._e = littleEndian;
    if (view) this.repurpose(view, offset);
  }
  Reader.prototype = {
    reader: true,
    repurpose: function (view, offset) {
      this.view = view;
      this._o = offset || 0;
    },
    getUint8: function () {
      return this.view.getUint8(this._o++, this._e);
    },
    getInt8: function () {
      return this.view.getInt8(this._o++, this._e);
    },
    getUint16: function () {
      return this.view.getUint16((this._o += 2) - 2, this._e);
    },
    getInt16: function () {
      return this.view.getInt16((this._o += 2) - 2, this._e);
    },
    getUint32: function () {
      return this.view.getUint32((this._o += 4) - 4, this._e);
    },
    getInt32: function () {
      return this.view.getInt32((this._o += 4) - 4, this._e);
    },
    getFloat32: function () {
      return this.view.getFloat32((this._o += 4) - 4, this._e);
    },
    getFloat64: function () {
      return this.view.getFloat64((this._o += 8) - 8, this._e);
    },
    getStringUTF8: function (decode = true) {
      var s = "",
        b;
      while ((b = this.view.getUint8(this._o++)) !== 0) s += String.fromCharCode(b);
      return decode ? decodeURIComponent(escape(s)) : s;
    },
    raw: function (len = 0) {
      const buf = this.view.buffer.slice(this._o, this._o + len);
      this._o += len;
      return buf;
    },
  };
  var log = {
    verbosity: 2,
    error: function () {
      if (log.verbosity > 0) console.error.apply(null, arguments);
    },
    warn: function () {
      if (log.verbosity > 1) console.warn.apply(null, arguments);
    },
    info: function () {
      if (log.verbosity > 2) console.info.apply(null, arguments);
    },
    debug: function () {
      if (log.verbosity > 3) console.debug.apply(null, arguments);
    },
  };
  const VER = "SIG 0.0.1";
  const C = new Uint8Array(256);
  const R = new Uint8Array(256);
  let wsUrl = null,
    SKIN_URL = "./skins/",
    USE_HTTPS = "https:" == window.location.protocol,
    EMPTY_NAME = "An unnamed cell",
    QUADTREE_MAX_POINTS = 32,
    CELL_POINTS_MIN = 5,
    CELL_POINTS_MAX = 120,
    PI_2 = Math.PI * 2,
    IE_KEYS = {
      spacebar: " ",
      esc: "escape",
    },
    CODE_TO_KEY = {
      Space: " ",
      KeyW: "w",
      KeyQ: "q",
      KeyE: "e",
      KeyR: "r",
      KeyT: "t",
      KeyP: "p",
    };

  function wsCleanup() {
    if (!ws) return;
    log.debug("ws cleanup trigger");
    ws.onopen = null;
    ws.onmessage = null;
    ws.close();
    ws = null;
  }

  function wsInit(url) {
    if (ws) {
      log.debug("ws init on existing conn");
      wsCleanup();
    }
    byId("connecting").show(1.0);
    wsUrl = url;
    ws = new WebSocket("ws" + (USE_HTTPS ? "s" : "") + "://" + url);
    ws.binaryType = "arraybuffer";
    ws.onopen = wsOpen;
    ws.onmessage = wsMessage;
    ws.onerror = wsError;
    ws.onclose = wsClose;
  }
  let handshake = false;

  function wsOpen() {
    handshake = false;
    reconnectDelay = 1000;
    byId("connecting").hide();
    byId("needtobeloggined").hide();
    const w = new Writer();
    w.setStringUTF8(VER);
    wsSend(w);
    getTopUsers();
  }

  function wsError(error) {
    log.warn(error);
  }

  function wsClose(e) {
    if (e.currentTarget != ws) return;
    log.debug("ws disconnected " + e.code + " '" + e.reason + "'");
    wsCleanup();
    gameReset();
    setTimeout(function () {
      setserver(wsUrl);
    }, (reconnectDelay *= 1.5));
  }

  function wsSend(data) {
    if (!ws) return;
    if (ws.readyState !== 1) return;
    if (data.build) ws.send(data.build());
    else ws.send(data);
  }
  let myId;

  function wsMessage(data) {
    syncUpdStamp = Date.now();
    const reader = new Reader(new DataView(data.data), 0, true);
    if (!handshake) {
      const ver = reader.getStringUTF8(false);
      if (ver !== VER) return ws.close();
      C.set(new Uint8Array(reader.raw(256)));
      for (const i in C) R[C[i]] = ~~i;
      handshake = true;
      return;
    }
    const r = reader.getUint8();
    switch (R[r]) {
      case 0x10: {
        let killer, killed, id, node, x, y, s, flags, cell, updColor, updName, updSkin, count, color, name, skin;
        count = reader.getUint16();
        for (let i = 0; i < count; i++) {
          killer = reader.getUint32();
          killed = reader.getUint32();
          const killerCell = cells.byId[killer];
          const killedCell = cells.byId[killed];
          if (settings.playSounds && cells.mine.includes(killer)) {
            (killedCell.isPellet ? pelletSound : eatSound).play(parseFloat(soundsVolume.value));
          }
          if (cells.mine.includes(killer) && killedCell) {
            killedCell.isPellet && food_eaten++;
          }
          killedCell.destroy(killerCell ? killer : null);
        }
        while (true) {
          id = reader.getUint32();
          if (id === 0) break;
          x = reader.getInt16();
          y = reader.getInt16();
          s = reader.getUint16();
          flags = reader.getUint8();
          updColor = !!(flags & 0x02);
          updSkin = !!(flags & 0x04);
          updName = !!(flags & 0x08);
          color = updColor ? bytesToHex(reader.getUint8(), reader.getUint8(), reader.getUint8()) : null;
          skin = updSkin ? reader.getStringUTF8() : null;
          name = updName ? reader.getStringUTF8() : null;
          if (cells.byId.hasOwnProperty(id)) {
            cell = cells.byId[id];
            cell.update(syncUpdStamp);
            cell.updated = syncUpdStamp;
            cell.ox = cell.x;
            cell.oy = cell.y;
            cell.os = cell.s;
            cell.nx = x;
            cell.ny = y;
            cell.ns = s;
            if (color) cell.setColor(color);
            if (name) cell.setName(name);
            if (skin) cell.setSkin(skin);
          } else {
            cell = new Cell(id, x, y, s, name, color, skin, flags);
            cells.byId[id] = cell;
            cells.list.push(cell);
          }
        }
        count = reader.getUint16();
        for (i = 0; i < count; i++) {
          killed = reader.getUint32();
          if (cells.byId.hasOwnProperty(killed) && !cells.byId[killed].destroyed) {
            cells.byId[killed].destroy(null);
          }
        }
        break;
      }
      case 0x11:
        camera.target.x = reader.getFloat32();
        camera.target.y = reader.getFloat32();
        camera.target.scale = reader.getFloat32();
        camera.target.scale *= camera.viewportScale;
        camera.target.scale *= camera.userZoom;
        break;
      case 0x12:
        for (var i in cells.byId) cells.byId[i].destroy(null);
      case 0x14:
        cells.mine = [];
        break;
      case 0x15:
        log.warn("got packet 0x15 (draw line) which is unsupported");
        break;
      case 0x20:
        cells.mine.push(reader.getUint32());
        break;
      case 0x30: {
        leaderboard.items = [];
        leaderboard.type = "text";
        const count = reader.getUint32();
        for (i = 0; i < count; ++i) leaderboard.items.push(reader.getStringUTF8());
        drawLeaderboard();
        break;
      }
      case 0x31: {
        leaderboard.items = [];
        leaderboard.type = "ffa";
        const count = reader.getUint32();
        for (i = 0; i < count; ++i) {
          const isMe = !!reader.getUint32();
          const name = reader.getStringUTF8();
          const myPosition = reader.getUint32();
          leaderboard.items.push({
            me: isMe,
            myposition: myPosition,
            name: Cell.prototype.parseName(name).name || EMPTY_NAME,
          });
        }
        drawLeaderboard();
        break;
      }
      case 0x40:
        border.left = reader.getFloat64();
        border.top = reader.getFloat64();
        border.right = reader.getFloat64();
        border.bottom = reader.getFloat64();
        border.width = border.right - border.left;
        border.height = border.bottom - border.top;
        border.centerX = (border.left + border.right) / 2;
        border.centerY = (border.top + border.bottom) / 2;
        if (data.data.byteLength === 33) break;
        if (!mapCenterSet) {
          mapCenterSet = true;
          camera.x = camera.target.x = border.centerX;
          camera.y = camera.target.y = border.centerY;
          camera.scale = camera.target.scale = 1;
        }
        reader.getUint32();
        stats.pingLoopId = setInterval(function () {
          wsSend(C.slice(254, 255));
          stats.pingLoopStamp = Date.now();
        }, 2000);
        break;
      case 0x63: {
        const flags = reader.getUint8();
        const color = bytesToHex(reader.getUint8(), reader.getUint8(), reader.getUint8());
        let name = reader.getStringUTF8();
        name = Cell.prototype.parseName(name).name || EMPTY_NAME;
        const message = reader.getStringUTF8();
        const server = !!(flags & 0x80),
          admin = !!(flags & 0x40),
          mod = !!(flags & 0x20);
        if (server && name !== "SERVER") name = "[SERVER] " + name;
        if (admin) name = "[ADMIN] " + name;
        if (mod) name = "[MOD] " + name;
        const wait = Math.max(3000, 1000 + message.length * 150);
        chat.waitUntil = syncUpdStamp - chat.waitUntil > 1000 ? syncUpdStamp + wait : chat.waitUntil + wait;
        chat.messages.push({
          server: server,
          admin: admin,
          mod: mod,
          color: color,
          name: name,
          message: message,
          time: syncUpdStamp,
        });
        if (settings.showChat) drawChat();
        break;
      }
      case 0xfe:
        stats.info = JSON.parse(reader.getStringUTF8());
        stats.latency = syncUpdStamp - stats.pingLoopStamp;
        drawStats();
        break;
      default:
        wsCleanup();
        break;
    }
  }

  function sendMouseMove(x, y) {
    const writer = new Writer(true);
    writer.setUint8(C[0x10]);
    writer.setUint32(x);
    writer.setUint32(y);
    writer._b.push(0, 0, 0, 0);
    wsSend(writer);
  }

  function sendPlay(data) {
    const writer = new Writer(true);
    writer.setUint8(C[0x00]);
    writer.setStringUTF8(data);
    wsSend(writer);
  }

  function sendChat(text) {
    const writer = new Writer();
    writer.setUint8(C[0x63]);
    writer.setUint8(0);
    writer.setStringUTF8(text);
    wsSend(writer);
  }

  function gameReset() {
    cleanupObject(cells);
    cleanupObject(border);
    cleanupObject(leaderboard);
    cleanupObject(chat);
    cleanupObject(stats);
    chat.messages = [];
    chatScrollBar.show();
    leaderboard.items = [];
    cells.mine = [];
    cells.byId = {};
    cells.list = [];
    camera.x = camera.y = camera.target.x = camera.target.y = 0;
    camera.scale = camera.target.scale = 1;
    mapCenterSet = false;
  }
  window.settings = {
    nick: "",
    skin: "",
    gamemode: "",
    showSkins: true,
    showNames: true,
    darkTheme: true,
    showColor: true,
    showMass: false,
    _showChat: true,
    get showChat() {
      return this._showChat;
    },
    set showChat(a) {
      const chat = byId("chat_block");
      a ? chat.show() : chat.hide();
      this._showChat = a;
    },
    showMinimap: true,
    showPosition: false,
    showBorder: false,
    showGrid: true,
    playSounds: false,
    soundsVolume: 0.5,
    moreZoom: false,
    fillSkin: true,
    backgroundSectors: false,
    jellyPhysics: true,
  };
  const cells = Object.create({
    mine: [],
    byId: {},
    list: [],
  });
  const border = Object.create({
    left: -2000,
    right: 2000,
    top: -2000,
    bottom: 2000,
    width: 4000,
    height: 4000,
    centerX: -1,
    centerY: -1,
  });
  const leaderboard = Object.create({
    type: NaN,
    items: null,
    canvas: document.createElement("canvas"),
    teams: ["#F33", "#3F3", "#33F"],
  });
  const chat = Object.create({
    messages: [],
    waitUntil: 0,
    canvas: document.createElement("canvas"),
    visible: false,
  });
  window.__devfunc = {
    chat: {
      fillChatWithRandomMessages: function (count) {
        for (var i = 0; i < count; i++) {
          chat.messages.push({
            server: false,
            admin: false,
            mod: false,
            color: "#1088ff",
            name: "[test chat]",
            message: Math.floor(Math.random() * 1e7).toString(36),
            time: Date.now(),
          });
        }
        drawChat();
      },
      sendMessage: function (msg) {
        chat.messages.push({
          server: false,
          admin: false,
          mod: false,
          color: "#1088ff",
          name: "[test chat]",
          message: msg + "",
          time: Date.now(),
        });
        drawChat();
      },
      clearChat: function () {
        chat.messages = [];
        chatScrollBar.show();
        drawChat();
      },
    },
  };
  var chatScrollBar = {
    chtblock: null,
    vsblBtn: null,
    thumb: null,
    track: null,
    contentShiftY: 0,
    chatLeftOffset: 0,
    chatBlockHeight: 182,
    wrapperHeight: 0,
    _percent: 0,
    visability: true,
    _alpha: 1,
    init: function () {
      this.chtblock = document.getElementById("chat_block");
      this.vsblBtn = document.getElementById("chat_vsbltyBtn");
      this.track = document.getElementById("chat_scrollbar");
      this.thumb = document.getElementById("chat_thumb");
      if (!this.chtblock || !this.vsblBtn || !this.track || !this.thumb) return false;
      this.thumb.addEventListener("pointerdown", this.pDown.bind(this));
      this.vsblBtn.addEventListener("click", this.visabilatyChange.bind(this));
      this.inited = true;
      return true;
    },
    visabilatyChange: function () {
      if (this.visability) {
        this.chtblock.classList.add("chatblock--opacity");
        this._alpha = 0.2;
        this.visability = false;
      } else {
        this.chtblock.classList.remove("chatblock--opacity");
        this._alpha = 1;
        this.visability = true;
      }
    },
    show: function () {
      this.wrapperHeight = this.chatBlockHeight / camera.viewportScale;
      if (this.inited && chat.canvas.height > this.wrapperHeight && !!chat.messages.length) {
        this.track.classList.add("chatblock__scrollbar--active");
        this.chatLeftOffset = 27;
        this._updateScrollBar();
      } else {
        this.track.classList.remove("chatblock__scrollbar--active");
        this.thumb.style.bottom = "0px";
        this.chatLeftOffset = 0;
        this.contentShiftY = 0;
      }
    },
    pDown: function (e) {
      e.preventDefault();
      var that = this;
      var y0 = e.clientY;
      var p0 = 0;
      if (!that.thumb.style.bottom) that.thumb.style.bottom = "0px";
      else p0 = +that.thumb.style.bottom.slice(0, -2);

      function pMove(e1) {
        e1.preventDefault();
        var y = e1.clientY;
        var shift = p0 - (y - y0);
        var range = that.track.clientHeight - that.thumb.offsetHeight;
        if (shift >= 0 && shift <= range) {
          that.thumb.style.bottom = shift + "px";
          that.shiftContent((shift * 100) / range);
        } else if (shift >= 0) {
          that.thumb.style.bottom = range + "px";
          that.shiftContent(100);
        } else {
          that.thumb.style.bottom = "0px";
          that.shiftContent(0);
        }
      }
      document.addEventListener("pointermove", pMove);

      function pUP(e) {
        document.removeEventListener("pointermove", pMove);
        document.removeEventListener("pointerup", pUP);
      }
      document.addEventListener("pointerup", pUP);
    },
    shiftContent: function (p) {
      this._percent = p;
      var wh = this.wrapperHeight;
      var ch = chat.canvas.height;
      this.contentShiftY = (p * (wh - ch)) / 100;
    },
    wrapTheChat: function (img) {
      var wrapper = document.createElement("canvas");
      var chatWrapperCtx = wrapper.getContext("2d");
      wrapper.height = this.wrapperHeight;
      wrapper.width = chat.canvas.width;
      chatWrapperCtx.globalAlpha = this._alpha;
      chatWrapperCtx.drawImage(chat.canvas, 0, wrapper.height - chat.canvas.height - this.contentShiftY);
      return wrapper;
    },
    _mslngth: 0,
    _updateScrollBar: function () {
      if (this._mslngth == chat.messages.length) return;
      this._mslngth = chat.messages.length;
      var th = (this.track.clientHeight * this.wrapperHeight) / chat.canvas.height;
      if (th >= 20) this.thumb.style.height = th + "px";
      else this.thumb.style.height = "20px";
      var t1 = this.track.clientHeight - this.thumb.offsetHeight;
      var t2 = t1 / 100;
      var t3 = this.wrapperHeight - chat.canvas.height;
      var percent = (100 * this.contentShiftY) / t3;
      if (percent * t2 >= 0 && percent * t2 <= t1) this.thumb.style.bottom = percent * t2 + "px";
      else if (percent * t2 >= 0) this.thumb.style.bottom = t1 + "px";
      else this.thumb.style.bottom = "0px";
    },
    destroy: function () {},
  };
  var stats = Object.create({
    fps: 0,
    latency: NaN,
    supports: null,
    info: null,
    pingLoopId: NaN,
    pingLoopStamp: null,
    canvas: document.createElement("canvas"),
    visible: false,
    score: NaN,
    maxScore: 0,
  });
  var ws = null;
  var reconnectDelay = 1000;
  var syncUpdStamp = Date.now();
  var syncAppStamp = Date.now();
  var mainCanvas = null;
  var mainCtx = null;
  var soundsVolume;
  var knownSkins = {};
  const skinCache = new Map();
  var escOverlayShown = false;
  var isTyping = false;
  var chatBox = null;
  var mapCenterSet = false;
  var minionControlled = false;
  var camera = {
    x: 0,
    y: 0,
    target: {
      x: 0,
      y: 0,
      scale: 1,
    },
    viewportScale: 1,
    userZoom: 1,
    sizeScale: 1,
    scale: 1,
  };
  var mouseX = NaN;
  var mouseY = NaN;
  var macroCooldown = 1000 / 7;
  var macroIntervalID;
  var quadtree;
  var pressed = {
    " ": false,
    w: false,
    e: false,
    r: false,
    t: false,
    p: false,
    q: false,
    enter: false,
    escape: false,
  };
  var eatSound = new Sound("https://sigmally.com/assets/sound/eat.mp3", 0.5, 10);
  var pelletSound = new Sound("https://sigmally.com/assets/sound/pellet.mp3", 0.5, 10);
  request("https://sigmally.com/skinList.txt", function (data) {
    var skins = data.split(",").filter((name) => name.length > 0);
    if (skins.length == 0) return;
    var galleryButton = byId("gallery-btn");
    if (galleryButton) {
      galleryButton.style.display = "inline-block";
    }
    var stamp = Date.now();
    for (var i = 0; i < skins.length; i++) knownSkins[skins[i]] = stamp;
    for (var i in knownSkins) if (knownSkins[i] !== stamp) delete knownSkins[i];
  });
  window.addEventListener("resize", () => {
    const body = document.querySelector("body");
    if (serverProtocol === "http") console.log(window.innerWidth);
  });

  function hideESCOverlay() {
    escOverlayShown = false;
    byId("overlays").hide();
    byId("menu-wrapper").hide();
    byId("left-menu").hide();
    byId("menu-links").hide();
    byId("right-menu").hide();
    byId("left_ad_block").hide();
    byId("ad_bottom").hide();
  }

  function showESCOverlay() {
    escOverlayShown = true;
    byId("overlays").show(0.5);
    byId("menu-wrapper").show();
    byId("left-menu").show();
    byId("menu-links").show();
    byId("right-menu").show();
    byId("left_ad_block").show();
    byId("ad_bottom").show();
  }

  function showDeathScreen(maxWeight, sec, food_eaten, top_leaderboard_position) {
    document.getElementById("highest_mass").innerHTML = maxWeight;
    var h = Math.floor(sec / 3600);
    var m = Math.floor((sec % 3600) / 60);
    var s = Math.floor((sec % 3600) % 60);
    var hDisplay = h > 0 ? h + (h == 1 ? " h " : " h ") : "";
    var mDisplay = m > 0 ? m + (m == 1 ? " m " : " m ") : "";
    var sDisplay = s > 0 ? s + (s == 1 ? " s" : " s") : "";
    document.getElementById("time_alive").innerHTML = hDisplay + " " + mDisplay + " " + sDisplay;
    document.getElementById("food_eaten").innerHTML = food_eaten;
    document.getElementById("top_leaderboard_position").innerHTML = top_leaderboard_position;
    escOverlayShown = true;
    __line2.classList.remove("line--hidden");
    googletag.cmd.push(function () {
      googletag.display(adSlot4);
    });
    googletag.cmd.push(function () {
      googletag.display(adSlot5);
    });
    googletag.cmd.push(function () {
      googletag.display(adSlot6);
    });
  }

  function hideDeathScreen() {
    escOverlayShown = false;
    __line2.classList.add("line--hidden");
    googletag.cmd.push(function () {
      googletag.pubads().refresh();
    });
  }

  function toCamera(ctx) {
    ctx.translate(mainCanvas.width / 2, mainCanvas.height / 2);
    scaleForth(ctx);
    ctx.translate(-camera.x, -camera.y);
  }

  function scaleForth(ctx) {
    ctx.scale(camera.scale, camera.scale);
  }

  function scaleBack(ctx) {
    ctx.scale(1 / camera.scale, 1 / camera.scale);
  }

  function fromCamera(ctx) {
    ctx.translate(camera.x, camera.y);
    scaleBack(ctx);
    ctx.translate(-mainCanvas.width / 2, -mainCanvas.height / 2);
  }

  function initSetting(id, elm) {
    function simpleAssignListen(id, elm, prop) {
      if (settings[id] !== "") elm[prop] = settings[id];
      elm.addEventListener("change", function () {
        requestAnimationFrame(function () {
          settings[id] = elm[prop];
        });
      });
    }
    switch (elm.tagName.toLowerCase()) {
      case "input":
        switch (elm.type.toLowerCase()) {
          case "range":
          case "text":
            simpleAssignListen(id, elm, "value");
            break;
          case "checkbox":
            simpleAssignListen(id, elm, "checked");
            break;
        }
        break;
      case "select":
        simpleAssignListen(id, elm, "value");
        break;
    }
  }

  function loadSettings() {
    var text = localStorage.getItem("settings");
    var obj = text ? JSON.parse(text) : settings;
    for (var prop in settings) {
      var elm = byId(prop.charAt(0) === "_" ? prop.slice(1) : prop);
      if (elm) {
        if (obj.hasOwnProperty(prop)) settings[prop] = obj[prop];
        initSetting(prop, elm);
      } else log.info("setting " + prop + " not loaded because there is no element for it.");
    }
  }

  function storeSettings() {
    localStorage.setItem("settings", JSON.stringify(settings));
  }

  function request(url, callback, method, type) {
    if (!method) method = "GET";
    if (!type) type = "text";
    var req = new XMLHttpRequest();
    req.onload = function () {
      callback(this.response);
    };
    req.open(method, url);
    req.responseType = type;
    req.send();
  }

  function buildGallery() {
    drawGallery();
  }

  function filterBigString(ctx, name, maxW, maxH) {
    while (true) {
      const m = ctx.measureText(name);
      const w = Math.abs(m.actualBoundingBoxLeft) + Math.abs(m.actualBoundingBoxRight);
      const h = Math.abs(m.actualBoundingBoxDescent) + Math.abs(m.actualBoundingBoxAscent);
      if (w < maxW && h < maxH) break;
      name = name.slice(0, -1);
    }
    return name;
  }
  const MAX_CHAT_HISTORY = 100;
  const drawChat = () => {
    if (chat.messages.length === 0 && settings.showChat) return (chat.visible = false);
    if (chat.messages.length > MAX_CHAT_HISTORY)
      chat.messages = chat.messages.slice(chat.messages.length - MAX_CHAT_HISTORY);
    chat.visible = true;
    const canvas = chat.canvas;
    const ctx = canvas.getContext("2d");
    const latestMessages = chat.messages;
    const lines = [];
    const len = latestMessages.length;
    for (const data of latestMessages) {
      const name = filterBigString(ctx, data.name, 150, 30) || EMPTY_NAME;
      const chat = filterBigString(ctx, data.message, 400, 30).trim();
      if (!chat) continue;
      lines.push([
        {
          text: name,
          color: data.color,
        },
        {
          text: " " + chat,
          color: settings.darkTheme ? "#FFF" : "#000",
        },
      ]);
    }
    let maxWidth = 0;
    const height = 20 * len + 8;
    for (const complexes of lines) {
      let lineWidth = 0;
      for (const data of complexes) {
        ctx.font = "18px Ubuntu";
        data.width = ctx.measureText(data.text).width;
        lineWidth += data.width;
      }
      maxWidth = Math.max(lineWidth, maxWidth);
    }
    canvas.width = maxWidth;
    canvas.height = height;
    for (let i = 0; i < lines.length; i++) {
      const complexes = lines[i];
      let width = 0;
      for (const data of complexes) {
        ctx.font = "18px Ubuntu";
        ctx.fillStyle = data.color;
        ctx.fillText(data.text, width, 20 * (1 + i));
        width += data.width;
      }
    }
    chatScrollBar.show();
  };

  function drawStats() {
    if (!stats.info) return (stats.visible = false);
    stats.visible = true;
    var canvas = stats.canvas;
    var ctx = canvas.getContext("2d");
    ctx.font = "14px Ubuntu";
    var rows = [
      stats.info.name + " (" + stats.info.mode + ")",
      stats.info.playersTotal + " / " + stats.info.playersLimit + " players",
      stats.info.playersAlive + " playing",
      stats.info.playersSpect + " spectating",
      (stats.info.update * 2.5).toFixed(1) + "% load @ " + prettyPrintTime(stats.info.uptime),
    ];
    var width = 0;
    for (var i = 0; i < rows.length; i++) width = Math.max(width, 2 + ctx.measureText(rows[i]).width + 2);
    canvas.width = width;
    canvas.height = rows.length * (14 + 2);
    ctx.font = "14px Ubuntu";
    ctx.fillStyle = settings.darkTheme ? "#AAA" : "#555";
    ctx.textBaseline = "top";
    for (var i = 0; i < rows.length; i++) ctx.fillText(rows[i], 2, -1 + i * (14 + 2));
  }

  function drawPosition() {
    if (border.centerX !== 0 || border.centerY !== 0 || !settings.showPosition) return;
    var width = 200 * (border.width / border.height);
    var height = 40 * (border.height / border.width);
    var beginX = mainCanvas.width / camera.viewportScale - width;
    var beginY = mainCanvas.height / camera.viewportScale - height;
    if (settings.showMinimap) {
      mainCtx.font = "15px Ubuntu";
      beginX += width / 2 - 1;
      beginY = beginY - (194 * border.height) / border.width;
      mainCtx.textAlign = "right";
      mainCtx.fillStyle = settings.darkTheme ? "#AAA" : "#555";
      mainCtx.fillText("X: " + ~~camera.x + ", Y: " + ~~camera.y, beginX + width / 2, beginY + height / 2);
    } else {
      mainCtx.fillStyle = "#000";
      mainCtx.globalAlpha = 0.4;
      mainCtx.fillRect(beginX, beginY, width, height);
      mainCtx.globalAlpha = 1;
      drawRaw(mainCtx, beginX + width / 2, beginY + height / 2, "X: " + ~~camera.x + ", Y: " + ~~camera.y);
    }
  }

  function prettyPrintTime(seconds) {
    seconds = ~~seconds;
    var minutes = ~~(seconds / 60);
    if (minutes < 1) return "<1 min";
    var hours = ~~(minutes / 60);
    if (hours < 1) return minutes + "min";
    var days = ~~(hours / 24);
    if (days < 1) return hours + "h";
    return days + "d";
  }

  function drawLeaderboard() {
    if (leaderboard.type === NaN) return (leaderboard.visible = false);
    if (!settings.showNames || leaderboard.items.length === 0) return (leaderboard.visible = false);
    leaderboard.visible = true;
    var canvas = leaderboard.canvas;
    var ctx = canvas.getContext("2d");
    var len = leaderboard.items.length;
    canvas.width = 200;
    var canv_len = len + 1;
    canvas.height = leaderboard.type !== "pie" ? 60 + 24 * canv_len : 240;
    ctx.globalAlpha = 0.4;
    ctx.fillStyle = "#000";
    ctx.fillRect(0, 0, 200, canvas.height);
    ctx.globalAlpha = 1;
    ctx.fillStyle = "#FFF";
    ctx.font = "30px Ubuntu";
    ctx.fillText("Leaderboard", 100 - ctx.measureText("Leaderboard").width / 2, 40);
    if (leaderboard.type === "pie") {
      var last = 0;
      for (var i = 0; i < len; i++) {
        ctx.fillStyle = leaderboard.teams[i];
        ctx.beginPath();
        ctx.moveTo(100, 140);
        ctx.arc(100, 140, 80, last, (last += leaderboard.items[i] * PI_2), false);
        ctx.closePath();
        ctx.fill();
      }
    } else {
      var text,
        isMe = false,
        w,
        start;
      ctx.font = "20px Ubuntu";
      if (
        parseInt(leaderboard.items[0].myposition) != 0 &&
        parseInt(leaderboard.items[0].myposition) < top_leaderboard_position
      ) {
        top_leaderboard_position = parseInt(leaderboard.items[0].myposition);
      }
      if (leaderboard.items[0].myposition >= 10) {
        for (var i = 0; i < len - 1; i++) {
          if (leaderboard.type === "text") text = leaderboard.items[i];
          else (text = leaderboard.items[i].name), (isMe = leaderboard.items[i].me);
          ctx.fillStyle = isMe ? "#FAA" : "#FFF";
          if (leaderboard.type === "ffa") text = i + 1 + ". " + text;
          var start = (w = ctx.measureText(text).width) > 200 ? 2 : 100 - w * 0.5;
          ctx.fillText(text, start, 70 + 24 * i);
        }
        if (leaderboard.items[0].myposition != 0) {
          ctx.fillStyle = "#FAA";
          var text_for_my_pos = leaderboard.items[0].myposition + ". " + settings.nick || host;
          var start = (w = ctx.measureText(text_for_my_pos).width) > 200 ? 2 : 100 - w * 0.5;
          ctx.fillText(text_for_my_pos, start, 70 + 24 * (len - 1));
        }
      } else {
        for (var i = 0; i < len; i++) {
          if (leaderboard.type === "text") text = leaderboard.items[i];
          else (text = leaderboard.items[i].name), (isMe = leaderboard.items[i].me);
          ctx.fillStyle = isMe ? "#FAA" : "#FFF";
          if (leaderboard.type === "ffa") text = i + 1 + ". " + text;
          var start = (w = ctx.measureText(text).width) > 200 ? 2 : 100 - w * 0.5;
          ctx.fillText(text, start, 70 + 24 * i);
        }
      }
    }
  }

  function drawGrid() {
    mainCtx.save();
    mainCtx.lineWidth = 1;
    mainCtx.strokeStyle = settings.darkTheme ? "#AAA" : "#000";
    mainCtx.globalAlpha = 0.2;
    var step = 50,
      i,
      cW = mainCanvas.width / camera.scale,
      cH = mainCanvas.height / camera.scale,
      startLeft = (-camera.x + cW / 2) % step,
      startTop = (-camera.y + cH / 2) % step;
    scaleForth(mainCtx);
    mainCtx.beginPath();
    for (i = startLeft; i < cW; i += step) {
      mainCtx.moveTo(i, 0);
      mainCtx.lineTo(i, cH);
    }
    for (i = startTop; i < cH; i += step) {
      mainCtx.moveTo(0, i);
      mainCtx.lineTo(cW, i);
    }
    mainCtx.stroke();
    mainCtx.restore();
  }

  function drawBackgroundSectors() {
    if (border === undefined || border.width === undefined) return;
    mainCtx.save();
    var sectorCount = 5;
    var sectorNames = ["ABCDE", "12345"];
    var w = border.width / sectorCount;
    var h = border.height / sectorCount;
    toCamera(mainCtx);
    mainCtx.fillStyle = settings.darkTheme ? "#666" : "#DDD";
    mainCtx.textBaseline = "middle";
    mainCtx.textAlign = "center";
    mainCtx.font = ((w / 3) | 0) + "px Ubuntu";
    for (var y = 0; y < sectorCount; ++y) {
      for (var x = 0; x < sectorCount; ++x) {
        var str = sectorNames[0][x] + sectorNames[1][y];
        var dx = (x + 0.5) * w + border.left;
        var dy = (y + 0.5) * h + border.top;
        mainCtx.fillText(str, dx, dy);
      }
    }
    mainCtx.restore();
  }

  function drawMinimap() {
    if (border.centerX !== 0 || border.centerY !== 0 || !settings.showMinimap) return;
    mainCtx.save();
    mainCtx.resetTransform();
    var targetSize = 200;
    var borderAR = border.width / border.height;
    var width = targetSize * borderAR * camera.viewportScale;
    var height = (targetSize / borderAR) * camera.viewportScale;
    var beginX = mainCanvas.width - width;
    var beginY = mainCanvas.height - height;
    mainCtx.fillStyle = "#000";
    mainCtx.globalAlpha = 0.4;
    mainCtx.fillRect(beginX, beginY, width, height);
    mainCtx.globalAlpha = 1;
    var sectorCount = 5;
    var sectorNames = ["ABCDE", "12345"];
    var sectorWidth = width / sectorCount;
    var sectorHeight = height / sectorCount;
    var sectorNameSize = Math.min(sectorWidth, sectorHeight) / 3;
    mainCtx.fillStyle = settings.darkTheme ? "#666" : "#DDD";
    mainCtx.textBaseline = "middle";
    mainCtx.textAlign = "center";
    mainCtx.font = sectorNameSize + "px Ubuntu";
    for (var i = 0; i < sectorCount; i++) {
      var x = (i + 0.5) * sectorWidth;
      for (var j = 0; j < sectorCount; j++) {
        var y = (j + 0.5) * sectorHeight;
        mainCtx.fillText(sectorNames[0][i] + sectorNames[1][j], beginX + x, beginY + y);
      }
    }
    var xScaler = width / border.width;
    var yScaler = height / border.height;
    var halfWidth = border.width / 2;
    var halfHeight = border.height / 2;
    var myPosX = beginX + (camera.x + halfWidth) * xScaler;
    var myPosY = beginY + (camera.y + halfHeight) * yScaler;
    var xIndex = ((myPosX - beginX) / sectorWidth) | 0;
    var yIndex = ((myPosY - beginY) / sectorHeight) | 0;
    var lightX = beginX + xIndex * sectorWidth;
    var lightY = beginY + yIndex * sectorHeight;
    mainCtx.fillStyle = "yellow";
    mainCtx.globalAlpha = 0.3;
    mainCtx.fillRect(lightX, lightY, sectorWidth, sectorHeight);
    mainCtx.globalAlpha = 1;
    mainCtx.beginPath();
    if (cells.mine.length) {
      for (var i = 0; i < cells.mine.length; i++) {
        var cell = cells.byId[cells.mine[i]];
        if (cell) {
          mainCtx.fillStyle = cell.color;
          var x = beginX + (cell.x + halfWidth) * xScaler;
          var y = beginY + (cell.y + halfHeight) * yScaler;
          var r = (Math.max(cell.s, 200) * (xScaler + yScaler)) / 2;
          mainCtx.moveTo(x + r, y);
          mainCtx.arc(x, y, r, 0, PI_2);
        }
      }
    } else {
      mainCtx.fillStyle = "#FAA";
      mainCtx.arc(myPosX, myPosY, 5, 0, PI_2);
    }
    mainCtx.fill();
    var cell = null;
    for (var i = 0, l = cells.mine.length; i < l; i++)
      if (cells.byId.hasOwnProperty(cells.mine[i])) {
        cell = cells.byId[cells.mine[i]];
        break;
      }
    if (cell !== null) {
      mainCtx.fillStyle = settings.darkTheme ? "#DDD" : "#222";
      var textSize = sectorNameSize;
      mainCtx.font = textSize + "px Ubuntu";
      mainCtx.fillText(cell.name || EMPTY_NAME, myPosX, myPosY - 7 - textSize / 2);
    }
    mainCtx.restore();
  }

  function drawBorders() {
    if (!settings.showBorder) return;
    mainCtx.strokeStyle = "#0000ff";
    mainCtx.lineWidth = 20;
    mainCtx.lineCap = "round";
    mainCtx.lineJoin = "round";
    mainCtx.beginPath();
    mainCtx.moveTo(border.left, border.top);
    mainCtx.lineTo(border.right, border.top);
    mainCtx.lineTo(border.right, border.bottom);
    mainCtx.lineTo(border.left, border.bottom);
    mainCtx.closePath();
    mainCtx.stroke();
  }

  function drawGame() {
    stats.fps += (1000 / Math.max(Date.now() - syncAppStamp, 1) - stats.fps) / 10;
    syncAppStamp = Date.now();
    var drawList = cells.list.slice(0).sort(cellSort);
    for (var i = 0, l = drawList.length; i < l; i++) drawList[i].update(syncAppStamp);
    cameraUpdate();
    if (settings.jellyPhysics) {
      updateQuadtree();
      for (var i = 0, l = drawList.length; i < l; ++i) {
        var cell = drawList[i];
        cell.updateNumPoints();
        cell.movePoints();
      }
    }
    mainCtx.save();
    mainCtx.fillStyle = settings.darkTheme ? "#111" : "#F2FBFF";
    mainCtx.fillRect(0, 0, mainCanvas.width, mainCanvas.height);
    if (settings.showGrid) drawGrid();
    if (settings.backgroundSectors) drawBackgroundSectors();
    toCamera(mainCtx);
    drawBorders();
    for (var i = 0, l = drawList.length; i < l; i++) drawList[i].draw(mainCtx);
    fromCamera(mainCtx);
    quadtree = null;
    mainCtx.scale(camera.viewportScale, camera.viewportScale);
    var height = 2;
    mainCtx.fillStyle = settings.darkTheme ? "#FFF" : "#000";
    mainCtx.textBaseline = "top";
    if (!isNaN(stats.score)) {
      mainCtx.font = "30px Ubuntu";
      mainCtx.fillText("Score: " + stats.score, 2, height);
      height += 30;
    }
    mainCtx.font = "20px Ubuntu";
    var gameStatsText = ~~stats.fps + " FPS";
    if (!isNaN(stats.latency)) gameStatsText += " " + stats.latency + "ms ping";
    mainCtx.fillText(gameStatsText, 2, height);
    height += 24;
    if (stats.visible) mainCtx.drawImage(stats.canvas, 2, height);
    if (leaderboard.visible)
      mainCtx.drawImage(
        leaderboard.canvas,
        mainCanvas.width / camera.viewportScale - 10 - leaderboard.canvas.width,
        10
      );
    if (settings.showChat && chat.visible) {
      mainCtx.drawImage(
        chatScrollBar.wrapTheChat(chat.canvas),
        (10 + chatScrollBar.chatLeftOffset) / camera.viewportScale,
        (mainCanvas.height - 54) / camera.viewportScale - chatScrollBar.wrapperHeight
      );
      mainCtx.globalAlpha = 1;
    }
    drawMinimap();
    drawPosition();
    mainCtx.restore();
    if (minionControlled) {
      mainCtx.save();
      mainCtx.font = "12px Ubuntu";
      mainCtx.textAlign = "center";
      mainCtx.textBaseline = "hanging";
      mainCtx.fillStyle = "#eea236";
      var text = "You are controlling a minion, press Q to switch back.";
      mainCtx.fillText(text, mainCanvas.width / 2, 5);
      mainCtx.restore();
    }
    cacheCleanup();
    window.requestAnimationFrame(drawGame);
  }

  function cellSort(a, b) {
    return a.s === b.s ? a.id - b.id : a.s - b.s;
  }

  function cameraUpdate() {
    var myCells = [];
    for (var i = 0; i < cells.mine.length; i++)
      if (cells.byId.hasOwnProperty(cells.mine[i])) myCells.push(cells.byId[cells.mine[i]]);
    if (myCells.length > 0) {
      var x = 0,
        y = 0,
        s = 0,
        score = 0;
      for (var i = 0, l = myCells.length; i < l; i++) {
        var cell = myCells[i];
        score += ~~((cell.ns * cell.ns) / 100);
        x += cell.x;
        y += cell.y;
        s += cell.s;
      }
      camera.target.x = x / l;
      camera.target.y = y / l;
      camera.sizeScale = Math.pow(Math.min(64 / s, 1), 0.4);
      camera.target.scale = camera.sizeScale;
      camera.target.scale *= camera.viewportScale * camera.userZoom;
      camera.x = (camera.target.x + camera.x) / 2;
      camera.y = (camera.target.y + camera.y) / 2;
      stats.score = score;
      if (score > maxWeight) maxWeight = score;
      stats.maxScore = Math.max(stats.maxScore, score);
    } else {
      stats.score = NaN;
      stats.maxScore = 0;
      camera.x += (camera.target.x - camera.x) / 20;
      camera.y += (camera.target.y - camera.y) / 20;
    }
    camera.scale += (camera.target.scale - camera.scale) / 9;
  }

  function sqDist(a, b) {
    return (a.x - b.x) * (a.x - b.x) + (a.y - b.y) * (a.y - b.y);
  }

  function updateQuadtree() {
    var w = 1920 / camera.sizeScale;
    var h = 1080 / camera.sizeScale;
    var x = camera.x - w / 2;
    var y = camera.y - h / 2;
    quadtree = new PointQuadTree(x, y, w, h, QUADTREE_MAX_POINTS);
    for (var i = 0; i < cells.list.length; ++i) {
      var cell = cells.list[i];
      for (var n = 0; n < cell.points.length; ++n) {
        quadtree.insert(cell.points[n]);
      }
    }
  }

  function Cell(id, x, y, s, name, color, skin, flags) {
    this.id = id;
    this.x = this.nx = this.ox = x;
    this.y = this.ny = this.oy = y;
    this.s = this.ns = this.os = s;
    this.ejected = !!(flags & 0x20);
    this.setColor(color);
    this.setName(name);
    this.setSkin(skin);
    this.isJagged = flags & 0x01 || flags & 0x10;
    this.isPellet = s <= 20;
    if (this.isJagged) {
      this.image = virusImages[2];
    }
    this.born = syncUpdStamp;
    this.points = [];
    this.pointsVel = [];
  }
  Cell.prototype = {
    destroyed: false,
    id: 0,
    diedBy: 0,
    ox: 0,
    x: 0,
    nx: 0,
    oy: 0,
    y: 0,
    ny: 0,
    os: 0,
    s: 0,
    ns: 0,
    nameSize: 0,
    drawNameSize: 0,
    color: "#FFF",
    sColor: "#E5E5E5",
    skin: null,
    jagged: false,
    isPellet: false,
    born: null,
    updated: null,
    dead: null,
    destroy: function (killerId) {
      delete cells.byId[this.id];
      if (cells.mine.remove(this.id) && cells.mine.length === 0) {
        if (uData.token) {
          getUserData();
        }
        showDeathScreen(maxWeight, sec, food_eaten, top_leaderboard_position);
        maxWeight = 0;
      }
      this.destroyed = true;
      this.dead = syncUpdStamp;
      if (killerId && !this.diedBy) {
        this.diedBy = killerId;
        this.updated = syncUpdStamp;
      }
    },
    update: function (relativeTime) {
      var dt = (relativeTime - this.updated) / 120;
      dt = Math.max(Math.min(dt, 1), 0);
      if (this.destroyed && (this.isJagged || Date.now() > this.dead + 200)) {
        cells.list.remove(this);
      } else if (this.diedBy && cells.byId.hasOwnProperty(this.diedBy)) {
        this.nx = cells.byId[this.diedBy].x;
        this.ny = cells.byId[this.diedBy].y;
      }
      this.x = this.ox + (this.nx - this.ox) * dt;
      this.y = this.oy + (this.ny - this.oy) * dt;
      this.s = this.os + (this.ns - this.os) * dt;
      this.nameSize = ~~(~~Math.max(~~(0.3 * this.ns), 24) / 3) * 3;
      this.drawNameSize = ~~(~~Math.max(~~(0.3 * this.s), 24) / 3) * 3;
    },
    updateNumPoints: function () {
      var numPoints = (this.s * camera.scale) | 0;
      numPoints = Math.max(numPoints, CELL_POINTS_MIN);
      numPoints = Math.min(numPoints, CELL_POINTS_MAX);
      while (this.points.length > numPoints) {
        var i = (Math.random() * this.points.length) | 0;
        this.points.splice(i, 1);
        this.pointsVel.splice(i, 1);
      }
      if (this.points.length == 0 && numPoints != 0) {
        this.points.push({
          x: this.x,
          y: this.y,
          rl: this.s,
          parent: this,
        });
        this.pointsVel.push(Math.random() - 0.5);
      }
      while (this.points.length < numPoints) {
        var i = (Math.random() * this.points.length) | 0;
        var point = this.points[i];
        var vel = this.pointsVel[i];
        this.points.splice(i, 0, {
          x: point.x,
          y: point.y,
          rl: point.rl,
          parent: this,
        });
        this.pointsVel.splice(i, 0, vel);
      }
    },
    movePoints: function () {
      var pointsVel = this.pointsVel.slice();
      var len = this.points.length;
      for (var i = 0; i < len; ++i) {
        var prevVel = pointsVel[(i - 1 + len) % len];
        var nextVel = pointsVel[(i + 1) % len];
        var newVel = (this.pointsVel[i] + Math.random() - 0.5) * 0.7;
        newVel = Math.max(Math.min(newVel, 10), -10);
        this.pointsVel[i] = (prevVel + nextVel + 8 * newVel) / 10;
      }
      for (var i = 0; i < len; ++i) {
        var curP = this.points[i];
        var curRl = curP.rl;
        var prevRl = this.points[(i - 1 + len) % len].rl;
        var nextRl = this.points[(i + 1) % len].rl;
        var self = this;
        var affected = quadtree.some(
          {
            x: curP.x - 5,
            y: curP.y - 5,
            w: 10,
            h: 10,
          },
          function (item) {
            return item.parent != self && sqDist(item, curP) <= 25;
          }
        );
        if (
          !affected &&
          (curP.x < border.left || curP.y < border.top || curP.x > border.right || curP.y > border.bottom)
        ) {
          affected = true;
        }
        if (affected) {
          this.pointsVel[i] = Math.min(this.pointsVel[i], 0);
          this.pointsVel[i] -= 1;
        }
        curRl += this.pointsVel[i];
        curRl = Math.max(curRl, 0);
        curRl = (9 * curRl + this.s) / 10;
        curP.rl = (prevRl + nextRl + 8 * curRl) / 10;
        var angle = (2 * Math.PI * i) / len;
        var rl = curP.rl;
        curP.x = this.x + Math.cos(angle) * rl;
        curP.y = this.y + Math.sin(angle) * rl;
      }
    },
    parseName: function (value) {
      value = value || "";
      var nameAndSkin = /^(?:\{([^}]*)\})?([^]*)/.exec(value);
      return {
        name: nameAndSkin[2].trim(),
        skin: (nameAndSkin[1] || "").trim(),
      };
    },
    setName: function (name) {
      if (name === null || this.isPellet || this.ejected) return;
      const nameAndSkin = Cell.prototype.parseName(name);
      mainCtx.font = "20px Ubuntu";
      this.name = filterBigString(mainCtx, nameAndSkin.name, 250, 30) || EMPTY_NAME;
      this.setSkin(nameAndSkin.skin);
    },
    setSkin: function (value) {
      if (value) {
        this.skin = value;
        if (skinCache.has(this.skin)) return;
        const img = new Image();
        skinCache.set(this.skin, img);
        const skinPath =
          value.replace(/^1\%/, "/free/").replace(/^2\%/, "/level/").replace(/^3\%/, "/premium/") + ".png";
        img.src = `${serverProtocol}://${serverURL}/skin/${skinPath}`;
      }
    },
    setColor: function (value) {
      if (!value) {
        log.warn("got no color");
        return;
      }
      this.color = value;
      this.sColor = darkenColor(value);
    },
    draw: function (ctx) {
      ctx.save();
      this.drawShape(ctx);
      this.drawText(ctx);
      ctx.restore();
    },
    drawShape: function (ctx) {
      if (this.destroyed) {
        ctx.globalAlpha = Math.max(120 - Date.now() + this.dead, 0) / 120;
      } else {
        ctx.globalAlpha = Math.min(Date.now() - this.born, 120) / 120;
      }
      const ds = this.s * 2;
      const hs = this.s / 2;
      if (this.isJagged) {
        ctx.drawImage(this.image, this.x - hs, this.y - hs, ds, ds);
        return;
      }
      ctx.fillStyle = settings.showColor ? this.color : Cell.prototype.color;
      ctx.strokeStyle = settings.showColor ? this.sColor : Cell.prototype.sColor;
      ctx.lineWidth = Math.max(~~(this.s / 50), 10);
      if (!this.isPellet) {
        this.s -= ctx.lineWidth / 2;
      }
      ctx.beginPath();
      if (settings.jellyPhysics && this.points.length) {
        var point = this.points[0];
        ctx.moveTo(point.x, point.y);
        for (var i = 0; i < this.points.length; ++i) {
          var point = this.points[i];
          ctx.lineTo(point.x, point.y);
        }
      } else if (!this.isJagged) {
        ctx.arc(this.x, this.y, this.s, 0, PI_2, false);
      }
      ctx.closePath();
      const img = skinCache.get(this.skin);
      if (settings.showSkins && this.skin && img && img.complete && img.width && img.height) {
        if (settings.fillSkin) ctx.fill();
        ctx.save();
        ctx.clip();
        ctx.drawImage(img, this.x - this.s, this.y - this.s, ds, ds);
        ctx.restore();
      } else ctx.fill();
      if (!this.isPellet) {
        ctx.stroke();
        this.s += ctx.lineWidth / 2;
      }
    },
    drawText: function (ctx) {
      if (this.isPellet || this.isJagged) {
        return;
      }
      var y = this.y;
      if (this.name && settings.showNames) {
        drawText(ctx, false, this.x, this.y, this.nameSize, this.drawNameSize, this.name);
        y += Math.max(this.s / 4.5, this.nameSize / 1.5);
      }
      if (settings.showMass && (cells.mine.indexOf(this.id) !== -1 || cells.mine.length === 0)) {
        var mass = (~~((this.s * this.s) / 100)).toString();
        drawText(ctx, true, this.x, y, this.nameSize / 2, this.drawNameSize / 2, mass);
      }
    },
  };

  function cacheCleanup() {
    for (var i in cachedNames) {
      for (var j in cachedNames[i]) if (syncAppStamp - cachedNames[i][j].accessTime >= 5000) delete cachedNames[i][j];
      if (cachedNames[i] === {}) delete cachedNames[i];
    }
    for (var i in cachedMass) if (syncAppStamp - cachedMass[i].accessTime >= 5000) delete cachedMass[i];
  }
  var cachedNames = {};
  var cachedMass = {};

  function drawTextOnto(canvas, ctx, text, size) {
    ctx.font = size + "px Ubuntu";
    ctx.lineWidth = Math.max(~~(size / 10), 2);
    canvas.width = ctx.measureText(text).width + 2 * ctx.lineWidth;
    canvas.height = 4 * size;
    ctx.font = size + "px Ubuntu";
    ctx.lineWidth = Math.max(~~(size / 10), 2);
    ctx.textBaseline = "middle";
    ctx.textAlign = "center";
    ctx.fillStyle = "#FFF";
    ctx.strokeStyle = "#000";
    ctx.translate(canvas.width / 2, 2 * size);
    ctx.lineWidth !== 1 && ctx.strokeText(text, 0, 0);
    ctx.fillText(text, 0, 0);
  }

  function drawRaw(ctx, x, y, text, size) {
    ctx.font = size + "px Ubuntu";
    ctx.textBaseline = "middle";
    ctx.textAlign = "center";
    ctx.lineWidth = Math.max(~~(size / 10), 2);
    ctx.fillStyle = "#FFF";
    ctx.strokeStyle = "#000";
    ctx.lineWidth !== 1 && ctx.strokeText(text, x, y);
    ctx.fillText(text, x, y);
    ctx.restore();
  }

  function newNameCache(value, size) {
    var canvas = document.createElement("canvas");
    var ctx = canvas.getContext("2d");
    drawTextOnto(canvas, ctx, value, size);
    cachedNames[value] = cachedNames[value] || {};
    cachedNames[value][size] = {
      width: canvas.width,
      height: canvas.height,
      canvas: canvas,
      value: value,
      size: size,
      accessTime: syncAppStamp,
    };
    return cachedNames[value][size];
  }

  function newMassCache(size) {
    var canvases = {
      0: {},
      1: {},
      2: {},
      3: {},
      4: {},
      5: {},
      6: {},
      7: {},
      8: {},
      9: {},
    };
    for (var value in canvases) {
      var canvas = (canvases[value].canvas = document.createElement("canvas"));
      var ctx = canvas.getContext("2d");
      drawTextOnto(canvas, ctx, value, size);
      canvases[value].canvas = canvas;
      canvases[value].width = canvas.width;
      canvases[value].height = canvas.height;
    }
    cachedMass[size] = {
      canvases: canvases,
      size: size,
      lineWidth: Math.max(~~(size / 10), 2),
      accessTime: syncAppStamp,
    };
    return cachedMass[size];
  }

  function toleranceTest(a, b, tolerance) {
    return a - tolerance <= b && b <= a + tolerance;
  }

  function getNameCache(value, size) {
    if (!cachedNames[value]) return newNameCache(value, size);
    var sizes = Object.keys(cachedNames[value]);
    for (var i = 0, l = sizes.length; i < l; i++)
      if (toleranceTest(size, sizes[i], size / 4)) return cachedNames[value][sizes[i]];
    return newNameCache(value, size);
  }

  function getMassCache(size) {
    var sizes = Object.keys(cachedMass);
    for (var i = 0, l = sizes.length; i < l; i++)
      if (toleranceTest(size, sizes[i], size / 4)) return cachedMass[sizes[i]];
    return newMassCache(size);
  }

  function drawText(ctx, isMass, x, y, size, drawSize, value) {
    ctx.save();
    if (size > 500) return drawRaw(ctx, x, y, value, drawSize);
    ctx.imageSmoothingQuality = "high";
    if (isMass) {
      var cache = getMassCache(size);
      cache.accessTime = syncAppStamp;
      var canvases = cache.canvases;
      var correctionScale = drawSize / cache.size;
      var width = 0;
      for (var i = 0; i < value.length; i++) width += canvases[value[i]].width - 2 * cache.lineWidth;
      ctx.scale(correctionScale, correctionScale);
      x /= correctionScale;
      y /= correctionScale;
      x -= width / 2;
      for (var i = 0; i < value.length; i++) {
        var item = canvases[value[i]];
        ctx.drawImage(item.canvas, x, y - item.height / 2);
        x += item.width - 2 * cache.lineWidth;
      }
    } else {
      var cache = getNameCache(value, size);
      cache.accessTime = syncAppStamp;
      var canvas = cache.canvas;
      var correctionScale = drawSize / cache.size;
      ctx.scale(correctionScale, correctionScale);
      x /= correctionScale;
      y /= correctionScale;
      ctx.drawImage(canvas, x - canvas.width / 2, y - canvas.height / 2);
    }
    ctx.restore();
  }

  function processKey(event) {
    var key;
    if (CODE_TO_KEY[event.code]) {
      key = CODE_TO_KEY[event.code];
    } else {
      key = event.key.toLowerCase();
    }
    if (IE_KEYS.hasOwnProperty(key)) key = IE_KEYS[key];
    return key;
  }

  function keydown(event) {
    var key = processKey(event);
    if (pressed[key]) return;
    if (pressed.hasOwnProperty(key)) pressed[key] = true;
    if (key == "enter") {
      if (escOverlayShown || !settings.showChat) return;
      if (isTyping) {
        chatBox.blur();
        var text = chatBox.value;
        if (text.length > 0) sendChat(text);
        chatBox.value = "";
      } else chatBox.focus();
    } else if (key == "escape") {
      escOverlayShown ? hideESCOverlay() : showESCOverlay();
    } else {
      if (isTyping || escOverlayShown) return;
      const c = K[key];
      if (c !== undefined) wsSend(C.slice(c, c + 1));
      if (key === "w") {
        macroIntervalID = setInterval(() => {
          wsSend(C.slice(c, c + 1));
        }, macroCooldown);
      }
    }
  }

  function keyup(event) {
    var key = processKey(event);
    if (pressed.hasOwnProperty(key)) pressed[key] = false;
    if (key === "w") {
      clearInterval(macroIntervalID);
    }
  }

  function handleScroll(event) {
    if (event.target !== mainCanvas) return;
    camera.userZoom *= event.deltaY > 0 ? 0.8 : 1.2;
    camera.userZoom = Math.max(camera.userZoom, settings.moreZoom ? 0.1 : 1);
    camera.userZoom = Math.min(camera.userZoom, 4);
  }
  let pat = null;

  function init() {
    mainCanvas = document.getElementById("canvas");
    mainCtx = mainCanvas.getContext("2d");
    pat = mainCtx.createPattern(backgroundImage, "repeat");
    chatBox = byId("chat_textbox");
    soundsVolume = byId("soundsVolume");
    mainCanvas.focus();
    loadSettings();
    window.addEventListener("beforeunload", storeSettings);
    document.addEventListener("wheel", handleScroll, {
      passive: true,
    });
    byId("continue_button").addEventListener("click", function () {
      showESCOverlay();
      hideDeathScreen();
    });
    let recaptchaV2Widget = null;
    const playBtn = byId("play-btn");
    playBtn.addEventListener("click", async function () {
      const host = window.location.host;
      const sending_data = {
        name: settings.nick,
        skin: settings.skin,
        token: uData.token,
      };
      if (!captchaVerified) {
        const recaptchaV3Token = await grecaptcha.execute(recaptchaV3SiteKey);
        const server = window.location.hostname === "localhost" ? "localhost:3003/server" : serverURL;
        const recaptchaResponse = await fetch(`${serverProtocol}://${server}/recaptcha/v3`, {
          method: "POST",
          body: JSON.stringify({
            recaptchaV3Token,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        })
          .then((res) => res.json())
          .catch(console.error);
        let recaptchaV2Token = "";
        if (!recaptchaResponse.body.success) {
          const gElement = document.createElement("div");
          gElement.id = "g-recaptcha";
          playBtn.parentNode.insertBefore(gElement, playBtn.nextSibling);
          playBtn.disabled = true;
          recaptchaV2Token = await new Promise((res) => {
            recaptchaV2Widget = grecaptcha.render("g-recaptcha", {
              sitekey: recaptchaV2SiteKey,
              callback: (token) => {
                grecaptcha.reset(recaptchaV2Widget);
                byId("g-recaptcha").remove();
                byId("play-btn").disabled = false;
                return res(token);
              },
            });
          });
          sending_data.recaptchaV2Token = recaptchaV2Token;
        } else {
          sending_data.recaptchaV3Token = recaptchaV3Token;
        }
        captchaVerified = true;
      }
      sendPlay(JSON.stringify(sending_data) || host);
      maxWeight = 0;
      hideESCOverlay();
      sec = 0;
      food_eaten = 0;
      setInterval(tick, 1000);
    });

    function tick() {
      sec++;
    }
    window.onkeydown = keydown;
    window.onkeyup = keyup;
    chatBox.onblur = function () {
      isTyping = false;
      drawChat();
    };
    chatBox.onfocus = function () {
      isTyping = true;
      drawChat();
    };
    chatScrollBar.init();
    mainCanvas.onmousemove = function (event) {
      mouseX = event.clientX;
      mouseY = event.clientY;
    };
    setInterval(function () {
      sendMouseMove(
        (mouseX - mainCanvas.width / 2) / camera.scale + camera.x,
        (mouseY - mainCanvas.height / 2) / camera.scale + camera.y
      );
    }, 40);
    window.onresize = function () {
      var width = (mainCanvas.width = window.innerWidth);
      var height = (mainCanvas.height = window.innerHeight);
      camera.viewportScale = Math.max(width / 1920, height / 1080);
    };
    window.onresize();
    var mobileStuff = byId("mobileStuff");
    var touchpad = byId("touchpad");
    var touchCircle = byId("touchCircle");
    var touchSize = 0.2;
    var touched = false;
    var touchmove = function (event) {
      var touch = event.touches[0];
      var width = innerWidth * touchSize;
      var height = innerHeight * touchSize;
      if (touch.pageX < width && touch.pageY > innerHeight - height) {
        mouseX = innerWidth / 2 + ((touch.pageX - width / 2) * innerWidth) / width;
        mouseY = innerHeight / 2 + ((touch.pageY - (innerHeight - height / 2)) * innerHeight) / height;
      } else {
        mouseX = touch.pageX;
        mouseY = touch.pageY;
      }
      var r = innerWidth * 0.02;
      touchCircle.style.left = mouseX - r + "px";
      touchCircle.style.top = mouseY - r + "px";
    };
    window.addEventListener("touchmove", touchmove);
    window.addEventListener("touchstart", function (event) {
      if (!touched) {
        touched = true;
        mobileStuff.show();
      }
      if (event.target.id == "splitBtn") {
        wsSend(C.slice(17, 18));
      } else if (event.target.id == "ejectBtn") {
        wsSend(C.slice(21, 22));
      } else {
        touchmove(event);
      }
      touchCircle.show();
    });
    window.addEventListener("touchend", function (event) {
      if (event.touches.length === 0) {
        touchCircle.hide();
      }
    });
    gameReset();
    showESCOverlay();
    var regex = /ip=([\w\W]+:[0-9]+)/;
    var args = window.location.search;
    var div;
    if (args && (div = regex.exec(args.slice(1)))) {
      window.setserver(div[1]);
    } else window.setserver(byId("gamemode").value);
    window.requestAnimationFrame(drawGame);
    log.info("init done in " + (Date.now() - LOAD_START) + "ms");
  }
  window.setserver = function (url) {
    captchaVerified = false;
    const us1 = players["u0.sigmally.com"];
    if (url === "u0.sigmally.com/ws/" && us1 && us1.players_current >= us1.players_max) {
      url = "u2.sigmally.com/ws/";
    }
    serverURL = serverProtocol === "http" ? url.replace(":8081/ws/", "/server") : url.replace("/ws/", "/server");
    serverURL =
      serverURL.indexOf("localhost") !== -1
        ? serverURL.replace("localhost/server", "localhost:3003/server")
        : serverURL;
    serverURL = serverURL.replace("beta.sigmally.com:8081", "beta.sigmally.com:3001");
    if (url == wsUrl && ws && ws.readyState <= WebSocket.OPEN) return;
    gameReset();
    wsInit(url);
  };
  window.changeSkin = function (a, skinId) {
    settings.skin = a
      .replace(/^\/skin\//, "")
      .replace(/^free\//, "1%")
      .replace(/^level\//, "2%")
      .replace(/^premium\//, "3%")
      .replace(".png", "");
    var avatarImg = byId("avatar");
    if (avatarImg) {
      avatarImg.src = `${serverProtocol}://${serverURL}${a}`;
    }
    var skinSelectIcon = byId("js-skin-select-icon");
    var skinSelectIconText = byId("js-skin-select-icon-text");
    if (skinSelectIcon) {
      skinSelectIcon.style.backgroundImage = `url("${serverProtocol}://${serverURL}${a}")`;
    }
    if (skinSelectIconText) {
      skinSelectIconText.style.opacity = "0";
    }
    let data = {};
    data.skin = skinId;
    data.changeSkin = 1;
    updateUserData(uData.token, data, () => {
      byId("gallery").hide();
    });
  };
  window.openSkinsList = function () {
    if (uData.id === undefined) {
      byId("needtobeloggined").show(1.0);
      return;
    }
    if (byId("gallery-body").innerHTML == "") buildGallery();
    byId("gallery").show(0.5);
  };
  window.addEventListener("DOMContentLoaded", init);

  function showHideHOC() {
    let targetCurrentText;
    window.showHide = function (targetId, elementId) {
      const element = document.getElementById(elementId);
      const target = document.getElementById(targetId);
      if (target.textContent !== "Hide") {
        targetCurrentText = target.textContent;
      }
      if (element) {
        if (element.style.display === "none") {
          element.style.display = "";
          target.textContent = "Hide";
        } else {
          target.textContent = targetCurrentText;
          element.style.display = "none";
        }
      }
    };
  }
  showHideHOC();

  function showHideFromMaxHeightHOC() {
    let elementMaxHeight;
    window.showHideFromMaxHeight = function (elementId) {
      const element = document.getElementById(elementId);
      if (element.style.maxHeight !== "none") {
        elementMaxHeight = element.style.maxHeight;
      }
      if (element) {
        if (element.style.maxHeight === "none") {
          element.style.maxHeight = elementMaxHeight;
          element.classList.remove("shown");
        } else {
          element.style.maxHeight = "none";
          element.classList.add("shown");
        }
      }
    };
  }
  showHideFromMaxHeightHOC();
})();
let oldImage, oldName;
var startApp = function (element) {
  gapi.load("auth2", function () {
    authInstance = new Promise((resolve) => {
      const auth2 = gapi.auth2.init({
        client_id: googleClientID,
        cookiepolicy: "single_host_origin",
        prompt: "select_account",
      });
      resolve(auth2);
    });
    authInstance.then((auth2) => {
      if (auth2.isSignedIn.get()) {
        googleUser = auth2.currentUser.get();
        onSignedInGoogle(auth2.currentUser.get());
      }
      attachSigninGoogle(element, auth2);
    });
  });
};

function attachSigninGoogle(element, auth2) {
  auth2.attachClickHandler(
    element,
    {},
    function (googleUser) {
      onSignedInGoogle(googleUser);
    },
    function (error) {
      if (serverProtocol === "http") JSON.stringify(error, undefined, 2);
    }
  );
}

function onSignedInGoogle(googleU) {
  document.querySelector("#signInBtn").classList.add("hide");
  document.querySelector("#signOutBtn").classList.remove("hide");
  auth(drawGallery);
}

function auth(cb = () => {}) {
  fetch(`${serverProtocol}://${serverURL}/auth`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      google_access_token: gapi.auth2.getAuthInstance().currentUser.get().getAuthResponse().id_token,
    }),
  })
    .then((r) => r.json())
    .then((data) => {
      console.log("auth", data.body);
      if (data.result === "success") {
        uData = data.body.user;
        uData.id = data.body.user._id;
        const profileImage = document.querySelector(".profile-image");
        oldImage = profileImage.innerHTML;
        profileImage.innerHTML = `<img class="profile-image-icon" src="${uData.imageURL}">`;
        const profileImageIcon = document.querySelector(".profile-image-icon");
        profileImageIcon.classList.add("no-click");
        const profileName = document.querySelector(".profile-name");
        oldName = profileName.innerHTML;
        profileName.innerHTML = uData.givenName;
        const userLevel = document.querySelector("#user-level");
        userLevel.innerHTML = data.body.user.level || 0;
        const progressNext = document.querySelector("#progress-next");
        progressNext.innerText = `${data.body.user.exp}/${data.body.user.nextLevel}`;
        const userLineProgress = document.querySelector("#user-line-progress");
        userLineProgress.setAttribute("style", `width:${data.body.user.progress || 0}%`);
        const coins = document.querySelectorAll(".coins-value");
        for (let i = 0; coins[i]; i++) {
          coins[i].innerHTML = data.body.user.gold;
        }
        cb();
      }
    })
    .catch((e) => {
      console.error("ERROR: Server not responsed.", e);
    });
}

function getUserData(cb = () => {}) {
  fetch(`${serverProtocol}://${serverURL}/userdata/${uData.token}`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  })
    .then((r) => r.json())
    .then((data) => {
      if (data.result === "success") {
        uData = data.body.user;
        uData.id = data.body.user._id;
        const profileImage = document.querySelector(".profile-image");
        oldImage = profileImage.innerHTML;
        profileImage.innerHTML = `<img class="profile-image-icon" src="${uData.imageURL}">`;
        const profileImageIcon = document.querySelector(".profile-image-icon");
        profileImageIcon.classList.add("no-click");
        const profileName = document.querySelector(".profile-name");
        oldName = profileName.innerHTML;
        profileName.innerHTML = uData.givenName;
        const userLevel = document.querySelector("#user-level");
        userLevel.innerHTML = data.body.user.level || 0;
        const progressNext = document.querySelector("#progress-next");
        progressNext.innerText = `${data.body.user.exp}/${data.body.user.nextLevel}`;
        const userLineProgress = document.querySelector("#user-line-progress");
        userLineProgress.setAttribute("style", `width:${data.body.user.progress || 0}%`);
        const coins = document.querySelectorAll(".coins-value");
        for (let i = 0; coins[i]; i++) {
          coins[i].innerHTML = data.body.user.gold;
        }
        cb();
      }
    })
    .catch((e) => {
      console.error("ERROR: Server not responsed.", e);
    });
}

function updateUserData(token, data = {}, cb = () => {}) {
  var sending_data = {
    token: token,
    data: data,
  };
  fetch(`${serverProtocol}://${serverURL}/save-user`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(sending_data),
  })
    .then((r) => r.json())
    .then((data) => {
      if (data.result === "success") {
        uData = data.body.user;
        uData.id = data.body.user._id;
        const profileImage = document.querySelector(".profile-image");
        oldImage = profileImage.innerHTML;
        profileImage.innerHTML = `<img class="profile-image-icon" src="${uData.imageURL}">`;
        const profileImageIcon = document.querySelector(".profile-image-icon");
        profileImageIcon.classList.add("no-click");
        const profileName = document.querySelector(".profile-name");
        oldName = profileName.innerHTML;
        profileName.innerHTML = uData.givenName;
        const userLevel = document.querySelector("#user-level");
        userLevel.innerHTML = data.body.user.level || 0;
        const progressNext = document.querySelector("#progress-next");
        progressNext.innerText = `${data.body.user.exp}/${data.body.user.nextLevel}`;
        const userLineProgress = document.querySelector("#user-line-progress");
        userLineProgress.setAttribute("style", `width:${data.body.user.progress || 0}%`);
        const coins = document.querySelectorAll(".coins-value");
        for (let i = 0; coins[i]; i++) {
          coins[i].innerHTML = data.body.user.gold;
        }
        cb();
      }
    })
    .catch((e) => {
      console.error("ERROR: Server not responsed.", e);
    });
}

function signOut() {
  uData = {};
  const auth2 = gapi.auth2.getAuthInstance();
  auth2.signOut().then(function () {
    const profileImageIcon = document.querySelector(".profile-image-icon");
    profileImageIcon.classList.remove("no-click");
    const signInButton = document.querySelector("#signInBtn");
    signInButton.classList.remove("hide");
    const signOutBtn = document.querySelector("#signOutBtn");
    signOutBtn.classList.add("hide");
    const profileImage = document.querySelector(".profile-image");
    profileImage.innerHTML = oldImage;
    const profileName = document.querySelector(".profile-name");
    profileName.innerHTML = oldName;
    const userLevel = document.querySelector("#user-level");
    userLevel.innerHTML = "0";
    const progressNext = document.querySelector("#progress-next");
    progressNext.innerText = "0/0 XP";
    const userLineProgress = document.querySelector("#user-line-progress");
    userLineProgress.setAttribute("style", `width:0`);
    const coins = document.querySelectorAll(".coins-value");
    for (let i = 0; coins[i]; i++) {
      coins[i].innerHTML = 0;
    }
    var avatarImg = document.getElementById("avatar");
    if (avatarImg) {
      avatarImg.src = "";
    }
    var skinSelectIcon = document.getElementById("js-skin-select-icon");
    var skinSelectIconText = document.getElementById("js-skin-select-icon-text");
    if (skinSelectIcon) {
      skinSelectIcon.style.backgroundImage = `url("${serverProtocol}://${serverURL.replace(
        "server",
        "assets"
      )}/images/checkerboard.png")`;
    }
    if (skinSelectIconText) {
      skinSelectIconText.style.opacity = "1";
    }
    settings.skin = "";
  });
  auth2.disconnect();
}
let globalTab = 1;
window.changeTab = (n) => {
  const byId = (id) => document.querySelector(`#${id}`);
  for (let i = 1; i <= 3; i++) {
    if (i === n) {
      byId(`btn-tab${i}`).classList.add("tab-active");
      switch (n) {
        case 1:
          globalTab = 1;
          byId("skins-premium").classList.remove("hide");
          byId("skins-level").classList.add("hide");
          byId("skins-owned").classList.add("hide");
          break;
        case 2:
          globalTab = 2;
          byId("skins-level").classList.remove("hide");
          byId("skins-premium").classList.add("hide");
          byId("skins-owned").classList.add("hide");
          break;
        case 3:
          globalTab = 3;
          byId("skins-owned").classList.remove("hide");
          byId("skins-level").classList.add("hide");
          byId("skins-premium").classList.add("hide");
          break;
      }
    } else {
      byId(`btn-tab${i}`).classList.remove("tab-active");
    }
  }
};
window.addSkin = (id, category, cost) => {
  if (uData.id === undefined) {
    byId("needtobeloggined").show(1.0);
    return;
  }
  let data = {};
  data.skin = id;
  data.addSkin = 1;
  updateUserData(uData.token, data, () => {
    drawGallery(3, id);
  });
};
window.delSkin = (id, category) => {
  let data = {};
  data.skin = id;
  data.deleteSkin = 1;
  updateUserData(uData.token, data, () => {
    const tab = category === "level" ? 2 : 1;
    drawGallery(3);
  });
};
let _search, skinsGlobal;

function drawGallery(tab = 0, newSkin = null) {
  const inputSearch = document.querySelector("#skin-search");
  if (!_search) {
    _search = inputSearch.addEventListener("input", (e) => {
      const searchQuery = e.target.value;
      drawGalleryHandler(skinsGlobal, globalTab, null, searchQuery);
    });
  }
  const doubleCoins = document.querySelector("#gallery-header");
  const coins = document.querySelector(".coins");
  const div = document.createElement("div");
  div.classList.add("coins");
  div.classList.add("double");
  div.innerHTML = coins.innerHTML;
  const doublePlus = div.querySelector(".plus");
  doublePlus.classList.add("double");
  doubleCoins.innerHTML = "Skins";
  doubleCoins.appendChild(div);
  const server = `${serverProtocol}://${serverURL}`;
  fetch(`${server}/skins/${uData.id || null}`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  })
    .then((r) => r.json())
    .then((data) => {
      skinsGlobal = data.body;
      drawGalleryHandler(data.body, tab, newSkin);
    })
    .catch((e) => {
      console.error(e);
    });
}
let searchOut = "hfhjksa79879";

function drawGalleryHandler(skinsP, tab, newSkin = null, searchQuery = searchOut) {
  if (searchQuery === searchOut) document.querySelector("#skin-search").value = "";
  const server = `${serverProtocol}://${serverURL}`;
  const skins = {
    free: "",
    level: "",
    premium: "",
    owned: "",
  };
  const sortFuncCost = (a, b) => {
    return a.cost - b.cost;
  };
  const sortFuncLevel = (a, b) => {
    return a.level - b.level;
  };
  let sortedSkins = skinsP.skins.sort(sortFuncCost);
  sortedSkins = sortedSkins.sort(sortFuncLevel);
  for (let i = 0; sortedSkins[i]; i++) {
    const skin = sortedSkins[i];
    const skinName = `${skin.category}/${skin.name}`;
    if (skinsP.lastSkinUsed[0] == skin._id) {
      var avatarImg = document.getElementById("avatar");
      if (avatarImg) {
        avatarImg.src = `${serverProtocol}://${serverURL}/skin/${skin.category}/${skin.name}`;
      }
      var skinSelectIcon = document.getElementById("js-skin-select-icon");
      var skinSelectIconText = document.getElementById("js-skin-select-icon-text");
      if (skinSelectIcon) {
        skinSelectIcon.style.backgroundImage = `url("${serverProtocol}://${serverURL}/skin/${skin.category}/${skin.name}")`;
      }
      if (skinSelectIconText) {
        skinSelectIconText.style.opacity = "0";
      }
      settings.skin = `/skin/${skinName}`
        .replace(/^\/skin\//, "")
        .replace(/^free\//, "1%")
        .replace(/^level\//, "2%")
        .replace(/^premium\//, "3%")
        .replace(".png", "");
    }
    const skinElement = (category, type, skinId = null) => {
      let _isChanged = `onclick="changeSkin('/skin/${skinName}', '${skin._id}')"`;
      let skinButton = "";
      let disableSkin = "";
      let disableButton = "";
      let onclickHandler = `onclick="addSkin('${skin._id}', '${skin.category}', '${skin.cost}')"`;
      let deleteHandler = `onclick="delSkin('${skin._id}', '${skin.category}')"`;
      switch (category) {
        case "free":
          skinButton = `<div id="${skin._id}" ${onclickHandler} class="button-success">Free</div>`;
          if (type === "owned") {
            skinButton = `<div id="${skin._id}" ${_isChanged} class="button-success">use</div>`;
          }
          break;
        case "level":
          if (!uData.id || uData.level < skin.level) {
            disableButton = "button-disable";
            onclickHandler = "";
            _isChanged = "";
            disableSkin = "skin-disable";
          }
          skinButton = `<div id="${skin._id}" ${onclickHandler} class="button-success ${disableButton}">${skin.level} level</div>`;
          if (type === "owned") {
            skinButton = `<div id="${skin._id}" ${_isChanged} class="button-success">use</div>`;
          }
          break;
        case "premium":
          if (!uData.id || uData.gold < skin.cost) {
            disableButton = "button-disable";
            onclickHandler = "";
            disableSkin = "skin-disable";
          }
          if (type !== "owned") _isChanged = "";
          skinButton = `<div id="${skin._id}" ${onclickHandler} class="button-success ${disableButton}">${skin.cost}
                <img class="coin" alt="" src="https://sigmally.com/assets/images/icon/coin.svg"></div>`;
          if (type === "owned") {
            disableSkin = "";
            skinButton = `<div id="${skin._id}" ${_isChanged} class="button-success">use</div>`;
          }
          break;
      }
      let skinNew = "",
        skinActionNew = "";
      if (skinId === skin._id) {
        skinNew = "new";
        skinActionNew = "new-action";
      }
      return `
        <li class="skin ${skinNew}">
        <div class="skin-image">
          <img ${_isChanged} class="circular ${disableSkin}" src="${server}/skin/${skinName}">
        </div>
        <div class="skin-action">
          <h4 class="skinName">${skinName.replace(/^\w+\//, "").replace(".png", "")}</h4>
          ${skinButton}
        </div>
        </li>
      `;
    };
    const getSearch = (type, owned = null, newSkin = null) => {
      if (searchQuery === searchOut) {
        return skinElement(type, owned, newSkin);
      }
      return skin.name.toUpperCase().indexOf(searchQuery.toUpperCase()) !== -1 ? skinElement(type, owned, newSkin) : "";
    };
    if (skinsP.ownedSkins.indexOf(skin._id) !== -1) {
      skins.owned += getSearch(skin.category, "owned", newSkin);
      continue;
    }
    switch (skin.category) {
      case "free":
        skins.free += getSearch("free");
        break;
      case "level":
        skins.level += getSearch("level");
        break;
      case "premium":
        skins.premium += getSearch("premium");
        break;
    }
  }
  const galery = document.createElement("div");
  const galeryBody = `
    <ul id="skins-premium" class="skins-ul">${skins.free}${skins.premium}</ul>
    <ul id="skins-level" class="skins-ul hide">${skins.level}</ul>
    <ul id="skins-owned" class="skins-ul hide">${skins.owned}</ul>
  `;
  galery.innerHTML = galeryBody;
  const galleryContent = document.querySelector("#gallery-tabs-content");
  if (galleryContent) {
    galleryContent.innerHTML = "";
    galleryContent.appendChild(galery);
  }
  if (tab !== 0) changeTab(tab);
}

function getTopUsers() {
  const server = `${serverProtocol}://${serverURL}`;
  fetch(server + "/topusers", {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  })
    .then((r) => r.json())
    .then((data) => {
      document.getElementsByClassName("top-users__list")[0].innerHTML = "";
      for (var i = 0; i < data.body.topUsers.length; i++) {
        document.getElementsByClassName("top-users__list")[0].innerHTML +=
          "<tr><td>" +
          (i + 1) +
          "</td><td>" +
          data.body.topUsers[i].fullName +
          '</td><td align="center">' +
          data.body.topUsers[i].exp +
          "</td></tr>";
      }
    })
    .catch((e) => {
      console.error(e);
    });
}
const getServersStats = async () => {
  const servers = ["u0.sigmally.com", "u2.sigmally.com", "u1.sigmally.com"];
  const servers_names = ["US-1", "US-2", "Europe-1"];
  await Promise.all(
    servers.map(async (item, index) => {
      const server = `${serverProtocol}://${item}`;
      try {
        const res = await fetch(server + "/server/serversstats", {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        });
        if (res.status !== 200) {
          console.error(`Failed to fetch server stats from ${servers_names[index]} (${res.status}: ${res.statusText})`);
          return;
        }
        const data = await res.json();
        document.getElementById("option_" + index).innerHTML =
          servers_names[index] + " " + data.body.serverstats.players_current + "/" + data.body.serverstats.players_max;
        players[item] = data.body.serverstats;
      } catch (e) {
        console.error(`Failed to fetch server stats from ${servers_names[index]}`, e);
      }
    })
  );
  setTimeout(getServersStats, 30 * 1000);
};
getServersStats();
window.loginIfNoUser = () => {
  if (uData.id === undefined) {
    var evt = new MouseEvent("click", {
      bubbles: true,
      cancelable: true,
      view: window,
    });
    document.getElementById("signInBtn").dispatchEvent(evt);
    return;
  }
};

function Share(type) {
  if (type == "fb") {
    window.open(
      "http://www.facebook.com/sharer.php?u=https://sigmally.com&quote=Play+to+Sigmally!%20Highest%20Mass%20" +
        document.getElementById("highest_mass").innerHTML +
        "%20Top%20Position%20" +
        document.getElementById("top_leaderboard_position").innerHTML +
        "%20Time%20Alive%20" +
        document.getElementById("time_alive").innerHTML +
        "%20Food%20Eaten%20" +
        document.getElementById("food_eaten").innerHTML,
      "pagename",
      "resizable"
    );
  }
  if (type == "tw") {
    window.open(
      "https://twitter.com/intent/tweet?text=Play%20To%20sigmally.com%20Highest%20Mass%20" +
        document.getElementById("highest_mass").innerHTML +
        "%20Top%20Position%20" +
        document.getElementById("top_leaderboard_position").innerHTML +
        "%20Time%20Alive%20" +
        document.getElementById("time_alive").innerHTML +
        "%20Food%20Eaten%20" +
        document.getElementById("food_eaten").innerHTML,
      "pagename",
      "resizable"
    );
  }
}
