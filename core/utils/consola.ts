// centralized logging system
// https://github.com/unjs/consola

import type { LogLevel, LogObject } from 'consola/core'
import { LogLevels, createConsola } from 'consola/core'
import { consola } from 'consola'
import { format } from 'date-fns'

// default instance to write into browser's console
const defaultReporter = consola

/**
 * Logging object that is available across the app thanks to Nuxt auto-imports.
 */
export const log = createConsola({
  level: LogLevels.debug,
  reporters: [
    {
      log: (logObj) => {
        // enhancing log with more info (i.e. time + relevant stack for warn/error)
        const msg = transformLog(logObj)
        // logs are being written into browser's console
        // `logObj.type` = log level name = corresponing method on the logger (debug, info, warn, error, etc.)
        defaultReporter[logObj.type](msg)
      },
    },
  ],
})

/**
 * Initialize logger functions.
 * Called in app.vue's setup.
 */
export async function initConsola() {
  // set default log level from config
  const logLevel = useRuntimeConfig().public.ignis.log.level
  log.level = getLogLevel(logLevel)
  defaultReporter.level = log.level
  log.debug(`[consola] log level set to '${logLevel}'`)
}

/**
 * Transform text values of logLevel
 * to numeric equivalent used by consola.
 */
function getLogLevel(logLevel: string): LogLevel {
  const logLevelString = logLevel.toLocaleLowerCase() || 'info'
  switch (logLevelString) {
    case 'fatal': return LogLevels.fatal
    case 'error': return LogLevels.error
    case 'warn': return LogLevels.warn
    case 'log': return LogLevels.log
    case 'info': return LogLevels.info
    case 'success': return LogLevels.success
    case 'debug': return LogLevels.debug
    case 'trace': return LogLevels.trace
    case 'silent': return LogLevels.silent
    case 'verbose': return LogLevels.verbose
    default: log.fatal(`Invalid log level ${logLevel}`)
      throw new Error(`Invalid log level ${logLevel}`)
  }
}

/**
 * Enhance received log object before it is logged.
 * Add current date+time and trim irrelevant callstack for warn/errors.
 * @param logObj Object to be logged
 * @returns Enhanced string to be logged
 */
function transformLog(logObj: LogObject): string {
  const logData = logObj.args[0]

  let logBody
  if (typeof logData === 'string') {
    logBody = logData
  } else {
    if ('message' in logData) {
      logBody = logData.message
    } else {
      logBody = JSON.stringify(logData, null, 2)
    }
  }

  // add timestamp to the log body
  const timestamp = format(new Date(), 'yyyy-MM-dd HH:mm:ss.SSS')
  logBody = timestamp + '\n' + logBody

  // for warns and errors the stack is parsed to display only relevant records
  // (= coming from your own codebase)
  if (logObj.level <= LogLevels.warn) {
    const fullStack = logData.stack as string
    const filteredStack = fullStack?.split('\n    at ').filter(x => !x.includes('node_modules'))
    if (filteredStack?.length && logObj.level <= LogLevels.warn) {
      if (logObj.level === LogLevels.warn) {
        filteredStack[0] = filteredStack[0]!.replace('Error:', 'Warn:')
      }
      logBody = timestamp + '\n' + filteredStack.join('\n\tat ')
    }
  }

  return logBody
}
