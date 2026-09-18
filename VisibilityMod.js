window.VisibilityModCode = {};

////////////////////////////////////////////////////////////////////
//RUNCODEBEFORE
////////////////////////////////////////////////////////////////////

window.VisibilityModCode.runCodeBefore = function () {
  window.catchError = function catchError(culprit_regex, code) {
    try {
      something = code.match(culprit_regex)[0];
    } catch (e) {
      console.log("I caught it!")
      if (window.NepDebug) {
        console.log(culprit_regex)
        console.log(code)
      }
      return true;
    } return false;

  }

  function loadAndRunCodeSynchronous(url) {
    let req = new XMLHttpRequest();
    req.open('GET', url, false);
    req.onload = function () {
      if (this.status === 200) {
        (1, eval)(this.responseText);
      } else {
        console.log(`Loading selected mod returned non-200 status. Received: ${this.status}`);
      }
    };
    req.onerror = function (event) {
      console.error(`Error when attempting to retrieve mod code from ${url}`);
      console.log(event);
    };
    req.send();
  }

  //loadAndRunCodeSynchronous('https://raw.githubusercontent.com/DarkSnakeGang/GoogleSnakePudding/main/PuddingMod.js');
  //window.PuddingMod.runCodeBefore();

  console.log("Enabling Visibility Mod");

  window.checkboxes = {
    checkboxStatuses: {
      leftEye: true, rightEye: true, body: true, snoot: true, nose: true,
      lightTiles: true, darkTiles: true, eatAnimation: true, fruit: true, poison: true, shadow: true,
      border: true, die: true, lumps: true, portals: true, flashSnake: false, shadowIncluded: true,
      keys: true, walls: true, locks: true, hotdogWalls: true, sokobanBox: true, sokobanGoal: true,
      mines: true, statue: true, brokenStatue: true, mineRadius: true, tongue: true,
      bridges: true, arrows: true, gates: true, shields: true,
      lightSnake: true, lightFruit: true,
    },
  };

  // The game builds the shadow as a silhouette of the sprite layer partway through a frame, so
  // anything we skip drawing would lose its shadow too. When Shadow Included is off, that part of
  // the frame runs twice: once with every silhouette gate forced open (what the shadow is taken
  // from), then the sprite layer is rewound and drawn again honouring the checkboxes. When it is
  // on, hidden parts simply are not drawn and their shadows go with them.
  window.visiFullPass = false;
  window.visiShadowScratch = null;
  window.visiShadowPassKeys = ['body', 'fruit', 'poison', 'lumps', 'leftEye', 'rightEye', 'snoot', 'nose',
    'eatAnimation', 'tongue', 'die', 'keys', 'sokobanBox'];

  window.visiBeginShadowPass = function visiBeginShadowPass(renderer, isInfinity) {
    window.visiFullPass = false;

    //Infinity mode composites the shadow from wrapped copies further down the frame, so the rewind
    //point here would land in the wrong place.
    let statuses = window.checkboxes.checkboxStatuses;
    if (isInfinity || !statuses.shadow || statuses.shadowIncluded) { return; }

    let anyHidden = false;
    for (let i = 0; i < window.visiShadowPassKeys.length; i++) {
      if (!statuses[window.visiShadowPassKeys[i]]) { anyHidden = true; break; }
    }
    if (!anyHidden) { return; }

    let source = renderer.ka.canvas;
    let scratch = window.visiShadowScratch;
    if (!scratch) {
      scratch = window.visiShadowScratch = document.createElement('canvas').getContext('2d');
    }
    if (scratch.canvas.width !== source.width || scratch.canvas.height !== source.height) {
      scratch.canvas.width = source.width;
      scratch.canvas.height = source.height;
    }
    scratch.setTransform(1, 0, 0, 1, 0, 0);
    scratch.globalAlpha = 1;
    scratch.globalCompositeOperation = 'copy';
    scratch.drawImage(source, 0, 0);
    scratch.globalCompositeOperation = 'source-over';

    window.visiFullPass = true;
  };

  window.visiEndShadowPass = function visiEndShadowPass(renderer) {
    if (!window.visiFullPass) { return false; }
    window.visiFullPass = false;

    let ctx = renderer.ka;
    ctx.save();
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.globalAlpha = 1;
    ctx.globalCompositeOperation = 'copy';
    ctx.drawImage(window.visiShadowScratch.canvas, 0, 0);
    ctx.restore();
    return true;
  };

  // Border is also painted as CSS background-color on the canvas chrome; keep handles so the
  // checkbox can toggle it live without restarting.
  window.visiBorderEls = [];
  window.visiBorderColor = "";
  window.applyVisiBorder = function applyVisiBorder() {
    let color = window.checkboxes.checkboxStatuses.border ? (window.visiBorderColor || "") : "transparent";
    for (let i = 0; i < window.visiBorderEls.length; i++) {
      let el = window.visiBorderEls[i];
      if (el && el.style) { el.style.backgroundColor = color; }
    }
  };

  window.flashSnakeStatus = { flashCount: 0, currentlyFlashingSnake: false, durationMillisecond: 1000 };

  window.dragHandler = {
    dragItem: null,
    dragContainer: null,
    dragObject: null,
    active: false,
    currentX: 0,
    currentY: 0,
    initialX: 0,
    initialY: 0,
    xOffset: 0,
    yOffset: 0,
    dragStart: (e) => {
      if (e.target === window.dragHandler.dragItem) {
        window.dragHandler.initialX = e.clientX - window.dragHandler.xOffset;
        window.dragHandler.initialY = e.clientY - window.dragHandler.yOffset;
        window.dragHandler.active = true;
      }
    },
    dragEnd: (e) => {
      window.dragHandler.initialX = window.dragHandler.currentX;
      window.dragHandler.initialY = window.dragHandler.currentY;
      window.dragHandler.active = false;
    },
    drag: (e) => {
      if (window.dragHandler.active) {

        //Enforce coordinates being within viewport
        let restrictedClientX = Math.max(Math.min(e.clientX, window.innerWidth - 5), 5);
        let restrictedClientY = Math.max(Math.min(e.clientY, window.innerHeight - 5), 5);

        e.preventDefault();
        window.dragHandler.currentX = restrictedClientX - window.dragHandler.initialX;
        window.dragHandler.currentY = restrictedClientY - window.dragHandler.initialY;
        window.dragHandler.xOffset = window.dragHandler.currentX;
        window.dragHandler.yOffset = window.dragHandler.currentY;

        window.dragHandler.setTranslate(window.dragHandler.currentX, window.dragHandler.currentY, window.dragHandler.dragObject);
      }
    },
    setTranslate: function (xPos, yPos, el) {
      el.style.transform = "translate3d(" + xPos + "px, " + yPos + "px, 0)";
    },
    initialiseDragHandler: function () {
      this.dragItem = document.getElementById('drag-handle');
      this.dragContainer = window;
      this.dragObject = document.getElementById('delete-stuff-draggable');

      //If it isn't fbx snake, then start at the left edge
      if (!/fbx\?fbx=snake_arcade/.test(document.location.href)) {
        this.dragObject.style.left = '5px';
      }

      this.dragContainer.addEventListener("mousedown", this.dragStart, false);
      this.dragContainer.addEventListener("mouseup", this.dragEnd, false);
      this.dragContainer.addEventListener("mousemove", this.drag, false);
    }
  };

  function setupEventListeners() {
    document.getElementById('delete-stuff-close').onclick = function () {
      document.getElementById('delete-stuff-popup').hidden = true;
    };

    document.addEventListener('keydown', function (event) {
      if (event.key == 'i') {
        document.getElementById('delete-stuff-popup').hidden = !document.getElementById('delete-stuff-popup').hidden;
      }
    });

    document.getElementById('left-eye').onchange = function () {
      window.checkboxes.checkboxStatuses.leftEye = this.checked;
    }

    document.getElementById('right-eye').onchange = function () {
      window.checkboxes.checkboxStatuses.rightEye = this.checked;
    }

    document.getElementById('snake-body').onchange = function () {
      window.checkboxes.checkboxStatuses.body = this.checked;
    }

    document.getElementById('snoot').onchange = function () {
      window.checkboxes.checkboxStatuses.snoot = this.checked;
    }

    document.getElementById('nose').onchange = function () {
      window.checkboxes.checkboxStatuses.nose = this.checked;
    }

    document.getElementById('light-tiles').onchange = function () {
      window.checkboxes.checkboxStatuses.lightTiles = this.checked;
    }

    document.getElementById('dark-tiles').onchange = function () {
      window.checkboxes.checkboxStatuses.darkTiles = this.checked;
    }

    document.getElementById('eat-animation').onchange = function () {
      window.checkboxes.checkboxStatuses.eatAnimation = this.checked;
    }

    document.getElementById('tongue').onchange = function () {
      window.checkboxes.checkboxStatuses.tongue = this.checked;
    }
    document.getElementById('fruit').onchange = function () {
      window.checkboxes.checkboxStatuses.fruit = this.checked;
    }
    document.getElementById('poison').onchange = function () {
      window.checkboxes.checkboxStatuses.poison = this.checked;
    }
    document.getElementById('shadow').onchange = function () {
      window.checkboxes.checkboxStatuses.shadow = this.checked;
    }
    document.getElementById('border').onchange = function () {
      window.checkboxes.checkboxStatuses.border = this.checked;
      window.applyVisiBorder();
    }
    document.getElementById('die').onchange = function () {
      window.checkboxes.checkboxStatuses.die = this.checked;
    }
    document.getElementById('lumps').onchange = function () {
      window.checkboxes.checkboxStatuses.lumps = this.checked;
    }
    document.getElementById('portals').onchange = function () {
      window.checkboxes.checkboxStatuses.portals = this.checked;
    }
    document.getElementById('flash-snake').onchange = function () {
      window.checkboxes.checkboxStatuses.flashSnake = this.checked;
    }
    //Handle dropdown for controlling duration of snake flashes
    document.getElementById('flash-snake-timing').onchange = function () {
      window.flashSnakeStatus.durationMillisecond = this.value;
    }
    document.getElementById('shadow-included').onchange = function () {
      window.checkboxes.checkboxStatuses.shadowIncluded = this.checked;
    }
    document.getElementById('keys').onchange = function () {
      window.checkboxes.checkboxStatuses.keys = this.checked;
    }
    document.getElementById('walls').onchange = function () {
      window.checkboxes.checkboxStatuses.walls = this.checked;
    }
    document.getElementById('locks').onchange = function () {
      window.checkboxes.checkboxStatuses.locks = this.checked;
    }
    document.getElementById('hotdog-walls').onchange = function () {
      window.checkboxes.checkboxStatuses.hotdogWalls = this.checked;
    }
    document.getElementById('sokoban-box').onchange = function () {
      window.checkboxes.checkboxStatuses.sokobanBox = this.checked;
    }
    document.getElementById('sokoban-goal').onchange = function () {
      window.checkboxes.checkboxStatuses.sokobanGoal = this.checked;
    }
    document.getElementById('mines').onchange = function () {
      window.checkboxes.checkboxStatuses.mines = this.checked;
      if (this.checked) {
        eval("window.MinesRef." + window.minesDefined + "=window.DefaultMines;")
      }
      else {
        eval("window.MinesRef." + window.minesDefined + "=window.NoMines;")
      }
    }
    document.getElementById('mine-radius').onchange = function () {
      window.checkboxes.checkboxStatuses.mineRadius = this.checked;
    }
    document.getElementById('broken-statue').onchange = function () {
      window.checkboxes.checkboxStatuses.brokenStatue = this.checked;
    }
    document.getElementById('statue').onchange = function () {
      window.checkboxes.checkboxStatuses.statue = this.checked;
    }
    document.getElementById('bridges').onchange = function () {
      window.checkboxes.checkboxStatuses.bridges = this.checked;
    }
    document.getElementById('arrows').onchange = function () {
      window.checkboxes.checkboxStatuses.arrows = this.checked;
    }
    document.getElementById('gates').onchange = function () {
      window.checkboxes.checkboxStatuses.gates = this.checked;
    }
    document.getElementById('shields').onchange = function () {
      window.checkboxes.checkboxStatuses.shields = this.checked;
    }
    document.getElementById('light-snake').onchange = function () {
      window.checkboxes.checkboxStatuses.lightSnake = this.checked;
    }
    document.getElementById('light-fruit').onchange = function () {
      window.checkboxes.checkboxStatuses.lightFruit = this.checked;
    }
    document.getElementById('spin').onchange = spinHandler;
  }

  function injectInitialHtml() {
    let initialHtml =
      `<div id="delete-stuff-popup" style="margin:0px;position:fixed;z-index:9001;width:100%;">
  <div id="delete-stuff-draggable" style="width: 370px; background-color: rgb(87, 138, 52); z-index: 9002; border-color: rgb(87, 138, 52); border-style: solid; border-width: 4px; border-radius: 10px; box-shadow: rgba(0, 0, 0, 0.4) 0px 3px 10px; position: fixed; left: 5px; top: 5px;border-width: 0px;">
    <div id="drag-handle" style="width: 22px; height: 22px; background-color: rgb(77, 193, 249); position: absolute; border-top-left-radius: 10px; border-bottom-right-radius: 18px; border-right: 3px solid rgb(87, 138, 52); border-bottom: 3px solid rgb(87, 138, 52); cursor: move; border-top-color: rgb(87, 138, 52); border-left-color: rgb(87, 138, 52);"></div>
    <div style="padding:10px;width:350px;margin:0;">
      <div id="visi-title" class="form-check-label" style="text-align: center; padding: 5px; background-color: rgb(74, 117, 44); color: white; font-size: 20px;">Visibility Mod</div>
      <div id="visi-boxes" style="background-color: rgb(74, 117, 44); margin-top: 5px; padding: 0px 0px 10px;">
        <!--Begin test area-->
        <!--Snake body Section-->
        <div style="box-sizing: border-box;padding:5px;margin: 0px;width: 45%;display:inline-block;float:left">
          <ul style="list-style-type: none;padding:5px;margin-top:0;margin-bottom:0">
            <li>
              <label class="form-check-label"><input class="form-check-input" id="left-eye" type="checkbox" checked>Left Eye</label>
            </li>
            <li>
              <label class="form-check-label"><input class="form-check-input" id="right-eye" type="checkbox" checked>Right Eye</label>
            </li>
            <li>
              <label class="form-check-label"><input class="form-check-input" id="snoot" type="checkbox" checked>Snoot</label>
            </li>
            <li>
              <label class="form-check-label"><input class="form-check-input" id="nose" type="checkbox" checked>Nostrils</label>
            </li>
            <li>
              <label class="form-check-label"><input class="form-check-input" id="snake-body" type="checkbox" checked>Body</label>
            </li>
            <li>
              <label class="form-check-label"><input class="form-check-input" id="lumps" type="checkbox" checked>Lumps</label>
            </li>
          </ul>
        </div>
        <div style="box-sizing: border-box;padding:5px;margin: 0px;width: 55%;display:inline-block;float:right;">
          <ul style="list-style-type: none;padding:5px;margin-top:0;margin-bottom:0">
            <li>
              <label class="form-check-label"><input class="form-check-input" id="eat-animation" type="checkbox" checked>Eat Anim.</label>
            </li>
            <li>
              <label class="form-check-label"><input class="form-check-input" id="tongue" type="checkbox" checked>Tongue</label>
            </li>
            <li>
              <label class="form-check-label"><input class="form-check-input" id="die" type="checkbox" checked>Die Anim.</label>
            </li>
            <li>
              <label class="form-check-label"><input class="form-check-input" id="shadow" type="checkbox" checked>Shadow</label>
            </li>
            <li>
              <label class="form-check-label"><input class="form-check-input" id="shadow-included" type="checkbox" checked>Shadow Included</label>
            </li>
          </ul>
        </div>
        <hr style="clear:both;width:90%;margin-bottom:0">
        <!--Background Section-->
        <div style="box-sizing: border-box;padding:5px;margin: 0px;width: 50%;display:inline-block;float:left">
          <ul style="list-style-type: none;padding:5px;margin-top:0;margin-bottom:0">
            <li>
              <label class="form-check-label"><input class="form-check-input" id="light-tiles" type="checkbox" checked>Light Tiles</label>
            </li>
            <li>
              <label class="form-check-label"><input class="form-check-input" id="dark-tiles" type="checkbox" checked>Dark Tiles</label>
            </li>
          </ul>
        </div>
        <div style="box-sizing: border-box;padding:5px;margin: 0px;width: 50%;display:inline-block;float:right;">
          <ul style="list-style-type: none;padding:5px;margin-top:0;margin-bottom:0">
            <li>
              <label class="form-check-label"><input class="form-check-input" id="border" type="checkbox" checked>Border</label>
            </li>
            <li>
              <label class="form-check-label"><input class="form-check-input" id="spin" type="checkbox">Spin</label>
            </li>
          </ul>
        </div>
        <hr style="clear:both;width:90%;margin-bottom:0">
        <!--Fruits Section-->
        <div style="box-sizing: border-box;padding:5px;margin: 0px;width: 45%;display:inline-block;float:left">
          <ul style="list-style-type: none;padding:5px;margin-top:0;margin-bottom:0">
            <li>
              <label class="form-check-label"><input class="form-check-input" id="fruit" type="checkbox" checked>Fruit</label>
            </li>
            <li>
              <label class="form-check-label"><input class="form-check-input" id="poison" type="checkbox" checked>Poison</label>
            </li>
            <li>
              <label class="form-check-label"><input class="form-check-input" id="portals" type="checkbox" checked>Portals</label>
            </li>
            <li>
              <label class="form-check-label"><input class="form-check-input" id="keys" type="checkbox" checked>Keys</label>
            </li>
            <li>
            <label class="form-check-label"><input class="form-check-input" id="statue" type="checkbox" checked>Statue</label>
            </li>
            <li>
              <label class="form-check-label"><input class="form-check-input" id="mines" type="checkbox" checked>Mines</label>
            </li>
          </ul>
        </div>
        <div style="box-sizing: border-box;padding:5px;margin: 0px;width: 55%;display:inline-block;float:right;">
          <ul style="list-style-type: none;padding:5px;margin-top:0;margin-bottom:0">
            <li>
              <label class="form-check-label"><input class="form-check-input" id="walls" type="checkbox" checked>Walls</label>
            </li>
            <li>
              <label class="form-check-label"><input class="form-check-input" id="locks" type="checkbox" checked>Locks</label>
            </li>
            <li>
              <label class="form-check-label"><input class="form-check-input" id="sokoban-box" type="checkbox" checked>Sokobox</label>
            </li>
            <li>
              <label class="form-check-label"><input class="form-check-input" id="sokoban-goal" type="checkbox" checked>Sokogoal</label>
            </li>
            <li>
              <label class="form-check-label"><input class="form-check-input" id="broken-statue" type="checkbox" checked>Cracks</label>
            </li>
            <li>
              <label class="form-check-label"><input class="form-check-input" id="mine-radius" type="checkbox" checked>Mine Radius</label>
            </li>
          </ul>
        </div>
        <hr style="clear:both;width:90%;margin-bottom:0">
        <!--Newer modes Section-->
        <div style="box-sizing: border-box;padding:5px;margin: 0px;width: 45%;display:inline-block;float:left">
          <ul style="list-style-type: none;padding:5px;margin-top:0;margin-bottom:0">
            <li>
              <label class="form-check-label"><input class="form-check-input" id="bridges" type="checkbox" checked>Bridges</label>
            </li>
            <li>
              <label class="form-check-label"><input class="form-check-input" id="arrows" type="checkbox" checked>Arrows</label>
            </li>
            <li>
              <label class="form-check-label"><input class="form-check-input" id="gates" type="checkbox" checked>Gates</label>
            </li>
            <li>
              <label class="form-check-label"><input class="form-check-input" id="shields" type="checkbox" checked>Shields</label>
            </li>
          </ul>
        </div>
        <div style="box-sizing: border-box;padding:5px;margin: 0px;width: 55%;display:inline-block;float:right;">
          <ul style="list-style-type: none;padding:5px;margin-top:0;margin-bottom:0">
            <li>
              <label class="form-check-label"><input class="form-check-input" id="hotdog-walls" type="checkbox" checked>Hotdog Walls</label>
            </li>
            <li>
              <label class="form-check-label"><input class="form-check-input" id="light-snake" type="checkbox" checked>Light Snake</label>
            </li>
            <li>
              <label class="form-check-label"><input class="form-check-input" id="light-fruit" type="checkbox" checked>Light Fruit</label>
            </li>
          </ul>
        </div>
        <hr style="clear:both;width:90%;margin-bottom:0">
        <!--Flash Section-->
        <div style="box-sizing: border-box;padding:5px;margin: 0px;width: 45%;display:inline-block;float:left">
          <ul style="list-style-type: none;padding:5px;margin-top:0;margin-bottom:0">
            <li>
              <label class="form-check-label"><input class="form-check-input" id="flash-snake" type="checkbox">Flash eat</label>
            </li>
          </ul>
        </div>
        <div style="box-sizing: border-box;padding:2px;margin: 0px;width: 55%;display:inline-block;">
          <label class="form-check-label" style="padding-top:5px;display:inline-block;float:left;">Flash time:</label>
            <select id="flash-snake-timing" style="margin-top: 9px; margin-right: 10px;background-color:#1155CC;color:white;font-family:Roboto,Arial,sans-serif;display:flex; justify-content: space-evenly; align-items: center; text-align: center;border-radius:0.375rem;float:right;">
              <option value="20">0.05s</option>
              <option value="200">0.2s</option>
              <option value="500">0.5s</option>
              <option value="1000" selected="">1s</option>
              <option value="2000">2s</option>
              <option value="3000">3s</option>
            </select>
        </div>
        <!--End test area-->
        <div style="text-align:center; clear:both" class="form-check-label"><a id="delete-stuff-close" href="#">Close</a> (Press i to show again)</div>
      </div>

    </div>

  </div>
</div>
<template id="tooltiptemplate">
  <div style="position:relative;display:inline-block;color: white;float:right;border: 1px solid white;border-radius:50%;width:1em;height:1em;text-align:center;font-family:Roboto,Arial,sans-serif;line-height:1em;" class="tooltip">
  ?
  <div style="position:absolute;top:0;left:120%;background-color:black;color:white;border-radius:0.5em;padding:0.5em;font-weight:normal;box-shadow:0 3px 10px rgba(0,0,0,0.4);width:110px;z-index:9003;visibility:hidden;opacity:0;transition: opacity 0.8s;" class="tooltiptext">
  </div>
  </div>
</template>`;

    let intialElement = document.createElement('div');
    intialElement.style.backgroundColor = 'transparent';
    intialElement.style.position = 'fixed';
    intialElement.style.zIndex = '9001';
    intialElement.innerHTML = initialHtml;

    document.getElementsByTagName('body')[0].prepend(intialElement);
  };

  function setupCss() {
    let customStyle = document.createElement('style');
    customStyle.type = 'text/css';
    customStyle.innerHTML = `.tooltip:hover .tooltiptext:not(:hover){visibility:visible!important;opacity:1!important;}
  #drag-handle:hover{background-color:rgb(17, 85, 204)!important;}
  #delete-stuff-popup label,#delete-stuff-popup div{user-select:none;}

  :root {--rotation-period: 30s;}
  .cer0Bd[data-spin='true']{animation: spin var(--rotation-period) linear infinite;}
  .cer0Bd[data-spin='x']{animation: spinx var(--rotation-period) linear infinite;}
  @keyframes spin { 100% { transform:rotate(360deg); } }
  @keyframes spinx { 100% { transform:rotateX(360deg); } }
  `;
    document.getElementsByTagName('head')[0].appendChild(customStyle);
  }

  function addTooltip(id, helpText) {
    let tooltipTemplate = document.getElementById('tooltiptemplate').content;
    let tooltipToInsert = tooltipTemplate.cloneNode(true);
    tooltipToInsert.querySelector('.tooltiptext').textContent = helpText;
    document.getElementById(id).parentElement.parentElement.appendChild(tooltipToInsert);
  }

  function loadTooltips() {
    let tooltipText = {
      'left-eye': "Left eye of snake. Looks towards the nearest fruit.",
      'right-eye': "Right eye of snake. Looks towards the nearest fruit.",
      'snoot': "Filled circle at the tip of the snake's head.",
      'nose': "The small nostril dots under the eyes.",
      'snake-body': "The lines and curves that make up the snake's body.",
      'lumps': "The swallowed fruit that pass through the snake.",
      'eat-animation': "The snake's mouth animation when eating fruit.",
      'tongue': "Animation when the snake sticks out it's tongue.",
      'die': "Animation when the snake dies. Also used in sokoban mode.",
      'shadow': "Toggles the snake/fruit/key shadow layer. Off = no shadows at all. Default colour is dark green.",
      'shadow-included': "When on (default), hiding something also removes that part's shadow. When off, hiding something still keeps its shadow.",
      'light-tiles': "The light tiles used for the background. You may need to restart (press esc and then play) for this to take effect. This is actually just a big rectangle that the dark tiles get drawn on top of. Has a glitchy visual effect when removed.",
      'dark-tiles': "The dark tiles used for the background. You may need to restart (press esc and then play) for this to take effect. These are individually drawn squares that get drawn on top of the light tile background.",
      'border': "The dark green border around the board (canvas fill and chrome background).",
      'fruit': "Regular fruit. Poison fruit is controlled separately.",
      'poison': "Poison fruit in poison mode.",
      'portals': "The portals that can be found in portal mode.",
      'keys': "The keys that can be found in key mode.",
      'walls': "The walls that can be found in wall mode.",
      'locks': "The locks that can be found in key mode (wall blocks with lock icons).",
      'hotdog-walls': "The side walls that spawn along the snake in hotdog mode.",
      'sokoban-box': "The box that can be found in the mode where you push around a box into a goal.",
      'sokoban-goal': "The goal that can be found in the mode where you push around a box into a goal.",
      'flash-snake': "When this setting is turned on, the snake will briefly show whenever a fruit is eaten. The amount of time it shows for is controlled by the Flash Time setting. This only has a noticable effect if parts of the snake are hidden to begin with.",
      'mines': "The mines (flags) in minesweeper mode.",
      'statue': "The statue in statue mode. Including broken statue.",
      'broken-statue': "The broken statues in statue mode.",
      'spin': "Spin the entire board.",
      'mine-radius': "The mine's radius in minesweeper mode. Dashed lines. Also includes confetti from explosion.",
      'bridges': "Bridge tiles and the dashed bridge path in bridge mode.",
      'arrows': "Direction arrows painted on the board in arrow mode.",
      'gates': "Dashed gate rectangles in gate mode.",
      'shields': "Directional shield bars drawn on fruit in shield mode.",
      'light-snake': "The glow around the snake's head in light mode.",
      'light-fruit': "The glow around apples in light mode.",
    };

    for (let inputElementId in tooltipText) {
      addTooltip(inputElementId, tooltipText[inputElementId]);
    }
  }

  function spinHandler() {
    let canvasElement = document.getElementsByClassName('cer0Bd')[0];
    if (!this.checked) {
      canvasElement.dataset.spin = 'false';
    } else {
      let r = document.querySelector(':root');
      let promptResponse = prompt('How many seconds should a spin take? Enter a number', '30');
      promptResponse = parseFloat(promptResponse);
      if (isNaN(promptResponse) || promptResponse <= 0) {
        alert('Invalid value entered. Defaulting to 30');
        r.style.setProperty('--rotation-period', '30s');
      } else {
        alert(`Spinning every ${promptResponse} seconds.`);
        r.style.setProperty('--rotation-period', promptResponse + 's');
      }
      let spinAroundZ = confirm('Spin around z axis?');//Spin around x or z axis.
      canvasElement.dataset.spin = spinAroundZ ? 'true' : 'x';
    }
  }

  injectInitialHtml();
  setupCss();
  loadTooltips();
  setupEventListeners();
  window.dragHandler.initialiseDragHandler();

}

