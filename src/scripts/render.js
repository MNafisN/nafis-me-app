// Renders echoed commands and reply blocks by cloning the templates in MessageTemplates.astro.
// Everything is set with textContent: agent replies are untrusted text.

const SAFE_PROTOCOLS = ["http:", "https:", "mailto:"];

function cloneElement(id) {
    return document.getElementById(id).content.firstElementChild.cloneNode(true);
}

function cloneFragment(id) {
    return document.getElementById(id).content.cloneNode(true);
}

function slot(root, name) {
    return root.querySelector(`[data-slot="${name}"]`);
}

function toText(value) {
    return value == null ? "" : String(value);
}

// Returns the href when it is http(s), mailto or site-relative ("/..."), otherwise null
function safeHref(href) {
    if (typeof href !== "string") return null;
    const value = href.trim();

    // "//host" and "/\host" are treated by browsers as links to another site
    if (value.startsWith("/")) {
        return value.startsWith("//") || value.startsWith("/\\") ? null : value;
    }

    try {
        return SAFE_PROTOCOLS.includes(new URL(value).protocol) ? value : null;
    } catch {
        return null;
    }
}

function fillLink(link, href, label) {
    link.href = href;
    slot(link, "label").textContent = label;

    // Mail links open the mail app, not a tab
    if (/^mailto:/i.test(href)) {
        link.removeAttribute("target");
        slot(link, "new-tab").remove();
    }
}

function setOrRemove(element, value) {
    const text = toText(value);
    if (text) element.textContent = text;
    else element.remove();
}

function renderText(block, id) {
    const element = cloneElement(id);
    slot(element, "text").textContent = toText(block.text);
    return element;
}

function renderList(block) {
    const element = cloneElement("msg-list");
    setOrRemove(slot(element, "title"), block.title);

    const list = slot(element, "items");
    for (const item of block.items ?? []) {
        const row = cloneFragment("msg-list-item");
        slot(row, "term").textContent = toText(item.term);
        slot(row, "desc").textContent = toText(item.desc);
        list.append(row);
    }
    return element;
}

function renderCard(item) {
    const card = cloneElement("msg-card");
    const title = slot(card, "title");
    const href = safeHref(item.href);

    if (href) fillLink(slot(card, "link"), href, toText(item.title));
    else title.textContent = toText(item.title);

    setOrRemove(slot(card, "tag"), item.tag);
    setOrRemove(slot(card, "desc"), item.desc);
    return card;
}

function renderCards(block) {
    const element = cloneElement("msg-cards");
    const list = slot(element, "items");
    for (const item of block.items ?? []) list.append(renderCard(item));
    return element;
}

function renderLinks(block) {
    const element = cloneElement("msg-links");
    const list = slot(element, "items");

    for (const item of block.items ?? []) {
        const row = cloneElement("msg-link");
        const href = safeHref(item.href);
        const label = toText(item.label);

        if (href) fillLink(slot(row, "link"), href, label);
        else row.textContent = label;

        list.append(row);
    }
    return element;
}

function renderBlock(block) {
    switch (block?.type) {
        case "text": return renderText(block, "msg-text");
        case "error": return renderText(block, "msg-error");
        case "list": return renderList(block);
        case "cards": return renderCards(block);
        case "links": return renderLinks(block);
        default: return null;
    }
}

export function renderCommand(text) {
    const element = cloneElement("msg-command");
    slot(element, "text").textContent = toText(text);
    return element;
}

export function renderBlocks(blocks) {
    const fragment = document.createDocumentFragment();
    for (const block of blocks ?? []) {
        const element = renderBlock(block);
        if (element) fragment.append(element);
    }
    return fragment;
}

export function renderPending() {
    return cloneElement("msg-pending");
}
