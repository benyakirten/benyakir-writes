export const decode: EncodingFunction = code => {
  return code
    .replace(/__L_ANGLE_BRACKET__/g, '<')
    .replace(/__R_ANGLE_BRACKET__/g, '>')
    .replace(/__L_CURLY_BRACKET__/g, '{')
    .replace(/__R_CURLY_BRACKET__/g, '}')
};

export const ENABLED_THEMES: EnabledTheme[] = ['darcula', 'prism', 'atomDark', 'materialDark', 'duotoneSpace', 'duotoneLight']

export function getPrismLanguage(lang: EnabledLanguage): Promise<any> {
  switch (lang) {
    case 'js':
      return import('react-syntax-highlighter/dist/cjs/languages/prism/javascript').then(l => l.default)
    case 'jsx':
      return import('react-syntax-highlighter/dist/cjs/languages/prism/jsx').then(l => l.default)
    case 'ts':
      return import('react-syntax-highlighter/dist/cjs/languages/prism/typescript').then(l => l.default)
    case 'tsx':
      return import('react-syntax-highlighter/dist/cjs/languages/prism/tsx').then(l => l.default)
    case 'python':
      return import('react-syntax-highlighter/dist/cjs/languages/prism/python').then(l => l.default)
    case 'php':
      return import('react-syntax-highlighter/dist/cjs/languages/prism/php').then(l => l.default)
    case 'graphql':
      return import('react-syntax-highlighter/dist/cjs/languages/prism/graphql').then(l => l.default)
    case 'css':
      return import('react-syntax-highlighter/dist/cjs/languages/prism/css').then(l => l.default)
    case 'scss':
      return import('react-syntax-highlighter/dist/cjs/languages/prism/scss').then(l => l.default)
    default:
      return import('react-syntax-highlighter/dist/cjs/languages/prism/javascript').then(l => l.default)
  }
};

export function getPrismTheme(theme: EnabledTheme): Promise<any> {
  switch (theme) {
    case 'darcula':
      return import('react-syntax-highlighter/dist/cjs/styles/prism/darcula').then(t => t.default)
    case 'prism':
      return import('react-syntax-highlighter/dist/cjs/styles/prism/prism').then(t => t.default)
    case 'atomDark':
      return import('react-syntax-highlighter/dist/cjs/styles/prism/atom-dark').then(t => t.default)
    case 'materialDark':
      return import('react-syntax-highlighter/dist/cjs/styles/prism/material-dark').then(t => t.default)
    case 'duotoneSpace':
      return import('react-syntax-highlighter/dist/cjs/styles/prism/duotone-space').then(t => t.default)
    case 'duotoneLight':
      return import('react-syntax-highlighter/dist/cjs/styles/prism/duotone-light').then(t => t.default)
    default:
      return import('react-syntax-highlighter/dist/cjs/styles/prism/darcula').then(t => t.default)
  }
};

export const getFullTheme: DecodeTheme = theme => {
  switch (theme) {
    case 'darcula':
      return 'Darcula';
    case 'prism':
      return 'Prism';
    case 'atomDark':
      return 'Atom Dark';
    case 'materialDark':
      return 'Material Dark';
    case 'duotoneSpace':
      return 'Duotone Space';
    case 'duotoneLight':
      return 'Duotone Light';
    default:
      return 'Atom Dark';
  }
}

export const getFullLanguage: DecodeLanguage = lang => {
  switch (lang) {
    case 'js':
      return 'JavaScript';
    case 'jsx':
      return 'React JavaScript';
    case 'ts':
      return 'TypeScript';
    case 'tsx':
      return 'React TypeScript';
    case 'python':
      return 'Python';
    case 'php':
      return 'PHP';
    case 'graphql':
      return 'GraphQL';
    case 'css':
      return 'CSS';
    case 'scss':
      return 'SCSS';
    default:
      return 'JavaScript';
  }
};