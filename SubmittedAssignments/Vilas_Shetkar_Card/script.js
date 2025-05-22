// Helper: Parse JSON safely
function parseAttr(val, fallback = {}) {
    try { return typeof val === "string" ? JSON.parse(val) : fallback; }
    catch { return fallback; }
}

// Helper: Set attributes from config
function setAttrs(el, attrs = {}) {
    for (const k in attrs) if (attrs[k]) el.setAttribute(k, attrs[k]);
}

// Helper: Remove all children
function clearChildren(el) {
    while (el.firstChild) el.removeChild(el.firstChild);
}

// 1.1 HeaderBarSection
class HeaderBarSection extends HTMLElement {
    static get observedAttributes() { return ["data", "config"]; }
    constructor() {
        super();
        this.data = {};
        this.config = {};
    }
    attributeChangedCallback(name, oldV, newV) {
        if (name === "data") this.data = parseAttr(newV, {});
        if (name === "config") this.config = parseAttr(newV, {});
        this.render();
    }
    connectedCallback() { this.render(); }
    render() {
        clearChildren(this);
        const d = this.data || {}, c = this.config || {};
        const wrap = document.createElement("nav");
        wrap.className = c.headerWrapperClass || "navbar navbar-expand-lg navbar-light bg-white shadow-sm";
        const container = document.createElement("div");
        container.className = c.containerClass || "container";
        // Logo & Company
        const logo = document.createElement("a");
        logo.className = c.logoClass || "navbar-brand me-4";
        logo.href = "/";
        if (d.companyDetails?.logo) {
            const img = document.createElement("img");
            img.src = d.companyDetails.logo;
            img.alt = d.companyDetails.companyName || "Logo";
            img.style.height = "40px";
            logo.appendChild(img);
        }
        if (d.companyDetails?.companyName) {
            const span = document.createElement("span");
            span.className = c.companyNameClass || "fw-bold text-primary";
            span.textContent = d.companyDetails.companyName;
            logo.appendChild(span);
        }
        container.appendChild(logo);
        // Navbar links
        const nav = document.createElement("ul");
        nav.className = c.navClass || "navbar-nav me-auto mb-2 mb-lg-0";
        (d.navLinks || []).forEach(link => {
            const li = document.createElement("li");
            li.className = c.navItemClass || "nav-item";
            const a = document.createElement("a");
            a.className = c.navLinkClass || "nav-link";
            a.href = link.url || "#";
            a.textContent = link.label || "";
            li.appendChild(a);
            nav.appendChild(li);
        });
        // NavItems (dropdown style)
        (d.navItems || []).forEach(item => {
            const li = document.createElement("li");
            li.className = c.navItemClass || "nav-item";
            const a = document.createElement("a");
            a.className = c.navLinkClass || "nav-link";
            a.href = item.url || "#";
            a.textContent = item.menuName || "";
            li.appendChild(a);
            nav.appendChild(li);
        });
        container.appendChild(nav);
        // Buttons
        const btnWrap = document.createElement("div");
        btnWrap.className = c.buttonWrapperClass || "d-flex align-items-center";
        (d.buttons || []).forEach(btn => {
            const b = document.createElement("a");
            b.className = btn.className || c.buttonClass || "btn";
            b.href = btn.url || "#";
            b.textContent = btn.label || "";
            btnWrap.appendChild(b);
        });
        container.appendChild(btnWrap);
        wrap.appendChild(container);
        this.appendChild(wrap);
    }
}
customElements.define("header-bar-section", HeaderBarSection);

