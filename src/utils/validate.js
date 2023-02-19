export function isvalidUsername(str) {
  // const valid_map = ['admin', 'test']
  // return valid_map.indexOf(str.trim()) >= 0
  return str.trim().length>=3
}

/* 合法uri*/
export function validateURL(textval) {
  const urlregex = /^(https?|ftp):\/\/([a-zA-Z0-9.-]+(:[a-zA-Z0-9.&%$-]+)*@)*((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]?)(\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])){3}|([a-zA-Z0-9-]+\.)*[a-zA-Z0-9-]+\.(com|edu|gov|int|mil|net|org|biz|arpa|info|name|pro|aero|coop|museum|[a-zA-Z]{2}))(:[0-9]+)*(\/($|[a-zA-Z0-9.,?'\\+&%$#=~_-]+))*$/
  return urlregex.test(textval)
}

/* 大写字母*/
export function validateUpperCase(str) {
  const reg = /^[A-Z]+$/
  return reg.test(str)
}

/* 大小写字母*/
export function validatAlphabets(str) {
  const reg = /^[A-Za-z]+$/
  return reg.test(str)
}

export function negativeTurnZero (num) {
  return Number(num)<0?0:Number(num)
}

/**
 * 邮箱
 * @param {*} s
 */
export function isEmail (s) {
  return /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((.[a-zA-Z0-9_-]{2,3}){1,2})$/.test(s)
}

/**
 * 银行卡号
 * @param {*} s
 */
export function isBankCard (s) {
  return /^([1-9])(\d{15}|\d{18})$/.test(s)
}

/**
 * 手机号码
 * @param {*} s
 */
export function isMobile (s) {
  return /^[1][3,4,5,6,7,8,9][0-9]{9}$/.test(s)
}

/**
 * 电话号码
 * @param {*} s
 */
export function isPhone (s) {
  return /^([0-9]{3,4}-)?[0-9]{7,8}$/.test(s)
}

/**
 * URL地址
 * @param {*} s
 */
export function isURL (s) {
  return /^http[s]?:\/\/.*/.test(s)
}

/* 小写字母*/
export function validateLowerCase (str) {
  const reg = /^[a-z]+$/
  return reg.test(str)
}

/*验证pad还是pc*/
export const vaildatePc = function () {
  const userAgentInfo = navigator.userAgent;
  const Agents = ["Android", "iPhone",
    "SymbianOS", "Windows Phone",
    "iPad", "iPod"
  ];
  let flag = true;
  for (let v = 0; v < Agents.length; v++) {
    if (userAgentInfo.indexOf(Agents[v]) > 0) {
      flag = false;
      break;
    }
  }
  return flag;
}
/**
 * validate email
 * @param email
 * @returns {boolean}
 */
export function validateEmail (email) {
  const re = /^(([^<>()\\[\]\\.,;:\s@"]+(\.[^<>()\\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  return re.test(email)
}

/**
 * 判断身份证号码
 */
export function cardid (code) {
  let list = [];
  let result = true;
  let msg = '';
  var city = {
    11: "北京",
    12: "天津",
    13: "河北",
    14: "山西",
    15: "内蒙古",
    21: "辽宁",
    22: "吉林",
    23: "黑龙江 ",
    31: "上海",
    32: "江苏",
    33: "浙江",
    34: "安徽",
    35: "福建",
    36: "江西",
    37: "山东",
    41: "河南",
    42: "湖北 ",
    43: "湖南",
    44: "广东",
    45: "广西",
    46: "海南",
    50: "重庆",
    51: "四川",
    52: "贵州",
    53: "云南",
    54: "西藏 ",
    61: "陕西",
    62: "甘肃",
    63: "青海",
    64: "宁夏",
    65: "新疆",
    71: "台湾",
    81: "香港",
    82: "澳门",
    91: "国外 "
  };
  if (!validatenull(code)) {
    if (code.length == 18) {
      if (!code || !/(^\d{18}$)|(^\d{17}(\d|X|x)$)/.test(code)) {
        msg = "证件号码格式错误";
      } else if (!city[code.substr(0, 2)]) {
        msg = "地址编码错误";
      } else {
        //18位身份证需要验证最后一位校验位
        code = code.split('');
        //∑(ai×Wi)(mod 11)
        //加权因子
        var factor = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2];
        //校验位
        var parity = [1, 0, 'X', 9, 8, 7, 6, 5, 4, 3, 2, 'x'];
        var sum = 0;
        var ai = 0;
        var wi = 0;
        for (var i = 0; i < 17; i++) {
          ai = code[i];
          wi = factor[i];
          sum += ai * wi;
        }
        if (parity[sum % 11] != code[17]) {
          msg = "证件号码校验位错误";
        } else {
          result = false;
        }

      }
    } else {
      msg = "证件号码长度不为18位";
    }

  } else {
    msg = "证件号码不能为空";
  }
  list.push(result);
  list.push(msg);
  return list;
}
/**
 * 判断手机号码是否正确
 */
export function isvalidatemobile (phone) {
  let list = [];
  let result = true;
  let msg = '';
  if (!validatenull(phone)) {
    if (phone.length == 11) {
      if (!isMobile(phone)) {
        msg = '手机号码格式不正确';
      } else {
        result = false;
      }
    } else {
      msg = '手机号码长度应为11位';
    }
  } else {
    msg = '手机号码不能为空';
  }
  list.push(result);
  list.push(msg);
  return list;
}

/**
 * 判断密码 包含数字和字母 6-20位
 */
export function password (psw) {
  var reg = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,20}$/;
  return !reg.test(psw);
}
/**
 * 判断密码 包含8-20位字母、数字、特殊符号（/@$!%*#_~?&）全部包含的组合
 */
export function checkPassword(psw) {
  var reg = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[/@$!%*#_~?&])[a-zA-Z\d/@$!%*#_~?&]{8,20}$/
  return !reg.test(psw);
}
/**
 * 判断姓名是否正确
 */
export function validatename (name) {
  var regName = /^[\u4e00-\u9fa5]{2,4}$/;
  if (!regName.test(name)) return false;
  return true;
}
/**
 * 判断汉字长度
 */
export function checksum (chars) {
  var sum = 0;
  for (var i = 0; i < chars.length; i++) {
    if ((/[\u4e00-\u9fa5]/.test(chars[i]))) { //一个汉字是两个字符，字母和符号为1个字符
      sum += 2;
    }
    else {
      sum++;
    }
  }

  return sum;

}
/**
 * 判断是否为整数
 */
export function validatenumber (num) {
  return typeof (num) === 'number';
}
/**
 * 判断是否为整数
 */
export function validatenum (num, type) {
  let regName = /[^\d.]/g;
  if (type == 1) {
    if (!regName.test(num)) return false;
  } else if (type == 2) {
    regName = /[^\d]/g;
    if (!regName.test(num)) return false;
  }
  return true;
}
/**
 * 判断是否为小数
 */
export function validatenumord (num, type) {
  let regName = /[^\d.]/g;
  if (type == 1) {
    if (!regName.test(num)) return false;
  } else if (type == 2) {
    regName = /[^\d.]/g;
    if (!regName.test(num)) return false;
  }
  return true;
}
/**
 * 判断是否为空
 */
export function validatenull (val) {
  if (typeof val == 'boolean') {
    return false;
  }
  if (typeof val == 'number') {
    return false;
  }
  if (val instanceof Array) {
    if (val.length == 0) return true;
  } else if (val instanceof Object) {
    if (JSON.stringify(val) === '{}') return true;
  } else {
    if (val == 'null' || val == null || val == 'undefined' || val == undefined || val == '') return true;
    return false;
  }
  return false;
}


/*判断身份证*/
// 每位加权因子
var powers = ['7', '9', '10', '5', '8', '4', '2', '1', '6', '3', '7', '9', '10', '5', '8', '4', '2']

// 第18位校检码
var parityBit = ['1', '0', 'X', '9', '8', '7', '6', '5', '4', '3', '2']
var provinceAndCitys = { 11: '北京', 12: '天津', 13: '河北', 14: '山西', 15: '内蒙古', 21: '辽宁', 22: '吉林', 23: '黑龙江', 31: '上海', 32: '江苏', 33: '浙江', 34: '安徽', 35: '福建', 36: '江西', 37: '山东', 41: '河南', 42: '湖北', 43: '湖南', 44: '广东', 45: '广西', 46: '海南', 50: '重庆', 51: '四川', 52: '贵州', 53: '云南', 54: '西藏', 61: '陕西', 62: '甘肃', 63: '青海', 64: '宁夏', 65: '新疆', 71: '台湾', 81: '香港', 82: '澳门', 91: '国外' }

// 校验18位的身份证号码
export function check18IdCardNo (idCardNo) {
  if (validatenull(idCardNo)) { return true }

  // 18位身份证号码的基本格式校验
  var check = /^[1-9]\d{5}[1-9]\d{3}((0[1-9])|(1[0-2]))((0[1-9])|([1-2][0-9])|(3[0-1]))\d{3}(\d|x|X)$/.test(idCardNo)
  if (!check) return false
  // 校验地址码
  var addressCode = idCardNo.substring(0, 6)
  check = checkAddressCode(addressCode)
  if (!check) return false
  // 校验日期码
  var birDayCode = idCardNo.substring(6, 14)
  check = checkBirthDayCode(birDayCode)
  if (!check) return false
  // 验证校检码
  return checkParityBit(idCardNo)
}

// 校验地址码
function checkAddressCode (addressCode) {
  var check = /^[1-9]\d{5}$/.test(addressCode)
  if (!check) return false
  if (provinceAndCitys[parseInt(addressCode.substring(0, 2))]) {
    return true
  } else {
    return false
  }
}

// 校验日期码
function checkBirthDayCode (birDayCode) {
  var check = /^[1-9]\d{3}((0[1-9])|(1[0-2]))((0[1-9])|([1-2][0-9])|(3[0-1]))$/.test(birDayCode)
  if (!check) return false
  var yyyy = parseInt(birDayCode.substring(0, 4), 10)
  var mm = parseInt(birDayCode.substring(4, 6), 10)
  var dd = parseInt(birDayCode.substring(6), 10)
  var xdata = new Date(yyyy, mm - 1, dd)
  if (xdata > new Date()) {
    return false
  } else if ((xdata.getFullYear() === yyyy) && (xdata.getMonth() === mm - 1) && (xdata.getDate() === dd)) {
    return true
  } else {
    return false
  }
}

// 验证校检码
function checkParityBit (idCardNo) {
  var parityBit = idCardNo.charAt(17).toUpperCase()
  if (getParityBit(idCardNo) === parityBit) {
    return true
  } else {
    return false
  }
}

// 计算校检码
function getParityBit (idCardNo) {
  var id17 = idCardNo.substring(0, 17)
  // 加权
  var power = 0
  for (let i = 0; i < 17; i++) {
    power += parseInt(id17.charAt(i), 10) * parseInt(powers[i])
  }
  // 取模
  var mod = power % 11
  return parityBit[mod]
}

// 验证excel文件格式
export function isExcel (file) {
  const isXlsx =
    file.type ===
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" ||
    file.type === "application/vnd.ms-excel" ||
    file.type === "application/x-excel" ||
    file.name.indexOf("xls") > -1 ||
    file.name.indexOf("xlsx") > -1;

  return isXlsx;
}

//验证word文件格式
export function isWord (file) {
  const isWord =
    file.type ===
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document" ||
    file.name.indexOf("doc") > -1 ||
    file.name.indexOf("docx") > -1;
  return isWord;
}
/* eslint-disable */
//统一社会信用代码
var firstarray = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
var firstkeys = [3, 7, 9, 10, 5, 8, 4, 2];
var secondarray = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'J', 'K', 'L', 'M', 'N', 'P', 'Q', 'R', 'T', 'U', 'W', 'X', 'Y'];
var secondkeys = [1, 3, 9, 27, 19, 26, 16, 17, 20, 29, 25, 13, 8, 24, 10, 30, 28];
var calc = function (code, array1, array2, b) {
  var count = 0;
  for (var i = 0; i < array2.length; i++) {
    var a = code[i];
    count += array2[i] * array1.indexOf(a);
  }
  var remainder = count % b;
  return remainder === 0 ? 0 : b - remainder;
}
export function Tyshyxdm (str) {
  var code = str.toUpperCase();

  /*
  统一社会信用代码由十八位的阿拉伯数字或大写英文字母（不使用I、O、Z、S、V）组成。
   第1位：登记管理部门代码（共一位字符）
   第2位：机构类别代码（共一位字符）
   第3位~第8位：登记管理机关行政区划码（共六位阿拉伯数字）
   第9位~第17位：主体标识码（组织机构代码）（共九位字符）
   第18位：校验码​（共一位字符）
  */
  if (code.length != 18) {
    return false;
  }
  var reg = /^\w\w\d{6}\w{9}\w$/;
  if (!reg.test(code)) {
    return false;
  }
  /*
   登记管理部门代码：使用阿拉伯数字或大写英文字母表示。​
   机构编制：1​
   民政：5​
   工商：9​
   其他：Y
   */
  reg = /^[1,5,9,Y]\w\d{6}\w{9}\w$/;
  if (!reg.test(code)) {
    return false;
  }
  /*
   机构类别代码：使用阿拉伯数字或大写英文字母表示。​
   机构编制机关：11打头​​
   机构编制事业单位：12打头​
   机构编制中央编办直接管理机构编制的群众团体：13打头​​
   机构编制其他：19打头​
   民政社会团体：51打头​
   民政民办非企业单位：52打头​
   民政基金会：53打头​
   村委会级：55打头​
   民政其他：59打头​
   工商企业：91打头​
   工商个体工商户：92打头​
   工商农民专业合作社：93打头​
   其他：Y1打头​
   */
  reg = /^(11|12|13|19|51|52|53|55|59|91|92|93|Y1)\d{6}\w{9}\w$/;
  if (!reg.test(code)) {
    return false;
  }
  /*
   登记管理机关行政区划码：只能使用阿拉伯数字表示。按照GB/T 2260编码。​
   例如：四川省成都市本级就是510100；四川省自贡市自流井区就是510302。​
  */
  reg = /^(11|12|13|19|51|52|53|55|59|91|92|93|Y1)\d{6}\w{9}\w$/;
  if (!reg.test(code)) {
    return false;
  }
  /*
       主体标识码（组织机构代码）：使用阿拉伯数字或英文大写字母表示。按照GB 11714编码。
       在实行统一社会信用代码之前，以前的组织机构代码证上的组织机构代码由九位字符组成。格式为XXXXXXXX-Y。前面八位被称为“本体代码”；最后一位被称为“校验码”。校验码和本体代码由一个连字号（-）连接起来。以便让人很容易的看出校验码。但是三证合一后，组织机构的九位字符全部被纳入统一社会信用代码的第9位至第17位，其原有组织机构代码上的连字号不带入统一社会信用代码。
       原有组织机构代码上的“校验码”的计算规则是：​
       例如：某公司的组织机构代码是：59467239-9。那其最后一位的组织机构代码校验码9是如何计算出来的呢？
       第一步：取组织机构代码的前八位本体代码为基数。5 9 4 6 7 2 3 9
       提示：如果本体代码中含有英文大写字母。则A的基数是10，B的基数是11，C的基数是12，依此类推，直到Z的基数是35。
       第二步：​​取加权因子数值。因为组织机构代码的本体代码一共是八位字符。则这八位的加权因子数值从左到右分别是：3、7、9、10、5、8、4、2。​
       第三步：本体代码基数与对应位数的因子数值相乘。​
       5×3＝15，9×7＝63，4×9＝36，6×10＝60，
       7×5＝35，2×8＝16，3×4=12，9×2＝18​​
       第四步：将乘积求和相加。​
       15+63+36+60+35+16+12+18=255
       第五步：​将和数除以11，求余数。​​
       255÷11=33，余数是2。​​
    */
  var firstkey = calc(code.substr(8), firstarray, firstkeys, 11);
  /*
   第六步：用阿拉伯数字11减去余数，得求校验码的数值。当校验码的数值为10时，校验码用英文大写字母X来表示；当校验码的数值为11时，校验码用0来表示；其余求出的校验码数值就用其本身的阿拉伯数字来表示。​
   11-2＝9，因此此公司完整的组织机构代码为 59467239-9。​​
  */
  var firstword;
  if (firstkey < 10) {
    firstword = firstkey;
  }
  if (firstkey == 10) {
    firstword = 'X';
  } else if (firstkey == 11) {
    firstword = '0';
  }
  if (firstword != code.substr(16, 1)) {
    return false;
  }

  /*
       校验码：使用阿拉伯数字或大写英文字母来表示。校验码的计算方法参照 GB/T 17710。
       例如：某公司的统一社会信用代码为91512081MA62K0260E，那其最后一位的校验码E是如何计算出来的呢？
       第一步：取统一社会信用代码的前十七位为基数。9 1 5 1 2 0 8 1 21 10 6 2 19 0 2 6 0提示：如果前十七位统一社会信用代码含有英文大写字母（不使用I、O、Z、S、V这五个英文字母）。则英文字母对应的基数分别为：A=10、B=11、C=12、D=13、E=14、F=15、G=16、H=17、J=18、K=19、L=20、M=21、N=22、P=23、Q=24、R=25、T=26、U=27、W=28、X=29、Y=30​
       第二步：​​取加权因子数值。因为统一社会信用代码前面前面有十七位字符。则这十七位的加权因子数值从左到右分别是：1、3、9、27、19、26、16、17、20、29、25、13、8、24、10、30、2​8
       第三步：基数与对应位数的因子数值相乘。​
       9×1=9，1×3=3，5×9=45，1×27=27，2×19=38，0×26=0，8×16=128​
       1×17=17，21×20=420，10×29=290，6×25=150，2×13=26，19×8=152​
       0×23=0，2×10=20，6×30=180，0×28=0
       第四步：将乘积求和相加。​9+3+45+27+38+0+128+17+420+290+150+26+152+0+20+180+0=1495
       第五步：​将和数除以31，求余数。​​
       1495÷31=48，余数是17。​​
  */

  var secondkey = calc(code, secondarray, secondkeys, 31);
  /*
   第六步：用阿拉伯数字31减去余数，得求校验码的数值。当校验码的数值为0~9时，就直接用该校验码的数值作为最终的统一社会信用代码的校验码；如果校验码的数值是10~30，则校验码转换为对应的大写英文字母。对应关系为：A=10、B=11、C=12、D=13、E=14、F=15、G=16、H=17、J=18、K=19、L=20、M=21、N=22、P=23、Q=24、R=25、T=26、U=27、W=28、X=29、Y=30
   因为，31-17＝14，所以该公司完整的统一社会信用代码为 91512081MA62K0260E。​​
  */
  var secondword = secondarray[secondkey];
  if (!secondword || secondword != code.substr(17, 1)) {
    return false;
  }
  var word = code.substr(0, 16) + firstword + secondword;
  if (code != word) {
    return false;
  }
  return true;
}

export function limitInput100(input) {
  let value = String(input);
  console.log(value, "限制0-100");
  // 替换非数字
  value = value.replace(/[^\d]/g, "");
  if (value.indexOf(".") < 0 && value != "") {
    value = parseFloat(value);
    if (value > 100) {
      value = 100;
    }
    if (value < 1) {
      value = 1;
    }
  }
  return value;
}

export function limitInputPrice(value) {
  value = value.replace(/[^\d.]/g, ""); //清除“数字”和“.”以外的字符
  value = value.replace(/\.{2,}/g, "."); //只保留第一个. 清除多余的
  value = value.replace(".", "$#$").replace(/\./g, "").replace("$#$", ".");
  value = value.replace(/^(-)*(\d+)\.(\d\d).*$/, "$1$2.$3"); //只能输入两个小数
  if (value.indexOf(".") < 0 && value != "") {
    //以上已经过滤，此处控制的是如果没有小数点，首位不能为类似于 01、02的金额
    value = parseFloat(value);
    if (value < 0) {
      value = 0;
    }
    if (value > 99999) {
      value = 99999.0;
    }
  }
  return value;
}
