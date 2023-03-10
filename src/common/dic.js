//审核优先级
export const prioritysMap = [
  {value: '1',label: '正常'},
  {value: '2',label: '重要'},
  {value: '3',label: '紧急'},
];
//审批类型
export const applyTypesMap = [
  {value: '1',label: '报销单'},
  {value: '2',label: '付款申请单'},
  {value: '3',label: '预付款项报账单'},
  {value: '4',label: '采购计划审批单'},
  {value: '5',label: '合同会签'},
  {value: '6',label: '工程项目付款审批单'},
];
//审批状态
export const processStatusMap = [
  {value: '1',label: '审核中', type: ''},
  {value: '2',label: '审核结束', type: 'success'},
  {value: '3',label: '审核驳回', type: 'warning'},
  {value: '4',label: '审核撤销', type: 'danger'},
];
//费用科目
export const reimCourseOptions = [
  {
    value: 'office',
    label: '办公室费用',
    children:[
      {
        value: 'travel',
        label: '差旅费',
      }
    ]
  },
  {
    value: 'forThree',
    label: '第三方采购费',
    children:[
      {
        value: 'buy',
        label: '采购费',
      },
      {
        value: 'outPay',
        label: '外包费',
      }
    ]
  },
  {
    value: 'forManage',
    label: '管理费用',
    children:[
      {
        value: 'house',
        label: '房租',
      },
      {
        value: 'warter',
        label: '水费',
      },
      {
        value: 'print',
        label: '印刷费',
      },
      {
        value: 'electric',
        label: '电费',
      }
    ]
  },
  {
    value: 'forPromise',
    label: '投标保证金',
    children:[
      {
        value: 'promise',
        label: '投标保证金',
      },
    ]
  },
  {
    value: 'forSale',
    label: '销售费用',
    children:[
      {
        value: 'oil',
        label: '油费',
      },
      {
        value: 'trafic',
        label: '交通费',
      },
      {
        value: 'serve',
        label: '招待费',
      },
    ]
  },
  {
    value: 'forAdvance',
    label: '预付款',
    children:[
      {
        value: 'advance',
        label: '预付款',
      },
    ]
  },
]
//报账类型
export const reimburseTypeMap = [
  {value: '1',label: '发票'},
  {value: '2',label: '实物收据'},
  {value: '3',label: '提货单'},
  {value: '4',label: '送货单'},
  {value: '5',label: '发货单'},
  {value: '6',label: '运单'},
  {value: '99',label: '其它'},
];
//付款方式
export const payTypeMap = [
  {value: '1',label: '银行转账'},
];
//商品单位
export const goodsUnitMap = [
  {value: '个',label: '个'},
  {value: '块',label: '块'},
  {value: '瓶',label: '瓶'},
  {value: '桶',label: '桶'},
  {value: '米',label: '米'},
  {value: '升',label: '升'},
];
