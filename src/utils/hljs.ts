import hljs from 'highlight.js/lib/core';

hljs.registerLanguage('plaintext', require('highlight.js/lib/languages/plaintext'));

hljs.registerLanguage('makefile', require('highlight.js/lib/languages/makefile'));
hljs.registerLanguage('markdown', require('highlight.js/lib/languages/markdown'));
hljs.registerLanguage('cmake', require('highlight.js/lib/languages/cmake'));
hljs.registerLanguage('gradle', require('highlight.js/lib/languages/gradle'));
hljs.registerLanguage('llvm', require('highlight.js/lib/languages/llvm'));

hljs.registerLanguage('cpp', require('highlight.js/lib/languages/cpp'));
hljs.registerLanguage('c', require('highlight.js/lib/languages/c'));
hljs.registerLanguage('csharp', require('highlight.js/lib/languages/csharp'));
hljs.registerLanguage('java', require('highlight.js/lib/languages/java'));

hljs.registerLanguage('yaml', require('highlight.js/lib/languages/yaml'));
hljs.registerLanguage('xml', require('highlight.js/lib/languages/xml'));
hljs.registerLanguage('sql', require('highlight.js/lib/languages/sql'));
hljs.registerLanguage('pgsql', require('highlight.js/lib/languages/pgsql'));
hljs.registerLanguage('http', require('highlight.js/lib/languages/http'));
hljs.registerLanguage('json', require('highlight.js/lib/languages/json'));
hljs.registerLanguage('css', require('highlight.js/lib/languages/css'));
hljs.registerLanguage('scss', require('highlight.js/lib/languages/scss'));
hljs.registerLanguage('less', require('highlight.js/lib/languages/less'));
hljs.registerLanguage('applescript', require('highlight.js/lib/languages/applescript'));
hljs.registerLanguage('javascript', require('highlight.js/lib/languages/javascript'));
hljs.registerLanguage('typescript', require('highlight.js/lib/languages/typescript'));
hljs.registerLanguage('python', require('highlight.js/lib/languages/python'));
hljs.registerLanguage('go', require('highlight.js/lib/languages/go'));

hljs.registerLanguage('bash', require('highlight.js/lib/languages/bash'));
hljs.registerLanguage('shell', require('highlight.js/lib/languages/shell'));
hljs.registerLanguage('powershell', require('highlight.js/lib/languages/powershell'));
hljs.registerLanguage('ini', require('highlight.js/lib/languages/ini'));
hljs.registerLanguage('nginx', require('highlight.js/lib/languages/nginx'));
hljs.registerLanguage('dns', require('highlight.js/lib/languages/dns'));
hljs.registerLanguage('diff', require('highlight.js/lib/languages/diff'));
hljs.registerLanguage('dockerfile', require('highlight.js/lib/languages/dockerfile'));

hljs.registerLanguage('bnf', require('highlight.js/lib/languages/bnf'));
hljs.registerLanguage('latex', require('highlight.js/lib/languages/latex'));
hljs.registerLanguage('matlab', require('highlight.js/lib/languages/matlab'));

export {hljs};