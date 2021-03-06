/**
 * Copyright (c) 2018-present clchart Contributors.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import ClDrawKBar from './chart/cl.draw.kbar'
import ClDrawLine from './chart/cl.draw.line'
import ClDrawRight from './chart/cl.draw.right'
import ClDrawVBar from './chart/cl.draw.vbar'
import ClDrawVLine from './chart/cl.draw.vline'

/** @module ClChartDef */

/**
 * chart main layout config
 */
export const CHART_LAYOUT = {
  margin: {
    left: 0,
    top: 0,
    right: 0,
    bottom: 0
  },
  offset: {
    left: 2,
    top: 2,
    right: 2,
    bottom: 0
  },
  title: {
    pixel: 12,
    height: 18,
    spaceX: 10,
    spaceY: 2,
    font: 'sans-serif'
  },
  axisX: {
    pixel: 12,
    height: 18,
    width: 50,
    spaceX: 2,
    font: 'sans-serif'
  },
  scroll: {
    pixel: 12,
    size: 15,
    spaceX: 10,
    font: 'sans-serif'
  },
  digit: {
    pixel: 12,
    height: 16,
    spaceX: 3,
    font: 'sans-serif'
  },
  symbol: {
    pixel: 10,
    size: 18,
    spaceX: 3,
    font: 'sans-serif'
  }
}

/**
 * chart buttons config
 */
export const CHART_BUTTONS = [
  { key: 'zoomin' },
  { key: 'zoomout' },
  { key: 'exright' }
]

/**
 * chart order config
 */
export const CHART_ORDER = {
  style: 'normal', // 'tiny' only shows buy one sell one 'normal' 5 orders
  title: {
    display: 'text' // 'text' or 'none','none' does not display btn button text
  }
}

const ZOOM_INFO_DEF = {
  index: 3,
  list: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]
}

/**
 * chart kbar layout config
 */
export const CHART_KBAR = {
  // buttons: ['zoomin', 'exright', 'zoomout'],
  // title: { display: 'none' },
  // scroll: {display: 'none'},
  zoomInfo: ZOOM_INFO_DEF,
  scroll: {
    display: 'none' // 'none' does not show
  },
  title: {
    display: 'text', // none does not show btn button text
    label: 'K线' // label information to be displayed
  },
  axisX: {
    lines: 0,
    display: 'none', // 'none' | 'both' | 'block', 'none' does not show, 'both': show both, 'block': displays a value for each block based on lines = display coordinates
    type: 'normal', // 'normal' | 'day1' | 'day5'
    format: 'date' // date time datetime normal tradetime(9:30)
  },
  axisY: {
    lines: 3,
    left: {
      display: 'both', // none不显示, both, noupper 不显示最上面, nofoot不显示最下面 = 显示坐标
      middle: 'none', // 是否有中间值 'before'=前收盘 ‘zero’ 0为中间值
      format: 'price' // 输出数据的格式 rate, price 保留一定小数位 vol 没有小数
    },
    right: {
      display: 'both', // none不显示，noupper 不显示最上面, nofoot不显示最下面 = 显示坐标
      middle: 'none', // 是否有中间值 'before'=前收盘 ‘zero’ 0为中间值
      format: 'price' // rate, price vol
    }
  },
  lines: [{
    // type: 'l_kbar',
    className: ClDrawKBar,
    extremum: { // 如何取极值
      method: 'normal', // fixedLeft fixedRight 上下固定,此时需要取axisY.middle的定义
      maxvalue: ['high'], // 参与计算最大值的标签
      minvalue: ['low'] // 参与计算最小值的标签
    }
    // 第一根线默认的key是跟随chart的hotKey变化而变化的，其他线要么自己有数据，要么根据hotKey加上公式计算出自己的key
  },
  {
    className: ClDrawRight
  },
  {
    className: ClDrawLine,
    info: { // 输出在信息栏目的数据
      txt: '5:',
      labelY: 'value', // 从key中获取对应的数据标签 用于显示信息用
      format: 'price'
    },
    formula: { // 数据生成方式，都需要基于基本数据，没有formula表示取绑定的数据
      key: 'DAYM1', // 生成和获取数据的key，
      command: `out = this.MA('close',5)` // 公式只能输出值到out中
    }
  },
  {
    className: ClDrawLine,
    info: {
      txt: '10:',
      labelY: 'value',
      format: 'price'
    },
    formula: {
      key: 'DAYM2', // 获取数据的key，
      command: `out = this.MA('close',10)` // 公式只能输出值到out中
    }
  },
  {
    className: ClDrawLine,
    info: {
      txt: '20:',
      labelY: 'value',
      format: 'price'
    },
    formula: {
      key: 'DAYM3', // 获取数据的key，
      command: `out = this.MA('close',20)` // 公式只能输出值到out中
    }
  },
  {
    className: ClDrawLine,
    info: {
      txt: '60:',
      labelY: 'value',
      format: 'price'
    },
    formula: {
      key: 'DAYM4', // 获取数据的key，
      command: `out = this.MA('close',60)` // 公式只能输出值到out中
    }
  }]
}