// 1.2 HeroSection
class HeroSection extends HTMLElement {
    static get observedAttributes() { return ["data", "config"]; }
    constructor() {
        super();
        this.data = {};
        this.config = {};
    }
    attributeChangedCallback(name, oldV, newV) {
        if (name === "data") this.data = parseAttr(newV, {});
        if (name === "config") this.config = parseAttr(newV, {});
        this.render();
    }
    connectedCallback() { this.render(); }
    render() {
        clearChildren(this);
        const d = this.data || {}, c = this.config || {};
        // Wrapper
        const section = document.createElement("section");
        section.className = c.heroWrapperClass || "py-5 position-relative bg-secondary";
        if (d.backgroundImage) section.style.backgroundImage = `url('${d.backgroundImage}')`;
        // Overlay
        if (c.overlay) {
            const overlay = document.createElement("div");
            overlay.style.position = "absolute";
            overlay.style.top = 0; overlay.style.left = 0;
            overlay.style.width = "100%"; overlay.style.height = "100%";
            overlay.style.background = "rgba(0,0,0,0.2)";
            overlay.style.zIndex = 0;
            section.appendChild(overlay);
        }
        // Container
        const container = document.createElement("div");
        container.className = c.heroContainerClass || "container";
        const row = document.createElement("div");
        row.className = c.heroContentWrapperClass || "row align-items-center";
        // Left
        const left = document.createElement("div");
        left.className = c.heroLeftClass || "col-lg-7 col-sm-6";
        const textWrap = document.createElement("div");
        textWrap.className = c.heroTextContentWrapperClass || "py-5";
        // Heading
        if (d.heading) {
            const h = document.createElement("h1");
            h.innerHTML = d.heading;
            textWrap.appendChild(h);
        }
        if (d.subHeading) {
            const sh = document.createElement("h4");
            sh.textContent = d.subHeading;
            textWrap.appendChild(sh);
        }
        if (d.description) {
            const desc = document.createElement("p");
            desc.textContent = d.description;
            textWrap.appendChild(desc);
        }
        // Search
        if (c.showSearchBox && d.search) {
            const form = document.createElement("form");
            form.className = c.searchClass || "d-block";
            form.action = d.search.redirectTo || "#";
            form.method = "GET";
            const inp = document.createElement("input");
            inp.type = "text";
            inp.className = "form-control mb-2";
            inp.placeholder = d.search.placeholder || "Search";
            inp.name = "q";
            form.appendChild(inp);
            const btn = document.createElement("button");
            btn.type = "submit";
            btn.className = c.searchConfig?.btnClass || "btn btn-primary";
            btn.textContent = d.search.btnText || "Search";
            form.appendChild(btn);
            textWrap.appendChild(form);
        }
        // Cards
        if (Array.isArray(d.cards) && d.cards.length) {
            const cardsRow = document.createElement("div");
            cardsRow.className = c.heroCardsContentWrapperClass || "row row-cols-1 row-cols-md-2 g-3";
            d.cards.forEach(card => {
                const col = document.createElement("div");
                col.className = c.heroCardWrapperClass || "col";
                // Use CardComponent if available, else fallback
                if (window.customElements.get("card-component")) {
                    const cardEl = document.createElement("card-component");
                    cardEl.setAttribute("data", JSON.stringify(card));
                    cardEl.setAttribute("config", JSON.stringify(c.cardConfig || {}));
                    col.appendChild(cardEl);
                } else {
                    // fallback: simple card
                    const cardDiv = document.createElement("div");
                    cardDiv.className = "card";
                    if (card.heading) {
                        const h = document.createElement("h5");
                        h.className = "card-title";
                        h.textContent = card.heading;
                        cardDiv.appendChild(h);
                    }
                    if (card.description) {
                        const p = document.createElement("p");
                        p.className = "card-text";
                        p.textContent = card.description;
                        cardDiv.appendChild(p);
                    }
                    col.appendChild(cardDiv);
                }
                cardsRow.appendChild(col);
            });
            textWrap.appendChild(cardsRow);
        }
        left.appendChild(textWrap);
        row.appendChild(left);
        // Right
        const right = document.createElement("div");
        right.className = c.heroRightClass || "col-lg-5 col-sm-6";
        if (d.image) {
            const imgWrap = document.createElement("div");
            imgWrap.className = c.contentImageWrapperClass || "hero-content-image-wrapper py-5";
            const img = document.createElement("img");
            img.className = c.contentImageClass || "img-fluid hero-content-image rounded";
            img.src = d.image;
            img.alt = d.imageAltText || "";
            imgWrap.appendChild(img);
            right.appendChild(imgWrap);
        }
        // QuickSignOn placeholder
        if (c.showQuickSignon && d.quickSignOn) {
            const qso = document.createElement("div");
            qso.className = "quick-signon-placeholder";
            qso.textContent = "Quick SignOn Form";
            right.appendChild(qso);
        }
        row.appendChild(right);
        container.appendChild(row);
        section.appendChild(container);
        this.appendChild(section);
    }
}
customElements.define("hero-section", HeroSection);

