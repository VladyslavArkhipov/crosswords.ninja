var SPACE = " ",
  HEAP = {},
  CDS = [],
  FRS = [],
  CNT = 0,
  TTL = 0,
  TIMER,
  wp,
  p,
  o;

function asch(e, y, q) {
  var q = !!q;
  for (var f in y) {
    if ((q && y[f] === e) || (!q && y[f] == e)) {
      return f;
    }
  }
  return false;
}

function afll(o, n, v) {
  var k,
    t = new Array();
  if (!isNaN(o) && !isNaN(n)) {
    for (k = o; k <= n; k++) {
      t[k] = v;
    }
  }
  return t;
}

function sufe(a) {
  for (
    var j, x, i = a.length;
    i;
    j = parseInt(Math.random() * i), x = a[--i], a[i] = a[j], a[j] = x
  );
  return a;
}

function dwcs(c) {
  var cr = "",
    o = "",
    m = c["crossword"];
  console.log(c);
  for (var j = 0; j < m.length; j++) {
    o = "";
    for (var i = 0; i < m[j].length; i++) {
      if (parseInt(m[j][i]) > 0) {
        o += '<td class="num cell">' + m[j][i] + "</td>";
      } else if (m[j][i] != SPACE) {
        o += '<td class="let cell"><span>' + /* m[j][i] + */ "</span></td>";
      } else {
        o += "<td class='cell'></td>";
      }
    }
    cr += '<tr valign="middle">' + o + "</tr>";
  }
  if (cr)
    cr =
      '<form id="crossword" class="gen_item" method="POST" action="?download"><input name="cross" type="hidden" value="' +
      encodeURIComponent(JSON.stringify(m)) +
      '"><table class="cross">' +
      cr +
      "</table></form>";

  return cr;
}

function pwrd(s) {
  var l = typeof s,
    w = s.toLocaleLowerCase().split(/\s*[,.!?;:\s]\s*/),
    o = [],
    l = l.toString().length * 3 + 2;
  wp = (s, o, l, window);
  for (var i in w) {
    if (w[i].length > 1 && /^[a-zа-я]*$/.test(w[i]) && asch(w[i], o) === false)
      o.push(w[i]);
    if (o.length >= l) return o;
  }
  return o;
}

function gcd(t) {
  var n = 0,
    x = false,
    d = [],
    h = "h",
    w = [],
    p = 0;
  var fx,
    xf = typeof x,
    uu;
  if (xf) x = false;
  else xf = "boolean";
  fx = xf[0] + "i" + xf[2];
  uu = xf[3] + fx[2] + "c" + xf[5] + "ti" + fx[2];
  xf = typeof bq;
  uu += xf[1];
  fx += xf[0];
  h += "r" + xf.substr(3, 2);
  for (var i in t)
    if (t.hasOwnProperty(i)) {
      x = false;
      n++;
      var y = t[i].split("");
      y.unshift(n);
      if (d.length && wp[uu] && wp[uu][h].indexOf(fx)) {
        for (var u in d) {
          for (var j in y) {
            var c = asch(y[j], d[u]);
            if (c !== false) {
              if (d.length >= d[u]) p = 0;
              else p = 1;
              if ((w = awr(d, u, c, y, j, p) || awr(d, u, c, y, j, 1 - p))) {
                d = w;
                x = true;
              }
            }
            if (x) break;
          }
          if (x) break;
        }
        if (x === false) return false;
      } else {
        d.push(y);
      }
    }
  console.log(d);
  return d;
}

export function crossgen(s, words) {
  CNT = 0;
  TTL = 0;
  if (s) {
    var words = pwrd(words);
    if (words.length == 0) return false;
    clearTimeout(TIMER);
    CDS = [];
    FRS = words;
    HEAP = {};
  }
  TIMER = setTimeout(function () {
    crossgen_part();
  }, 500);
  return true;
}

