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
        value: 'travel',
        label: '采购费',
      },
      {
        value: 'travel',
        label: '外包费',
      }
    ]
  },
  {
    value: 'forThree',
    label: '管理费用',
    children:[
      {
        value: 'travel',
        label: '房租',
      },
      {
        value: 'travel',
        label: '水费',
      },
      {
        value: 'travel',
        label: '印刷费',
      },
      {
        value: 'travel',
        label: '电费',
      }
    ]
  },
  {
    value: 'forThree',
    label: '投标保证金',
    children:[
      {
        value: 'travel',
        label: '投标保证金',
      },
    ]
  },
  {
    value: 'forThree',
    label: '销售费用',
    children:[
      {
        value: 'travel',
        label: '油费',
      },
      {
        value: 'travel',
        label: '交通费',
      },
      {
        value: 'travel',
        label: '招待费',
      },
    ]
  },
  {
    value: 'forThree',
    label: '预付款',
    children:[
      {
        value: 'travel',
        label: '预付款',
      },
    ]
  },
]
