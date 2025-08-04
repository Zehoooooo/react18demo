#!/usr/bin/env node

const { spawn } = require('child_process');
const ora = require('ora');
const chalk = require('chalk');
const cliProgress = require('cli-progress');

// 有趣的emoji和消息
const funFacts = [
  '💡 你知道吗？React 18引入了并发特性！',
  '🎯 虚拟滚动可以处理数万条数据！',
  '🌈 主题切换让用户体验更棒！',
  '⚡ 自定义Hooks让代码更优雅！',
  '🎨 CSS动画让界面更生动！',
  '🔧 表单验证让数据更安全！',
  '📱 响应式设计适配各种设备！',
];

// 随机选择消息
const getRandomMessage = (arr) => arr[Math.floor(Math.random() * arr.length)];

// 创建进度条
const createProgressBar = (total) => {
  return new cliProgress.SingleBar({
    format: '🚀 构建进度 |' + chalk.cyan('{bar}') + '| {percentage}% | {value}/{total} | {eta}s',
    barCompleteChar: '█',
    barIncompleteChar: '░',
    hideCursor: true
  });
};

// 显示启动信息
const showStartupInfo = () => {
  console.log('\n');
  console.log(chalk.cyan.bold('🎉 React 18 Hooks Practice'));
  console.log(chalk.cyan('═══════════════════════════════════════'));
  console.log(chalk.yellow('📚 包含16个不同的React功能演示'));
  console.log(chalk.green('✨ 自定义Hooks、性能优化、动画效果'));
  console.log(chalk.blue('🎨 虚拟滚动、拖拽排序、主题切换'));
  console.log('\n');
};

// 显示随机有趣事实
const showFunFact = () => {
  const fact = getRandomMessage(funFacts);
  console.log(chalk.magenta(fact));
};

// 构建模式
const build = async () => {
  showStartupInfo();
  
  const progressBar = createProgressBar(100);
  progressBar.start(100, 0);
  
  try {
    // 模拟构建步骤
    for (let i = 0; i <= 100; i += 10) {
      await new Promise(resolve => setTimeout(resolve, 200));
      progressBar.update(i);
    }
    
    progressBar.stop();
    
    const spinner = ora(chalk.blue('📦 正在执行实际构建...')).start();
    
    // 执行实际的构建命令
    const child = spawn('react-scripts', ['build'], {
      stdio: 'pipe',
      shell: true
    });
    
    child.on('close', (code) => {
      if (code === 0) {
        spinner.succeed(chalk.green('✅ 构建完成！'));
        
        console.log(chalk.blue('\n📁 构建文件已生成到 build/ 目录'));
        console.log(chalk.yellow('🚀 可以部署到任何静态托管服务'));
        
        showFunFact();
      } else {
        spinner.fail(chalk.red('❌ 构建失败！'));
        process.exit(1);
      }
    });
    
    child.on('error', (error) => {
      progressBar.stop();
      spinner.fail(chalk.red('❌ 构建失败！'));
      console.error(error.message);
      process.exit(1);
    });
    
  } catch (error) {
    progressBar.stop();
    console.error(chalk.red('❌ 构建失败！'));
    console.error(error.message);
    process.exit(1);
  }
};

build(); 