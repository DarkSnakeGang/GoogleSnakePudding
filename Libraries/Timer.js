
// const arrayIndices = n => Array(n).fill().map((q, i) => i)

// const [classic, wall, portal, cheese, infinity, twin, winged, yinyang, key, sokoban, poison, dimension, minesweeper, statue, light, peaceful] = arrayIndices(16)
// const [one, three, five, dice] = arrayIndices(4)
// const [normal, fast, slow] = arrayIndices(3)
// const [standard, small, large] = arrayIndices(3)


function hexToRgb(hex) {
  hex = hex.replace('#', '');
  return {
    r: parseInt(hex.substring(0, 2), 16),
    g: parseInt(hex.substring(2, 4), 16),
    b: parseInt(hex.substring(4, 6), 16),
  };
}
function rgbToHex(rgb) {
  let hex = '#';
  hex += rgb.r.toString(16).padStart(2, '0');
  hex += rgb.g.toString(16).padStart(2, '0');
  hex += rgb.b.toString(16).padStart(2, '0');
  return hex;
}


window.Timer = {
  make: function() {
    window.getSelected = function(selector, selectedClass = 'DqMRee tuJOWd') {
      return (
        [...document.querySelector(selector).children].map(
          (q, i) => [q, i]
        ).filter(
          ([q,]) => q.className === selectedClass
        )[0] || [0, 0]
      )[1]
    }

    String.prototype.color = function(c) { return `<span style="color:${c}">${this.toString()}</span>` }

    Number.prototype.timeFormat = function() {
      const time = +this

      const hours   = Math.floor(time / 3600)
      const minutes = Math.floor((time / 60) % 60)
      const seconds = Math.floor(time % 60)
      const millis  = Math.floor((time % 1).toFixed(4) * 1000)

      let out = `${hours}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2,'0')}.${millis.toString().padStart(3, '0')}`
      out = out.slice(out.search(/[^0:]/))

      return (out[0] === '.' ? '0' : '') + out
    }
    String.prototype.timeFormat = function() {
      return (+this).timeFormat()
    }

    window._splits = []

    window._cat = 3

    localStorage._snake_timer_format = localStorage._snake_timer_format ?? 1
    window._format = localStorage._snake_timer_format

    localStorage._snake_show_delta = localStorage._snake_show_delta ?? 0
    window._showDelta = +localStorage._snake_show_delta

    localStorage._snake_pb = localStorage._snake_pb ?? '{}'
    window._pb = JSON.parse(localStorage._snake_pb)


    localStorage._snake_aheadg  = localStorage._snake_aheadg  ?? '#008010'
    localStorage._snake_aheadl  = localStorage._snake_aheadl  ?? '#53dd87'
    localStorage._snake_behindg = localStorage._snake_behindg ?? '#dd3333'
    localStorage._snake_behindl = localStorage._snake_behindl ?? '#a00000'

    const nullFormats = [
      '-:--:--:---',
        '--:--:---',
         '-:--:---',
           '--:---',
            '-:---',
      '-:--:--.---',
        '--:--.---',
         '-:--.---',
           '--.---',
            '-.---',
    ]
    localStorage._snake_null_split = localStorage._snake_null_split ?? nullFormats[_format]


    const timerSplitDiv = document.getElementsByClassName('Jc72He rc48Qb')[0]
    const deltaDiv = document.createElement('div')
    deltaDiv.id = 'timerDelta'
    deltaDiv.innerHTML = '-'.color('white')
    timerSplitDiv.appendChild(deltaDiv)
    if(!_showDelta) deltaDiv.style.display = 'none'

    // const realTimerDiv = document.getElementsByClassName('Jc72He gmwAbc')[0]
    // realTimerDiv.style.position = 'relative'
    // if(_showDelta) realTimerDiv.style.bottom = window.location.href.includes('fbx') ? '9px' : '13px'

    // const wholeTimerDiv = document.getElementsByClassName('A2vT0')[0]
    // wholeTimerDiv.style.cursor = 'pointer'


    window.editTimer = function() {
      // console.warn(window.themes)

      let editBox = document.getElementById('edit-box')
      if(editBox) {
        editBox.remove()
      } else {
        const theme = window.themes[getSelected('#theme', 'DqMRee tuJOWd') || getSelected('#theme', 'tuJOWd')]

        editBox = document.createElement('div')
        editBox.id = 'edit-box'
        editBox.style = `
          background-color: ${theme.real_top_bar ?? '#aaaaff'};
          border-radius: 0.5vw;
          position: absolute;
          height: 93vh;
          z-index: 1000000;
          top: 30px;
          left: 50%;
          backdrop-filter: blur(5px);
          text-align: center;
          padding: 4px;
          transform: translate(-50%, 0);
          box-shadow: 0px 0px 8px rgba(0,0,0,0.4);
          border: 1px solid ${theme.topbar_color ?? '#4444dd'};
          font-size: 2.5vh;
          color: #ffffff;
          width: 50vw;
          font-family: Roboto,Arial,sans-serif;
          overflow-y: auto;
        `
        editBox.innerHTML = `
        <span id="close-box" style="
        position: absolute;
        top: 10px;
        right: 15px;
        cursor: pointer;
        color: #ffffff;
        font-size: 0.9em;
      ">&#x2715</span>
</br>
<label class="form-check-label" style="font-size: 3.5vh">
        Custom Timer/Splits Settings
      </label> </br>
</br>

<div id="edit-mode">
  <img class="sel" style="cursor: pointer; border: 0.5vh ridge #af4490ff; border-radius: 1vh; width: 3.5vh; height: 3.5vh;" src="https://www.google.com/logos/fnbx/snake_arcade/v16/trophy_00.png" />
  <img class="uns" style="cursor: pointer; border: 0.5vh ridge #00000000; border-radius: 1vh; width: 3.5vh; height: 3.5vh;" src="https://www.google.com/logos/fnbx/snake_arcade/v16/trophy_01.png" />
  <img class="uns" style="cursor: pointer; border: 0.5vh ridge #00000000; border-radius: 1vh; width: 3.5vh; height: 3.5vh;" src="https://www.google.com/logos/fnbx/snake_arcade/v16/trophy_02.png" />
  <img class="uns" style="cursor: pointer; border: 0.5vh ridge #00000000; border-radius: 1vh; width: 3.5vh; height: 3.5vh;" src="https://www.google.com/logos/fnbx/snake_arcade/v16/trophy_03.png" />
  <img class="uns" style="cursor: pointer; border: 0.5vh ridge #00000000; border-radius: 1vh; width: 3.5vh; height: 3.5vh;" src="https://www.google.com/logos/fnbx/snake_arcade/v16/trophy_04.png" />
  <img class="uns" style="cursor: pointer; border: 0.5vh ridge #00000000; border-radius: 1vh; width: 3.5vh; height: 3.5vh;" src="https://www.google.com/logos/fnbx/snake_arcade/v16/trophy_05.png" />
  <img class="uns" style="cursor: pointer; border: 0.5vh ridge #00000000; border-radius: 1vh; width: 3.5vh; height: 3.5vh;" src="https://www.google.com/logos/fnbx/snake_arcade/v16/trophy_06.png" />
  <img class="uns" style="cursor: pointer; border: 0.5vh ridge #00000000; border-radius: 1vh; width: 3.5vh; height: 3.5vh;" src="https://www.google.com/logos/fnbx/snake_arcade/v16/trophy_07.png" />
  <img class="uns" style="cursor: pointer; border: 0.5vh ridge #00000000; border-radius: 1vh; width: 3.5vh; height: 3.5vh;" src="https://www.google.com/logos/fnbx/snake_arcade/v16/trophy_08.png" />
  <img class="uns" style="cursor: pointer; border: 0.5vh ridge #00000000; border-radius: 1vh; width: 3.5vh; height: 3.5vh;" src="https://www.google.com/logos/fnbx/snake_arcade/v16/trophy_09.png" />
  <img class="uns" style="cursor: pointer; border: 0.5vh ridge #00000000; border-radius: 1vh; width: 3.5vh; height: 3.5vh;" src="https://www.google.com/logos/fnbx/snake_arcade/v16/trophy_10.png" />
  <img class="uns" style="cursor: pointer; border: 0.5vh ridge #00000000; border-radius: 1vh; width: 3.5vh; height: 3.5vh;" src="https://www.google.com/logos/fnbx/snake_arcade/v16/trophy_11.png" />
  <img class="uns" style="cursor: pointer; border: 0.5vh ridge #00000000; border-radius: 1vh; width: 3.5vh; height: 3.5vh;" src="https://www.google.com/logos/fnbx/snake_arcade/v16/trophy_12.png" />
  <img class="uns" style="cursor: pointer; border: 0.5vh ridge #00000000; border-radius: 1vh; width: 3.5vh; height: 3.5vh;" src="https://www.google.com/logos/fnbx/snake_arcade/v16/trophy_13.png" />
  <img class="uns" style="cursor: pointer; border: 0.5vh ridge #00000000; border-radius: 1vh; width: 3.5vh; height: 3.5vh;" src="https://www.google.com/logos/fnbx/snake_arcade/v16/trophy_14.png" />
  <img class="uns" style="cursor: pointer; border: 0.5vh ridge #00000000; border-radius: 1vh; width: 3.5vh; height: 3.5vh;" src="https://www.google.com/logos/fnbx/snake_arcade/v17/trophy_15.png" />
  <img class="uns" style="cursor: pointer; border: 0.5vh ridge #00000000; border-radius: 1vh; width: 3.5vh; height: 3.5vh;" src="https://www.google.com/logos/fnbx/snake_arcade/v18/trophy_16.png" />
  <img class="uns" style="cursor: pointer; border: 0.5vh ridge #00000000; border-radius: 1vh; width: 3.5vh; height: 3.5vh;" src="https://www.google.com/logos/fnbx/snake_arcade/v19/trophy_17.png" />
  <img class="uns" style="cursor: pointer; border: 0.5vh ridge #00000000; border-radius: 1vh; width: 3.5vh; height: 3.5vh;" src="https://www.google.com/logos/fnbx/snake_arcade/v16/trophy_15.png" />
</div>
<br/>
<div id="edit-count">
  <img class="sel" style="cursor: pointer; border: 0.5vh ridge #af4490ff; border-radius: 1vh; width: 3.5vh; height: 3.5vh;" src="https://www.google.com/logos/fnbx/snake_arcade/v17/count_00.png" />
  <img class="uns" style="cursor: pointer; border: 0.5vh ridge #00000000; border-radius: 1vh; width: 3.5vh; height: 3.5vh;" src="https://www.google.com/logos/fnbx/snake_arcade/v17/count_01.png" />
  <img class="uns" style="cursor: pointer; border: 0.5vh ridge #00000000; border-radius: 1vh; width: 3.5vh; height: 3.5vh;" src="https://www.google.com/logos/fnbx/snake_arcade/v17/count_02.png" />
  <img class="uns" style="cursor: pointer; border: 0.5vh ridge #00000000; border-radius: 1vh; width: 3.5vh; height: 3.5vh;" src="https://www.google.com/logos/fnbx/snake_arcade/v17/count_03.png" />
</div>
<br/>
<div id="edit-speed">
  <img class="sel" style="cursor: pointer; border: 0.5vh ridge #af4490ff; border-radius: 1vh; width: 3.5vh; height: 3.5vh;" src="https://www.google.com/logos/fnbx/snake_arcade/v3/speed_00.png" />
  <img class="uns" style="cursor: pointer; border: 0.5vh ridge #00000000; border-radius: 1vh; width: 3.5vh; height: 3.5vh;" src="https://www.google.com/logos/fnbx/snake_arcade/v3/speed_01.png" />
  <img class="uns" style="cursor: pointer; border: 0.5vh ridge #00000000; border-radius: 1vh; width: 3.5vh; height: 3.5vh;" src="https://www.google.com/logos/fnbx/snake_arcade/v3/speed_02.png" />
</div>
<br/>
<div id="edit-size">
  <img class="sel" style="cursor: pointer; border: 0.5vh ridge #af4490ff; border-radius: 1vh; width: 3.5vh; height: 3.5vh;" src="https://www.google.com/logos/fnbx/snake_arcade/v4/size_00.png" />
  <img class="uns" style="cursor: pointer; border: 0.5vh ridge #00000000; border-radius: 1vh; width: 3.5vh; height: 3.5vh;" src="https://www.google.com/logos/fnbx/snake_arcade/v4/size_01.png" />
  <img class="uns" style="cursor: pointer; border: 0.5vh ridge #00000000; border-radius: 1vh; width: 3.5vh; height: 3.5vh;" src="https://www.google.com/logos/fnbx/snake_arcade/v4/size_02.png" />
</div>
<br/>

<div id="edit-cat">
  <img class="uns" style="background-color: #ffffff55; cursor: pointer; border: 0.5vh ridge #00000000; border-radius: 1vh; width: 3.5vh; height: 3.5vh;" src="https://i.postimg.cc/d1R1Y648/25.png" />
  <img class="uns" style="background-color: #ffffff55; cursor: pointer; border: 0.5vh ridge #00000000; border-radius: 1vh; width: 3.5vh; height: 3.5vh;" src="https://i.postimg.cc/7hmZC6vh/50.png" />
  <img class="uns" style="background-color: #ffffff55; cursor: pointer; border: 0.5vh ridge #00000000; border-radius: 1vh; width: 3.5vh; height: 3.5vh;" src="https://i.postimg.cc/qqk7MK5W/100.png" />
  <img class="sel" style="background-color: #ffffff55; cursor: pointer; border: 0.5vh ridge #af4490ff; border-radius: 1vh; width: 3.5vh; height: 3.5vh;" src="https://i.postimg.cc/52j6Cw2V/all.png" />
</div>

<br/>
<div id="edit-times" style="left:0px;">
  <div>
      <label class="form-check-label" for="edit-25"> 25</label>
      <input class="text-input" size="9" name="edit-25" id="edit-25" type="text" style="font-family:Consolas;" />
  </div>
  <div>
      <label class="form-check-label" for="edit-50"> 50</label>
      <input class="text-input" size="9" name="edit-50" id="edit-50" type="text" style="font-family:Consolas;" />
  </div>
  <div>
      <label class="form-check-label" for="edit-100">100</label>
      <input class="text-input" size="9" name="edit-100" id="edit-100" type="text" style="font-family:Consolas;" />
  </div>
  <div>
      <label class="form-check-label" for="edit-ALL">ALL</label>
      <input class="text-input" size="9" name="edit-ALL" id="edit-ALL" type="text" style="font-family:Consolas;" />
  </div>
</div>

<div id="edit-customsplit" style="border-top:0px solid black">

</div>

<div id="edit-split">
  <label class="form-check-label" for="edit-splitscore">New Split</label>
  <input class="text-input" size="6" name="edit-splitscore" id="edit-splitscore" type="number" placeholder="Score" />
  <button class="btn" style="margin:3px;color:white;background-color:#1155CC;font-family:Roboto,Arial,sans-serif;" id="edit-addsplit">Add</button>
</div>
<div id="edit-customsplit" style="border-top:0px solid black">
</br>
<label class="form-check-label" style="flex:center;">Timer Format</label>
<select class="form-control" id="edit-format" style="flex:center;">
    <option value="0">0:00:00:000</option>
    <option value="1">  00:00:000</option>
    <option value="2">   0:00:000</option>
    <option value="3">     00:000</option>
    <option value="4">      0:000</option>
    <option value="5">0:00:00.000</option>
    <option value="6">  00:00.000</option>
    <option value="7">   0:00.000</option>
    <option value="8">     00.000</option>
    <option value="9">      0.000</option>
  </select>
<br/>
<input class="form-check-input" style="width: 1.5em; height: 1.5em;" type="checkbox" checked="true" name="edit-delta" id="edit-delta" />
<label class="form-check-label" for="edit-delta">Show Delta</label>
<br/>
<br/>
<label class="form-check-label" for="edit-aheadg">Ahead (gaining time)</label>
<input class="text-input" style="margin: 0; padding: 0; border: 0; width: 6vh; height: 3vh;" name="edit-aheadg" id="edit-aheadg" type="color" />
<label class="form-check-label" for="edit-aheadl">Ahead (losing time)</label>
<input class="text-input" style="margin: 0; padding: 0; border: 0; width: 6vh; height: 3vh;" name="edit-aheadl" id="edit-aheadl" type="color" />
<br/>
<label class="form-check-label" for="edit-behindg">Behind (gaining time)</label>
<input class="text-input" style="margin: 0; padding: 0; border: 0; width: 6vh; height: 3vh;" name="edit-behindg" id="edit-behindg" type="color" />
<label class="form-check-label" for="edit-behindl">Behind (losing time)</label>
<input class="text-input" style="margin: 0; padding: 0; border: 0; width: 6vh; height: 3vh;" name="edit-behindl" id="edit-behindl" type="color" />

</div>
        `
        document.body.appendChild(editBox)
        document.getElementById('close-box').addEventListener('click', function() { document.getElementById('edit-box').remove() })

        const toggleDelta = document.getElementById('edit-delta')
        toggleDelta.checked = +_showDelta
        toggleDelta.addEventListener('change', function() {
          window._showDelta = +toggleDelta.checked
          localStorage._snake_show_delta = _showDelta

          if(_showDelta) {
            deltaDiv.style.display = ''
            // realTimerDiv.style.bottom = window.location.href.includes('fbx') ? '9px' : '13px'
          } else {
            deltaDiv.style.display = 'none'
            // realTimerDiv.style.bottom = '0px'
          }
        })


        const formatSelect = document.getElementById('edit-format')
        formatSelect.value = _format
        formatSelect.addEventListener('change', function() {
          window._format = +formatSelect.value
          localStorage._snake_timer_format = _format
          localStorage._snake_null_split = nullFormats[window._format]
        })

        const customSplitSectionDiv = document.getElementById('edit-customsplit')
        const newSplitInput = document.getElementById('edit-splitscore')
        newSplitInput.addEventListener('keydown', function() {
          setTimeout(function() {
            newSplitInput.value = newSplitInput.value.replace(/\D/g, '')
          }, 1)
        })
        document.getElementById('edit-addsplit').addEventListener('click', function() {
          const splitScore = document.getElementById('edit-splitscore').value
          if(!+splitScore) return

          const splitDiv = document.createElement('div')

          const splitName = `edit-${splitScore}`

          const splitLabel = document.createElement('label')
          splitLabel.for = splitName
          splitLabel.innerText = splitScore.toString().padStart(3, ' ') + ' '

          const splitInput = document.createElement('input')
          splitInput.className = 'text-input'
          splitInput.id = splitInput.name = splitName
          splitInput.size = 9
          splitInput.type = 'text'


          const splitDeleteButton = document.createElement('button')
          splitDeleteButton.innerText = 'Delete'
          splitDeleteButton.className = 'btn'
          splitDeleteButton.addEventListener('click', function() {
            splitDiv.remove()

            const _mode  = getSelected('#edit-mode',  'sel')
            const _count = getSelected('#edit-count', 'sel')
            const _speed = getSelected('#edit-speed', 'sel')
            const _size  = getSelected('#edit-size',  'sel')

            window._cat  = getSelected('#edit-cat',  'sel')

            delete _pb[_mode][_count][_speed][_size][_cat][splitScore]
            localStorage._snake_pb = JSON.stringify(_pb)
            while(_splits.includes(+splitScore)) {
              _splits.splice(_splits.indexOf(+splitScore), 1)
            }
          })

          if(!window._splits.includes(+splitScore)) window._splits.push(+splitScore)

          function handleChange() {
            const val = splitInput.value.split(':')
            let time = 0
            for(let i = 1; i <= val.length; i++) {
              let s = i === 1 ? 1 : i === 2 ? 60 : i === 3 ? 3600 : 0
              time += s * +val.at(-i)
            }


            const key = splitInput.name.replace('edit-', '')
            splitInput.className = 'text-input'

            const _mode  = getSelected('#edit-mode',  'sel')
            const _count = getSelected('#edit-count', 'sel')
            const _speed = getSelected('#edit-speed', 'sel')
            const _size  = getSelected('#edit-size',  'sel')

            window._cat  = getSelected('#edit-cat',   'sel')

            if(!_pb[_mode]) _pb[_mode] = {}
            if(!_pb[_mode][_count]) _pb[_mode][_count] = {}
            if(!_pb[_mode][_count][_speed]) _pb[_mode][_count][_speed] = {}
            if(!_pb[_mode][_count][_speed][_size]) _pb[_mode][_count][_speed][_size] = {}
            if(!_pb[_mode][_count][_speed][_size][_cat]) _pb[_mode][_count][_speed][_size][_cat] = {}
            _pb[_mode][_count][_speed][_size][_cat][key] = time || ''

            localStorage._snake_pb = JSON.stringify(_pb)


            splitInput.value = time === 0 ? '' : time.timeFormat()
          }
          handleChange()

          splitInput.addEventListener('keydown', function(evt) {
            if(evt.key === 'Escape' || evt.key === 'Enter') handleChange()

            setTimeout(function() {
              splitInput.value = splitInput.value.replace(/[^\d.:]/g, '')
            }, 1)
          })
          splitInput.addEventListener('change', handleChange)

          splitDiv.appendChild(splitLabel)
          splitDiv.appendChild(splitInput)
          splitDiv.appendChild(splitDeleteButton )

          customSplitSectionDiv.appendChild(splitDiv)

        })

        const divs = ['edit-mode', 'edit-count', 'edit-speed', 'edit-size'].map(q => document.getElementById(q))
        const selectors = ['#trophy', '#count', '#speed', '#size']
        for(let j = 0; j < 4; j++) {
          let temp = [...document.querySelector(selectors[j]).children]
          temp.forEach((q, i) => {
            if(_r = divs[j].children[i]) {
              _r.style.border = i === getSelected(selectors[j]) ? '0.5vh ridge #af4490ff' : '0.5vh ridge #00000000'
              _r.className = i === getSelected(selectors[j]) ? 'sel' : 'uns'
            }
          })
        }

        const cats = [...document.getElementById('edit-cat').children]
        cats.forEach((q, i) => {
          q.style.border = i === _cat ? '0.5vh ridge #af4490ff' : '0.5vh ridge #00000000'
          q.className = i === _cat ? 'sel' : 'uns'
        })


        for(const inp of document.getElementById('edit-times').children) {
          const el = inp.children[1]

          function handleChange() {
            const val = el.value.split(':')
            let time = 0
            for(let i = 1; i <= val.length; i++) {
              let s = i === 1 ? 1 : i === 2 ? 60 : i === 3 ? 3600 : 0
              time += s * +val.at(-i)
            }

            const key = el.name.replace('edit-', '')

            const _mode  = getSelected('#edit-mode',  'sel')
            const _count = getSelected('#edit-count', 'sel')
            const _speed = getSelected('#edit-speed', 'sel')
            const _size  = getSelected('#edit-size',  'sel')

            window._cat  = getSelected('#edit-cat',   'sel')

            if(!_pb[_mode]) _pb[_mode] = {}
            if(!_pb[_mode][_count]) _pb[_mode][_count] = {}
            if(!_pb[_mode][_count][_speed]) _pb[_mode][_count][_speed] = {}
            if(!_pb[_mode][_count][_speed][_size]) _pb[_mode][_count][_speed][_size] = {}
            if(!_pb[_mode][_count][_speed][_size][_cat]) _pb[_mode][_count][_speed][_size][_cat] = {}
            _pb[_mode][_count][_speed][_size][_cat][key] = time || ''

            localStorage._snake_pb = JSON.stringify(_pb)


            el.value = time === 0 ? '' : time.timeFormat()
          }

          el.addEventListener('keydown', function(evt) {
            if(evt.key === 'Escape' || evt.key === 'Enter') handleChange()

            setTimeout(function() {
              el.value = el.value.replace(/[^\d.:]/g, '')
            }, 1)
          })

          el.addEventListener('change', handleChange)
        }

        function updateToMode() {

          const _mode  = getSelected('#edit-mode',  'sel')
          const _count = getSelected('#edit-count', 'sel')
          const _speed = getSelected('#edit-speed', 'sel')
          const _size  = getSelected('#edit-size',  'sel')

          window._cat  = getSelected('#edit-cat',   'sel')

          const time = _pb[_mode] && _pb[_mode][_count] && _pb[_mode][_count][_speed] && _pb[_mode][_count][_speed][_size] && _pb[_mode][_count][_speed][_size][_cat] ? _pb[_mode][_count][_speed][_size][_cat] : {}

          for(const inp of document.getElementById('edit-times').children) {
            const el = inp.children[1]
            const key = el.name.replace('edit-', '')


            el.value = time[key] ? time[key].timeFormat() : ''

          }

          for(let i = customSplitSectionDiv.children.length - 1; i >= 0; i--) {
            customSplitSectionDiv.removeChild(customSplitSectionDiv.children[i])
          }

          for(const [_splitName, _splitTime] of Object.entries(time)) {
            if(!['25', '50', '100', 'ALL'].includes(_splitName)) {
              const splitDiv = document.createElement('div')
              const splitName = `edit-${_splitName}`

              const splitLabel = document.createElement('label')
              splitLabel.for = splitName
              splitLabel.innerText = _splitName.padStart(3, ' ') + ' '

              const splitInput = document.createElement('input')
              splitInput.id = splitInput.name = splitName
              splitInput.size = 9
              splitInput.type = 'text'
              splitInput.className = 'text-input'
              splitInput.value = +_splitTime ? _splitTime.timeFormat() : ''

              const splitDeleteButton = document.createElement('button')
              // splitDeleteButton.id = `delete-${splitName}`
              splitDeleteButton.innerText = 'Delete'
              splitDeleteButton.className = 'btn'
              splitDeleteButton.addEventListener('click', function() {
                splitDiv.remove()
                delete time[_splitName]
                delete _pb[_mode][_count][_speed][_size][_cat][_splitName]
                localStorage._snake_pb = JSON.stringify(_pb)
                while(window._splits.includes(+_splitName)) {
                  window._splits.splice(window._splits.indexOf(+_splitName), 1)
                }
              })

              if(!window._splits.includes(+_splitName)) window._splits.push(+_splitName)


              function handleChange() {
                const val = splitInput.value.split(':')
                let time = 0
                for(let i = 1; i <= val.length; i++) {
                  let s = i === 1 ? 1 : i === 2 ? 60 : i === 3 ? 3600 : 0
                  time += s * +val.at(-i)
                }

                const key = splitInput.name.replace('edit-', '')


                const _mode  = getSelected('#edit-mode',  'sel')
                const _count = getSelected('#edit-count', 'sel')
                const _speed = getSelected('#edit-speed', 'sel')
                const _size  = getSelected('#edit-size',  'sel')

                window._cat  = getSelected('#edit-cat',   'sel')

                if(!_pb[_mode]) _pb[_mode] = {}
                if(!_pb[_mode][_count]) _pb[_mode][_count] = {}
                if(!_pb[_mode][_count][_speed]) _pb[_mode][_count][_speed] = {}
                if(!_pb[_mode][_count][_speed][_size]) _pb[_mode][_count][_speed][_size] = {}
                if(!_pb[_mode][_count][_speed][_size][_cat]) _pb[_mode][_count][_speed][_size][_cat] = {}
                _pb[_mode][_count][_speed][_size][_cat][key] = time || ''

                localStorage._snake_pb = JSON.stringify(_pb)

                splitInput.value = time === 0 ? '' : time.timeFormat()
              }
              handleChange()

              splitInput.addEventListener('keydown', function(evt) {
                if(evt.key === 'Escape' || evt.key === 'Enter') handleChange()

                setTimeout(function() {
                  splitInput.value = splitInput.value.replace(/[^\d.:]/g, '')
                }, 1)
              })
              splitInput.addEventListener('change', handleChange)


              splitDiv.appendChild(splitLabel)
              splitDiv.appendChild(splitInput)
              splitDiv.appendChild(splitDeleteButton)

              customSplitSectionDiv.appendChild(splitDiv)

            }
          }
        }
        updateToMode()


        for(const id of ['edit-mode', 'edit-count', 'edit-speed', 'edit-size', 'edit-cat'])
          for(const opt of document.getElementById(id).children) {
            opt.addEventListener('click', function() {
              for(const opt1 of document.getElementById(id).children) {
                opt1.style.border = '0.5vh ridge #00000000'
                opt1.className = 'uns'
              }
              opt.style.border = '0.5vh ridge #af4490ff'
              opt.className = 'sel'

              updateToMode()
            })
          }



        for(const subid of ['aheadg', 'aheadl', 'behindg', 'behindl']) {
          // console.log(localStorage[subid])
          const el = document.getElementById(`edit-${subid}`)
          el.value = localStorage[`_snake_${subid}`]
          el.addEventListener('change', function() {
            localStorage[`_snake_${subid}`] = el.value
          })
        }





      }
    }





  },
  alterCode: function(code) {

    code = code.replace('"--:--:---"', 'localStorage._snake_null_split')
    code = code.replace('"25"', 'Math.min(25, ...(window._splits.length === 0 ? [25] : window._splits)) || 25')

    const resetFunction = code.match(
      /[a-zA-Z0-9_$]{1,8}\n?\.\n?prototype\n?\.\n?reset\n?=\n?function\(\)\n?{\n?this\n?\.\n?[a-zA-Z0-9_$]{1,8}\n?=\n?\[\];\n?var a\n?=\n?[a-zA-Z0-9_$]{1,8}\n?\(\n?this\n?\.\n?settings[^]*?\)\}\;/
    )[0]

    /*
    const modeKey = resetFunction.match(
      /0===this\.settings\.[a-zA-Z0-9_$]{1,8}/
    )[0].replace('0===this.settings.', '')
    const countKey = resetFunction.match(
      /2===this\.settings\.[a-zA-Z0-9_$]{1,8}/
    )[0].replace('2===this.settings.', '')
    const speedKey = code.match(
      /0!==a\.settings\.[a-zA-Z0-9_$]{1,8}\?-10:0/
    )[0].replace('0!==a.settings.', '').replace('?-10:0', '')
    const sizeKey = resetFunction.match(
      /1!==this\.settings\.[a-zA-Z0-9_$]{1,8}/
    )[0].replace('1!==this.settings.', '')
*/

    code = code.replace(resetFunction,
      resetFunction.replace(
        'function(){',
        `function(){this.xdddd=[];

          const _mode  = getSelected('#trophy')
          const _count = getSelected('#count')
          const _speed = getSelected('#speed')
          const _size  = getSelected('#size')

          window._run = {}
          window._run[_mode] = {}
          window._run[_mode][_count] = {}
          window._run[_mode][_count][_speed] = {}
          window._run[_mode][_count][_speed][_size] = {}
          window._run[_mode][_count][_speed][_size][_cat] = {}


          if(!window._pb) window._pb = {}
          if(!window._pb[_mode]) window._pb[_mode] = {}
          if(!window._pb[_mode][_count]) window._pb[_mode][_count] = {}
          if(!window._pb[_mode][_count][_speed]) window._pb[_mode][_count][_speed] = {}
          if(!window._pb[_mode][_count][_speed][_size]) window._pb[_mode][_count][_speed][_size] = {}
          if(!window._pb[_mode][_count][_speed][_size][_cat]) window._pb[_mode][_count][_speed][_size][_cat] = {}

          for(let __ind = window._splits.length - 1; __ind >= 0; __ind--) {
            if(!window._pb[_mode][_count][_speed][_size][_cat][window._splits[__ind]]) {
              window._splits.splice(__ind, 1)
            }
          }

          for(let __key of Object.keys(window._pb[_mode][_count][_speed][_size][_cat])) {
            if(!['25','50','100','ALL'].includes(__key) && !window._splits.includes(+__key)) {
              window._splits.push(+__key)
            }
          }


          const deltaDiv = document.getElementById('timerDelta')
          deltaDiv.innerHTML = '-'.color('white')

          window._lastDelta = 0

        `
      )
    )


    const timeFormatFunction = code.match(
      /[a-zA-Z0-9_$]{1,8}=function\(a\){a=Math\.floor\(a\);if\(a<=0\)return[^]*?3,"0"\)}/
    )[0]


    code = code.replace(timeFormatFunction,
      timeFormatFunction.replace(
        'function(a){',
        `window._flj = function(a) {
          const _splitTimeDiv = document.getElementsByClassName('Jc72He rc48Qb')[0].children[1]
          _splitTimeDiv.innerHTML = _splitTimeDiv.innerHTML.trimStart()
        `
      ).replace(
        '"00:00:000"',
        `['0:00:00:000', '00:00:000', '0:00:000', '00:000', '0:000', '0:00:00.000', '00:00.000', '0:00.000', '00.000', '0.000'][_format]`
      ).replace(
        'if(600<=b)return"9:59:59:999";',
        ''
      ).replace(
        'return(0===c?"":c.toString()+":")+(b%60).toString().padStart(2,"0")+":"+(Math.floor(a/1E3)%60).toString().padStart(2,"0")+":"+(a%1E3).toString().padStart(3,"0")',
        `
        const _hours = c === 0 ? "" : c.toString() + ":"
        const _minutes = b % 60
        const _seconds = (Math.floor(a / 1E3) % 60).toString()
        const _millis = (a % 1E3).toString().padStart(3, "0")
        return [
          c.toString() + ":" + _minutes.toString().padStart(2,"0") + ":" + _seconds.padStart(2,"0") + ":" + _millis,
          _hours + _minutes.toString().padStart(2,"0") + ":" + _seconds.padStart(2,"0") + ":" + _millis,
          _hours + _minutes.toString().padStart(2,_hours ? "0" : " ") + ":" + _seconds.padStart(2,"0") + ":" + _millis,
          _hours + (_minutes ? _minutes.toString().padStart(2,_hours ? "0" : " ") + ":" : _hours ? "00:" : "   ") + _seconds.padStart(2,"0") + ":" + _millis,
          _hours + (_minutes ? _minutes.toString().padStart(2,_hours ? "0" : " ") + ":" : _hours ? "00:" : "   ") + _seconds.padStart(2,_hours || _minutes ? "0" : " ") + ":" + _millis,

          c.toString() + ":" + _minutes.toString().padStart(2,"0") + ":" + _seconds.padStart(2,"0") + "." + _millis,
          _hours + _minutes.toString().padStart(2,"0") + ":" + _seconds.padStart(2,"0") + "." + _millis,
          _hours + _minutes.toString().padStart(2,_hours ? "0" : " ") + ":" + _seconds.padStart(2,"0") + "." + _millis,
          _hours + (_minutes ? _minutes.toString().padStart(2,_hours ? "0" : " ") + ":" : _hours ? "00:" : "   ") + _seconds.padStart(2,"0") + "." + _millis,
          _hours + (_minutes ? _minutes.toString().padStart(2,_hours ? "0" : " ") + ":" : _hours ? "00:" : "   ") + _seconds.padStart(2,_hours || _minutes ? "0" : " ") + "." + _millis,
        ][_format]`
      )
    )

    const stuffBlock = code.match(
      /[a-zA-Z0-9_$]{1,8}=this\.header,[a-zA-Z0-9_$]{1,8}=\n?this\.[a-zA-Z0-9_$]{1,8},[a-zA-Z0-9_$]{1,8}=this\.ticks,[a-zA-Z0-9_$]{1,8}=this\.[a-zA-Z0-9_$]{1,8};/
    )[0]
    const score = stuffBlock.match(/header,[a-zA-Z0-9_$]{1,8}=\n?this\.[a-zA-Z0-9_$]{1,8}/)[0].replace(/header,[a-zA-Z0-9_$]{1,8}=/,'')
    const ticks = stuffBlock.match(/[a-zA-Z0-9_$]{1,8}=this\.ticks/)[0].replace(/[a-zA-Z0-9_$]{1,8}=/,'')
    const dt    = stuffBlock.match(/ticks,[a-zA-Z0-9_$]{1,8}=this\.[a-zA-Z0-9_$]{1,8}/)[0].replace(/ticks,[a-zA-Z0-9_$]{1,8}=/,'')



    const splitStuff = code.match(
      /if\(2?5?=?=?=?\n?[a-zA-Z0-9_$]{1,8}=?=?=?2?5?\|\|5?0?=?=?=?[a-zA-Z0-9_$]{1,8}=?=?=?5?0?\|\|1?0?0?=?=?=?[a-zA-Z0-9_$]{1,8}=?=?=?1?0?0?\)/
    )[0]

    code = code.replace(
      splitStuff,
      `
      if([25, 50, 100].includes(${score}) || window._splits.includes(${score})) {
        const deltaDiv = document.getElementById('timerDelta')
        const _mode  = getSelected('#trophy')
        const _count = getSelected('#count')
        const _speed = getSelected('#speed')
        const _size  = getSelected('#size')

        const _split = ${ticks} * ${dt} * 1e-3

        window._run[_mode][_count][_speed][_size][_cat][${score}] = _split

        if(window._pb[_mode][_count][_speed][_size][_cat][${score}]) {
          const _delta = _split - window._pb[_mode][_count][_speed][_size][_cat][${score}]
          const _absDeltaString = Math.abs(_delta).timeFormat()
          if(_delta !== 0)
            deltaDiv.innerHTML = ((_delta < 0 ? '-' : '+') + _absDeltaString).color(
              localStorage[
                _delta > 0 ?
                  _delta > _lastDelta ? '_snake_behindl' : '_snake_behindg'
                :
                  _delta > _lastDelta ? '_snake_aheadl'  : '_snake_aheadg'
              ]
            )
          else
            deltaDiv.innerHTML = '-'.color('white')



          window._lastDelta = _delta
        } else {
          deltaDiv.innerHTML = '-'.color('white')
        }

        if(
          (
            (${score} === 25  && _cat === 0) ||
            (${score} === 50  && _cat === 1) ||
            (${score} === 100 && _cat === 2)
          ) && (
            !window._pb[_mode][_count][_speed][_size][_cat][${score}] ||
            _split - window._pb[_mode][_count][_speed][_size][_cat][${score}] < 0
          )
        ) {
          window._pb[_mode][_count][_speed][_size][_cat] = window._run[_mode][_count][_speed][_size][_cat]
          localStorage._snake_pb = JSON.stringify(window._pb)
        }





      }


      if([25, 50, 100].includes(${score}) || window._splits.includes(${score}))

      `
    )

    const winStuff = code.match(
      /_\.[a-zA-Z0-9_$]{1,8}\([a-zA-Z0-9_$]{1,8}\.[a-zA-Z0-9_$]{1,8},"ALL"\);/
    )[0]

    code = code.replace(
      winStuff,
      `
      ${winStuff}
      const deltaDiv = document.getElementById('timerDelta')
      const _mode  = getSelected('#trophy')
      const _count = getSelected('#count')
      const _speed = getSelected('#speed')
      const _size  = getSelected('#size')

      const _time = ${ticks} * ${dt} * 1e-3

      let _delta = NaN

      window._run[_mode][_count][_speed][_size][_cat]['ALL'] = _time
      if(window._pb[_mode][_count][_speed][_size][_cat]['ALL']) {
        _delta = _time - window._pb[_mode][_count][_speed][_size][_cat]['ALL']
        const _absDeltaString = Math.abs(_delta).timeFormat()
        if(_delta !== 0)
          deltaDiv.innerHTML = ((_delta < 0 ? '-' : '+') + _absDeltaString).color(
            localStorage[
              _delta > 0 ?
                _delta > _lastDelta ? '_snake_behindl' : '_snake_behindg'
              :
                _delta > _lastDelta ? '_snake_aheadl'  : '_snake_aheadg'
            ]
          )
        else
          deltaDiv.innerHTML = '-'.color('white')
      } else {
        deltaDiv.innerHTML = '-'.color('white')
      }

      if(_delta < 0 || isNaN(_delta)) {
        window._pb[_mode][_count][_speed][_size][_cat] = window._run[_mode][_count][_speed][_size][_cat]
        localStorage._snake_pb = JSON.stringify(window._pb)
      }



      `
    )







    return code
  }
}
