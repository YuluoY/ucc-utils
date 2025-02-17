#!/usr/bin/env node

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');
const readline = require('readline');
const semver = require('semver');

// 执行自定义命令
const executeCustomCommands = async (commands, stage) => {
  if (!commands || !Array.isArray(commands) || commands.length === 0) {
    return;
  }

  console.log(`执行 ${stage} 阶段的自定义命令...`);
  for (const command of commands) {
    if (typeof command !== 'string' || !command.trim()) {
      continue;
    }
    
    try {
      console.log(`执行命令: ${command}`);
      if (config.dryRun) {
        console.log(`[试运行] 将要执行: ${command}`);
      } else {
        execCommand(command, `执行自定义命令失败: ${command}`);
      }
    } catch (error) {
      console.error(`执行自定义命令失败: ${command}`);
      throw error;
    }
  }
};

// 解析命令行参数
const argv = process.argv.slice(2);
const helpText = `
发布新版本

用法:
  npm run release [选项] [版本类型]

选项:
  -h, --help     显示帮助信息
  -y, --yes      使用默认选项，不询问确认
  -d, --dry-run  试运行，不实际执行发布操作

版本类型:
  major         主版本号 (1.0.0 -> 2.0.0)
  minor         次版本号 (1.0.0 -> 1.1.0)
  patch         补丁版本 (1.0.0 -> 1.0.1)

示例:
  npm run release patch      # 发布补丁版本
  npm run release -y minor   # 发布次版本，使用默认选项
  npm run release -d         # 试运行，查看将要执行的操作
`;

// 解析命令行选项
const parseArgs = () => {
  const options = {
    help: false,
    yes: false,
    dryRun: false,
    versionType: null
  };

  for (let i = 0; i < argv.length; i++) {
    const arg = argv[i];
    switch (arg) {
      case '-h':
      case '--help':
        options.help = true;
        break;
      case '-y':
      case '--yes':
        options.yes = true;
        break;
      case '-d':
      case '--dry-run':
        options.dryRun = true;
        break;
      case 'major':
      case 'minor':
      case 'patch':
        options.versionType = arg;
        break;
      default:
        console.error(`未知选项: ${arg}`);
        process.exit(1);
    }
  }

  return options;
};

// 获取 package.json 路径和内容
const packagePath = path.resolve(process.cwd(), 'package.json');

// 保存原始的 package.json 内容
let originalPackageJson = null;

// 读取 package.json 内容（清除缓存）
const readPackageJson = () => {
  delete require.cache[require.resolve(packagePath)];
  return require(packagePath);
};

// 保存 package.json 内容
const writePackageJson = (content) => {
  fs.writeFileSync(packagePath, JSON.stringify(content, null, 2) + '\n', 'utf8');
};

// 初始化：读取并保存原始 package.json 内容
try {
  originalPackageJson = JSON.parse(JSON.stringify(readPackageJson()));
} catch (error) {
  console.error('读取 package.json 失败:', error.message);
  process.exit(1);
}

// 检查工作目录是否干净
const isWorkingDirectoryClean = () => {
  try {
    const status = execSync('git status --porcelain', { stdio: 'pipe' }).toString().trim();
    return status === '';
  } catch (error) {
    console.error('检查工作目录状态失败:', error.message);
    return false;
  }
};

// 检查是否在 git 仓库中
const isGitRepository = () => {
  try {
    execSync('git rev-parse --is-inside-work-tree', { stdio: 'pipe' });
    return true;
  } catch (error) {
    return false;
  }
};

// 检查是否有远程仓库
const hasRemoteRepository = () => {
  try {
    const remotes = execSync('git remote', { stdio: 'pipe' }).toString().trim();
    return remotes !== '';
  } catch (error) {
    return false;
  }
};

let package = readPackageJson();

// 从 package.json 中获取版本号前缀
const getVersionPrefix = () => {
  const version = package.version || '';
  const match = version.match(/^[^\d]*/);
  return match ? match[0] : 'v';
};

// 获取版本号格式化函数
const formatVersion = (version) => {
  const prefix = getVersionPrefix();
  // 如果版本号已经包含前缀，则直接返回
  if (version.startsWith(prefix)) {
    return version;
  }
  // 否则添加前缀
  return `${prefix}${version}`;
};

