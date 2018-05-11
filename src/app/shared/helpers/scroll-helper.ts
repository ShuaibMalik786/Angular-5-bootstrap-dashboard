/**
 * A service that scrolls document elements into view
 * Taken from the angular team
 * https://github.com/angular/angular/blob/master/aio/src/app/shared/scroll.service.ts
 */
export class ScrollHelper {

  /** Scroll to the top of the document. */
  static scrollToTop() {
    const topOfPageElement = document.body;
    if (topOfPageElement) {
      topOfPageElement.scrollIntoView();

      if (window && window.scrollBy) {
        // Scroll as much as necessary to align the top of `element` at `topOffset`.
        // (Usually, `.top` will be 0, except for cases where the element cannot be scrolled all the
        //  way to the top, because the viewport is larger than the height of the content after the
        //  element.)
        window.scrollBy(0, topOfPageElement.getBoundingClientRect().top);

        // If we are very close to the top (<20px), then scroll all the way up.
        // (This can happen if `element` is at the top of the page, but has a small top-margin.)
        if (window.pageYOffset < 20) {
          window.scrollBy(0, -window.pageYOffset);
        }
      }
    }
  }
}
