import { Pipe } from '@angular/core';
const marked = require('marked');

marked.setOptions({
  renderer: new marked.Renderer(),
  gfm: true,
  tables: true,
  breaks: true,
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
    return value ? marked(value) : '';
  }
}