// 2. PortfolioSection
class PortfolioSection extends HTMLElement {
    static get observedAttributes() { return ["data", "config"]; }
    constructor() {
        super();
        this.data = {};
        this.config = {};
        this.activeTab = "all";
    }
    attributeChangedCallback(name, oldV, newV) {
        if (name === "data") this.data = parseAttr(newV, {});
        if (name === "config") this.config = parseAttr(newV, {});
        this.render();
    }
    connectedCallback() { this.render(); }
    render() {
        clearChildren(this);
        const d = this.data || {}, c = this.config || {};
        const section = document.createElement("section");
        section.className = c.gridImageConfig?.sectionClass || c.cardSectionConfig?.sectionClass || "py-5";
        const container = document.createElement("div");
        container.className = c.gridImageConfig?.containerClass || c.cardSectionConfig?.containerClass || "container";
        // Heading
        if (d.heading) {
            const h = document.createElement("h2");
            h.className = c.gridImageConfig?.headingClass || c.cardSectionConfig?.headingClass || "h2 text-center mb-4";
            h.textContent = d.heading;
            container.appendChild(h);
        }
        if (d.subHeading) {
            const sh = document.createElement("h5");
            sh.className = "text-center mb-2";
            sh.textContent = d.subHeading;
            container.appendChild(sh);
        }
        if (d.description) {
            const desc = document.createElement("p");
            desc.className = "text-center text-muted mb-4";
            desc.textContent = d.description;
            container.appendChild(desc);
        }
        // Tabs
        if (Array.isArray(d.tabs)) {
            const nav = document.createElement("ul");
            nav.className = "nav nav-tabs justify-content-center mb-4";
            d.tabs.forEach(tab => {
                const li = document.createElement("li");
                li.className = "nav-item";
                const a = document.createElement("a");
                a.className = "nav-link" + (this.activeTab === tab.value ? " active" : "");
                a.href = "#";
                a.textContent = tab.label;
                a.onclick = e => {
                    e.preventDefault();
                    this.activeTab = tab.value;
                    this.render();
                };
                li.appendChild(a);
                nav.appendChild(li);
            });
            container.appendChild(nav);
        }
        // Content: grid images or cards
        if (c.layout === "image" && d.gridImages?.images) {
            const grid = document.createElement("div");
            grid.className = c.gridImageConfig?.gridWrapperClass || "row row-cols-1 row-cols-md-3 g-4";
            d.gridImages.images.filter(img =>
                this.activeTab === "all" || img.category === this.activeTab
            ).forEach(imgObj => {
                const col = document.createElement("div");
                col.className = c.gridImageConfig?.imageWrapperClass || "col";
                const img = document.createElement("img");
                img.className = c.gridImageConfig?.imageConfig?.imageClass || "img-fluid rounded shadow";
                img.src = imgObj.image;
                img.alt = imgObj.category || "";
                col.appendChild(img);
                grid.appendChild(col);
            });
            container.appendChild(grid);
        } else if (c.layout === "card" && d.cardSectionData?.cards) {
            const grid = document.createElement("div");
            grid.className = c.cardSectionConfig?.cardsGridClass || "row row-cols-1 row-cols-md-3 g-4";
            d.cardSectionData.cards.filter(card =>
                this.activeTab === "all" || card.category === this.activeTab
            ).forEach(card => {
                const col = document.createElement("div");
                col.className = "col";
                const cardDiv = document.createElement("div");
                cardDiv.className = c.cardSectionConfig?.cardsConfig?.cardClass || "card h-100";
                if (card.image) {
                    const img = document.createElement("img");
                    img.className = c.cardSectionConfig?.cardsConfig?.imageClass || "card-img-top";
                    img.src = card.image;
                    img.alt = card.heading || "";
                    cardDiv.appendChild(img);
                }
                if (card.heading) {
                    const h = document.createElement("h5");
                    h.className = c.cardSectionConfig?.cardsConfig?.headingClass || "card-title mt-2";
                    h.textContent = card.heading;
                    cardDiv.appendChild(h);
                }
                if (card.description) {
                    const p = document.createElement("p");
                    p.className = c.cardSectionConfig?.cardsConfig?.descriptionClass || "card-text text-muted";
                    p.textContent = card.description;
                    cardDiv.appendChild(p);
                }
                col.appendChild(cardDiv);
                grid.appendChild(col);
            });
            container.appendChild(grid);
        }
        section.appendChild(container);
        this.appendChild(section);
    }
}
customElements.define("portfolio-section", PortfolioSection);

