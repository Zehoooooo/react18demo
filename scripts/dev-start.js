#!/usr/bin/env node

const { spawn } = require('child_process');
const ora = require('ora');
const chalk = require('chalk');
chalk.level = 3

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

// 开发模式启动
const startDev = async () => {
  showStartupInfo();
  
  const spinner = ora(chalk.blue('🚀 正在启动开发服务器...')).start();
  
  try {
    // 模拟一些启动步骤
    await new Promise(resolve => setTimeout(resolve, 1000));
    spinner.text = chalk.green('⚡ 正在编译React组件...');
    await new Promise(resolve => setTimeout(resolve, 800));
    spinner.text = chalk.yellow('🎨 正在处理样式文件...');
    await new Promise(resolve => setTimeout(resolve, 600));
    spinner.text = chalk.cyan('🔧 正在优化代码...');
    await new Promise(resolve => setTimeout(resolve, 500));
    
    spinner.succeed(chalk.green('✅ 开发服务器启动成功！'));
    
    console.log(chalk.blue('\n🌐 服务器地址: http://localhost:3000'));
    console.log(chalk.yellow('📱 支持热重载，修改代码自动刷新'));
    console.log(chalk.magenta('💡 你知道吗？React 18引入了并发特性！'));
    console.log('\n');
    
    // 启动实际的开发服务器
    const child = spawn('react-scripts', ['start'], {
      stdio: 'inherit',
      shell: true
    });
    
    child.on('error', (error) => {
      console.error(chalk.red('❌ 启动失败！'), error);
      process.exit(1);
    });
    
  } catch (error) {
    spinner.fail(chalk.red('❌ 启动失败！'));
    console.error(error);
    process.exit(1);
  }
};

startDev(); 