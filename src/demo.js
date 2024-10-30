let rpm = Array(250).fill(0xffff);
let boostpress = Array(250).fill(65535);
let tilt = Array(250).fill(127);
let oilpress = Array(250).fill(65535);
let oiltemp = Array(250).fill(65535);
//let temp=Array(250).fill(65535);
let altpot = Array(250).fill(0x7fff);
let fuelrate = Array(250).fill(0x7fff);
let hours = [];
let coolpress = Array(250).fill(65535);
let fuelpress = Array(250).fill(65535);
let eds1 = Array(250).fill(0);
let eds2 = Array(250).fill(0);
let load = Array(250).fill(127);
let torq = Array(250).fill(127);
let depth = 42949672;
let deptho = 0; //x7fff;
let speed = 65535;
let jp = [];
let ptt = 127;
let stt = 127;
let tgear = Array(250).fill(3);
let toilpress = Array(250).fill(65535);
let toiltemp = Array(250).fill(65535);
let tds = Array(250).fill(0);
let etemp = Array(250).fill(0xffffff);
let got130316 = false;
let fuel = 0x7fff;
let soc = Array(250).fill(0xff);
let cur = Array(250).fill(0x7fff);
let btemp = Array(250).fill(0xffff);
let bpot = Array(250).fill(0x7fff);
let tte = 0xffffff;
let t127488 = Array(250).fill(0);
let t127489 = Array(250).fill(0);
let t127493 = Array(250).fill(0);
let t127496 = 0;
let t127505 = 0;
let t127506 = Array(250).fill(0);
let t127508 = Array(250).fill(0);
let t128267 = 0;
let t128259 = 0;
let t128780 = 0;
let t129026 = 0;
let t1303126 = Array(250).fill(0);
let t130576 = 0;
let tmt = Array(23).fill(0);
let srcs = [
  [],
  [],
  [],
  [],
  [],
  [],
  [],
  [],
  [],
  [],
  [],
  [],
  [],
  [],
  [],
  [],
  [],
  [],
  [],
  [],
  [],
  [],
  [],
  [],
];

/*var dm=1;let volt=24;
var gs=[];
gs[0]=1;
gs[5]=1;
gs[10]=1;
gs[15]=1;
gs[20]=1;
gs[25]=1;
gs[30]=1;
gs[35]=1;

gs[1]=2;
gs[6]=2;
gs[11]=3;
gs[16]=1;
gs[21]=1;
gs[26]=1;
gs[31]=1;
gs[36]=1;*/

let cur_pos = 255;
let xte = 0x7fffffff;
let p129284 = 0;
let p129285 = 0;
let p129029 = 0;
let wndspd = 65535;
let wnddir = 65535;
let wndref = 7;
let vmg = 65535;
let hdg = 65535;
let hdgref = 3;
let cog = 65535;
let cogref = 3;
let sog = 65535;
let vroll = 0x7fff;
let vpitch = 0x7fff;
let temp = 0xffffff;
let totallog = 0xffffffff;
let triplog = 0xffffffff;
let t128275 = 0;
let t130316 = 0;
let t127250 = 0;
let t130306 = 0;
let t129284 = 0;
let t129285 = 0;
let t129029 = 0;

