const fs = require('node:fs')
const path = require('node:path')
const { spawn } = require('node:child_process')

const root = path.resolve(__dirname, '..')
const pidFile = path.join(root, '.dev-server.pid')
const stopFile = path.join(root, '.dev-server.stop')

if (fs.existsSync(pidFile)) {
  const existingPid = Number(fs.readFileSync(pidFile, 'utf8'))
  try {
    process.kill(existingPid, 0)
    console.error(`Project is already running with PID ${existingPid}.`)
    process.exit(1)
  } catch (error) {
    if (error.code !== 'ESRCH') throw error
  }
}

fs.rmSync(stopFile, { force: true })
fs.writeFileSync(pidFile, String(process.pid))

const children = [
  spawn(process.execPath, [path.join(root, 'server', 'index.cjs')], {
    cwd: root,
    stdio: 'inherit'
  }),
  spawn(process.execPath, [path.join(root, 'node_modules', 'vite', 'bin', 'vite.js'), '--host', '0.0.0.0'], {
    cwd: root,
    stdio: 'inherit'
  })
]

let shuttingDown = false

function shutdown(exitCode) {
  if (shuttingDown) return
  shuttingDown = true
  process.exitCode = exitCode
  clearInterval(stopWatcher)
  fs.rmSync(pidFile, { force: true })
  fs.rmSync(stopFile, { force: true })
  for (const child of children) {
    if (child.exitCode === null && !child.killed) child.kill()
  }
}

for (const child of children) {
  child.on('error', (error) => {
    console.error(`Could not start a project process: ${error.message}`)
    shutdown(1)
  })
  child.on('exit', (code) => shutdown(code ?? 1))
}

process.on('SIGINT', () => shutdown(0))
process.on('SIGTERM', () => shutdown(0))

const stopWatcher = setInterval(() => {
  if (fs.existsSync(stopFile)) shutdown(0)
}, 250)
stopWatcher.unref()

console.log('Starting API and Vite. Press Ctrl+C to stop both.')