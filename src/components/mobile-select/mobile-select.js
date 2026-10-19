/*!
 * mobileSelect.js
 * (c) 2017-present onlyhom
 * Released under the MIT License.
 */

const pickerClearClass = "after:content-['.']"

function getClass(dom, string) {
  return dom.querySelectorAll(`[data-picker-part="${string}"]`)
}

//构造器
function MobileSelect(config) {
  this.mobileSelect
  this.wheelsData = config.wheels
  this.jsonType = false
  this.cascadeJsonData = []
  this.displayJson = []
  this.curValue = []
  this.curIndexArr = []
  this.cascade = false
  this.startY
  this.moveEndY
  this.moveY
  this.oldMoveY
  this.offset = 0
  this.offsetSum = 0
  this.oversizeBorder
  this.curDistance = []
  this.clickStatus = false
  this.isPC = true
  this.init(config)
}

MobileSelect.prototype = {
  constructor: MobileSelect,
  init: function (config) {
    var _this = this
    if (config.wheels[0].data.length == 0) {
      console.error(
        'mobileSelect has been successfully installed, but the data is empty and cannot be initialized.'
      )
      return false
    }
    _this.keyMap = config.keyMap ? config.keyMap : { id: 'id', value: 'value', childs: 'childs' }
    _this.checkDataType()
    _this.renderWheels(_this.wheelsData, config.cancelBtnText, config.ensureBtnText)
    _this.trigger = document.querySelector(config.trigger)
    if (!_this.trigger) {
      console.error(
        'mobileSelect has been successfully installed, but no trigger found on your page.'
      )
      return false
    }
    _this.wheel = getClass(_this.mobileSelect, 'wheel')
    _this.slider = getClass(_this.mobileSelect, 'selectContainer')
    _this.wheels = _this.mobileSelect.querySelector('[data-picker-part="wheels"]')
    _this.liHeight = _this.mobileSelect.querySelector('li').offsetHeight
    _this.ensureBtn = _this.mobileSelect.querySelector('[data-picker-part="ensure"]')
    _this.cancelBtn = _this.mobileSelect.querySelector('[data-picker-part="cancel"]')
    _this.grayLayer = _this.mobileSelect.querySelector('[data-picker-part="grayLayer"]')
    _this.popUp = _this.mobileSelect.querySelector('[data-picker-part="content"]')
    _this.callback = config.callback || function () {}
    _this.cancel = config.cancel || function () {}
    _this.transitionEnd = config.transitionEnd || function () {}
    _this.onShow = config.onShow || function () {}
    _this.onHide = config.onHide || function () {}
    _this.initPosition = config.position || []
    _this.titleText = config.title || ''
    _this.connector = config.connector || ' '
    _this.triggerDisplayData = !(typeof config.triggerDisplayData == 'undefined')
      ? config.triggerDisplayData
      : true
    _this.trigger.classList.add('cursor-pointer')
    _this.setStyle(config)
    _this.setTitle(_this.titleText)
    _this.checkIsPC()
    _this.checkCascade()
    _this.addListenerAll()

    if (_this.cascade) {
      _this.initCascade()
    }
    //定位 初始位置
    if (_this.initPosition.length < _this.slider.length) {
      var diff = _this.slider.length - _this.initPosition.length
      for (var i = 0; i < diff; i++) {
        _this.initPosition.push(0)
      }
    }

    _this.setCurDistance(_this.initPosition)

    //按钮监听
    _this.cancelBtn.addEventListener('click', function () {
      _this.hide()
      _this.cancel(_this.curIndexArr, _this.curValue)
    })

    _this.ensureBtn.addEventListener('click', function () {
      _this.hide()
      if (!_this.liHeight) {
        _this.liHeight = _this.mobileSelect.querySelector('li').offsetHeight
      }
      var tempValue = ''
      for (var i = 0; i < _this.wheel.length; i++) {
        i == _this.wheel.length - 1
          ? (tempValue += _this.getInnerHtml(i))
          : (tempValue += _this.getInnerHtml(i) + _this.connector)
      }
      if (_this.triggerDisplayData) {
        _this.trigger.innerHTML = tempValue
      }
      _this.curIndexArr = _this.getIndexArr()
      _this.curValue = _this.getCurValue()
      _this.callback(_this.curIndexArr, _this.curValue)
    })

    _this.trigger.addEventListener('click', function () {
      _this.show()
    })
    _this.grayLayer.addEventListener('click', function () {
      _this.hide()
      _this.cancel(_this.curIndexArr, _this.curValue)
    })
    _this.popUp.addEventListener('click', function () {
      event.stopPropagation()
    })

    _this.fixRowStyle() //修正列数
  },

  setTitle: function (string) {
    var _this = this
    _this.titleText = string
    _this.mobileSelect.querySelector('[data-picker-part="title"]').innerHTML = _this.titleText
  },

  setStyle: function (config) {
    var _this = this
    if (config.ensureBtnColor) {
      _this.ensureBtn.style.color = config.ensureBtnColor
    }
    if (config.cancelBtnColor) {
      _this.cancelBtn.style.color = config.cancelBtnColor
    }
    if (config.titleColor) {
      _this.title = _this.mobileSelect.querySelector('[data-picker-part="title"]')
      _this.title.style.color = config.titleColor
    }
    if (config.textColor) {
      _this.panel = _this.mobileSelect.querySelector('[data-picker-part="panel"]')
      _this.panel.style.color = config.textColor
    }
    if (config.titleBgColor) {
      _this.btnBar = _this.mobileSelect.querySelector('[data-picker-part="btnBar"]')
      _this.btnBar.style.backgroundColor = config.titleBgColor
    }
    if (config.bgColor) {
      _this.panel = _this.mobileSelect.querySelector('[data-picker-part="panel"]')
      _this.shadowMask = _this.mobileSelect.querySelector('[data-picker-part="shadowMask"]')
      _this.panel.style.backgroundColor = config.bgColor
      _this.shadowMask.style.background =
        'linear-gradient(to bottom, ' +
        config.bgColor +
        ', rgba(255, 255, 255, 0), ' +
        config.bgColor +
        ')'
    }
    if (!isNaN(config.maskOpacity)) {
      _this.grayMask = _this.mobileSelect.querySelector('[data-picker-part="grayLayer"]')
      _this.grayMask.style.background = 'rgba(0, 0, 0, ' + config.maskOpacity + ')'
    }
  },

  checkIsPC: function () {
    var _this = this
    var sUserAgent = navigator.userAgent.toLowerCase()
    var bIsIpad = sUserAgent.match(/ipad/i) == 'ipad'
    var bIsIphoneOs = sUserAgent.match(/iphone os/i) == 'iphone os'
    var bIsMidp = sUserAgent.match(/midp/i) == 'midp'
    var bIsUc7 = sUserAgent.match(/rv:1.2.3.4/i) == 'rv:1.2.3.4'
    var bIsUc = sUserAgent.match(/ucweb/i) == 'ucweb'
    var bIsAndroid = sUserAgent.match(/android/i) == 'android'
    var bIsCE = sUserAgent.match(/windows ce/i) == 'windows ce'
    var bIsWM = sUserAgent.match(/windows mobile/i) == 'windows mobile'
    if (bIsIpad || bIsIphoneOs || bIsMidp || bIsUc7 || bIsUc || bIsAndroid || bIsCE || bIsWM) {
      _this.isPC = false
    }
  },

  show: function () {
    this.mobileSelect.dataset.open = 'true'
    if (typeof this.onShow === 'function') {
      this.onShow(this)
    }
  },

  hide: function () {
    this.mobileSelect.dataset.open = 'false'
    if (typeof this.onHide === 'function') {
      this.onHide(this)
    }
  },

  renderWheels: function (wheelsData, cancelBtnText, ensureBtnText) {
    var _this = this
    var cancelText = cancelBtnText ? cancelBtnText : '取消'
    var ensureText = ensureBtnText ? ensureBtnText : '确认'
    _this.mobileSelect = document.createElement('div')
    _this.mobileSelect.className =
      'relative z-0 opacity-0 invisible [transition:opacity_0.4s,_z-index_0.4s] group/picker data-[open=true]:opacity-100 data-[open=true]:z-10000 data-[open=true]:visible'
    _this.mobileSelect.innerHTML =
      '<div data-picker-part="grayLayer" class="m-0 p-0 box-border fixed top-0 left-0 bottom-0 right-0 bg-[rgba(0,_0,_0,_0.7)] z-888 block"></div>' +
      '<div data-picker-part="content" class="m-0 p-0 box-border w-full block fixed z-889 text-black [transition:all_0.4s] -bottom-87.5 left-0 bg-white group-data-[open=true]/picker:bottom-0">' +
      '<div data-picker-part="btnBar" class="m-0 p-0 box-border border-b-[1px] [border-bottom-style:solid] border-b-[#dcdcdc] text-[15px] h-11.25 relative text-center leading-[45px]">' +
      '<div data-picker-part="fixWidth" class="m-0 p-0 box-border w-[90%] relative mx-auto my-0 ' +
      pickerClearClass +
      ' after:block after:h-0 after:clear-both after:invisible">' +
      '<div data-picker-part="cancel" class="h-11.25 w-13.75 cursor-pointer absolute top-0 m-0 p-0 box-border left-0 text-[#666]">' +
      cancelText +
      '</div>' +
      '<div data-picker-part="title" class="m-0 p-0 box-border text-[15px] overflow-hidden whitespace-nowrap text-ellipsis px-[15%] py-0"></div>' +
      '<div data-picker-part="ensure" class="m-0 p-0 box-border h-11.25 w-13.75 cursor-pointer absolute top-0 right-0 text-[#1e83d3]">' +
      ensureText +
      '</div>' +
      '</div>' +
      '</div>' +
      '<div data-picker-part="panel" class="m-0 p-0 box-border ' +
      pickerClearClass +
      ' after:block after:h-0 after:clear-both after:invisible">' +
      '<div data-picker-part="fixWidth" class="m-0 p-0 box-border w-[90%] relative mx-auto my-0 ' +
      pickerClearClass +
      ' after:block after:h-0 after:clear-both after:invisible">' +
      '<div data-picker-part="wheels" class="m-0 p-0 box-border w-full h-50 overflow-hidden">' +
      '</div>' +
      '<div data-picker-part="selectLine" class="m-0 p-0 box-border h-10 w-full absolute top-20 pointer-events-none box-border border-t-[1px] [border-top-style:solid] border-t-[#dcdcdc] border-b-[1px] [border-bottom-style:solid] border-b-[#dcdcdc]"></div>' +
      '<div data-picker-part="shadowMask" class="m-0 p-0 box-border absolute top-0 w-full h-50 [background:linear-gradient(to_bottom,_#ffffff,_rgba(255,_255,_255,_0),_#ffffff)] opacity-90 pointer-events-none"></div>' +
      '</div>' +
      '</div>' +
      '</div>'
    document.body.appendChild(_this.mobileSelect)

    //根据数据长度来渲染

    var tempHTML = ''
    for (var i = 0; i < wheelsData.length; i++) {
      //列
      tempHTML +=
        '<div data-picker-part="wheel" class="m-0 p-0 box-border relative z-0 float-left w-[50%] h-50 overflow-hidden [transition:width_0.3s_ease]"><ul data-picker-part="selectContainer" class="m-0 p-0 box-border block text-center [transition:transform_0.18s_ease-out,_-webkit-transform_0.18s_ease-out]">'
      if (_this.jsonType) {
        for (var j = 0; j < wheelsData[i].data.length; j++) {
          //行
          tempHTML +=
            '<li class="m-0 p-0 box-border text-[15px] block h-10 leading-[40px] cursor-pointer overflow-hidden whitespace-nowrap text-ellipsis" data-id="' +
            wheelsData[i].data[j][_this.keyMap.id] +
            '">' +
            wheelsData[i].data[j][_this.keyMap.value] +
            '</li>'
        }
      } else {
        for (var j = 0; j < wheelsData[i].data.length; j++) {
          //行
          tempHTML +=
            '<li class="m-0 p-0 box-border text-[15px] block h-10 leading-[40px] cursor-pointer overflow-hidden whitespace-nowrap text-ellipsis">' +
            wheelsData[i].data[j] +
            '</li>'
        }
      }
      tempHTML += '</ul></div>'
    }
    _this.mobileSelect.querySelector('[data-picker-part="wheels"]').innerHTML = tempHTML
  },

  addListenerAll: function () {
    var _this = this
    for (var i = 0; i < _this.slider.length; i++) {
      //手势监听
      ;(function (i) {
        _this.addListenerWheel(_this.wheel[i], i)
      })(i)
    }
  },

  addListenerWheel: function (theWheel, index) {
    var _this = this
    theWheel.addEventListener(
      'touchstart',
      function () {
        _this.touch(event, this.firstChild, index)
      },
      false
    )
    theWheel.addEventListener(
      'touchend',
      function () {
        _this.touch(event, this.firstChild, index)
      },
      false
    )
    theWheel.addEventListener(
      'touchmove',
      function () {
        _this.touch(event, this.firstChild, index)
      },
      false
    )

    if (_this.isPC) {
      //如果是PC端则再增加拖拽监听 方便调试
      theWheel.addEventListener(
        'mousedown',
        function () {
          _this.dragClick(event, this.firstChild, index)
        },
        false
      )
      theWheel.addEventListener(
        'mousemove',
        function () {
          _this.dragClick(event, this.firstChild, index)
        },
        false
      )
      theWheel.addEventListener(
        'mouseup',
        function () {
          _this.dragClick(event, this.firstChild, index)
        },
        true
      )
    }
  },

  checkDataType: function () {
    var _this = this
    if (typeof _this.wheelsData[0].data[0] == 'object') {
      _this.jsonType = true
    }
  },

  checkCascade: function () {
    var _this = this
    if (_this.jsonType) {
      var node = _this.wheelsData[0].data
      for (var i = 0; i < node.length; i++) {
        if (_this.keyMap.childs in node[i] && node[i][_this.keyMap.childs].length > 0) {
          _this.cascade = true
          _this.cascadeJsonData = _this.wheelsData[0].data
          break
        }
      }
    } else {
      _this.cascade = false
    }
  },

  generateArrData: function (targetArr) {
    var tempArr = []
    var keyMap_id = this.keyMap.id
    var keyMap_value = this.keyMap.value
    for (var i = 0; i < targetArr.length; i++) {
      var tempObj = {}
      tempObj[keyMap_id] = targetArr[i][this.keyMap.id]
      tempObj[keyMap_value] = targetArr[i][this.keyMap.value]
      tempArr.push(tempObj)
    }
    return tempArr
  },

  initCascade: function () {
    var _this = this
    _this.displayJson.push(_this.generateArrData(_this.cascadeJsonData))
    if (_this.initPosition.length > 0) {
      _this.initDeepCount = 0
      _this.initCheckArrDeep(_this.cascadeJsonData[_this.initPosition[0]])
    } else {
      _this.checkArrDeep(_this.cascadeJsonData[0])
    }
    _this.reRenderWheels()
  },

  initCheckArrDeep: function (parent) {
    var _this = this
    if (parent) {
      if (_this.keyMap.childs in parent && parent[_this.keyMap.childs].length > 0) {
        _this.displayJson.push(_this.generateArrData(parent[_this.keyMap.childs]))
        _this.initDeepCount++
        var nextNode = parent[_this.keyMap.childs][_this.initPosition[_this.initDeepCount]]
        if (nextNode) {
          _this.initCheckArrDeep(nextNode)
        } else {
          _this.checkArrDeep(parent[_this.keyMap.childs][0])
        }
      }
    }
  },

  checkArrDeep: function (parent) {
    //检测子节点深度  修改 displayJson
    var _this = this
    if (parent) {
      if (_this.keyMap.childs in parent && parent[_this.keyMap.childs].length > 0) {
        _this.displayJson.push(_this.generateArrData(parent[_this.keyMap.childs])) //生成子节点数组
        _this.checkArrDeep(parent[_this.keyMap.childs][0]) //检测下一个子节点
      }
    }
  },

  checkRange: function (index, posIndexArr) {
    var _this = this
    var deleteNum = _this.displayJson.length - 1 - index
    for (var i = 0; i < deleteNum; i++) {
      _this.displayJson.pop() //修改 displayJson
    }
    var resultNode
    for (var i = 0; i <= index; i++) {
      if (i == 0) resultNode = _this.cascadeJsonData[posIndexArr[0]]
      else {
        resultNode = resultNode[_this.keyMap.childs][posIndexArr[i]]
      }
    }
    _this.checkArrDeep(resultNode)
    //console.log(_this.displayJson);
    _this.reRenderWheels()
    _this.fixRowStyle()
    _this.setCurDistance(_this.resetPosition(index, posIndexArr))
  },

  resetPosition: function (index, posIndexArr) {
    var _this = this
    var tempPosArr = posIndexArr
    var tempCount
    if (_this.slider.length > posIndexArr.length) {
      tempCount = _this.slider.length - posIndexArr.length
      for (var i = 0; i < tempCount; i++) {
        tempPosArr.push(0)
      }
    } else if (_this.slider.length < posIndexArr.length) {
      tempCount = posIndexArr.length - _this.slider.length
      for (var i = 0; i < tempCount; i++) {
        tempPosArr.pop()
      }
    }
    for (var i = index + 1; i < tempPosArr.length; i++) {
      tempPosArr[i] = 0
    }
    return tempPosArr
  },
  reRenderWheels: function () {
    var _this = this
    //删除多余的wheel
    if (_this.wheel.length > _this.displayJson.length) {
      var count = _this.wheel.length - _this.displayJson.length
      for (var i = 0; i < count; i++) {
        _this.wheels.removeChild(_this.wheel[_this.wheel.length - 1 - i])
      }
    }
    for (var i = 0; i < _this.displayJson.length; i++) {
      //列
      ;(function (i) {
        var tempHTML = ''
        if (_this.wheel[i]) {
          //console.log('插入Li');
          for (var j = 0; j < _this.displayJson[i].length; j++) {
            //行
            tempHTML +=
              '<li class="m-0 p-0 box-border text-[15px] block h-10 leading-[40px] cursor-pointer overflow-hidden whitespace-nowrap text-ellipsis" data-id="' +
              _this.displayJson[i][j][_this.keyMap.id] +
              '">' +
              _this.displayJson[i][j][_this.keyMap.value] +
              '</li>'
          }
          _this.slider[i].innerHTML = tempHTML
        } else {
          var tempWheel = document.createElement('div')
          tempWheel.dataset.pickerPart = 'wheel'
          tempWheel.className =
            'm-0 p-0 box-border relative z-0 float-left w-[50%] h-50 overflow-hidden [transition:width_0.3s_ease]'
          tempHTML =
            '<ul data-picker-part="selectContainer" class="m-0 p-0 box-border block text-center [transition:transform_0.18s_ease-out,_-webkit-transform_0.18s_ease-out]">'
          for (var j = 0; j < _this.displayJson[i].length; j++) {
            //行
            tempHTML +=
              '<li class="m-0 p-0 box-border text-[15px] block h-10 leading-[40px] cursor-pointer overflow-hidden whitespace-nowrap text-ellipsis" data-id="' +
              _this.displayJson[i][j][_this.keyMap.id] +
              '">' +
              _this.displayJson[i][j][_this.keyMap.value] +
              '</li>'
          }
          tempHTML += '</ul>'
          tempWheel.innerHTML = tempHTML

          _this.addListenerWheel(tempWheel, i)
          _this.wheels.appendChild(tempWheel)
        }
        //_this.·(i);
      })(i)
    }
    // data 属性查询返回静态列表，增减级联列后重新读取。
    _this.wheel = getClass(_this.mobileSelect, 'wheel')
    _this.slider = getClass(_this.mobileSelect, 'selectContainer')
  },

  updateWheels: function (data) {
    var _this = this
    if (_this.cascade) {
      _this.cascadeJsonData = data
      _this.displayJson = []
      _this.initCascade()
      if (_this.initPosition.length < _this.slider.length) {
        var diff = _this.slider.length - _this.initPosition.length
        for (var i = 0; i < diff; i++) {
          _this.initPosition.push(0)
        }
      }
      _this.setCurDistance(_this.initPosition)
      _this.fixRowStyle()
    }
  },

  updateWheel: function (sliderIndex, data) {
    var _this = this
    var tempHTML = ''
    if (_this.cascade) {
      console.error('级联格式不支持updateWheel(),请使用updateWheels()更新整个数据源')
      return false
    } else if (_this.jsonType) {
      for (var j = 0; j < data.length; j++) {
        tempHTML +=
          '<li class="m-0 p-0 box-border text-[15px] block h-10 leading-[40px] cursor-pointer overflow-hidden whitespace-nowrap text-ellipsis" data-id="' +
          data[j][_this.keyMap.id] +
          '">' +
          data[j][_this.keyMap.value] +
          '</li>'
      }
      _this.wheelsData[sliderIndex] = { data: data }
    } else {
      for (var j = 0; j < data.length; j++) {
        tempHTML +=
          '<li class="m-0 p-0 box-border text-[15px] block h-10 leading-[40px] cursor-pointer overflow-hidden whitespace-nowrap text-ellipsis">' +
          data[j] +
          '</li>'
      }
      _this.wheelsData[sliderIndex] = data
    }
    _this.slider[sliderIndex].innerHTML = tempHTML
  },

  fixRowStyle: function () {
    var _this = this
    var width = (100 / _this.wheel.length).toFixed(2)
    for (var i = 0; i < _this.wheel.length; i++) {
      _this.wheel[i].style.width = width + '%'
    }
  },

  getIndex: function (distance) {
    return Math.round((2 * this.liHeight - distance) / this.liHeight)
  },

  getIndexArr: function () {
    var _this = this
    var temp = []
    for (var i = 0; i < _this.curDistance.length; i++) {
      temp.push(_this.getIndex(_this.curDistance[i]))
    }
    return temp
  },

  getCurValue: function () {
    var _this = this
    var temp = []
    var positionArr = _this.getIndexArr()
    if (_this.cascade) {
      for (var i = 0; i < _this.wheel.length; i++) {
        temp.push(_this.displayJson[i][positionArr[i]])
      }
    } else if (_this.jsonType) {
      for (var i = 0; i < _this.curDistance.length; i++) {
        temp.push(_this.wheelsData[i].data[_this.getIndex(_this.curDistance[i])])
      }
    } else {
      for (var i = 0; i < _this.curDistance.length; i++) {
        temp.push(_this.getInnerHtml(i))
      }
    }
    return temp
  },

  getValue: function () {
    return this.curValue
  },

  calcDistance: function (index) {
    return 2 * this.liHeight - index * this.liHeight
  },

  setCurDistance: function (indexArr) {
    var _this = this
    var temp = []
    for (var i = 0; i < _this.slider.length; i++) {
      temp.push(_this.calcDistance(indexArr[i]))
      _this.movePosition(_this.slider[i], temp[i])
    }
    _this.curDistance = temp
  },

  fixPosition: function (distance) {
    return -(this.getIndex(distance) - 2) * this.liHeight
  },

  movePosition: function (theSlider, distance) {
    theSlider.style.webkitTransform = 'translate3d(0,' + distance + 'px, 0)'
    theSlider.style.transform = 'translate3d(0,' + distance + 'px, 0)'
  },

  locatePosition: function (index, posIndex) {
    var _this = this
    this.curDistance[index] = this.calcDistance(posIndex)
    this.movePosition(this.slider[index], this.curDistance[index])
    if (_this.cascade) {
      _this.checkRange(index, _this.getIndexArr())
    }
  },

  updateCurDistance: function (theSlider, index) {
    if (theSlider.style.transform) {
      this.curDistance[index] = parseInt(theSlider.style.transform.split(',')[1])
    } else {
      this.curDistance[index] = parseInt(theSlider.style.webkitTransform.split(',')[1])
    }
  },

  getDistance: function (theSlider) {
    if (theSlider.style.transform) {
      return parseInt(theSlider.style.transform.split(',')[1])
    } else {
      return parseInt(theSlider.style.webkitTransform.split(',')[1])
    }
  },

  getInnerHtml: function (sliderIndex) {
    var _this = this
    var index = _this.getIndex(_this.curDistance[sliderIndex])
    return _this.slider[sliderIndex].getElementsByTagName('li')[index].innerHTML
  },

  touch: function (event, theSlider, index) {
    var _this = this
    event = event || window.event
    switch (event.type) {
      case 'touchstart':
        _this.startY = event.touches[0].clientY
        _this.startY = parseInt(_this.startY)
        _this.oldMoveY = _this.startY
        break

      case 'touchend':
        _this.moveEndY = parseInt(event.changedTouches[0].clientY)
        _this.offsetSum = _this.moveEndY - _this.startY
        _this.oversizeBorder = -(theSlider.getElementsByTagName('li').length - 3) * _this.liHeight

        if (_this.offsetSum == 0) {
          //offsetSum为0,相当于点击事件
          // 0 1 [2] 3 4
          var clickOffetNum = parseInt(
            (document.documentElement.clientHeight - _this.moveEndY) / 40
          )
          if (clickOffetNum != 2) {
            var offset = clickOffetNum - 2
            var newDistance = _this.curDistance[index] + offset * _this.liHeight
            if (newDistance <= 2 * _this.liHeight && newDistance >= _this.oversizeBorder) {
              _this.curDistance[index] = newDistance
              _this.movePosition(theSlider, _this.curDistance[index])
              _this.transitionEnd(_this.getIndexArr(), _this.getCurValue())
            }
          }
        } else {
          //修正位置
          _this.updateCurDistance(theSlider, index)
          _this.curDistance[index] = _this.fixPosition(_this.curDistance[index])
          _this.movePosition(theSlider, _this.curDistance[index])

          //反弹
          if (_this.curDistance[index] + _this.offsetSum > 2 * _this.liHeight) {
            _this.curDistance[index] = 2 * _this.liHeight
            setTimeout(function () {
              _this.movePosition(theSlider, _this.curDistance[index])
            }, 100)
          } else if (_this.curDistance[index] + _this.offsetSum < _this.oversizeBorder) {
            _this.curDistance[index] = _this.oversizeBorder
            setTimeout(function () {
              _this.movePosition(theSlider, _this.curDistance[index])
            }, 100)
          }
          _this.transitionEnd(_this.getIndexArr(), _this.getCurValue())
        }

        if (_this.cascade) {
          _this.checkRange(index, _this.getIndexArr())
        }

        break

      case 'touchmove':
        event.preventDefault()
        _this.moveY = event.touches[0].clientY
        _this.offset = _this.moveY - _this.oldMoveY

        _this.updateCurDistance(theSlider, index)
        _this.curDistance[index] = _this.curDistance[index] + _this.offset
        _this.movePosition(theSlider, _this.curDistance[index])
        _this.oldMoveY = _this.moveY
        break
    }
  },

  dragClick: function (event, theSlider, index) {
    var _this = this
    event = event || window.event
    switch (event.type) {
      case 'mousedown':
        _this.startY = event.clientY
        _this.oldMoveY = _this.startY
        _this.clickStatus = true
        break

      case 'mouseup':
        _this.moveEndY = event.clientY
        _this.offsetSum = _this.moveEndY - _this.startY
        _this.oversizeBorder = -(theSlider.getElementsByTagName('li').length - 3) * _this.liHeight

        if (_this.offsetSum == 0) {
          var clickOffetNum = parseInt(
            (document.documentElement.clientHeight - _this.moveEndY) / 40
          )
          if (clickOffetNum != 2) {
            var offset = clickOffetNum - 2
            var newDistance = _this.curDistance[index] + offset * _this.liHeight
            if (newDistance <= 2 * _this.liHeight && newDistance >= _this.oversizeBorder) {
              _this.curDistance[index] = newDistance
              _this.movePosition(theSlider, _this.curDistance[index])
              _this.transitionEnd(_this.getIndexArr(), _this.getCurValue())
            }
          }
        } else {
          //修正位置
          _this.updateCurDistance(theSlider, index)
          _this.curDistance[index] = _this.fixPosition(_this.curDistance[index])
          _this.movePosition(theSlider, _this.curDistance[index])

          //反弹
          if (_this.curDistance[index] + _this.offsetSum > 2 * _this.liHeight) {
            _this.curDistance[index] = 2 * _this.liHeight
            setTimeout(function () {
              _this.movePosition(theSlider, _this.curDistance[index])
            }, 100)
          } else if (_this.curDistance[index] + _this.offsetSum < _this.oversizeBorder) {
            _this.curDistance[index] = _this.oversizeBorder
            setTimeout(function () {
              _this.movePosition(theSlider, _this.curDistance[index])
            }, 100)
          }
          _this.transitionEnd(_this.getIndexArr(), _this.getCurValue())
        }

        _this.clickStatus = false
        if (_this.cascade) {
          _this.checkRange(index, _this.getIndexArr())
        }
        break

      case 'mousemove':
        event.preventDefault()
        if (_this.clickStatus) {
          _this.moveY = event.clientY
          _this.offset = _this.moveY - _this.oldMoveY
          _this.updateCurDistance(theSlider, index)
          _this.curDistance[index] = _this.curDistance[index] + _this.offset
          _this.movePosition(theSlider, _this.curDistance[index])
          _this.oldMoveY = _this.moveY
        }
        break
    }
  }
}

export default MobileSelect
