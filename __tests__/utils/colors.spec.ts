import {
  convertHexToRGBA,
  convertHexToRGBString,
  convertRGBStringToRGBNumber,
  convertRGBNumberToRGBString,
  validateRGBNumbers,
  convertHexToRGBNumber,
  convertRGBNumberToHex,
  changeHex,
  darken,
  lighten
} from "@Utils/colors";

describe('convertHexToRGBA', () => {
  it('will give known outputs for known inputs', () => {
    const correctInputs = [
      {
        val: '#000000',
        op: 0.8
      },
      {
        val: '#abcdef',
        op: 0.2
      },
      {
        val: '#000',
        op: 0
      },
      {
        val: '#000000',
        op: 0
      },
      {
        val: '#000000',
        op: 1
      }
    ]
    const expected = [
      'rgba(0, 0, 0, 0.8)',
      'rgba(171, 205, 239, 0.2)',
      'rgba(0, 0, 0, 0)',
      'rgba(0, 0, 0, 0)',
      'rgba(0, 0, 0, 1)'
    ]
  
    for (let i = 0; i < correctInputs.length; i++) {
      const { val, op } = correctInputs[i]
      const result = expected[i]
      expect(convertHexToRGBA(val, op)).toEqual(result)
    }
  })

  it('will round opacity to the nearest two decimal numbers', () => {
    const inputs = [
      {
        val: '#000000',
        op: 0.799
      },
      {
        val: '#abcdef',
        op: 0.249999999
      },

      {
        val: '#000000',
        op: 0.001
      },
      {
        val: '#000000',
        op: 0.9999
      }
    ]
    const expected = [
      'rgba(0, 0, 0, 0.8)',
      'rgba(171, 205, 239, 0.25)',
      'rgba(0, 0, 0, 0)',
      'rgba(0, 0, 0, 1)'
    ]
  
    for (let i = 0; i < inputs.length; i++) {
      const { val, op } = inputs[i]
      const result = expected[i]
      expect(convertHexToRGBA(val, op)).toEqual(result)
    }
  })

  it('will throw errors if the input is incorrectly formatted', () => {
    const badInputs = [
      {
        val: '#0000000',
        op: 0.799
      },
      {
        val: '#ab',
        op: 0.249999999
      },

      {
        val: 'abcdef',
        op: 0.001
      },
      {
        val: '       ',
        op: 0.9999
      }
    ]

    for (let input of badInputs) {
      expect(() => convertHexToRGBA(input.val, input.op)).toThrow();
    }
  })
})

describe('convertHexToRGBString', () => {
  it('will give known outputs for known inputs', () => {
    const correctInputs = [
      '#abcdef',
      '#000000',
      '#000',
      '#abc'
    ]
    const expected = [
      {
        red: 'ab',
        green: 'cd',
        blue: 'ef'
      },
      {
        red: '00',
        green: '00',
        blue: '00'
      },
      {
        red: '00',
        green: '00',
        blue: '00'
      },
      {
        red: 'aa',
        green: 'bb',
        blue: 'cc'
      }
    ]
  
    for (let i = 0; i < correctInputs.length; i++) {
      const val  = correctInputs[i]
      const result = expected[i]
      expect(convertHexToRGBString(val)).toEqual(result)
    }
  })

  it('will throw errors if the input is incorrectly formatted', () => {
    const badInputs = [
        '#0000000',
        '#ab',
        'abcdef',
        '       ',
      ]

    for (let input of badInputs) {
      expect(() => convertHexToRGBString(input)).toThrow();
    }
  })
})

