const fs = require('node:fs')
const path = require('node:path')

const root = path.resolve(__dirname, '..')
const pidFile = path.join(root, '.dev-server.pid')
const stopFile = path.join(root, '.dev-server.stop')

if (!fs.existsSync(pidFile)) {
  console.log('Project is not running.')
  process.exit(0)
}

const pid = Number(fs.readFileSync(pidFile, 'utf8'))
if (!Number.isSafeInteger(pid) || pid < 1) {
  fs.rmSync(pidFile, { force: true })
  console.error('Invalid launcher PID file was removed.')
  process.exit(1)
}

try {
  process.kill(pid, 0)
} catch (error) {
  if (error.code !== 'ESRCH') throw error
  fs.rmSync(pidFile, { force: true })
  console.log('Project is not running; removed stale PID file.')
  process.exit(0)
}

fs.writeFileSync(stopFile, 'stop')
console.log('Stop requested. The API and Vite will shut down together.')