// 3. TestimonialSection
class TestimonialSection extends HTMLElement {
    static get observedAttributes() { return ["data", "config"]; }
    constructor() {
        super();
        this.data = {};
        this.config = {};
    }
    attributeChangedCallback(name, oldV, newV) {
        if (name === "data") this.data = parseAttr(newV, {});
        if (name === "config") this.config = parseAttr(newV, {});
        this.render();
    }
    connectedCallback() { this.render(); }
    render() {
        clearChildren(this);
        const d = this.data || {}, c = this.config || {};
        const section = document.createElement("section");
        section.className = c.sectionClass || "bg-light";
        const container = document.createElement("div");
        container.className = c.containerWrapperClass || "container py-5";
        // Heading
        if (d.heading) {
            const h = document.createElement("h2");
            h.className = c.headingClass || "fw-bold text-secondary";
            h.textContent = d.heading;
            container.appendChild(h);
        }
        if (d.subHeading) {
            const sh = document.createElement("h5");
            sh.className = c.subHeadingClass || "";
            sh.textContent = d.subHeading;
            container.appendChild(sh);
        }
        if (d.description) {
            const desc = document.createElement("p");
            desc.className = c.descriptionClass || "";
            desc.textContent = d.description;
            container.appendChild(desc);
        }
        // Carousel
        if (Array.isArray(d.testimonials) && d.testimonials.length) {
            const carouselId = "testimonial-carousel-" + Math.random().toString(36).slice(2, 8);
            const carousel = document.createElement("div");
            carousel.className = "carousel slide " + (c.testimonialCarouselClass || "");
            carousel.id = carouselId;
            carousel.setAttribute("data-bs-ride", "carousel");
            // Indicators
            const indicators = document.createElement("div");
            indicators.className = "carousel-indicators";
            d.testimonials.forEach((_, i) => {
                const btn = document.createElement("button");
                btn.type = "button";
                btn.setAttribute("data-bs-target", "#" + carouselId);
                btn.setAttribute("data-bs-slide-to", i);
                if (i === 0) btn.className = "active";
                indicators.appendChild(btn);
            });
            carousel.appendChild(indicators);
            // Inner
            const inner = document.createElement("div");
            inner.className = "carousel-inner";
            d.testimonials.forEach((t, i) => {
                const item = document.createElement("div");
                item.className = "carousel-item" + (i === 0 ? " active" : "");
                const card = document.createElement("div");
                card.className = c.cardClass || "card h-100";
                const body = document.createElement("div");
                body.className = c.cardBodyClass || "card-body text-center";
                // Review
                const review = document.createElement("p");
                review.className = c.testimonialReviewClass || "text-center mx-auto";
                review.textContent = t.review || "";
                body.appendChild(review);
                // User
                if (t.User) {
                    const userWrap = document.createElement("div");
                    userWrap.className = c.testimonialUserWrapperClass || "d-flex justify-content-center align-items-center";
                    if (t.User.profilePicture) {
                        const img = document.createElement("img");
                        img.className = c.testimonialUserPictureClass || "rounded-pill me-2";
                        img.src = t.User.profilePicture;
                        img.alt = t.User.name || "";
                        img.style.width = c.testimonialUserPictureSize || "50px";
                        img.style.height = c.testimonialUserPictureSize || "50px";
                        userWrap.appendChild(img);
                    }
                    const nameDiv = document.createElement("div");
                    nameDiv.className = c.testimonialUserNameWrapperClass || "";
                    const name = document.createElement("span");
                    name.className = c.testimonialUserNameClass || "";
                    name.textContent = t.User.name || "";
                    nameDiv.appendChild(name);
                    if (t.User.designation) {
                        const desig = document.createElement("span");
                        desig.className = "ms-2 text-muted small";
                        desig.textContent = t.User.designation;
                        nameDiv.appendChild(desig);
                    }
                    userWrap.appendChild(nameDiv);
                    body.appendChild(userWrap);
                }
                card.appendChild(body);
                item.appendChild(card);
                inner.appendChild(item);
            });
            carousel.appendChild(inner);
            // Controls
            if (d.testimonials.length > 1) {
                const prev = document.createElement("button");
                prev.className = "carousel-control-prev";
                prev.type = "button";
                prev.setAttribute("data-bs-target", "#" + carouselId);
                prev.setAttribute("data-bs-slide", "prev");
                prev.innerHTML = `<span class="carousel-control-prev-icon"></span>`;
                carousel.appendChild(prev);
                const next = document.createElement("button");
                next.className = "carousel-control-next";
                next.type = "button";
                next.setAttribute("data-bs-target", "#" + carouselId);
                next.setAttribute("data-bs-slide", "next");
                next.innerHTML = `<span class="carousel-control-next-icon"></span>`;
                carousel.appendChild(next);
            }
            container.appendChild(carousel);
        }
        section.appendChild(container);
        this.appendChild(section);
    }
}
customElements.define("testimonial-section", TestimonialSection);

