/**
 * Secure logging utility for production and development
 */

type LogLevel = 'info' | 'warn' | 'error' | 'debug';

interface LogEntry {
  level: LogLevel;
  message: string;
  timestamp: string;
  context?: string;
  error?: Error;
}

class Logger {
  private isDevelopment = process.env.NODE_ENV === 'development';

  private formatMessage(entry: LogEntry): string {
    const { level, message, timestamp, context, error } = entry;
    const contextStr = context ? `[${context}]` : '';
    const errorStr = error ? `\nError: ${error.message}` : '';
    return `${timestamp} ${level.toUpperCase()} ${contextStr} ${message}${errorStr}`;
  }

  private log(level: LogLevel, message: string, context?: string, error?: Error) {
    const entry: LogEntry = {
      level,
      message,
      timestamp: new Date().toISOString(),
      context,
      error
    };

    // In development, log everything to console
    if (this.isDevelopment) {
      const formattedMessage = this.formatMessage(entry);
      switch (level) {
        case 'error':
          console.error(formattedMessage);
          break;
        case 'warn':
          console.warn(formattedMessage);
          break;
        case 'debug':
          console.debug(formattedMessage);
          break;
        default:
          console.log(formattedMessage);
      }
    } else {
      // In production, only log errors and warnings
      // You can integrate with external logging services here
      if (level === 'error' || level === 'warn') {
        const formattedMessage = this.formatMessage(entry);
        console.error(formattedMessage);
        
        // TODO: Send to external logging service (e.g., Sentry, LogRocket, etc.)
        // this.sendToExternalService(entry);
      }
    }
  }

  info(message: string, context?: string) {
    this.log('info', message, context);
  }

  warn(message: string, context?: string) {
    this.log('warn', message, context);
  }

  error(message: string, context?: string, error?: Error) {
    this.log('error', message, context, error);
  }

  debug(message: string, context?: string) {
    this.log('debug', message, context);
  }

  // Method to send logs to external service (implement as needed)
  private sendToExternalService(entry: LogEntry) {
    // Example: Send to Sentry, LogRocket, or other logging service
    // This is where you'd implement external logging
  }
}

// Export singleton instance
export const logger = new Logger();

// Export types for use in other files
export type { LogLevel, LogEntry };