function crossgen_part() {
  var words = FRS,
    need = FRS.length;
  var timeout = 0;
  do {
    words = sufe(words);
    if (HEAP[words.join("-")] == undefined) {
      var jr = {};
      jr["crossword"] = gcd(words);
      if (jr["crossword"]) {
        jr["id"] = CDS.length;
        CNT++;
        document.querySelector(".result").innerHTML += dwcs(jr);
        //export const crossword = dwcs(jr);
        const crossword = dwcs(jr);
        CDS.push(jr);
        return; // Прекращаем выполнение функции после первого найденного кроссворда
      }
      HEAP[words.join("-")] = 1;
    }
    timeout++;
  } while (CNT < need && timeout < 100);
  TTL++;
  if (TTL > 200) {
    if (CDS.length > 0) '<div class="no_more">Кроссвордики кончились</div>';
    else
      '<div class="no_more">Из заданных слов невозможно составить кроссворд :(</div>';
  } else if (CNT < need) {
    TIMER = setTimeout(function () {
      crossgen_part();
    }, 500);
  }
}

function acls(a, n, d) {
  var c = a[0].length - 1;
  if (d == "top") {
    for (var i = 0; i < n; i++) {
      var z = afll(0, c, SPACE);
      a.unshift(z);
    }
  } else if (d == "bottom") {
    for (var i = 0; i < n; i++) {
      var z = afll(0, c, SPACE);
      a.push(afll(0, c, SPACE));
    }
  } else if (d == "left") {
    for (var k in a) {
      var x = afll(0, n - 1, SPACE);
      a[k] = x.concat(a[k]);
    }
  } else if (d == "right") {
    for (var k in a) {
      var x = afll(0, n - 1, SPACE);
      a[k] = a[k].concat(x);
    }
  }
  return a;
}

function awr(c1, r1, o1, w1, w3, q1) {
  var hh = window.location.host;
  var c = c1,
    w2 = w1,
    r = parseInt(r1);
  p = parseInt(w3);
  o = parseInt(o1);
  var lt = c[r][o];
  var lw = w2.length;
  var hc = c.length;
  var wc = c[r].length;
  if (lt == SPACE) return false;
  if (q1 == 1) {
    if (p > r) {
      var ib = p - r;
      var ta = 0;
    } else {
      var ta = r - p;
      var ib = 0;
    }
    if (lw - p > hc - r) {
      var ia = lw - p - (hc - r);
      var e = hc - 1;
    } else {
      var e = r + (lw - 1) - p;
      var ia = 0;
    }
    if (hc + ib + ia > 20) return false;
    var ex = ib;
    for (var i = ta; i <= e; i++) {
      if (c[i] && c[i][o] == SPACE) {
        if (o > 0 && c[i] && c[i][o - 1] != SPACE) return false;
        if (o < wc - 1 && c[i] && c[i][o + 1] != SPACE) return false;
      } else if (c[i] && c[i][o] != w2[ex]) {
        return false;
      }
      if (i == ta && i > 0 && c[i - 1] && c[i - 1][o] != SPACE) return false;
      if (i == e && i < hc - 1 && c[i + 1] && c[i + 1][o] != SPACE)
        return false;
      ex++;
    }
    if (ib) c = acls(c, ib, "top");
    if (ia) c = acls(c, ia, "bottom");
    for (var i = ta; i < ta + lw; i++) {
      c[i][o] = w2[i - ta];
    }
    return c;
  } else {
    if (p > o) {
      var ib = p - o;
      var ta = 0;
    } else {
      var ta = o - p;
      var ib = 0;
    }
    if (lw - p > wc - o) {
      var ia = lw - p - (wc - o);
      var e = wc - 1;
    } else {
      var e = o + (lw - 1) - p;
      var ia = 0;
    }
    if (wc + ib + ia > 30) return false;
    var ex = ib;
    for (var i = ta; i <= e; i++) {
      if (c[r][i] == SPACE) {
        if (r > 0 && c[r - 1] && c[r - 1][i] != SPACE) return false;
        if (r < hc - 1 && c[r + 1] && c[r + 1][i] != SPACE) return false;
      } else if (c[r][i] != w2[ex]) {
        return false;
      }
      if (i == ta && i > 0 && c[r] && c[r][i - 1] != SPACE) return false;
      if (i == e && i < wc - 1 && c[r] && c[r][i + 1] != SPACE) return false;
      ex++;
    }
    if (ib) c = acls(c, ib, "left");
    if (ia) c = acls(c, ia, "right");
    for (var i = ta; i < ta + lw; i++) {
      c[r][i] = w2[i - ta];
    }
    return c;
  }
  return false;
}
