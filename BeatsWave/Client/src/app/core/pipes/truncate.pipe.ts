import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'truncate'
})
export class TruncatePipe implements PipeTransform {

    transform(value: string, limit = 100, completeWords = false, ellipsis = '...'): any {
        const htmlTag = /<\/?[^>]*>/;
        const result = value || '';

        if (htmlTag.test(result)) {
            return this.truncateHtml(result, limit, ellipsis);
        } else {
            if (completeWords) {
                limit = result.substr(0, limit).lastIndexOf(' ');
            }
            return `${result.substr(0, limit)}${ellipsis}`;
        }
    }

    truncateHtml(html, limit, ellipsis) {
        if (limit >= html.length) {
            return html;
        }

        let str = ''; // final content
        let i = 0; // position in source
        let tag = ''; // current tag contents (used during content reading)
        let c = ''; // current char (used during content reading)
        let end = 0; // ending position of tag (used during content reading)
        let cnt = 0; // content size
        let tagTree = []; // open tags

        const len = html.length; // length of the source

            /**
             * Strips parameters and <> from tag
             * @param {content} content full tag content (ex.: <span a="b">)
             * @returns {content} tag name (ex.: span)
             */
        const tagStrip = (content) => {
                const index = tag.indexOf(' '); // check for space (ex.: <span a="b">)
                if (index === -1) { // no space (ex.: <span>)
                    return content.slice(1, -1);
                }
                return content.slice(1, index);
            };

        // Go trough the content until we read enough of it
        while (cnt < limit && i < len) {
            c = html.charAt(i); // Read next char
            if (c === '<') {
                // Tag found
                end = html.slice(i).indexOf('>');
                if (end === -1) { // Check for incomplete tag
                    return str;
                }
                end += i + 1;
                tag = html.slice(i, end); // Read tag contents
                str += tag; // Append the tag to final content
                if (tag.charAt(1) === '/') {
                    // Closing tag
                    tagTree = tagTree.slice(0, -1);
                } else {
                    // New tag
                    tagTree.push(tagStrip(tag));
                }
                i = end; // Move the position to end of the tag

            } else {
                // Append content character and move the position
                str += c;
                i++;
                cnt++;
            }
        }

        return str + ellipsis;
    }

}