// 4. FAQSection
class FaqSection extends HTMLElement {
    static get observedAttributes() { return ["data", "config"]; }
    constructor() {
        super();
        this.data = {};
        this.config = {};
    }
    attributeChangedCallback(name, oldV, newV) {
        if (name === "data") this.data = parseAttr(newV, {});
        if (name === "config") this.config = parseAttr(newV, {});
        this.render();
    }
    connectedCallback() { this.render(); }
    render() {
        clearChildren(this);
        const d = this.data || {}, c = this.config || {};
        const section = document.createElement("section");
        section.className = c.sectionClass || "py-5 bg-white";
        const container = document.createElement("div");
        container.className = c.containerClass || "container";
        // Heading
        if (d.heading) {
            const h = document.createElement("h2");
            h.className = c.headingClass || "h2 fw-bold text-center mb-4";
            h.textContent = d.heading;
            container.appendChild(h);
        }
        if (d.subHeading) {
            const sh = document.createElement("h5");
            sh.className = c.subHeadingClass || "h5 text-secondary text-center mb-3";
            sh.textContent = d.subHeading;
            container.appendChild(sh);
        }
        if (d.description) {
            const desc = document.createElement("p");
            desc.className = c.descriptionClass || "mb-4 text-center text-muted";
            desc.textContent = d.description;
            container.appendChild(desc);
        }
        // Accordion
        const acc = document.createElement("div");
        acc.className = c.accordionWrapperClass || "accordion";
        (d.items || []).forEach((item, i) => {
            const accItem = document.createElement("div");
            accItem.className = "accordion-item";
            const h = document.createElement("h2");
            h.className = "accordion-header";
            h.id = `faq-heading-${i}`;
            const btn = document.createElement("button");
            btn.className = c.accordionLinkClass || "accordion-button";
            btn.type = "button";
            btn.setAttribute("data-bs-toggle", "collapse");
            btn.setAttribute("data-bs-target", `#faq-collapse-${i}`);
            btn.setAttribute("aria-expanded", i === 0 ? "true" : "false");
            btn.setAttribute("aria-controls", `faq-collapse-${i}`);
            btn.textContent = item.title || item.name || "";
            h.appendChild(btn);
            accItem.appendChild(h);
            const collapse = document.createElement("div");
            collapse.id = `faq-collapse-${i}`;
            collapse.className = "accordion-collapse collapse" + (i === 0 ? " show" : "");
            collapse.setAttribute("aria-labelledby", `faq-heading-${i}`);
            collapse.setAttribute("data-bs-parent", c.closeOthers ? "#faq-accordion" : "");
            const body = document.createElement("div");
            body.className = "accordion-body";
            body.textContent = item.description || "";
            collapse.appendChild(body);
            accItem.appendChild(collapse);
            acc.appendChild(accItem);
        });
        container.appendChild(acc);
        section.appendChild(container);
        this.appendChild(section);
    }
}
customElements.define("faq-section", FaqSection);