// 默认配置
const defaultConfig = {
  // 版本更新前的钩子
  beforeVersionUpdate: null,
  // 版本更新后的钩子
  afterVersionUpdate: null,
  // 发布前的钩子
  beforePublish: null,
  // 发布后的钩子
  afterPublish: null,
  // 是否运行测试
  runTest: true,
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
  filesToAdd: ['package.json'],
  // 版本号前缀（从 package.json 中获取）
  versionPrefix: getVersionPrefix(),
  // 是否允许自定义提交信息
  allowCustomCommitMessage: true,
  // 是否允许自定义标签信息
  allowCustomTagMessage: true,
  // 是否是试运行模式
  dryRun: false,
  // 是否使用默认选项（不询问确认）
  useDefaults: false,
  // 包管理器类型 ('npm' | 'pnpm')
  packageManager: 'npm',
};

// 尝试加载用户配置
const userConfigPath = path.resolve(process.cwd(), 'release.config.js');
let userConfig = {};

if (fs.existsSync(userConfigPath)) {
  try {
    userConfig = require(userConfigPath);
    console.log('已加载发布配置文件:', userConfigPath);
  } catch (error) {
    console.error('加载发布配置文件失败:', error.message);
    process.exit(1);
  }
}

// 根据包管理器类型获取锁定文件
const getLockFile = (packageManager) => {
  switch (packageManager) {
    case 'pnpm':
      return 'pnpm-lock.yaml';
    case 'npm':
      return 'package-lock.json';
    default:
      console.warn(`警告: 未知的包管理器类型 "${packageManager}"，将使用 npm`);
      return 'package-lock.json';
  }
};

// 合并配置，确保用户配置优先级更高
const config = { ...defaultConfig, ...userConfig };

// 添加锁定文件到 filesToAdd（仅当 filesToAdd 是数组时）
const lockFile = getLockFile(config.packageManager);
if (Array.isArray(config.filesToAdd) && !config.filesToAdd.includes(lockFile)) {
  config.filesToAdd.push(lockFile);
}

// 根据包管理器类型调整命令
if (config.packageManager === 'pnpm') {
  config.buildCommand = config.buildCommand.replace(/^npm/, 'pnpm');
  config.testCommand = config.testCommand.replace(/^npm/, 'pnpm');
  config.publishCommand = config.publishCommand.replace(/^npm/, 'pnpm');
}

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const question = (query) => new Promise((resolve) => rl.question(query, resolve));

// 检查 npm 登录状态
const checkNpmLogin = () => {
  if (!config.publishToNpm) return true;
  
  try {
    const whoami = execSync('npm whoami', { stdio: 'pipe' }).toString().trim();
    console.log(`当前登录的 npm 用户: ${whoami}`);
    return true;
  } catch (error) {
    console.error('错误: 您尚未登录 npm！');
    console.log('请先运行 npm login 进行登录。');
    process.exit(1);
  }
};

// 执行命令并处理错误
const execCommand = (command, errorMessage) => {
  if (config.dryRun) {
    console.log(`[试运行] 将要执行: ${command}`);
    return true;
  }

  try {
    execSync(command, { stdio: 'inherit' });
    return true;
  } catch (error) {
    console.error(errorMessage || `执行命令失败: ${command}`);
    throw error;
  }
};

