/**
 * 日志持久化 - 将 log/logWarn 输出同时写入按日期命名的日志文件
 */

const fs = require('fs');
const path = require('path');

const LOG_DIR = path.join(process.cwd(), 'logs');

function getLogFilePath() {
    const today = new Date().toISOString().slice(0, 10);
    return path.join(LOG_DIR, `farm-${today}.log`);
}

function ensureLogDir() {
    if (!fs.existsSync(LOG_DIR)) {
        fs.mkdirSync(LOG_DIR, { recursive: true });
    }
}

/**
 * 追加一行到当日日志文件（同步写入，保证落盘）
 * @param {string} line - 完整的一行日志（已包含时间、标签、内容）
 */
function appendLine(line) {
    try {
        ensureLogDir();
        fs.appendFileSync(getLogFilePath(), line + '\n');
    } catch (e) {
        // 持久化失败不影响控制台输出，仅静默忽略
    }
}

/**
 * 关闭日志（同步写入无需关闭流，保留接口供退出时调用）
 */
function close() {}

module.exports = {
    appendLine,
    close,
    getLogFilePath,
};