// 5. FooterSection
class FooterSection extends HTMLElement {
    static get observedAttributes() { return ["data", "config"]; }
    constructor() {
        super();
        this.data = {};
        this.config = {};
    }
    attributeChangedCallback(name, oldV, newV) {
        if (name === "data") this.data = parseAttr(newV, {});
        if (name === "config") this.config = parseAttr(newV, {});
        this.render();
    }
    connectedCallback() { this.render(); }
    render() {
        clearChildren(this);
        const d = this.data || {}, c = this.config || {};
        const section = document.createElement("footer");
        section.className = c.sectionClass || "footer-section bg-dark text-light pt-5 pb-3";
        const container = document.createElement("div");
        container.className = c.containerClass || "container";
        const row = document.createElement("div");
        row.className = c.rowClass || "row";
        // About
        const aboutCol = document.createElement("div");
        aboutCol.className = c.aboutColClass || "col-md-4 mb-4";
        if (d.companyDetails?.logo) {
            const logo = document.createElement("img");
            logo.className = c.logoClass || "mb-3";
            logo.src = d.companyDetails.logo;
            logo.alt = d.companyDetails.name || "";
            logo.style.height = "40px";
            aboutCol.appendChild(logo);
        }
        if (d.companyDetails?.name) {
            const name = document.createElement("div");
            name.className = c.companyNameClass || "h5 mb-2";
            name.textContent = d.companyDetails.name;
            aboutCol.appendChild(name);
        }
        if (d.companyDetails?.address) {
            const addr = document.createElement("div");
            addr.className = c.addressClass || "mb-2";
            addr.textContent = [
                d.companyDetails.address.line1,
                d.companyDetails.address.line2,
                d.companyDetails.address.location,
                d.companyDetails.address.area,
                d.companyDetails.address.city,
                d.companyDetails.address.state,
                d.companyDetails.address.country,
                d.companyDetails.address.pincode
            ].filter(Boolean).join(", ");
            aboutCol.appendChild(addr);
        }
        // Social links
        if (d.companyDetails?.contactDetails?.socialLinks) {
            const social = document.createElement("div");
            social.className = c.socialLinksClass || "d-flex gap-2 mb-3";
            d.companyDetails.contactDetails.socialLinks.forEach(link => {
                const a = document.createElement("a");
                a.href = link.url;
                a.target = "_blank";
                a.rel = "noopener";
                a.textContent = link.type[0].toUpperCase() + link.type.slice(1);
                social.appendChild(a);
            });
            aboutCol.appendChild(social);
        }
        row.appendChild(aboutCol);
        // Links
        const linksCol = document.createElement("div");
        linksCol.className = c.linksColClass || "col-md-2 mb-4";
        if (Array.isArray(d.navItems)) {
            const ul = document.createElement("ul");
            ul.className = c.navListClass || "list-unstyled";
            d.navItems.forEach(item => {
                const li = document.createElement("li");
                li.className = c.navItemClass || "mb-2";
                const a = document.createElement("a");
                a.href = item.url || "#";
                a.textContent = item.menuName || "";
                a.className = "text-light";
                li.appendChild(a);
                ul.appendChild(li);
            });
            linksCol.appendChild(ul);
        }
        row.appendChild(linksCol);
        // Newsletter
        const newsCol = document.createElement("div");
        newsCol.className = c.newsletterColClass || "col-md-3 mb-4";
        if (Array.isArray(d.newsletterFormFields)) {
            const form = document.createElement("form");
            form.className = c.newsletterFormClass || "newsletter-form d-flex";
            d.newsletterFormFields.forEach(fld => {
                if (fld.type === "input") {
                    const inp = document.createElement("input");
                    inp.type = fld.templateOptions?.type || "text";
                    inp.placeholder = fld.templateOptions?.placeholder || "";
                    inp.required = !!fld.templateOptions?.required;
                    inp.className = c.newsletterInputClass || "form-control me-2";
                    form.appendChild(inp);
                }
            });
            const btn = document.createElement("button");
            btn.type = "submit";
            btn.className = c.newsletterBtnClass || "btn btn-primary";
            btn.textContent = "Subscribe";
            form.appendChild(btn);
            newsCol.appendChild(form);
        }
        row.appendChild(newsCol);
        // Contact
        const contactCol = document.createElement("div");
        contactCol.className = c.contactColClass || "col-md-3 mb-4";
        if (d.companyDetails?.contactDetails) {
            const info = document.createElement("div");
            info.className = c.contactInfoClass || "mb-2";
            if (d.companyDetails.contactDetails.email) {
                const em = document.createElement("div");
                em.textContent = "Email: " + d.companyDetails.contactDetails.email;
                info.appendChild(em);
            }
            if (d.companyDetails.contactDetails.phone) {
                const ph = document.createElement("div");
                ph.textContent = "Phone: " + d.companyDetails.contactDetails.phone;
                info.appendChild(ph);
            }
            contactCol.appendChild(info);
        }
        // QuickSignOn placeholder
        if (c.showQuickSignOn && d.quickSignOn) {
            const qso = document.createElement("div");
            qso.className = "quick-signon-placeholder";
            qso.textContent = "Quick SignOn Form";
            contactCol.appendChild(qso);
        }
        row.appendChild(contactCol);
        container.appendChild(row);
        // Copyright
        const copy = document.createElement("div");
        copy.className = c.copyrightClass || "text-center mt-4";
        copy.textContent = "© " + (new Date().getFullYear()) + " " + (d.companyDetails?.name || "");
        container.appendChild(copy);
        section.appendChild(container);
        this.appendChild(section);
    }
}
customElements.define("footer-section", FooterSection);

// (Optional) Export for window
if (!window.customElementsList) window.customElementsList = [];
window.customElementsList.push(
    { component: "header-bar-section", componentClass: HeaderBarSection },
    { component: "hero-section", componentClass: HeroSection },
    { component: "portfolio-section", componentClass: PortfolioSection },
    { component: "testimonial-section", componentClass: TestimonialSection },
    { component: "faq-section", componentClass: FaqSection },
    { component: "footer-section", componentClass: FooterSection }
);