// 回滚所有更改
const rollback = async (oldVersion, newVersion, step) => {
  console.log('\n开始回滚更改...');
  
  const rollbackSteps = {
    // 回滚远程更改
    async push() {
      console.log('正在回滚远程更改...');
      try {
        if (config.pushToRemote) {
          await execSync('git push --force origin HEAD~1', { stdio: 'inherit' });
          console.log('✓ 远程提交已回滚');
        }
        if (config.createGitTag) {
          await execSync(`git push origin :refs/tags/${config.versionPrefix}${newVersion}`, { stdio: 'pipe' });
          console.log('✓ 远程标签已删除');
        }
        return true;
      } catch (error) {
        console.error('回滚远程更改失败:', error.message);
        return false;
      }
    },
    
    // 回滚标签
    async tag() {
      console.log('正在删除 Git 标签...');
      try {
        if (config.createGitTag) {
          await execSync(`git tag -d ${config.versionPrefix}${newVersion}`, { stdio: 'pipe' });
          console.log('✓ 本地标签已删除');
        }
        return true;
      } catch (error) {
        if (error.message.includes('not found')) {
          console.log('标签不存在，无需删除');
          return true;
        }
        console.error('删除标签失败:', error.message);
        return false;
      }
    },
    
    // 回滚提交
    async commit() {
      console.log('正在回滚 Git 提交...');
      try {
        await execSync('git reset --hard HEAD~1', { stdio: 'inherit' });
        console.log('✓ 本地提交已回滚');
        return true;
      } catch (error) {
        if (error.message.includes('HEAD~1')) {
          console.log('没有提交需要回滚');
          return true;
        }
        console.error('回滚提交失败:', error.message);
        return false;
      }
    }
  };

  // 根据失败的步骤确定需要回滚的操作
  const stepsToRollback = [];
  switch (step) {
    case 'push':
      stepsToRollback.push('push');
    case 'tag':
      stepsToRollback.push('tag');
    case 'commit':
      stepsToRollback.push('commit');
      break;
    case 'build':
    case 'version':
    case 'test':
      // 这些步骤不需要特殊的回滚操作
      break;
  }

  // 按顺序执行回滚操作（不需要 reverse，保持原有顺序）
  const results = [];
  for (const stepName of stepsToRollback) {
    const success = await rollbackSteps[stepName]();
    results.push({ step: stepName, success });
  }

  // 最后，如果 git 操作都成功了，再写回原始的 package.json
  if (!results.some(r => !r.success)) {
    console.log('正在恢复 package.json...');
    try {
      // 强制同步写入文件
      fs.writeFileSync(packagePath, JSON.stringify(originalPackageJson, null, 2) + '\n', { encoding: 'utf8', flag: 'w' });
      // 强制清除 require 缓存
      delete require.cache[require.resolve(packagePath)];
      // 等待文件系统完成写入
      fs.fsyncSync(fs.openSync(packagePath, 'r+'));
      
      console.log('✓ 版本号已恢复到', originalPackageJson.version);
      // 重新加载 package.json
      package = readPackageJson();
      
      // 验证版本号是否正确恢复
      if (package.version !== originalPackageJson.version) {
        throw new Error(`版本号未正确恢复，当前: ${package.version}，应为: ${originalPackageJson.version}`);
      }
    } catch (error) {
      console.error('恢复 package.json 失败:', error.message);
      results.push({ step: 'restore_package', success: false });
    }
  }

  // 汇总回滚结果
  console.log('\n回滚操作完成');
  const failedSteps = results.filter(r => !r.success);
  
  if (failedSteps.length > 0) {
    console.error('\n以下步骤回滚失败，请手动检查:');
    failedSteps.forEach(({ step }) => {
      switch (step) {
        case 'push':
          console.error(`- 远程仓库的提交和标签 (${config.versionPrefix}${newVersion})`);
          break;
        case 'tag':
          console.error(`- Git 标签 ${config.versionPrefix}${newVersion}`);
          break;
        case 'commit':
          console.error('- 本地 Git 提交');
          break;
      }
    });
  } else {
    console.log('✨ 所有更改已成功回滚');
  }
};

// 确认操作
const confirm = async (message) => {
  if (config.useDefaults) return true;
  const answer = await question(`${message} (y/N): `);
  return answer.toLowerCase() === 'y';
};

