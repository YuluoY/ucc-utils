export interface ConvertRoutesToLevelOptions {
  fld?: string // 关联字段
  glFld?: string // 子关联字段
  childFld?: string // 子节点字段
  isJudgeType?: boolean // 是否判断类型
  isChangeOwner?: boolean // 是否改变自己
}