function getData() {
  let ez = "moneng";
  if (d2) ez = "monatt";
  if (d4) ez = "monnav";
  if (tm_start) {
    ez = "tm_start," + tm_cnt;
    tm_start = false;
  }
  if (tm_stop) {
    ez = "tm_stop";
    tm_stop = false;
  }
  if (sw_start) {
    ez = "sw_start";
    sw_start = false;
  }
  if (sw_stop) {
    ez = "sw_stop";
    sw_stop = false;
  }
  if (sw_reset) {
    ez = "sw_reset";
    sw_reset = false;
  }
  if (ez == "moneng" || d2 || d4) {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
      if (this.readyState == 4 && this.status == 200) {
        let wh = this.responseText;
        let whs = wh.split(";");
        sw_cnt = parseInt(whs[1]);
        tm_cnt = parseInt(whs[2]);
        let sentence = whs[0].split("\n"),
          i;
        for (i = 0; i < sentence.length; i++) {
          var spl = sentence[i].split(",");
          if (spl[0] == "!PDGY") {
            if (spl[1] == "TEXT") {
              pl = false;
              alert(spl[2]);
            } else if (spl[1] == "127257") {
              vpitch =
                (parseInt(spl[6][8] + spl[6][9], 16) << 8) +
                parseInt(spl[6][6] + spl[6][7], 16);
              if (vpitch > 32767) vpitch = -(65535 - vpitch);
              vroll =
                (parseInt(spl[6][12] + spl[6][13], 16) << 8) +
                parseInt(spl[6][10] + spl[6][11], 16);
              if (vroll > 32767) vroll = -(65535 - vroll);
            } else if (spl[1] == "129029") {
              if (spl[3] < cur_pos) cur_pos = spl[3];
              if (
                (sel_pos == "255" && cur_pos == spl[3]) ||
                sel_pos == spl[3]
              ) {
                t129029 = 60;
                p129029 = spl[6];
              }
            } else if (spl[1] == "129284") {
              t129284 = 60;
              p129284 = spl[6];
            } else if (spl[1] == "129285") {
              t129285 = 1;
              p129285 = spl[6];
            } else if (spl[1] == "129283") {
              xte =
                (parseInt(spl[6][10] + spl[6][11], 16) << 24) +
                (parseInt(spl[6][8] + spl[6][9], 16) << 16) +
                (parseInt(spl[6][6] + spl[6][7], 16) << 8) +
                parseInt(spl[6][4] + spl[6][5], 16);
            } else if (spl[1] == "128259") {
              t128259 = 60;
              speed =
                (parseInt(spl[6][4] + spl[6][5], 16) << 8) +
                parseInt(spl[6][2] + spl[6][3], 16);
            } else if (spl[1] == "129026") {
              if (cur_pos == spl[3] || sel_pos == spl[3]) {
                t129026 = 30;
                cog =
                  (parseInt(spl[6][6] + spl[6][7], 16) << 8) +
                  parseInt(spl[6][4] + spl[6][5], 16);
                sog =
                  (parseInt(spl[6][10] + spl[6][11], 16) << 8) +
                  parseInt(spl[6][8] + spl[6][9], 16);
              }
            } else if (spl[1] == "127250") {
              t127250 = 30;
              hdgref = parseInt(spl[6][14] + spl[6][15], 16) & 0b11;
              hdg =
                (parseInt(spl[6][4] + spl[6][5], 16) << 8) +
                parseInt(spl[6][2] + spl[6][3], 16);
            } else if (spl[1] == "130306") {
              t130306 = 30;
              wndref = parseInt(spl[6][11], 16) & 0b111;
              wndspd =
                (parseInt(spl[6][4] + spl[6][5], 16) << 8) +
                parseInt(spl[6][2] + spl[6][3], 16);
              wnddir =
                (parseInt(spl[6][8] + spl[6][9], 16) << 8) +
                parseInt(spl[6][6] + spl[6][7], 16);
            } else if (spl[1] == "130316") {
              let ts = parseInt(spl[6][4] + spl[6][5], 16);
              if (ts == 0) {
                t130316 = 30;
                temp =
                  (parseInt(spl[6][10] + spl[6][11], 16) << 16) +
                  (parseInt(spl[6][8] + spl[6][9], 16) << 8) +
                  parseInt(spl[6][6] + spl[6][7], 16);
              }
            } else if (spl[1] == "128275") {
              t128275 = 60;
              totallog =
                (parseInt(spl[6][18] + spl[6][19], 16) << 24) +
                (parseInt(spl[6][16] + spl[6][17], 16) << 16) +
                (parseInt(spl[6][14] + spl[6][15], 16) << 8) +
                parseInt(spl[6][12] + spl[6][13], 16);
              triplog =
                (parseInt(spl[6][26] + spl[6][27], 16) << 24) +
                (parseInt(spl[6][24] + spl[6][25], 16) << 16) +
                (parseInt(spl[6][22] + spl[6][23], 16) << 8) +
                parseInt(spl[6][20] + spl[6][21], 16);
            } else if (spl[1] == "128267") {
              t128267 = 50;
              depth =
                ((parseInt(spl[6][8] + spl[6][9], 16) << 24) +
                  (parseInt(spl[6][6] + spl[6][7], 16) << 16) +
                  (parseInt(spl[6][4] + spl[6][5], 16) << 8) +
                  parseInt(spl[6][2] + spl[6][3], 16)) /
                100;
              deptho =
                (parseInt(spl[6][12] + spl[6][13], 16) << 8) +
                parseInt(spl[6][10] + spl[6][11], 16);
              if (deptho > 32767) deptho = -(65535 - deptho);
            }
          }
        }
      }
    };
    xhttp.open("GET", ez + ".dyt", true);
    xhttp.send();
    redraw();
    for (let i = 0; i < 250; i++) {
      if (t127488[i] > 0) {
        t127488[i]--;
      }
      if (t127489[i] > 0) {
        t127489[i]--;
      }
      if (t127493[i] > 0) {
        t127493[i]--;
      }
      if (t127506[i] > 0) {
        t127506[i]--;
      }
      if (t127508[i] > 0) {
        t127508[i]--;
      }
    }
    if (t127496 > 0) {
      t127496--;
    }
    if (t127505 > 0) {
      t127505--;
    }
    if (t130576 > 0) t130576--;
    if (t128267 > 0) t128267--;
    if (t128259 > 0) t128259--;
    if (t128780 > 0) t128780--;
    if (t129026 > 0) t129026--;
    if (t127250 > 0) t127250--;
    if (t128275 > 0) t128275--;
    if (t130316 > 0) t130316--;
    if (t130306 > 0) t130306--;
    if (t129284 > 0) t129284--;
    if (t129029 > 0) t129029--;
  } else {
    snd(ez + ".dyt");
  }
}

sc();
setInterval(function () {
  getData();
}, 200);