const updateVersion = async () => {
  const args = parseArgs();

  // 显示帮助信息
  if (args.help) {
    console.log(helpText);
    process.exit(0);
  }

  // 更新配置
  config.dryRun = args.dryRun;
  config.useDefaults = args.yes;

  // 检查是否在 git 仓库中
  if (!isGitRepository()) {
    console.error('错误: 当前目录不是 git 仓库！');
    process.exit(1);
  }

  // 检查是否有远程仓库
  if (config.pushToRemote && !hasRemoteRepository()) {
    console.error('错误: 未配置 git 远程仓库！');
    process.exit(1);
  }

  // 首先检查 npm 登录状态
  checkNpmLogin();

  // 重新读取 package.json 以确保获取最新版本
  package = readPackageJson();
  let newVersion = '';

  if (!package.version) {
    console.error('错误: package.json 中未找到版本号！');
    process.exit(1);
  }

  let type = args.versionType;
  if (!type) {
    console.log('当前版本:', package.version);
    console.log('请选择要更新的版本类型:');
    console.log('1. major (主版本)');
    console.log('2. minor (次版本)');
    console.log('3. patch (补丁版本)');

    const answer = await question('请输入选项 (1-3): ');
    type = ['major', 'minor', 'patch'][parseInt(answer) - 1];
  }

  if (!type) {
    console.error('无效的版本类型！');
    process.exit(1);
  }

  // 预览将要更新的版本号（不实际修改文件）
  const previewVersion = semver.inc(package.version, type);
  
  console.log(`\n将要进行的更改:`);
  console.log(`- 版本号: ${package.version} -> ${previewVersion}`);
  console.log(`- 测试: ${config.runTest ? '是' : '否'}`);
  console.log(`- 构建: ${config.runBuild ? '是' : '否'}`);
  console.log(`- 创建 Git 标签: ${config.createGitTag ? '是' : '否'}`);
  console.log(`- 推送到远程: ${config.pushToRemote ? '是' : '否'}`);
  console.log(`- 发布到 npm: ${config.publishToNpm ? '是' : '否'}`);

  if (!config.useDefaults && !await confirm('\n确认继续？')) {
    console.log('操作已取消');
    process.exit(0);
  }

  try {
    // 执行版本更新前的钩子
    if (config.beforeVersionUpdate) {
      await config.beforeVersionUpdate(package.version);
    }

    // 1. 首先运行测试
    if (config.runTest) {
      console.log('正在运行测试...');
      try {
        execCommand(config.testCommand, '测试失败');
      } catch (error) {
        console.error('测试失败，终止发布流程');
        process.exit(1);
      }
    }

    // 2. 更新版本号
    console.log('正在更新版本号...');
    try {
      execCommand(`npm version ${type} --no-git-tag-version`, '版本号更新失败');
    } catch (error) {
      throw { step: 'version', error };
    }
    
    // 重新读取更新后的 package.json
    package = readPackageJson();
    newVersion = package.version;

    if (!newVersion) {
      throw { step: 'version', error: new Error('版本更新失败：无法获取新版本号') };
    }

    // 执行版本更新后的钩子
    if (config.afterVersionUpdate) {
      await config.afterVersionUpdate(newVersion);
    }
    
    // 3. 构建项目
    if (config.runBuild) {
      console.log('正在构建项目...');
      try {
        execCommand(config.buildCommand, '构建失败');
        // 等待一段时间确保文件系统完成写入
        await new Promise(resolve => setTimeout(resolve, 1000));
      } catch (error) {
        throw { step: 'build', error };
      }
    }

    // 4. 提交变更
    console.log('提交版本变更...');
    try {
      // 检查 filesToAdd 的值
      if (!config.filesToAdd || !Array.isArray(config.filesToAdd)) {
        // 如果 filesToAdd 为 null 或不是数组，则提交所有更改
        console.log('将提交所有已修改的文件...');
        // 先检查是否有未跟踪的文件
        const status = execSync('git status --porcelain', { stdio: 'pipe' }).toString().trim();
        if (status) {
          console.log('检测到以下文件变更:');
          console.log(status.split('\n').map(line => `  ${line}`).join('\n'));
        }
        execCommand('git add -A', 'git add 失败');
      } else {
        // 否则只提交指定的文件
        console.log('将提交以下文件:', config.filesToAdd.join(', '));
        execCommand(`git add ${config.filesToAdd.join(' ')}`, 'git add 失败');
      }
      
      const formattedVersion = formatVersion(newVersion);
      let commitMessage = config.commitMessageTemplate.replace('{version}', formattedVersion);
      if (config.allowCustomCommitMessage) {
        const customMessage = await question('请输入提交信息 (直接回车使用默认信息):\n');
        if (customMessage.trim()) {
          commitMessage = customMessage;
        }
      }
      execCommand(`git commit -m "${commitMessage}"`, 'git commit 失败');

      // 检查是否还有未提交的更改
      const remainingStatus = execSync('git status --porcelain', { stdio: 'pipe' }).toString().trim();
      if (remainingStatus) {
        console.log('检测到还有未提交的文件变更:');
        console.log(remainingStatus.split('\n').map(line => `  ${line}`).join('\n'));
        
        // 再次提交所有更改
        execCommand('git add -A', '第二次 git add 失败');
        execCommand(`git commit -m "chore: additional changes for ${formattedVersion}"`, '第二次 git commit 失败');
      }
    } catch (error) {
      throw { step: 'commit', error };
    }

    // 5. 创建 Git 标签
    if (config.createGitTag) {
      console.log('创建 Git 标签...');
      try {
        const formattedVersion = formatVersion(newVersion);
        let tagMessage = config.tagMessageTemplate.replace('{version}', formattedVersion);
        if (config.allowCustomTagMessage) {
          const customTagMessage = await question('请输入标签信息 (直接回车使用默认信息):\n');
          if (customTagMessage.trim()) {
            tagMessage = customTagMessage;
          }
        }
        execCommand(
          `git tag -a ${config.versionPrefix}${newVersion} -m "${tagMessage}"`,
          'git tag 创建失败'
        );
      } catch (error) {
        throw { step: 'tag', error };
      }
    }

    // 6. 推送到远程
    if (config.pushToRemote) {
      console.log('推送到远程仓库...');
      try {
        // 执行推送前的自定义命令
        await executeCustomCommands(config.customCommands?.beforePush, '推送前');
        
        const currentBranch = getCurrentBranch();
        console.log(`当前分支: ${currentBranch}`);
        
        // 安全推送
        await safePush(currentBranch);
        
        // 如果需要推送标签
        if (config.createGitTag) {
          console.log('推送标签...');
          await safePushTags();
        }
        
        // 执行推送后的自定义命令
        await executeCustomCommands(config.customCommands?.afterPush, '推送后');
      } catch (error) {
        throw { step: 'push', error };
      }
    }

    // 7. 发布到 npm
    if (config.publishToNpm) {
      console.log('正在发布到 npm...');
      try {
        execCommand(config.publishCommand, 'npm 发布失败');
      } catch (error) {
        throw { step: 'publish', error };
      }
    }

    if (config.dryRun) {
      console.log('\n✨ 试运行完成，以上是将要执行的操作');
    } else {
      console.log(`\n✨ 成功发布版本 ${formatVersion(newVersion)}`);
    }
  } catch (error) {
    console.error('\n发布过程中出现错误:', error.error ? error.error.message : error.message);
    
    if (newVersion && !config.dryRun) {
      // 使用保存的原始版本号进行回滚
      await rollback(package.version, newVersion, error.step);
    }
    
    process.exit(1);
  }
};