describe('convertRGBStringToRGBNumber', () => {
  it('will give known outputs for known inputs', () => {
    const correctInputs = [
      {
        red: 'ab',
        green: 'cd',
        blue: 'ef'
      },
      {
        red: '00',
        green: '00',
        blue: '00'
      },
      {
        red: '00',
        green: '00',
        blue: '00'
      },
      {
        red: 'aa',
        green: 'bb',
        blue: 'cc'
      }
    ]
    const expected = [
      {
        red: 171,
        green: 205,
        blue: 239
      },
      {
        red: 0,
        green: 0,
        blue: 0
      },
      {
        red: 0,
        green: 0,
        blue: 0
      },
      {
        red: 170,
        green: 187,
        blue: 204
      }
    ]
  
    for (let i = 0; i < correctInputs.length; i++) {
      const val  = correctInputs[i]
      const result = expected[i]
      expect(convertRGBStringToRGBNumber(val)).toEqual(result)
    }
  })

  it('will throw errors if the input is incorrectly formatted', () => {
    const badInputs = [
      {
        red: 'abc',
        green: 'cd',
        blue: 'ef'
      },
      {
        red: '00',
        green: '-255',
        blue: '00'
      },
      {
        red: 'how',
        green: '00',
        blue: '00'
      },
      {
        red: 'aa',
        green: 'bb',
        blue: '299'
      }
    ]

    for (let input of badInputs) {
      expect(() => convertRGBStringToRGBNumber(input)).toThrow();
    }
  })
})

describe('convertRGBNumberToRGBString', () => {
  it('will give known outputs for known inputs', () => {
    const correctInputs = [
      {
        red: 171,
        green: 205,
        blue: 239
      },
      {
        red: 0,
        green: 0,
        blue: 0
      },
      {
        red: 0,
        green: 0,
        blue: 0
      },
      {
        red: 170,
        green: 187,
        blue: 204
      }
    ]

    const expected = [
      {
        red: 'ab',
        green: 'cd',
        blue: 'ef'
      },
      {
        red: '00',
        green: '00',
        blue: '00'
      },
      {
        red: '00',
        green: '00',
        blue: '00'
      },
      {
        red: 'aa',
        green: 'bb',
        blue: 'cc'
      }
    ]
  
    for (let i = 0; i < correctInputs.length; i++) {
      const val  = correctInputs[i]
      const result = expected[i]
      expect(convertRGBNumberToRGBString(val)).toEqual(result)
    }
  })

  it('will throw errors if the input is incorrectly formatted', () => {
    const badInputs = [
      {
        red: 116.5,
        green: 205,
        blue: 239
      },
      {
        red: -20,
        green: 0,
        blue: 0
      },
      {
        red: 0,
        green: 280,
        blue: 0
      },
      {
        red: 0,
        green: 187,
        blue: Infinity
      }
    ]

    for (let input of badInputs) {
      expect(() => convertRGBNumberToRGBString(input)).toThrow();
    }
  })
})

describe('validateRGBNumbers', () => {
  it('will return true for known correct inputs', () => {
    const correctInputs = [
      [155, 255, 125],
      [0,0,0],
      [1,2,3,4,5,5,6,6,7,8,255,255,255,255,21,18]
    ]
  
    for (let input of correctInputs) {
      expect(validateRGBNumbers(...input)).toBe(true)
    }
  })

  it('will return false for known incorrect inputs', () => {
    const incorrectInputs = [
      [100.1],
      [],
      [275],
      [100,115,125,255,256],
      [-50],
      [100,200,100,200,-1]
    ]

    for (let input of incorrectInputs) {
      expect(validateRGBNumbers(...input)).toBe(false)
    }
  })
})

describe('convertHexToRGBNumber', () => {
  it('will give known outputs for known inputs', () => {
    const correctInputs = [
      '#abcdef',
      '#000000',
      '#000',
      '#abc'
    ]
    const expected = [
      {
        red: 171,
        green: 205,
        blue: 239
      },
      {
        red: 0,
        green: 0,
        blue: 0
      },
      {
        red: 0,
        green: 0,
        blue: 0
      },
      {
        red: 170,
        green: 187,
        blue: 204
      }
    ]
  
    for (let i = 0; i < correctInputs.length; i++) {
      const val  = correctInputs[i]
      const result = expected[i]
      expect(convertHexToRGBNumber(val)).toEqual(result)
    }
  })

  it('will throw errors if the input is incorrectly formatted', () => {
    const badInputs = [
      '#0000000',
      '#ab',
      'abcdef',
      '       ',
    ]

  for (let input of badInputs) {
    expect(() => convertHexToRGBString(input)).toThrow();
  }
  })
})