/**
 * chart vbar layout config
 */
export const CHART_VBAR = {
  zoomInfo: ZOOM_INFO_DEF,
  title: {
    display: 'text', // none 不显示 btn 按钮 text 文字
    label: 'VOL' // 需要显示的文字信息
  },
  axisX: {
    lines: 0,
    display: 'both', // 左右两边显示
    type: 'normal', // 有 day1 day5 和 normal 三种模式
    format: 'date' // date time datetime normal tradetime：根据交易时间此时label无用 = 显示的信息方式
  },
  axisY: {
    lines: 1,
    left: {
      display: 'nofoot',
      middle: 'none',
      format: 'vol'
    },
    right: {
      display: 'nofoot',
      middle: 'none',
      format: 'vol'
    }
  },
  lines: [{
    className: ClDrawVBar,
    extremum: { // 如何取极值
      method: 'normal', // fixedLeft fixedRight 上下固定,此时需要取axisY.middle的定义
      maxvalue: ['vol'], // 参与计算最大值的标签
      minvalue: [0] // 参与计算最小值的标签
    },
    info: {
      labelY: 'vol', // 需要显示的变量，从key中获取对应的数据标签
      format: 'vol'
    }
  },
  {
    className: ClDrawLine,
    info: {
      txt: '5:',
      labelY: 'value', // 需要显示的变量，从key中获取对应的数据标签
      format: 'vol'
    },
    formula: {
      key: 'MVOL1', // 获取数据的key，
      command: `out = this.MA('vol',5)` // 公式只能输出值到out中
    }
  },
  {
    className: ClDrawLine,
    info: {
      txt: '10:',
      labelY: 'value', // 需要显示的变量，从key中获取对应的数据标签
      format: 'vol'
    },
    formula: {
      key: 'MVOL2', // 获取数据的key，
      command: `out = this.MA('vol',10)` // 公式只能输出值到out中
    }
  },
  {
    className: ClDrawLine,
    info: {
      txt: '20:',
      labelY: 'value', // 需要显示的变量，从key中获取对应的数据标签
      format: 'vol'
    },
    formula: {
      key: 'MVOL3', // 获取数据的key，
      command: `out = this.MA('vol',20)` // 公式只能输出值到out中
    }
  }]
}

/**
 * chart now config
 */
export const CHART_NOW = {
  title: {
    display: 'none' // none 不显示 btn 按钮 text 文字
  },
  axisX: {
    lines: 3,
    display: 'none', // none不显示，sides：两边各一个值, block：根据块大小每个块显示一个值 = 显示坐标
    type: 'day1', // 有 day1 day5 和 normal 三种模式
    format: 'tradetime'
  },
  axisY: {
    lines: 3,
    left: {
      display: 'both', // none不显示，all, noupper不显示最上面, nofoot不显示最下面 = 显示坐标
      middle: 'before', // 是否有中间值 'before'=前收盘 ‘zero’ 0为中间值
      format: 'price' // 输出数据的格式 rate, price, vol
    },
    right: {
      display: 'both', // none不显示，noupper不显示最上面, nofoot不显示最下面 = 显示坐标
      middle: 'before', // 是否有中间值 'before'=前收盘 ‘zero’ 0为中间值
      format: 'rate' // rate, price vol
    }
  },
  lines: [{
    className: ClDrawLine,
    extremum: { // 如何取极值
      method: 'fixedLeft', // fixedLeft fixedRight 上下固定,此时需要取axisY.middle的定义
      maxvalue: ['high'], // 参与计算最大值的标签
      minvalue: ['low'] // 参与计算最小值的标签
    },
    info: {
      labelX: 'idx',
      labelY: 'close',
      showSort: 'idx'
    }
  },
  {
    className: ClDrawLine,
    info: {
      showSort: 'idx'
    },
    formula: {
      key: 'NOWM1', // 获取数据的key，
      command: `out = this.AVGPRC()` // 均价,要根据股票类型做变化
    }
  }]
}

/**
 * min chart volume config
 */
