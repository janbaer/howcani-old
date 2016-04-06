import { Pipe } from 'angular2/core';
const marked = require('marked');

marked.setOptions({
  renderer: new marked.Renderer(),
  gfm: true,
  tables: true,
  breaks: false,
  pedantic: false,
  sanitize: true,
  smartLists: true,
  smartypants: false
});

@Pipe({
  name: 'markdown'
})
export class MarkdownPipe {
  transform(value) {
    return marked(value);
  }
}