describe('convertRGBNumberToHex', () => {
  it('will give known outputs for known inputs', () => {
    const correctInputs = [
      {
        red: 171,
        green: 205,
        blue: 239
      },
      {
        red: 0,
        green: 0,
        blue: 0
      },
      {
        red: 0,
        green: 0,
        blue: 0
      },
      {
        red: 170,
        green: 187,
        blue: 204
      }
    ]

    const expected = [
      '#abcdef',
      '#000',
      '#000',
      '#aabbcc'
    ]
  
    for (let i = 0; i < correctInputs.length; i++) {
      const val  = correctInputs[i]
      const result = expected[i]
      expect(convertRGBNumberToHex(val)).toEqual(result)
    }
  })

  it('will throw errors if the input is incorrectly formatted', () => {
    const badInputs = [
      {
        red: 116.5,
        green: 205,
        blue: 239
      },
      {
        red: -20,
        green: 0,
        blue: 0
      },
      {
        red: 0,
        green: 280,
        blue: 0
      },
      {
        red: 0,
        green: 187,
        blue: Infinity
      }
    ]

    for (let input of badInputs) {
      expect(() => convertRGBNumberToHex(input)).toThrow();
    }
  })
})

describe('changeHex', () => {
  it('will give known outputs for known inputs', () => {
    const correctInputs = [
      {
        color: '#abcdef',
        percent: 10,
        positive: true
      },
      {
        color: '#000000',
        percent: 10,
        positive: true
      },
      {
        color: '#abcdef',
        percent: 10,
        positive: false
      },
    ]
    const expected = [
      '#c5ffe7',
      '#1a1a1a',
      '#91d5b3'
    ]
  
    for (let i = 0; i < correctInputs.length; i++) {
      const val  = correctInputs[i]
      const result = expected[i]
      expect(changeHex(val.color, val.percent, val.positive)).toEqual(result)
    }
  })

  it('will return valid hex strings even if the value will be > 255 or < 0', () => {
    const inputs = [
      {
        color: '#ffffff',
        percent: 200,
        positive: true
      },
      {
        color: '#000000',
        percent: 200,
        positive: false
      }
    ]

    const expected = [
      '#ffffff',
      '#000'
    ]

    for (let i = 0; i < inputs.length; i++) {
      const val  = inputs[i]
      const result = expected[i]
      expect(changeHex(val.color, val.percent, val.positive)).toEqual(result)
    }
  })
})

describe('darken', () => {
  it('will return outputs less than the original values', () => {
    const res = darken('#ffffff', 10);
    const beforeAsnumber = convertHexToRGBNumber('#ffffff')
    const resAsNumber = convertHexToRGBNumber(res)
    expect(beforeAsnumber.red > resAsNumber.red).toBe(true)
    expect(beforeAsnumber.green > resAsNumber.green).toBe(true)
    expect(beforeAsnumber.blue > resAsNumber.blue).toBe(true)
  })
})

describe('lighten', () => {
  it('will return outputs greater than the original values', () => {
    const res = lighten('#000000', 10);
    const beforeAsnumber = convertHexToRGBNumber('#000000')
    const resAsNumber = convertHexToRGBNumber(res)
    expect(beforeAsnumber.red < resAsNumber.red).toBe(true)
    expect(beforeAsnumber.green < resAsNumber.green).toBe(true)
    expect(beforeAsnumber.blue < resAsNumber.blue).toBe(true)
  })
})
