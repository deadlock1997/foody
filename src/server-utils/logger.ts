export function logInfo(message: string, context?: any) {
    console.info(`[INFO] [${new Date().toISOString()}] ${message}`, context || '');
  }
  
  export function logError(message: string, error?: any) {
    console.error(`[ERROR] [${new Date().toISOString()}] ${message}`, error || '');
  }
  
  export function logWarn(message: string, context?: any) {
    console.warn(`[WARN] [${new Date().toISOString()}] ${message}`, context || '');
  }