export const CHART_NOWVOL = {
  title: {
    display: 'none' // none 不显示 btn 按钮 text 文字
  },
  axisX: {
    lines: 3,
    display: 'both', // 左右两边显示
    type: 'day1', // 有 day1 day5 和 normal 三种模式
    format: 'tradetime'
  },
  axisY: {
    lines: 1,
    left: {
      display: 'nofoot',
      middle: 'none',
      format: 'vol'
    },
    right: {
      display: 'nofoot',
      middle: 'none',
      format: 'vol'
    }
  },
  lines: [{
    className: ClDrawVLine,
    extremum: { // 如何取极值
      method: 'normal', // fixedLeft fixedRight 上下固定,此时需要取axisY.middle的定义
      maxvalue: ['decvol'], // 参与计算最大值的标签
      minvalue: [0] // 参与计算最小值的标签
    },
    info: {
      showSort: 'idx',
      labelX: 'idx',
      labelY: 'decvol',
      color: 'vol'
    }
  }]
}
/**
 * 5day chart config
 */
export const CHART_DAY5 = {
  title: {
    display: 'none' // none 不显示 btn 按钮 text 文字
  },
  axisX: {
    lines: 4,
    display: 'none', // none不显示，both 边各一个值, block 根据块大小每个块显示一个值 = 显示坐标
    type: 'day5', // 有 day1 day5 和 normal 三种模式
    format: 'date' // date time datetime normal tradetime：根据交易时间此时label无用 = 显示的信息方式
  },
  axisY: {
    lines: 3,
    left: {
      display: 'both', // none不显示，all, noupper不显示最上面, nofoot不显示最下面 = 显示坐标
      middle: 'before',
      format: 'price' // 输出数据的格式 rate, price, vol
    },
    right: {
      display: 'both', // none不显示，noupper不显示最上面, nofoot不显示最下面 = 显示坐标
      middle: 'before',
      format: 'rate' // rate, price vol
    }
  },
  lines: [{
    className: ClDrawLine,
    extremum: { // 如何取极值
      method: 'fixedLeft', // fixedLeft fixedRight 上下固定,此时需要取axisY.middle的定义
      maxvalue: ['close'], // 参与计算最大值的标签
      minvalue: ['close'] // 参与计算最小值的标签
    },
    info: {
      showSort: 'idx',
      labelX: 'time',
      labelY: 'close'
    }
  },
  {
    className: ClDrawLine,
    info: {
      showSort: 'idx'
    },
    formula: {
      key: 'NOWDAY5', // 获取数据的key，
      command: `out = this.AVGPRC()` // 均价,要根据股票类型做变化
    }
  }]
}

/**
 * 5 days chart volume config
 */
export const CHART_DAY5VOL = {
  title: {
    display: 'none' // none 不显示 btn 按钮 text 文字
  },
  axisX: {
    lines: 4,
    display: 'block',
    type: 'day5', // 有 day1 day5 和 normal 三种模式
    format: 'date' // date time datetime normal 显示的x轴信息方式
  },
  axisY: {
    lines: 1,
    left: {
      display: 'nofoot', // none不显示，all, noupper不显示最上面, nofoot不显示最下面 = 显示坐标
      middle: 'none',
      format: 'vol' // 输出数据的格式 rate, price, vol
    },
    right: {
      display: 'nofoot', // none不显示，noupper不显示最上面, nofoot不显示最下面 = 显示坐标
      middle: 'none',
      format: 'vol' // rate, price vol
    }
  },
  lines: [{
    className: ClDrawVLine,
    extremum: { // 如何取极值
      method: 'normal', // fixedLeft fixedRight 上下固定,此时需要取axisY.middle的定义
      maxvalue: ['vol'], // 参与计算最大值的标签
      minvalue: [0] // 参与计算最小值的标签
    },
    info: {
      showSort: 'idx',
      labelX: 'time',
      labelY: 'vol',
      color: 'vol'
    }
  }]
}

export const CHART_NORMAL = {
  title: {
    display: 'text', // none 不显示 btn 按钮 text 文字
    label: 'NORMAL'
  },
  axisX: {
    lines: 0,
    display: 'none',
    type: 'normal', // 有 day1 day5 和 normal 三种模式
    format: 'date' // date time datetime normal 显示的x轴信息方式
  },
  axisY: {
    lines: 1,
    left: {
      display: 'both',
      middle: 'none',
      format: 'price'
    },
    right: {
      display: 'both',
      middle: 'none',
      format: 'price'
    }
  },
  lines: [{
    className: ClDrawLine
  }]
}
