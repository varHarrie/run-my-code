function withContext(identifier: string, source: string) {
  return `with (${identifier}) { ${source} }`;
}

function stringify(arg: unknown) {
  return arg && (Array.isArray(arg) || typeof arg === 'object') ? JSON.stringify(arg) : String(arg);
}

function isTemplateStringsArray(arg: unknown): arg is TemplateStringsArray {
  return Array.isArray(arg) && 'raw' in arg && Array.isArray((arg as { raw: unknown }).raw);
}

function run(code: string): unknown;
function run(pieces: TemplateStringsArray, ...args: unknown[]): unknown;
function run(this: unknown, arg: string | TemplateStringsArray, ...args: unknown[]): unknown {
  let code = '';

  if (typeof arg === 'string') {
    code = arg;
  } else {
    code = arg.reduce((str, piece, index) => str + piece + (index < args.length ? stringify(args[index]) : ''), '');
  }

  const fn = this ? new Function(withContext('this', code)).bind(this) : new Function(code);
  return fn();
}

function $(context: Record<string, unknown>): typeof run;
function $(pieces: TemplateStringsArray, ...args: unknown[]): unknown;
function $(code: string): unknown;
function $(arg: unknown, ...args: unknown[]): unknown {
  if (isTemplateStringsArray(arg)) return run(arg, ...args);
  else if (typeof arg === 'string') return run(arg);
  return run.bind(arg);
}

export = $;
