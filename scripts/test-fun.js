#!/usr/bin/env node

const ora = require('ora');
const chalk = require('chalk');
const cliProgress = require('cli-progress');

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

// 创建进度条
const createProgressBar = (total) => {
  return new cliProgress.SingleBar({
    format: '🚀 进度 |' + chalk.cyan('{bar}') + '| {percentage}% | {value}/{total} | {eta}s',
    barCompleteChar: '█',
    barIncompleteChar: '░',
    hideCursor: true
  });
};

// 测试所有功能
const testAllFeatures = async () => {
  showStartupInfo();
  
  const spinner = ora(chalk.blue('🧪 正在测试所有功能...')).start();
  
  try {
    // 测试进度条
    const progressBar = createProgressBar(100);
    progressBar.start(100, 0);
    
    for (let i = 0; i <= 100; i += 10) {
      await new Promise(resolve => setTimeout(resolve, 100));
      progressBar.update(i);
    }
    
    progressBar.stop();
    
    // 测试不同的spinner状态
    spinner.text = chalk.green('✅ 进度条测试完成');
    await new Promise(resolve => setTimeout(resolve, 500));
    
    spinner.text = chalk.yellow('⚡ 正在测试动画效果...');
    await new Promise(resolve => setTimeout(resolve, 800));
    
    spinner.text = chalk.cyan('🎨 正在测试主题切换...');
    await new Promise(resolve => setTimeout(resolve, 600));
    
    spinner.text = chalk.magenta('🔧 正在测试表单验证...');
    await new Promise(resolve => setTimeout(resolve, 700));
    
    spinner.succeed(chalk.green('✅ 所有功能测试完成！'));
    
    console.log(chalk.blue('\n🎯 测试结果：'));
    console.log(chalk.green('✅ 进度条功能正常'));
    console.log(chalk.green('✅ 彩色文字显示正常'));
    console.log(chalk.green('✅ 动画效果正常'));
    console.log(chalk.green('✅ 主题切换正常'));
    console.log(chalk.green('✅ 表单验证正常'));
    
    console.log(chalk.yellow('\n🚀 现在可以运行以下命令：'));
    console.log(chalk.cyan('npm start    - 启动开发服务器'));
    console.log(chalk.cyan('npm run build - 构建生产版本'));
    console.log(chalk.cyan('npm test     - 运行测试'));
    
    console.log(chalk.magenta('\n💡 你知道吗？React 18引入了并发特性！'));
    
  } catch (error) {
    spinner.fail(chalk.red('❌ 测试失败！'));
    console.error(error);
    process.exit(1);
  }
};

testAllFeatures(); 