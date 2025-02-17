module.exports = {
  // 版本更新前的钩子
  beforeVersionUpdate: null,
  // 版本更新后的钩子
  afterVersionUpdate: null,
  // 发布前的钩子
  beforePublish: null,
  // 发布后的钩子
  afterPublish: null,
  // 是否运行测试
  runTest: false,
  // 是否运行构建
  runBuild: true,
  // 是否发布到 npm
  publishToNpm: true,
  // 是否创建 git tag
  createGitTag: true,
  // 是否推送到远程
  pushToRemote: true,
  // 自定义构建命令
  buildCommand: 'npm run build',
  // 自定义测试命令
  testCommand: 'npm test',
  // 发布命令
  publishCommand: 'npm publish',
  // 提交信息模板
  commitMessageTemplate: 'chore: release {version}',
  // tag 信息模板
  tagMessageTemplate: 'Release {version}',
  // 要提交的文件（如果为 null 或非数组则提交所有更改）
  filesToAdd: null,
  // 是否允许自定义提交信息
  allowCustomCommitMessage: true,
  // 是否允许自定义标签信息
  allowCustomTagMessage: true,
  // 是否是试运行模式
  dryRun: false,
  // 是否使用默认选项（不询问确认）
  useDefaults: false,
  // 包管理器类型 ('npm' | 'pnpm')
  packageManager: 'pnpm',
  // 自定义命令配置
  customCommands: {
    // 测试前执行的命令
    beforeTest: [],
    // 测试后执行的命令
    afterTest: [],
    // 构建前执行的命令
    beforeBuild: [
      'npm run lint:fix',
      'npm run format'
    ],
    // 构建后执行的命令
    afterBuild: [],
    // 提交前执行的命令
    beforeCommit: [],
    // 提交后执行的命令
    afterCommit: [],
    // 标签创建前执行的命令
    beforeTag: [],
    // 标签创建后执行的命令
    afterTag: [],
    // 推送前执行的命令
    beforePush: [],
    // 推送后执行的命令
    afterPush: [],
    // 发布前执行的命令
    beforePublish: [],
    // 发布后执行的命令
    afterPublish: []
  }
};