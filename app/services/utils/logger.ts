class Logger {
  private static instance: Logger;
  private isError: boolean;
  private isProduction: boolean;

  constructor() {
    this.isError = false;
    this.isProduction = process.env.NODE_ENV === 'production';
  }

  public static getInstance(): Logger {
    if (!Logger.instance) {
      Logger.instance = new Logger();
    }
    return Logger.instance;
  }

  // Method to enable error logging
  public withError(): this {
    this.isError = true;
    return this; // Return `this` for method chaining
  }

  // Log a loader event
  public loader(route: string, message: string, metadata?: Record<string, unknown>) {
    this.logMessage(`[Loader] ${route}: ${message}: `, metadata);
  }

  // Log an action event
  public action(route: string, message: string, metadata?: Record<string, unknown>) {
    this.logMessage(`[Action] ${route}: ${message}`, metadata);
  }

  // Log a redirection event
  public redirection(from: string, to: string, metadata?: Record<string, unknown>) {
    this.logMessage(`[Redirection] ${from} -> ${to}`, metadata);
  }

  // Log an api call
  public api(name: string, message: string, metadata?: Record<string, unknown>) {
    this.logMessage(`[API Call] ${name}: ${message}`, metadata);
  }

  // Internal method to handle logging based on the `isError` flag
  private logMessage(message: string, metadata?: Record<string, unknown>) {
    if (!this.isProduction) {
      const logEntry = {
        message,
        metadata,
        timestamp: new Date().toISOString(),
      };

      if (this.isError) {
        console.error('[Error] ', logEntry);
        this.isError = false;
      } else {
        console.log(logEntry);
      }
    }
  }

  // Log an error
  public error(context: string, error: Error, metadata?: Record<string, unknown>) {
    this.withError().logMessage(`[${context}]: ${error.message}`, { error, ...metadata });
  }

  // Log an info message
  public info(context: string, message: string, metadata?: Record<string, unknown>) {
    this.logMessage(`[${context}]: ${message}`, metadata);
  }
}

export default Logger.getInstance();