////////////////////////////////////////////////////////////////////
//ALTERSNAKECODE
////////////////////////////////////////////////////////////////////

window.VisibilityModCode.alterSnakeCode = function (code) {

  //code = window.PuddingMod.alterSnakeCode(code);
  let deleteModDebug = false;
  if (localStorage.getItem('snakeChosenMod') === "customUrl") {
    console.log("Detected customUrl - enabling debug mode and printing initial code")
    deleteModDebug = true;
    console.log(code)
  }
  window.snakeScale = { tailStart: 1, tailEnd: 1, face: 1, eyes: 1 };

  /*
Same as replace, but throws an error if nothing is changed
*/
  function assertReplace(baseText, regex, replacement) {
    if (typeof baseText !== 'string') {
      throw new Error('String argument expected for assertReplace');
    }
    let outputText = baseText.replace(regex, replacement);

    //Throw warning if nothing is replaced
    if (baseText === outputText) {
      diagnoseRegexError(baseText, regex);
    }

    return outputText;
  }

  function swapInMainClassPrototype(mainClass, functionText) {
    functionText = assertReplace(functionText, /^[$a-zA-Z0-9_]{0,6}/, `${mainClass}.prototype`);
    return functionText;
  }

  /*
  Same as replaceAll, but throws an error if nothing is changed
  */
  function assertReplaceAll(baseText, regex, replacement) {
    if (typeof baseText !== 'string') {
      throw new Error('String argument expected for assertReplace');
    }
    let outputText = baseText.replaceAll(regex, replacement);

    //Throw warning if nothing is replaced
    if (baseText === outputText) {
      diagnoseRegexError(baseText, regex);
    }

    return outputText;
  }


  function diagnoseRegexError(baseText, regex) {
    if (!(regex instanceof RegExp)) {
      throw new Error('Failed to find match using string argument. No more details available');
    }

    //see if removing line breaks works - in that case we can give a more useful error message
    let oneLineText = baseText.replaceAll(/\n/g, '');
    let res = regex.test(oneLineText);

    //If line breaks don't solve the issue then throw a general error
    if (!res) {
      throw new Error('Failed to find match for regex.');
    }

    //Try to suggest correct regex to use for searching
    let regexSource = regex.source;
    let regexFlags = regex.flags;

    //Look at all the spots where line breaks might occur and try adding \n? there to see if it makes a difference
    //It might be easier to just crudely brute force putting \n? at each possible index?
    for (let breakableChar of ["%", "&", "\\*", "\\+", ",", "-", "\\/", ":", ";", "<", "=", ">", "\\?", "{", "\\|", "}"]) {
      for (let pos = regexSource.indexOf(breakableChar); pos !== -1; pos = regexSource.indexOf(breakableChar, pos + 1)) {
        //Remake the regex with a new line at the candidate position
        let candidateRegexSource = `${regexSource.slice(0, pos + breakableChar.length)}\\n?${regexSource.slice(pos + breakableChar.length)}`;
        let candidateRegex;

        try {
          candidateRegex = new RegExp(candidateRegexSource, regexFlags);
        } catch (err) {
          continue;
        }

        //See if the new regex works
        let testReplaceResult = candidateRegex.test(baseText);
        if (testReplaceResult) {
          //Success we found the working regex! Give descriptive error message to user and log suggested regex with new line in correct place
          console.log(`Suggested regex improvement:
  ${candidateRegex}`);
          throw new Error('Suggested improvement found! Error with line break, failed to find match for regex. See logged output for regex to use instead that should hopefully fix this.');
        }
      }
    }

    throw new Error('Line break error! Failed to failed to find match for regex - most likely caused by a new line break. No suggestions provided');
  }

  window.brieflyShowSnake = function brieflyShowSnake() {
    if (window.flashSnakeStatus.flashCount < 0) {
      throw new Error('Error with flashing snake');
    }
    window.flashSnakeStatus.flashCount++;
    window.flashSnakeStatus.currentlyFlashingSnake = true;

    //Clear flashed snake after a duration
    setTimeout(
      function () {
        window.flashSnakeStatus.flashCount--; if (window.flashSnakeStatus.flashCount === 0) { window.flashSnakeStatus.currentlyFlashingSnake = false; }
      },
      window.flashSnakeStatus.durationMillisecond
    );
  }

  //Function for body parts
  //let rightEyeRegex = /(\([a-z]\?[a-z]\.[$a-zA-Z0-9_]{0,6}:[a-z]\.[$a-zA-Z0-9_]{0,6}\)\.render\([a-z],\n?[a-z],\n?[a-z],\n?[a-z]\.[$a-zA-Z0-9_]{0,6},\n?[a-z])(\),)/;
  let rightEyeRegex = /(\([a-z]\?[a-z]\.[$a-zA-Z0-9_]{0,6}:[a-z]\.[$a-zA-Z0-9_]{0,6}\)\.render\([a-z],\n?[a-z],\n?[a-z],\n?[a-z],\n?[a-z]\*[a-z])(\),)/;

  if (deleteModDebug) {
    console.log(code)
  }

  let funcWithBodyParts_Origin = findFunctionInCode(code, /[$a-zA-Z0-9_]{0,6}=function\(a,b,c,d,e\)$/,
    rightEyeRegex,
    deleteModDebug);

  let funcWithBodyParts = findFunctionInCode(code, /[$a-zA-Z0-9_]{0,6}=function\(a,b,c,d,e\)$/,
    rightEyeRegex,
    deleteModDebug);

  //Die anim. The dying face is die.png, which the sprite class instantiates three times:
  //normal, mirrored, and a recoloured copy used while the snake is fading. Gate all of them.
  let dieSpriteProps = [];
  code.replace(/this\.([$a-zA-Z0-9_]{1,6})=new [$a-zA-Z0-9_]{1,6}\([$a-zA-Z0-9_.]{1,20},\n?"[^"]*die\.png"/g,
    function (whole, prop) {
      if (dieSpriteProps.indexOf(prop) === -1) { dieSpriteProps.push(prop); }
      return whole;
    });
  if (dieSpriteProps.length === 0) {
    throw new Error('Visibility mod: could not find the die.png sprite properties');
  }

  let dieGateCount = 0;
  funcWithBodyParts = funcWithBodyParts.replace(
    /(?:\([$a-zA-Z0-9_]{1,6}\?[$a-zA-Z0-9_]{1,6}\.([$a-zA-Z0-9_]{1,6}):[$a-zA-Z0-9_]{1,6}\.([$a-zA-Z0-9_]{1,6})\)|[$a-zA-Z0-9_]{1,6}\.([$a-zA-Z0-9_]{1,6}))\.render\(/g,
    function (whole, ternaryLeft, ternaryRight, plain) {
      let usesDieSprite = [ternaryLeft, ternaryRight, plain].some(function (prop) {
        return prop && dieSpriteProps.indexOf(prop) !== -1;
      });
      if (!usesDieSprite) { return whole; }
      dieGateCount++;
      return '(window.flashSnakeStatus.currentlyFlashingSnake || window.checkboxes.checkboxStatuses.die || window.visiFullPass) && ' + whole;
    });
  if (dieGateCount === 0) {
    throw new Error('Visibility mod: could not gate any die.png renders');
  }

  //Left/Right Eye. Both eyes come from the same sprite, drawn back to back in one comma expression
  funcWithBodyParts = assertReplace(funcWithBodyParts, /(\(([$a-zA-Z0-9_]{0,6}\?[$a-zA-Z0-9_]{0,6}\.[$a-zA-Z0-9_]{0,6}:[$a-zA-Z0-9_]{0,6}\.[$a-zA-Z0-9_]{0,6})\)\.render\([$a-zA-Z0-9_]{0,6},\n?[$a-zA-Z0-9_]{0,6},[$a-zA-Z0-9_]{0,6},[$a-zA-Z0-9_]{0,6},\n?[$a-zA-Z0-9_*]{0,6})(\)),(\(\2\)\.render\([$a-zA-Z0-9_]{0,6},\n?[$a-zA-Z0-9_]{0,6},[$a-zA-Z0-9_]{0,6},[$a-zA-Z0-9_]{0,6},\n?[$a-zA-Z0-9_*]{0,6})(\))/,
    '(window.flashSnakeStatus.currentlyFlashingSnake || window.checkboxes.checkboxStatuses.leftEye || window.visiFullPass) && $1 * window.snakeScale.eyes $3,' +
    '(window.flashSnakeStatus.currentlyFlashingSnake || window.checkboxes.checkboxStatuses.rightEye || window.visiFullPass) && $4 * window.snakeScale.eyes $5');

  //Eye offsets
  funcWithBodyParts = assertReplaceAll(funcWithBodyParts, /[$a-zA-Z0-9_]{0,6}\.[$a-zA-Z0-9_]{0,6}\+=\n?Math\.(?:cos|sin)\([$a-zA-Z0-9_]{0,6}[+-][$a-zA-Z0-9_]{0,6}\)\*[$a-zA-Z0-9_]{0,6}/g,
    '$& * window.snakeScale.eyes');

  //Eat / Nostrils share eat.png. Resting frame (d3===0) is nostrils; any other frame is the mouth.
  let eatSpriteProps = [];
  code.replace(/this\.([$a-zA-Z0-9_]{1,6})=new [$a-zA-Z0-9_]{1,6}\([$a-zA-Z0-9_.]{1,20},\n?"[^"]*eat\.png"/g,
    function (whole, prop) {
      if (eatSpriteProps.indexOf(prop) === -1) { eatSpriteProps.push(prop); }
      return whole;
    });
  if (eatSpriteProps.length === 0) {
    throw new Error('Visibility mod: could not find the eat.png sprite properties');
  }

  let eatGateCount = 0;
  funcWithBodyParts = funcWithBodyParts.replace(
    /(?:\([$a-zA-Z0-9_]{1,6}\?[$a-zA-Z0-9_]{1,6}\.([$a-zA-Z0-9_]{1,6}):[$a-zA-Z0-9_]{1,6}\.([$a-zA-Z0-9_]{1,6})\)|[$a-zA-Z0-9_]{1,6}\.([$a-zA-Z0-9_]{1,6}))\.render\(Math\.floor\(([$a-zA-Z0-9_.]{1,12})\)/g,
    function (whole, ternaryLeft, ternaryRight, plain, frameExpr) {
      let usesEatSprite = [ternaryLeft, ternaryRight, plain].some(function (prop) {
        return prop && eatSpriteProps.indexOf(prop) !== -1;
      });
      if (!usesEatSprite) { return whole; }
      eatGateCount++;
      return '(window.flashSnakeStatus.currentlyFlashingSnake||window.visiFullPass||(Math.floor(' + frameExpr + ')===0?window.checkboxes.checkboxStatuses.nose:window.checkboxes.checkboxStatuses.eatAnimation))&&' + whole;
    });
  if (eatGateCount === 0) {
    throw new Error('Visibility mod: could not gate any eat.png renders');
  }

  //Tongue
  funcWithBodyParts = assertReplace(funcWithBodyParts, /(\([$a-zA-Z0-9_]{0,6}\?[$a-zA-Z0-9_]{0,6}\.[$a-zA-Z0-9_]{0,6}:[$a-zA-Z0-9_]{0,6}\.[$a-zA-Z0-9_]{0,6}\)\.render\([$a-zA-Z0-9_]{0,6},[$a-zA-Z0-9_]{0,6},[$a-zA-Z0-9_]{0,6},[$a-zA-Z0-9_]{0,6},[$a-zA-Z0-9_]{0,6})(\)\))/,
    '(window.checkboxes.checkboxStatuses.tongue || window.visiFullPass) && $1 * window.snakeScale.face $2');

  //Snoot
  funcWithBodyParts = assertReplace(funcWithBodyParts, /[$a-zA-Z0-9_]{0,6}\.[$a-zA-Z0-9_]{0,6}\.fill\(\)/,
    '(window.flashSnakeStatus.currentlyFlashingSnake || window.checkboxes.checkboxStatuses.snoot || window.visiFullPass) && $&');

  //Snoot scale
  funcWithBodyParts = assertReplace(funcWithBodyParts, /\.4/, 'window.snakeScale.face * 0.4');

  //eval(funcWithBodyParts);

  //Function for fruit (ES6 class method render(a,b) on v12+)
  let fruitRegex = /this\.[$a-zA-Z0-9_]{0,6}\.drawImage\([$a-zA-Z0-9_]{0,6},0,0,[$a-zA-Z0-9_]{0,6},[$a-zA-Z0-9_]{0,6},-[$a-zA-Z0-9_]{0,6}\/2,-[$a-zA-Z0-9_]{0,6}\/2,[$a-zA-Z0-9_]{0,6},[$a-zA-Z0-9_]{0,6}\)/;

  let funcWithFruit_Origin = findFunctionInCode(code, /render\([$a-zA-Z0-9_]{0,6},[$a-zA-Z0-9_]{0,6}\)$/,
    fruitRegex,
    deleteModDebug);

  let funcWithFruit = findFunctionInCode(code, /render\([$a-zA-Z0-9_]{0,6},[$a-zA-Z0-9_]{0,6}\)$/,
    fruitRegex,
    deleteModDebug);

  //Regular fruit vs poison fruit. `nla` marks the poisonous half of the fruit set in poison mode.
  funcWithFruit = assertReplace(funcWithFruit, fruitRegex,
    '(window.visiFullPass || (b.nla ? window.checkboxes.checkboxStatuses.poison : window.checkboxes.checkboxStatuses.fruit)) && $&');

  //Mirrored copy (in twin/infinity layouts), using the same poison marker.
  funcWithFruit = assertReplace(funcWithFruit, /this\.[$a-zA-Z0-9_]{0,6}\.drawImage\([$a-zA-Z0-9_]{0,6},0,0,[$a-zA-Z0-9_]{0,6},[$a-zA-Z0-9_]{0,6},-\([$a-zA-Z0-9_]{0,6}\/2\),-\([$a-zA-Z0-9_]{0,6}\/2\),[$a-zA-Z0-9_]{0,6},[$a-zA-Z0-9_]{0,6}\)/,
    '(window.visiFullPass || (b.nla ? window.checkboxes.checkboxStatuses.poison : window.checkboxes.checkboxStatuses.fruit)) && $&');

  //For compatitibilty, also change this code for animatedSnakeColours
  /*
  //Commented out until I find a new way to do animated Snake Colours
  funcWithFruit = assertReplaceAll(funcWithFruit,'"#578A34"', '((typeof animateSnakeGlobals !== "undefined" && animateSnakeGlobals.voice.isBorderSet) ? animateSnakeGlobals.voice.borderColour : "#578A34")');
  */

  //eval(funcWithFruit);


  // Walls / locks (ES6 class render(a) over Ca.Aa values)
  let wallInsideRegex = /this\.[$a-zA-Z0-9_]{0,6}\.Ca\.Aa\.values\(\)/;

  let funcWithRenderWall_Origin = findFunctionInCode(code, /render\([$a-zA-Z0-9_]{0,6}\)$/,
    wallInsideRegex,
    deleteModDebug);

  let funcWithRenderWall = findFunctionInCode(code, /render\([$a-zA-Z0-9_]{0,6}\)$/,
    wallInsideRegex,
    deleteModDebug);

  //for walls / locks / hotdog walls (same renderer; distinguished by k.ez and k.XNa)
  funcWithRenderWall = assertReplace(funcWithRenderWall, /this\.[$a-zA-Z0-9_]{0,6}\.fillRect\([$a-zA-Z0-9_]{0,6},[$a-zA-Z0-9_]{0,6},[$a-zA-Z0-9_]{0,6},[$a-zA-Z0-9_]{0,6}\)/,
    '(k.ez?window.checkboxes.checkboxStatuses.hotdogWalls:(k.XNa!==void 0&&k.XNa>=0?window.checkboxes.checkboxStatuses.locks:window.checkboxes.checkboxStatuses.walls))&&$&');

  //lock icon on wall
  funcWithRenderWall = assertReplace(funcWithRenderWall, /this\.[$a-zA-Z0-9_]{0,6}\.drawImage\([$a-zA-Z0-9_]{0,6}\(this\.[$a-zA-Z0-9_]{0,6}\)\.[$a-zA-Z0-9_]{0,6}\.canvas,[$a-zA-Z0-9_]{0,6}\.[$a-zA-Z0-9_]{0,6}\*128,0,128,128,[$a-zA-Z0-9_]{0,6}\.[$a-zA-Z0-9_]{0,6}-[$a-zA-Z0-9_]{0,6}\/2,[$a-zA-Z0-9_]{0,6}\.[$a-zA-Z0-9_]{0,6}-[$a-zA-Z0-9_]{0,6}\/2,[$a-zA-Z0-9_]{0,6},[$a-zA-Z0-9_]{0,6}\)/,
    'window.checkboxes.checkboxStatuses.locks && $&');


  //Sokoban box (TaF-style helper)
  let sokobanInsideRegex = /[$a-zA-Z0-9_]{0,6}\([a-z]\.settings,7\)&&![a-z]\)\{[a-z]=new/;

  let funcWithSokoban_Origin = findFunctionInCode(code, /[$a-zA-Z0-9_]{0,6}=function\([$a-zA-Z0-9_]{0,6},[$a-zA-Z0-9_]{0,6},[$a-zA-Z0-9_]{0,6},[$a-zA-Z0-9_]{0,6},[$a-zA-Z0-9_]{0,6},[$a-zA-Z0-9_]{0,6}\)$/,
    sokobanInsideRegex,
    deleteModDebug);

  let funcWithSokoban = findFunctionInCode(code, /[$a-zA-Z0-9_]{0,6}=function\([$a-zA-Z0-9_]{0,6},[$a-zA-Z0-9_]{0,6},[$a-zA-Z0-9_]{0,6},[$a-zA-Z0-9_]{0,6},[$a-zA-Z0-9_]{0,6},[$a-zA-Z0-9_]{0,6}\)$/,
    sokobanInsideRegex,
    deleteModDebug);

  //Sokoban mirrored
  funcWithSokoban = assertReplace(funcWithSokoban, /[$a-zA-Z0-9_]{0,6}\.[$a-zA-Z0-9_]{0,6}\.drawImage\([$a-zA-Z0-9_]{0,6}\([$a-zA-Z0-9_]{0,6}\.[$a-zA-Z0-9_]{0,6}\)\.[$a-zA-Z0-9_]{0,6}\.canvas,128,0,128,128,[$a-zA-Z0-9_]{0,6}\.[$a-zA-Z0-9_]{0,6}-[$a-zA-Z0-9_]{0,6}\/2,[$a-zA-Z0-9_]{0,6}\.[$a-zA-Z0-9_]{0,6}-[$a-zA-Z0-9_]{0,6}\/2,[$a-zA-Z0-9_]{0,6},[$a-zA-Z0-9_]{0,6}\)/,
    '(window.checkboxes.checkboxStatuses.sokobanBox || window.visiFullPass) && $&');

  //Sokoban normal
  funcWithSokoban = assertReplace(funcWithSokoban, /[$a-zA-Z0-9_]{0,6}\.[$a-zA-Z0-9_]{0,6}\.drawImage\([$a-zA-Z0-9_]{0,6}\([$a-zA-Z0-9_]{0,6}\.[$a-zA-Z0-9_]{0,6}\)\.[$a-zA-Z0-9_]{0,6}\.canvas,0,0,128,128,[$a-zA-Z0-9_]{0,6}\.[$a-zA-Z0-9_]{0,6}-[$a-zA-Z0-9_]{0,6}\/2,[$a-zA-Z0-9_]{0,6}\.[$a-zA-Z0-9_]{0,6}-[$a-zA-Z0-9_]{0,6}\/2,[$a-zA-Z0-9_]{0,6},[$a-zA-Z0-9_]{0,6}\)/,
    '(window.checkboxes.checkboxStatuses.sokobanBox || window.visiFullPass) && $&');

  //  eval(funcWithSokoban);

  SokoGoalRegex = /[$a-zA-Z0-9_]{0,6}\.[$a-zA-Z0-9_]{0,6}\.drawImage\([$a-zA-Z0-9_]{0,6}\([$a-zA-Z0-9_]{0,6}\.[$a-zA-Z0-9_]{0,6}\)\.[$a-zA-Z0-9_]{0,6}\.canvas,[$a-zA-Z0-9_]{0,6}\*128,0,128,128,[$a-zA-Z0-9_]{0,6}\.[$a-zA-Z0-9_]{0,6}-[$a-zA-Z0-9_]{0,6}\.[$a-zA-Z0-9_]{0,6}\.[$a-zA-Z0-9_]{0,6}\.[$a-zA-Z0-9_]{0,6}\/2\+[$a-zA-Z0-9_]{0,6},[$a-zA-Z0-9_]{0,6}\.[$a-zA-Z0-9_]{0,6}-[$a-zA-Z0-9_]{0,6}\.[$a-zA-Z0-9_]{0,6}\.[$a-zA-Z0-9_]{0,6}\.[$a-zA-Z0-9_]{0,6}\/2\+[$a-zA-Z0-9_]{0,6},[$a-zA-Z0-9_]{0,6}\.[$a-zA-Z0-9_]{0,6}\.[$a-zA-Z0-9_]{0,6}\.[$a-zA-Z0-9_]{0,6},[$a-zA-Z0-9_]{0,6}\.[$a-zA-Z0-9_]{0,6}\.[$a-zA-Z0-9_]{0,6}\.[$a-zA-Z0-9_]{0,6}\)/

  //Sokoban goal func
  let funcWithSokobanGoal_Origin = findFunctionInCode(code, /[$a-zA-Z0-9_]{0,6}=function\(a,b,c,d,e\)$/,
    SokoGoalRegex,
    deleteModDebug);

  let funcWithSokobanGoal = findFunctionInCode(code, /[$a-zA-Z0-9_]{0,6}=function\(a,b,c,d,e\)$/,
    SokoGoalRegex,
    deleteModDebug);

  //Sokoban goal
  funcWithSokobanGoal = assertReplace(funcWithSokobanGoal, SokoGoalRegex,
    'window.checkboxes.checkboxStatuses.sokobanGoal && $&');

  //eval(funcWithSokobanGoal);


  //Shadow
  let funcWithShadow_Origin = findFunctionInCode(code, /[$a-zA-Z0-9_]{0,6}=function\([$a-zA-Z0-9_]{0,6}\)$/, /destination-atop/, deleteModDebug);

  let funcWithShadow = findFunctionInCode(code, /[$a-zA-Z0-9_]{0,6}=function\([$a-zA-Z0-9_]{0,6}\)$/, /destination-atop/, deleteModDebug);

  funcWithShadow = assertReplace(funcWithShadow, /[$a-zA-Z0-9_]{0,6}\.[$a-zA-Z0-9_]{0,6}\.globalCompositeOperation="destination-atop";/, 'if(!window.checkboxes.checkboxStatuses.shadow){return}$&')


  //Normal background (i.e not on infinity)

  let funcWithBackground_Origin = findFunctionInCode(code, /[$a-zA-Z0-9_]{0,6}=function\(a\)$/,
    /[$a-zA-Z0-9_]{0,6}\.[$a-zA-Z0-9_]{0,6}\.fillRect\(0,0,[$a-zA-Z0-9_]{0,6}\.[$a-zA-Z0-9_]{0,6}\.canvas\.width,[$a-zA-Z0-9_]{0,6}\.[$a-zA-Z0-9_]{0,6}\.canvas\.height\);for/,
    deleteModDebug);

  let funcWithBackground = findFunctionInCode(code, /[$a-zA-Z0-9_]{0,6}=function\(a\)$/,
    /[$a-zA-Z0-9_]{0,6}\.[$a-zA-Z0-9_]{0,6}\.fillRect\(0,0,[$a-zA-Z0-9_]{0,6}\.[$a-zA-Z0-9_]{0,6}\.canvas\.width,[$a-zA-Z0-9_]{0,6}\.[$a-zA-Z0-9_]{0,6}\.canvas\.height\);for/,
    deleteModDebug);

  funcWithBackground = assertReplace(funcWithBackground, /[$a-zA-Z0-9_]{0,6}\.[$a-zA-Z0-9_]{0,6}\.fillRect\(0,0,[$a-zA-Z0-9_]{0,6}\.[$a-zA-Z0-9_]{0,6}\.canvas\.width,[$a-zA-Z0-9_]{0,6}\.[$a-zA-Z0-9_]{0,6}\.canvas\.height\);/,
    'if(window.checkboxes.checkboxStatuses.lightTiles){$&}');

  funcWithBackground = assertReplace(funcWithBackground, /[a-z]\.[$a-zA-Z0-9_]{0,6}\.fillRect\([a-z]\*[a-z]\.[$a-zA-Z0-9_]{0,6}\.[$a-zA-Z0-9_]{0,6}\.[$a-zA-Z0-9_]{0,6},[a-z]\*[a-z]\.[$a-zA-Z0-9_]{0,6}\.[$a-zA-Z0-9_]{0,6}\.[$a-zA-Z0-9_]{0,6},[a-z]\.[$a-zA-Z0-9_]{0,6}\.[$a-zA-Z0-9_]{0,6}\.[$a-zA-Z0-9_]{0,6},[a-z]\.[$a-zA-Z0-9_]{0,6}\.[$a-zA-Z0-9_]{0,6}\.[$a-zA-Z0-9_]{0,6}\)/,
    'window.checkboxes.checkboxStatuses.darkTiles && $&');

  //eval(funcWithBackground);

  let funcWithMiscRendering_Origin = findFunctionInCode(code, /render\(a,b\)$/,
    /this\.context\.fillRect\(0,0,this\.context\.canvas\.width,this\.context\.canvas\.height\);/,
    deleteModDebug);

  let funcWithMiscRendering = findFunctionInCode(code, /render\(a,b\)$/,
    /this\.context\.fillRect\(0,0,this\.context\.canvas\.width,this\.context\.canvas\.height\);/,
    deleteModDebug);

  //Background for infinity is also contained in funcWithFruit
  //For outer wall. This is the full canvas fill that everything else is drawn on top of
  funcWithMiscRendering = assertReplace(funcWithMiscRendering, /this\.context\.fillRect\(0,0,this\.context\.canvas\.width,this\.context\.canvas\.height\);/,
    'window.checkboxes.checkboxStatuses.border && $&');

  //Border strips drawn around the board on mobile layouts
  funcWithMiscRendering = assertReplaceAll(funcWithMiscRendering, /this\.context\.fillRect\((?!0,0,this\.context\.canvas\.width,this\.context\.canvas\.height\))[^)]*\)/g,
    'window.checkboxes.checkboxStatuses.border && $&');

  //For light tiles (infinity). The infinity board renders through a local alias rather than `this`
  funcWithMiscRendering = assertReplace(funcWithMiscRendering, /(?<![$a-zA-Z0-9_.])(?!this\.)[$a-zA-Z0-9_]{1,6}\.context\.fillRect\(0,0,[$a-zA-Z0-9_]{1,6}\.context\.canvas\.width,[$a-zA-Z0-9_]{1,6}\.context\.canvas\.height\);/,
    'window.checkboxes.checkboxStatuses.lightTiles && $&');

  //For dark tiles (infinity)
  funcWithMiscRendering = assertReplace(funcWithMiscRendering, /[$a-zA-Z0-9_]{1,6}\.context\.fillRect\([$a-zA-Z0-9_]{1,6}\*[$a-zA-Z0-9_.]{1,24}-[$a-zA-Z0-9_]{1,6}\.x\+[$a-zA-Z0-9_]{1,6}\.x,[$a-zA-Z0-9_]{1,6}\*[$a-zA-Z0-9_.]{1,24}-[$a-zA-Z0-9_]{1,6}\.y\+[$a-zA-Z0-9_]{1,6}\.y,[$a-zA-Z0-9_.]{1,24},[$a-zA-Z0-9_.]{1,24}\)/,
    'window.checkboxes.checkboxStatuses.darkTiles && $&');

  //Light mode: snake-head glow (TbF) vs apple glow (fruit list loop)
  funcWithMiscRendering = assertReplaceAll(funcWithMiscRendering, /TbF\(/g,
    'window.checkboxes.checkboxStatuses.lightSnake&&TbF(');

  funcWithMiscRendering = assertReplace(funcWithMiscRendering, /(for\(let [$a-zA-Z0-9_]{1,6} of [$a-zA-Z0-9_]{1,6}\.wb\.wa\.ka\)\{)/,
    'if(window.checkboxes.checkboxStatuses.lightFruit)$1');

  //Inline active bridges/gates drawn in the compositor (not only via helper functions)
  funcWithMiscRendering = assertReplaceAll(funcWithMiscRendering, /f7\(this\.settings,20\)/g,
    'f7(this.settings,20)&&window.checkboxes.checkboxStatuses.bridges');
  funcWithMiscRendering = assertReplaceAll(funcWithMiscRendering, /f7\(this\.settings,19\)/g,
    'f7(this.settings,19)&&window.checkboxes.checkboxStatuses.gates');

  //Snake, fruit, keys and boxes are drawn into the sprite layer, and the shadow is taken straight
  //off that layer's silhouette. When Shadow Included is off and something is hidden, duplicating
  //that stretch keeps a complete silhouette for the shadow while the visible pass honours the
  //checkboxes. Everything in the stretch only paints the sprite layer, so running it twice has no
  //other effect.
  let shadowFnName = funcWithShadow_Origin.match(/^([$a-zA-Z0-9_]{1,6})=function/)[1];
  let sceneRegionRegex = new RegExp(
    '(this\\.[$a-zA-Z0-9_]{1,6}\\.render\\(a,b,[$a-zA-Z0-9_]{1,6}\\(this\\)\\);[\\s\\S]*?)' +
    '(f7\\(this\\.settings,4\\)\\|\\|' + shadowFnName.replace(/\$/g, '\\$') + '\\(this\\);)');

  funcWithMiscRendering = assertReplace(funcWithMiscRendering, sceneRegionRegex,
    'window.visiBeginShadowPass(this,f7(this.settings,4));$1$2if(window.visiEndShadowPass(this)){$1}');

  //eval(funcWithMiscRendering);

  let funcWithLockRendering_Origin = findFunctionInCode(code, /render\(\)$/,
    /this\.[$a-zA-Z0-9_]{0,6}\.hb\.particles/,
    false);

  let funcWithLockRendering = findFunctionInCode(code, /render\(\)$/,
    /this\.[$a-zA-Z0-9_]{0,6}\.hb\.particles/,
    false);

  //background for falling lock piece
  funcWithLockRendering = assertReplace(funcWithLockRendering, /this\.[$a-zA-Z0-9_]{0,6}\.fillRect\(-\(this\.[$a-zA-Z0-9_]{0,6}\.[$a-zA-Z0-9_]{0,6}\.[$a-zA-Z0-9_]{0,6}\/2\)\*[$a-zA-Z0-9_]{0,6},-\(this\.[$a-zA-Z0-9_]{0,6}\.[$a-zA-Z0-9_]{0,6}\.[$a-zA-Z0-9_]{0,6}\/2\)\*[$a-zA-Z0-9_]{0,6},this\.[$a-zA-Z0-9_]{0,6}\.[$a-zA-Z0-9_]{0,6}\.[$a-zA-Z0-9_]{0,6}\*[$a-zA-Z0-9_]{0,6},this\.[$a-zA-Z0-9_]{0,6}\.[$a-zA-Z0-9_]{0,6}\.[$a-zA-Z0-9_]{0,6}\*[$a-zA-Z0-9_]{0,6}\)/,
    'window.checkboxes.checkboxStatuses.locks && $&');

  //lock icon and sokoban icon falling
  funcWithLockRendering = assertReplace(funcWithLockRendering, /(drawImage\()([a-z]\.type===\n?0\?)([$a-zA-Z0-9_]{0,6}\(this\.[$a-zA-Z0-9_]{0,6}\.[$a-zA-Z0-9_]{0,6}\)\.[$a-zA-Z0-9_]{0,6}\.canvas):([$a-zA-Z0-9_]{0,6}\(this\.[$a-zA-Z0-9_]{0,6}\.[$a-zA-Z0-9_]{0,6}\)\.[$a-zA-Z0-9_]{0,6}\.canvas)/,
    '$1$2(window.checkboxes.checkboxStatuses.locks ? $3 : new Image()) : (window.checkboxes.checkboxStatuses.sokobanBox ? $4 : new Image())');

  //eval(funcWithLockRendering);

  let funcWithKeyRendering_Origin = findFunctionInCode(code, /render\([$a-zA-Z0-9_]{0,6}\)$/,
    /this\.[$a-zA-Z0-9_]{0,6}\.drawImage\(this\.[$a-zA-Z0-9_]{0,6}\.[$a-zA-Z0-9_]{0,6}\(\),128\*[a-z]\.type,0,128,128,/,
    deleteModDebug);

  let funcWithKeyRendering = findFunctionInCode(code, /render\([$a-zA-Z0-9_]{0,6}\)$/,
    /this\.[$a-zA-Z0-9_]{0,6}\.drawImage\(this\.[$a-zA-Z0-9_]{0,6}\.[$a-zA-Z0-9_]{0,6}\(\),128\*[a-z]\.type,0,128,128,/,
    deleteModDebug);

  //keys
  funcWithKeyRendering = assertReplace(funcWithKeyRendering, /this\.[$a-zA-Z0-9_]{0,6}\.drawImage\(this\.[$a-zA-Z0-9_]{0,6}\.[$a-zA-Z0-9_]{0,6}\(\),128\*[a-z]\.type,0,128,128,[a-z]\.[a-z]-[a-z]\/2,[a-z]\.[a-z]-[a-z]\/2,[a-z],[a-z]\)/,
    '(window.checkboxes.checkboxStatuses.keys || window.visiFullPass) && $&');

  //keys upside down
  funcWithKeyRendering = assertReplace(funcWithKeyRendering, /this\.[$a-zA-Z0-9_]{0,6}\.drawImage\(this\.[$a-zA-Z0-9_]{0,6}\.[$a-zA-Z0-9_]{0,6}\(\),128\*[a-z]\.type,0,128,128,-\([a-z]\/2\),-\([a-z]\/2\),[a-z],[a-z]\)/,
    '(window.checkboxes.checkboxStatuses.keys || window.visiFullPass) && $&');


  //eval(funcWithKeyRendering);

  let funcWithBodyLines_Origin = findFunctionInCode(code, /render\(a,b,c\)$/,
    /quadraticCurveTo/,
    deleteModDebug);
  let funcWithBodyLines = findFunctionInCode(code, /render\(a,b,c\)$/,
    /quadraticCurveTo/,
    deleteModDebug);

if(window.NepDebug){
  console.log(funcWithBodyLines)
}

  //Lumps get drawn two different ways depending on the mode: normally as a circle wider than
  //the body stroke, and in modes that skip those circles as a bulge in the stroke width.

  //Circle version, the only arc that gets its own fillStyle before being filled
  funcWithBodyLines = assertReplace(funcWithBodyLines, /(this\.[$a-zA-Z0-9_]{0,6}\.beginPath\(\),this\.[$a-zA-Z0-9_]{0,6}\.arc\([$a-zA-Z0-9_]{0,6}\.x,[$a-zA-Z0-9_]{0,6}\.y,[$a-zA-Z0-9_]{0,6},0,2\*Math\.PI\),)(this\.[$a-zA-Z0-9_]{0,6}\.fill\(\))/,
    '$1(window.flashSnakeStatus.currentlyFlashingSnake || window.checkboxes.checkboxStatuses.lumps || window.visiFullPass) && $2');

  //Stroke width version, the only place the body line width is scaled after being set
  funcWithBodyLines = assertReplace(funcWithBodyLines, /(this\.[$a-zA-Z0-9_]{0,6}\.lineWidth\*=[$a-zA-Z0-9_]{1,6};)/,
    'if(window.flashSnakeStatus.currentlyFlashingSnake || window.checkboxes.checkboxStatuses.lumps || window.visiFullPass){$1}');

  funcWithBodyLines = assertReplaceAll(funcWithBodyLines, /[$a-zA-Z0-9_]{0,6}\.[$a-zA-Z0-9_]{0,6}\.lineTo\(\n?[$a-zA-Z0-9_]{0,6}\.x,\n?[$a-zA-Z0-9_]{0,6}\.y\)/g,
    '(window.flashSnakeStatus.currentlyFlashingSnake || window.checkboxes.checkboxStatuses.body || window.visiFullPass) && $&');

  funcWithBodyLines = assertReplaceAll(funcWithBodyLines, /[$a-zA-Z0-9_]{0,6}\.[$a-zA-Z0-9_]{0,6}\.quadraticCurveTo\(\n?[$a-zA-Z0-9_]{0,6}\.x,\n?[$a-zA-Z0-9_]{0,6}\.y,\n?[$a-zA-Z0-9_]{0,6}\.x,\n?[$a-zA-Z0-9_]{0,6}\.y\)/g,
    '(window.flashSnakeStatus.currentlyFlashingSnake || window.checkboxes.checkboxStatuses.body || window.visiFullPass) && $&');

  //Body scale
  //funcWithBodyLines = assertReplace(funcWithBodyLines, /\.8/, '(window.snakeScale.tailStart * 0.8)');
  //funcWithBodyLines = assertReplace(funcWithBodyLines, /\.4/, '(window.snakeScale.tailEnd * 0.4)');


  //eval(funcWithBodyLines);

  //Portals
  let portalInsideRegex = /Math\.cos\([$a-zA-Z0-9_]{0,6}\*2\*Math\.PI\)/;

  let funcWithPortals_Origin = findFunctionInCode(code, /render\([$a-zA-Z0-9_]{0,6}\)$/,
    portalInsideRegex,
    deleteModDebug);

  let funcWithPortals = findFunctionInCode(code, /render\([$a-zA-Z0-9_]{0,6}\)$/,
    portalInsideRegex,
    deleteModDebug);

  funcWithPortals = assertReplaceAll(funcWithPortals, /[$a-zA-Z0-9_]{0,6}\.fill\(\)/g,
    'window.checkboxes.checkboxStatuses.portals && $&');

  //eval(funcWithPortals);

  //For flashing snake body when we eat an apple
  let eatInsideRegex = /if\([$a-zA-Z0-9_]{0,6}\|\|[$a-zA-Z0-9_]{0,6}\){(?:var|let|const) [$a-zA-Z0-9_]{0,6}=[$a-zA-Z0-9_]{0,6}\.[$a-zA-Z0-9_]{0,6};[$a-zA-Z0-9_]{0,6}\|\|\([$a-zA-Z0-9_]{0,6}=!0/;

  let funcWithEat_Origin = findFunctionInCode(code, /tick\(\)$/,
    eatInsideRegex,
    deleteModDebug);

  let funcWithEat = findFunctionInCode(code, /tick\(\)$/,
    eatInsideRegex,
    deleteModDebug);

  funcWithEat = assertReplace(funcWithEat, /if\([$a-zA-Z0-9_]{0,6}\|\|[$a-zA-Z0-9_]{0,6}\){/,
    '$& window.checkboxes.checkboxStatuses.flashSnake && window.brieflyShowSnake();');

  //funcWithEat = swapInMainClassPrototype(mainClass, funcWithEat);
  //eval(funcWithEat);

  //Mine radius: the dashed red circle plus its fading blast preview. Both are helper calls
  //shaped `helper(renderer, centre, offsetX, offsetY, radius)`, once for the board and once per
  //wrapped copy in infinity mode.
  let mineRadiusInsideRegex = /strokeStyle="#f23606"/;

  let funcWithMineRadius_Origin = findFunctionInCode(code, /[$a-zA-Z0-9_]{0,6}=function\([$a-zA-Z0-9_]{0,6},[$a-zA-Z0-9_]{0,6}\)$/,
    mineRadiusInsideRegex,
    deleteModDebug);

  let funcWithMineRadius = findFunctionInCode(code, /[$a-zA-Z0-9_]{0,6}=function\([$a-zA-Z0-9_]{0,6},[$a-zA-Z0-9_]{0,6}\)$/,
    mineRadiusInsideRegex,
    deleteModDebug);

  funcWithMineRadius = assertReplaceAll(funcWithMineRadius, /[$a-zA-Z0-9_]{1,6}\([$a-zA-Z0-9_]{1,6},[$a-zA-Z0-9_]{1,6},(?:0,0|[$a-zA-Z0-9_]{1,6}\.x,[$a-zA-Z0-9_]{1,6}\.y),[$a-zA-Z0-9_]{1,6}\)/g,
    'window.checkboxes.checkboxStatuses.mineRadius && $&');

  //Arrows (mode 16): triangle/stroke tiles (zaF)
  let arrowsFnMatch = code.match(/([$a-zA-Z0-9_]{1,6})=function\(([$a-zA-Z0-9_]{1,6}),([$a-zA-Z0-9_]{1,6}),([$a-zA-Z0-9_]{1,6}),([$a-zA-Z0-9_]{1,6}),([$a-zA-Z0-9_]{1,6}),([$a-zA-Z0-9_]{1,6}),([$a-zA-Z0-9_]{1,6}),([$a-zA-Z0-9_]{1,6})\)\{[$a-zA-Z0-9_.]{1,6}\.ka\.save\(\)/);
  if (!arrowsFnMatch) {
    throw new Error('Visibility mod: could not find arrow tile drawer (zaF)');
  }
  let arrowsFnName = arrowsFnMatch[1];
  code = assertReplace(code, new RegExp(arrowsFnName + '=function\\(([$a-zA-Z0-9_,]+)\\)\\{'),
    arrowsFnName + '=function($1){if(!window.checkboxes.checkboxStatuses.arrows)return;');

  //Shields (mode 15): directional bars on fruit via S$E
  let shieldsFnMatch = code.match(/([$a-zA-Z0-9_$]{1,6})=function\(([$a-zA-Z0-9_]{1,6}),([$a-zA-Z0-9_]{1,6}),([$a-zA-Z0-9_]{1,6}),([$a-zA-Z0-9_]{1,6}),([$a-zA-Z0-9_]{1,6})=!1\)\{var [$a-zA-Z0-9_]{1,6}=Math\.round\([$a-zA-Z0-9_.]{1,20}\/5\)/);
  if (!shieldsFnMatch) {
    throw new Error('Visibility mod: could not find shield drawer (S$E)');
  }
  let shieldsFnName = shieldsFnMatch[1];
  code = assertReplace(code, new RegExp(shieldsFnName.replace(/\$/g, '\\$') + '=function\\(([$a-zA-Z0-9_=!,]+)\\)\\{'),
    shieldsFnName + '=function($1){if(!window.checkboxes.checkboxStatuses.shields)return;');

  //Gates (mode 19): BbF dashed rectangles
  let gatesFnMatch = code.match(/([$a-zA-Z0-9_]{1,6})=function\(([$a-zA-Z0-9_]{1,6}),([$a-zA-Z0-9_]{1,6})\)\{for\(let [$a-zA-Z0-9_]{1,6} of [$a-zA-Z0-9_.]{1,20}\.Yfa\)/);
  if (!gatesFnMatch) {
    throw new Error('Visibility mod: could not find gate drawer (BbF)');
  }
  let gatesFnName = gatesFnMatch[1];
  code = assertReplace(code, new RegExp(gatesFnName + '=function\\(([$a-zA-Z0-9_,]+)\\)\\{'),
    gatesFnName + '=function($1){if(!window.checkboxes.checkboxStatuses.gates)return;');

  //Bridges (mode 20): obF static tiles
  let bridgesFnMatch = code.match(/([$a-zA-Z0-9_]{1,6})=function\(([$a-zA-Z0-9_]{1,6}),([$a-zA-Z0-9_]{1,6}),([$a-zA-Z0-9_]{1,6}),([$a-zA-Z0-9_]{1,6})\)\{[$a-zA-Z0-9_]{1,6}\.ka\.save\(\);[$a-zA-Z0-9_]{1,6}===0&&[$a-zA-Z0-9_]{1,6}===0\|\|/);
  if (!bridgesFnMatch) {
    throw new Error('Visibility mod: could not find bridge drawer (obF)');
  }
  let bridgesFnName = bridgesFnMatch[1];
  code = assertReplace(code, new RegExp(bridgesFnName + '=function\\(([$a-zA-Z0-9_,]+)\\)\\{'),
    bridgesFnName + '=function($1){if(!window.checkboxes.checkboxStatuses.bridges)return;');

  //Border chrome CSS background-color (same palette index as the canvas border fill)
  code = assertReplaceAll(code,
    /_\.on\(([$a-zA-Z0-9_.()]{1,40}),"background-color",([$a-zA-Z0-9_]{1,6}\([$a-zA-Z0-9_.]{1,20},[$a-zA-Z0-9_.]{1,20},3\))\)/g,
    '($1&&window.visiBorderEls.push($1),window.visiBorderColor=$2,_.on($1,"background-color",window.checkboxes.checkboxStatuses.border?$2:"transparent"))'
  );

    // Mines
    /*
  let funcWithMines_Origin = findFunctionInCode(code, /[$a-zA-Z0-9_]{0,6}\.prototype\.render=function\(a\)$/,
    /7/,
    deleteModDebug);

  let funcWithMines = findFunctionInCode(code, /[$a-zA-Z0-9_]{0,6}\.prototype\.render=function\(a\)$/,
    /7/,
    deleteModDebug);

    funcWithMines = assertReplaceAll(funcWithMines, /a.Aa.drawImage\(a.oa.canvas,0,a.ka.ka.ka\/6\)/g,
    'window.checkboxes.checkboxStatuses.mines && $&');
*/

    // Statue Cracks (best-effort — pattern may be absent on some builds)
  if (!window.catchError(/[a-z]\.[$a-zA-Z0-9_]{0,6}\.drawImage\([a-z]\.[$a-zA-Z0-9_]{0,6}\.[$a-zA-Z0-9_]{0,6}\(\),[a-z]\.[$a-zA-Z0-9_]{0,6}\*[a-z],0,[a-z],[a-z],-[a-z]\/2,-[a-z]\/2,[a-z],[a-z]\),[a-z]\.[$a-zA-Z0-9_]{0,6}\.globalAlpha=[a-z]\)/g, code)) {
  code = code.assertReplace(/[a-z]\.[$a-zA-Z0-9_]{0,6}\.drawImage\([a-z]\.[$a-zA-Z0-9_]{0,6}\.[$a-zA-Z0-9_]{0,6}\(\),[a-z]\.[$a-zA-Z0-9_]{0,6}\*[a-z],0,[a-z],[a-z],-[a-z]\/2,-[a-z]\/2,[a-z],[a-z]\),[a-z]\.[$a-zA-Z0-9_]{0,6}\.globalAlpha=[a-z]\)/g,
     'window.checkboxes.checkboxStatuses.brokenStatue && $&')
  }

     // Statue (including cracks)
  code = code.assertReplace(/[$a-zA-Z0-9_]{0,6}\(this,[a-z],[a-z],[a-z]\.[$a-zA-Z0-9_]{0,6}\.angle,[a-z]\.[$a-zA-Z0-9_]{0,6}\)/g,
     `window.checkboxes.checkboxStatuses.statue && $&`)



  minesDefinition_Origin = code.match(/this\.[a-zA-Z0-9_$]{1,8}=new [a-zA-Z0-9_$]{1,8}\(this.[a-zA-Z0-9_$]{1,8},"snake_arcade\/mine\.png\",10,this\.[a-zA-Z0-9_$]{1,8},"snake_arcade\/pixel\/px_mine\.png\"\)/g)[0]

  window.minesDefined = minesDefinition_Origin.split('=')[0].split('.')[1]
  window.minesEmptySrc = 'https://i.postimg.cc/LhKWc2Wb/Empty.png'
  minesDefinition_NewCode = `${minesDefinition_Origin};
    window.MinesRef=this;
    window.DefaultMines=${minesDefinition_Origin}
    window.NoMines=${minesDefinition_Origin.split('=')[1].split('"')[0]} "${window.minesEmptySrc}" ${minesDefinition_Origin.split('"')[2]} "${window.minesEmptySrc}" ${minesDefinition_Origin.split('"')[4]}
    `

/*
  mineRadiusWidth_Origin = code.match(/[a-z]\.[$a-zA-Z0-9_]{0,6}\.lineWidth=[a-z]\.[$a-zA-Z0-9_]{0,6}\.[$a-zA-Z0-9_]{0,6}\.[$a-zA-Z0-9_]{0,6}\/12;/)[0]
  mineRadiusWidth = mineRadiusWidth_Origin;

  mineRadiusWidth_Code = `
  if(window.checkboxes.checkboxStatuses.mineRadius) {
    ${mineRadiusWidth_Origin}
  }
  else {
    ${mineRadiusWidth_Origin.split('=')[0]}=0;
  }
  `
  */
  //code = code.assertReplace(/[$a-zA-Z0-9_]{0,6}\(this,[a-z],[a-z],[a-z]\.[$a-zA-Z0-9_]{0,6}\.angle,[a-z]\.[$a-zA-Z0-9_]{0,6}\)/g,
  //   `window.checkboxes.checkboxStatuses.mines && $&`)

  //code = code.assertReplace(mineRadiusWidth_Origin, mineRadiusWidth_Code)
  code = code.assertReplace(minesDefinition_Origin, minesDefinition_NewCode)
  code = code.assertReplace(funcWithMineRadius_Origin, funcWithMineRadius)
  code = code.assertReplace(funcWithFruit_Origin, funcWithFruit)
  code = code.assertReplace(funcWithBodyParts_Origin, funcWithBodyParts)
  code = code.assertReplace(funcWithRenderWall_Origin, funcWithRenderWall)
  code = code.assertReplace(funcWithSokoban_Origin, funcWithSokoban)
  code = code.assertReplace(funcWithSokobanGoal_Origin, funcWithSokobanGoal)
  code = code.assertReplace(funcWithShadow_Origin, funcWithShadow)
  code = code.assertReplace(funcWithBackground_Origin, funcWithBackground)
  code = code.assertReplace(funcWithMiscRendering_Origin, funcWithMiscRendering)
  code = code.assertReplace(funcWithLockRendering_Origin, funcWithLockRendering)
  code = code.assertReplace(funcWithKeyRendering_Origin, funcWithKeyRendering)
  code = code.assertReplace(funcWithBodyLines_Origin, funcWithBodyLines)
  code = code.assertReplace(funcWithPortals_Origin, funcWithPortals)
  code = code.assertReplace(funcWithEat_Origin, funcWithEat)

  // Disables statue break animation
  if (!window.catchError(/[$a-zA-Z0-9_]{0,6}\(this\.[$a-zA-Z0-9_]{0,6},[a-z],new _\.[$a-zA-Z0-9_]{0,6}\([a-z],[a-z]\),[a-z],[a-z]\.[$a-zA-Z0-9_]{0,6}\)/g, code)) {
  code = code.assertReplace(/[$a-zA-Z0-9_]{0,6}\(this\.[$a-zA-Z0-9_]{0,6},[a-z],new _\.[$a-zA-Z0-9_]{0,6}\([a-z],[a-z]\),[a-z],[a-z]\.[$a-zA-Z0-9_]{0,6}\)/g,
     `window.checkboxes.checkboxStatuses.statue && $&`)
  }

  // Disable minesweeper break animation
  if (!window.catchError(/[a-z]=_\.[$a-zA-Z0-9_]{0,6}\(this\.[$a-zA-Z0-9_]{0,6}\.[$a-zA-Z0-9_]{0,6}\.[$a-zA-Z0-9_]{0,6}\);for\([a-z]=a\.next\(\);/, code)) {
  code = code.assertReplace(/[a-z]=_\.[$a-zA-Z0-9_]{0,6}\(this\.[$a-zA-Z0-9_]{0,6}\.[$a-zA-Z0-9_]{0,6}\.[$a-zA-Z0-9_]{0,6}\);for\([a-z]=a\.next\(\);/,
  `$& window.checkboxes.checkboxStatuses.mineRadius &&`)
  }

  //console.log(code)
  window.isVisi = true;

  return code;
}

window.VisibilityModCode.runCodeAfter = function () {

};