export interface PageMetadata {
    /**
    The page name this item relates to, starting with /
    */
    page: string;

    /**
    The key this item is referenced by (in addition to page)
    */
    key: string;

    /**
    The value of the item
    */
    value: string;

    /**
    Any alternate value.
    Usually HTML when `value` is Markdown.
    */
    alt: string;
}