// 优雅退出
process.on('SIGINT', () => {
  console.log('\n操作已取消');
  process.exit(0);
});

// 获取当前分支名
const getCurrentBranch = () => {
  try {
    return execSync('git rev-parse --abbrev-ref HEAD', { stdio: 'pipe' }).toString().trim();
  } catch (error) {
    console.error('获取当前分支失败:', error.message);
    throw error;
  }
};

// 检查远程分支是否存在
const checkRemoteBranch = (branch) => {
  try {
    execSync(`git ls-remote --heads origin ${branch}`, { stdio: 'pipe' });
    return true;
  } catch (error) {
    return false;
  }
};

// 检查是否有未拉取的更改
const checkRemoteChanges = (branch) => {
  try {
    execSync('git fetch origin', { stdio: 'pipe' });
    const localCommit = execSync('git rev-parse HEAD', { stdio: 'pipe' }).toString().trim();
    const remoteCommit = execSync(`git rev-parse origin/${branch}`, { stdio: 'pipe' }).toString().trim();
    return localCommit !== remoteCommit;
  } catch (error) {
    return false;
  }
};

// 安全的 git push 操作
const safePush = async (branch) => {
  // 检查是否有远程仓库
  if (!hasRemoteRepository()) {
    throw new Error('未配置 git 远程仓库！');
  }

  // 检查远程分支是否存在
  const remoteBranchExists = checkRemoteBranch(branch);
  
  if (remoteBranchExists) {
    // 检查是否有未拉取的更改
    const hasRemoteChanges = checkRemoteChanges(branch);
    
    if (hasRemoteChanges) {
      console.log('检测到远程有新的更改，正在尝试合并...');
      try {
        // 先尝试拉取最新代码
        execCommand('git pull --rebase origin ' + branch, 'git pull 失败');
      } catch (error) {
        throw new Error(`无法合并远程更改，请手动解决冲突后重试：${error.message}`);
      }
    }
  }

  // 推送到远程
  try {
    if (remoteBranchExists) {
      execCommand(`git push origin ${branch}`, 'git push 失败');
    } else {
      console.log(`远程分支 ${branch} 不存在，将设置上游分支...`);
      execCommand(`git push -u origin ${branch}`, 'git push 失败');
    }
  } catch (error) {
    throw new Error(`推送失败：${error.message}`);
  }
};

// 安全的推送标签
const safePushTags = async () => {
  try {
    // 获取所有本地标签
    const localTags = execSync('git tag', { stdio: 'pipe' }).toString().trim().split('\n');
    // 获取所有远程标签
    const remoteTags = execSync('git ls-remote --tags origin', { stdio: 'pipe' })
      .toString()
      .trim()
      .split('\n')
      .map(line => line.split('/').pop());

    // 找出需要推送的新标签
    const newTags = localTags.filter(tag => !remoteTags.includes(tag));

    if (newTags.length > 0) {
      console.log('推送新标签:', newTags.join(', '));
      execCommand(`git push origin ${newTags.join(' ')}`, 'git push tags 失败');
    }
  } catch (error) {
    throw new Error(`推送标签失败：${error.message}`);
  }
};

updateVersion().finally(() => rl.close());
