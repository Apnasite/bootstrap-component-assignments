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
function clearChildren(element) {
    while (element.firstChild) element.removeChild(element.firstChild);
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
        wrap.className = c.headerWrapperClass || "navbar navbar-expand-lg navbar-light shadow-sm fixed-top ";
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
            span.className = c.companyNameClass || "fw-bold text-white";
            span.textContent = d.companyDetails.companyName;
            logo.appendChild(span);
        }
        container.appendChild(logo);
        // Navbar links
        const nav = document.createElement("ul");
        nav.className = c.navClass || "navbar-nav text-white me-auto mb-2 mb-lg-0";
        
        // NavItems (dropdown style)
        function createNavItem(link, isNested = false) {
          const li = document.createElement("li");
          if (link.children && link.children.length > 0) {
            li.className = isNested ? "dropdown-submenu" : "nav-item dropdown";
            const a = document.createElement("a");
            a.className = isNested ? "dropdown-item dropdown-toggle" : "nav-link dropdown-toggle text-white ";
            a.href = link.url || "#";
            a.setAttribute("role", "button");
            a.setAttribute("data-bs-toggle", "dropdown");
            a.textContent = link.label || "";
            li.appendChild(a);

            const dropdown = document.createElement("ul");
            dropdown.className = "dropdown-menu";

            link.children.forEach(child => {
              dropdown.appendChild(createNavItem(child, true));
            });

            li.appendChild(dropdown);
          } else {
            li.className = isNested ? "" : "nav-item ";
            const a = document.createElement("a");
            a.className = isNested ? "dropdown-item" : "nav-link text-white";
            a.href = link.url || "#";
            a.textContent = link.label || "";
            li.appendChild(a);
          }
          return li;
        }

        (d.navLinks || []).forEach(link => {
          nav.appendChild(createNavItem(link, false));
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
    static get observedAttributes() {
        return ["data", "config"];
    }

    constructor() {
        super();
        this.data = {};
        this.config = {};
    }

    attributeChangedCallback(name, oldVal, newVal) {
        if (name === "data") this.data = parseAttr(newVal, {});
        if (name === "config") this.config = parseAttr(newVal, {});
        this.render();
    }

    connectedCallback() {
        this.render();
    }

    render() {
        clearChildren(this);
        const d = this.data || {};
        const c = this.config || {};

        // Section wrapper
        const section = document.createElement("section");
        section.className = c.heroWrapperClass || "py-4 position-relative text-white mb-5 ";
        if (d.backgroundImage) section.style.backgroundImage = `url('${d.backgroundImage}')`;

        // Overlay
       if (c.overlay) {
            const overlay = document.createElement("div");
            overlay.style.position = "absolute";
            overlay.style.top = 0;
            overlay.style.left = 0;
            overlay.style.width = "100%";
            overlay.style.height = "100%";
            overlay.style.zIndex = 0;
            overlay.style.background = "rgba(0,0,0,0.1)";       
            section.appendChild(overlay);
        }


        // Content Container
        const container = document.createElement("div");
        container.className = c.heroContainerClass || "container text-left position-relative z-10";
        const row = document.createElement("div");
        row.className = c.heroContentWrapperClass || "row align-items-center";
        // Left content
        const left = document.createElement("div");
        left.className = c.heroLeftClass || "col-lg-7 col-sm-6";

        const textWrap = document.createElement("div");
        textWrap.className = c.heroTextContentWrapperClass || "py-5";
           
        // Heading Section
        if (d.subHeading) {
            const badge = document.createElement("span");
            badge.className = c.subHeadingClass || "badge bg-light text-dark mb-3";
            badge.textContent = d.subHeading;
            textWrap.appendChild(badge);;
        }

        if (d.heading) {
            const h1 = document.createElement("h1");
            h1.className = c.headingClass || "display-4 fw-bold";
            h1.innerHTML = d.heading;
            textWrap.appendChild(h1);;
        }

        if (d.description) {
            const p = document.createElement("p");
            p.className = c.descriptionClass || "lead my-3";
            p.textContent = d.description;
             textWrap.appendChild(p);;
        }

        // Cards (e.g., opening hours)
        if (Array.isArray(d.cards) && d.cards.length) {
            const cardContainer = document.createElement("div");
            cardContainer.className = c.heroCardsContentWrapperClass || "my-4";

            d.cards.forEach(card => {
                const cardItem = document.createElement("div");
                cardItem.className = c.heroCardWrapperClass || "mb-2 fw-medium";
                if (card.heading) {
                    const h = document.createElement("div");
                    h.innerHTML = `<i class="bi bi-clock me-2"></i> ${card.heading}`;
                    cardItem.appendChild(h);
                }
                cardContainer.appendChild(cardItem);
            });

             textWrap.appendChild(cardContainer); 
        }

        // Buttons
        const buttonWrap = document.createElement("div");
        buttonWrap.className = c.buttonWrapperClass || "d-flex justify-content-center gap-3 my-4 flex-wrap";

        if (d.primaryButton) {
            const btn1 = document.createElement("a");
            btn1.href = d.primaryButton.link || "#";
            btn1.textContent = d.primaryButton.text || "Primary";
            btn1.className = d.primaryButton.class || "btn btn-warning fw-bold px-4";
            buttonWrap.appendChild(btn1);
        }

        if (d.secondaryButton) {
            const btn2 = document.createElement("a");
            btn2.href = d.secondaryButton.link || "#";
            btn2.textContent = d.secondaryButton.text || "Secondary";
            btn2.className = d.secondaryButton.class || "btn btn-outline-light fw-bold px-4";
            buttonWrap.appendChild(btn2);
        }

        if (buttonWrap.children.length > 0) {
            textWrap.appendChild(buttonWrap);
        }

        left.appendChild(textWrap);
        row.appendChild(left);
         // Right content (image)
        const right = document.createElement("div");
        right.className = c.heroRightClass || "col-lg-5 col-sm-6";

        if (Array.isArray(d.images) && d.images.length) {
           const carouselId = `carousel-${Math.random().toString(36).substr(2, 9)}`;

           const carousel = document.createElement("div");
           carousel.id = carouselId;
           carousel.className = "carousel slide";
           carousel.setAttribute("data-bs-ride", "carousel");

           const carouselInner = document.createElement("div");
           carouselInner.className = "carousel-inner";

           d.images.forEach((src, index) => {
               const item = document.createElement("div");
               item.className = "carousel-item" + (index === 0 ? " active" : "");

               const img = document.createElement("img");
               img.className = c.contentImageClass || "d-block w-300 img-fluid rounded";
               img.style.width = "100%";
               img.style.height = "800px";
               img.style.top= "25mm";
               img.style.position= "relative";
               img.style.objectFit = "cover";
               img.style.borderRadius = "12px";
               img.src = src;
               img.alt = `Slide ${index + 1}`;

               item.appendChild(img);
               carouselInner.appendChild(item);
            });

           const prevBtn = document.createElement("button");
           prevBtn.className = "carousel-control-prev";
           prevBtn.type = "button";
           prevBtn.setAttribute("data-bs-target", `#${carouselId}`);
           prevBtn.setAttribute("data-bs-slide", "prev");
           prevBtn.innerHTML = `<span class="carousel-control-prev-icon" aria-hidden="true"></span>
                                <span class="visually-hidden">Previous</span>`;

           const nextBtn = document.createElement("button");
           nextBtn.className = "carousel-control-next";
           nextBtn.type = "button";
           nextBtn.setAttribute("data-bs-target", `#${carouselId}`);
           nextBtn.setAttribute("data-bs-slide", "next");
           nextBtn.innerHTML = `<span class="carousel-control-next-icon" aria-hidden="true"></span>
                                <span class="visually-hidden">Next</span>`;

           carousel.appendChild(carouselInner);
           carousel.appendChild(prevBtn);
           carousel.appendChild(nextBtn);

           right.appendChild(carousel);
        }

        row.appendChild(right);
        container.appendChild(row);
        section.appendChild(container);
        this.appendChild(section);
    }
}

customElements.define("hero-section", HeroSection);


// 2. Portfolio Section
class PortfolioSection extends HTMLElement {
  static get observedAttributes() {
    return ["data", "config"];
  }

  constructor() {
    super();
    this.data = {};
    this.config = {};
  }

  attributeChangedCallback(name, oldValue, newValue) {
    try {
      if (name === "data") this.data = JSON.parse(newValue || "{}");
      if (name === "config") this.config = JSON.parse(newValue || "{}");
    } catch {
      console.warn("Invalid JSON in", name);
    }
    this.render();
  }

  connectedCallback() {
    this.render();
  }

  render() {
    this.innerHTML = "";
    const d = this.data || {};
    const c = this.config || {};
    if (c.layout !== "culinary" || !d.culinaryData) return;

    const section = document.createElement("section");
    section.className = `${c.sectionClass || "py-5 bg-dark"} text-white`;

    const container = document.createElement("div");
    container.className = c.containerClass || "container";

    const row = document.createElement("div");
    row.className = "row align-items-center";

    const { heading, subHeading, culinaryData } = d;
    const { description, cards, images, established } = culinaryData;

    // === Left Column ===
    const leftCol = document.createElement("div");
    leftCol.className = "col-lg-6";

    if (heading) {
      const h = document.createElement("h2");
      h.className = "display-5 fw-bold mb-3 border-start border-4 ps-3 border-warning";
      h.textContent = heading;
      leftCol.appendChild(h);
    }

    if (subHeading) {
      const sh = document.createElement("p");
      sh.className = "fst-italic text-warning mb-3";
      sh.textContent = subHeading;
      leftCol.appendChild(sh);
    }

    if (description) {
      const p = document.createElement("p");
      p.className = "mb-4";
      p.textContent = description;
      leftCol.appendChild(p);
    }

    if (cards) {
      const card = document.createElement("div");
      card.className = "d-flex bg-black bg-opacity-25 p-3 mt-4 rounded align-items-center";


      if (cards.image) {
        const img = document.createElement("img");
        img.src = cards.image;
        img.className = "rounded-circle me-3";
        img.style.width = "60px";
        img.style.height = "60px";
        img.style.objectFit = "cover";
        card.appendChild(img);
      }

      const textContainer = document.createElement("div");

      const quote = document.createElement("blockquote");
      quote.className = "fst-italic mb-1";
      quote.textContent = `"${cards.text}"`;

      const author = document.createElement("small");
      author.className = "fw-semibold text-white-50";
      author.textContent = cards.author;

      textContainer.appendChild(quote);
      textContainer.appendChild(author);
      card.appendChild(textContainer);
      leftCol.appendChild(card);
    }

    // === Right Column with Images ===
    const rightCol = document.createElement("div");
    rightCol.className = "col-lg-6 position-relative text-center mt-4 mt-lg-0";

    const imageWrapper = document.createElement("div");
    imageWrapper.className = "position-relative d-inline-block";

    if (images && images[0]) {
      const imgMain = document.createElement("img");
      imgMain.src = images[0];
      imgMain.className = "img-fluid rounded shadow";
      imgMain.style.width = "630px";
      imgMain.style.height = "315px";
      imgMain.style.border = "4pt solid gray;"
      imageWrapper.appendChild(imgMain);

      if (established) {
        const badge = document.createElement("div");
        badge.className = "position-absolute top-0 start-0 translate-middle-y bg-warning text-dark fw-bold rounded-pill px-3 py-2 shadow";
        badge.style.top = "20px";
        badge.style.left = "20px";
        badge.style.fontSize = "0.9rem";
        badge.textContent = `Est. ${established}`;
        imageWrapper.appendChild(badge);
      }
    }

    if (images && images[1]) {
      const imgOverlay = document.createElement("img");
      imgOverlay.src = images[1];
      imgOverlay.className = "position-absolute rounded shadow";
      imgOverlay.style.width = "367px";
      imgOverlay.style.height = "221px";
      imgOverlay.style.bottom = "-53px";
      imgOverlay.style.right = "-93px";
      imgOverlay.style.border = "4pt solid gray;"
      imageWrapper.appendChild(imgOverlay);
    }

    rightCol.appendChild(imageWrapper);

    // Append left and right columns after both are created
    row.appendChild(leftCol);
    row.appendChild(rightCol);
    container.appendChild(row);

    // === Features Section ===
    const featuresSection = document.createElement("div");
    featuresSection.className = "text-white mt-5 pt-5 pb-4 rounded";

    const featureRow = document.createElement("div");
    featureRow.className = "row text-center mb-5";

    const features = [
      {
        iconClass: "bi-award",
        title: "Award Winning",
        text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros."
      },
      {
        iconClass: "bi-egg-fried",
        title: "Fresh Ingredients",
        text: "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla."
      },
      {
        iconClass: "bi-people",
        title: "Expert Team",
        text: "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit."
      },
      {
        iconClass: "bi-heart-fill",
        title: "Cooked with Love",
        text: "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo."
      }
    ];

    features.forEach((f) => {
      const col = document.createElement("div");
      col.className = "col-md-3 mb-4";

      const icon = document.createElement("div");
      icon.className = "rounded-circle bg-black bg-opacity-25 d-flex justify-content-center align-items-center mx-auto mb-3";
      icon.style.width = "60px";
      icon.style.height = "60px";

      const i = document.createElement("i");
      i.className = `bi ${f.iconClass} text-warning fs-4`;
      icon.appendChild(i);

      const title = document.createElement("h5");
      title.className = "fw-bold";
      title.textContent = f.title;

      const desc = document.createElement("p");
      desc.className = "small text-light";
      desc.textContent = f.text;

      col.appendChild(icon);
      col.appendChild(title);
      col.appendChild(desc);
      featureRow.appendChild(col);
    });

    featuresSection.appendChild(featureRow);

    // === Stats Row ===
    const statsRow = document.createElement("div");
    statsRow.className = "row text-center bg-black bg-opacity-25 py-4 rounded";

    const stats = [
      { value: "15+", label: "Years Experience" },
      { value: "5", label: "Expert Chefs" },
      { value: "3", label: "Culinary Awards" },
      { value: "15000+", label: "Happy Customers" }
    ];

    stats.forEach((s) => {
      const col = document.createElement("div");
      col.className = "col-md-3 mb-3";

      const number = document.createElement("div");
      number.className = "h3 text-warning fw-bold mb-1";
      number.textContent = s.value;

      const label = document.createElement("div");
      label.className = "fw-semibold";
      label.textContent = s.label;

      col.appendChild(number);
      col.appendChild(label);
      statsRow.appendChild(col);
    });

    featuresSection.appendChild(statsRow);

    container.appendChild(featuresSection);
    section.appendChild(container);
    this.appendChild(section);
  }
}

customElements.define("portfolio-section", PortfolioSection);


//2. MenuSection
class MenuSection extends HTMLElement {
  static get observedAttributes() {
    return ["data", "config"];
  }

  constructor() {
    super();
    this.data = {};
    this.config = {};
    this.currentFilter = "all";
  }

  attributeChangedCallback(name, oldValue, newValue) {
    try {
      if (name === "data") this.data = JSON.parse(newValue || "{}");
      if (name === "config") this.config = JSON.parse(newValue || "{}");
    } catch (e) {
      console.warn(`Invalid JSON in ${name}:`, e);
    }
    this.render();
  }

  connectedCallback() {
    this.render();
  }

  render() {
    clearChildren(this);
    const d = this.data || {};
    const c = this.config || {};
    const { heading, subHeading, tabs = [], menuItems = [], specials = [] } = d;

    const section = document.createElement("section");
    section.className = "py-5 text-white";

    const container = document.createElement("div");
    container.className = "container";

    if (heading) {
      const h = document.createElement("h2");
      h.className = "text-center mb-3 display-5 fw-bold";
      h.textContent = heading;
      container.appendChild(h);
    }

    if (subHeading) {
      const sh = document.createElement("p");
      sh.className = "text-center fst-italic text-warning mb-4";
      sh.textContent = subHeading;
      container.appendChild(sh);
    }

    const nav = document.createElement("ul");
    nav.className = "nav justify-content-center mb-4";

    tabs.forEach((tab) => {
      const li = document.createElement("li");
      li.className = "nav-item";

      const btn = document.createElement("button");
      btn.className = `nav-link text-white ${this.currentFilter === tab.value ? "active bg-warning text-dark fw-bold" : ""}`;
      btn.textContent = tab.label;
      btn.style.cursor = "pointer";

      btn.addEventListener("click", () => {
        this.currentFilter = tab.value;
        this.render();
      });

      li.appendChild(btn);
      nav.appendChild(li);
    });

    container.appendChild(nav);

    const row = document.createElement("div");
    row.className = "row row-cols-1 row-cols-md-2  g-4";

    const filteredItems = this.currentFilter === "all"
      ? menuItems
      : menuItems.filter(item => item.category === this.currentFilter);

    filteredItems.forEach((item) => {
      const col = document.createElement("div");
      col.className = "col";
      // Create card for menu item
      const card = document.createElement("div");
      card.className = "card bg-dark text-white p-3 d-flex flex-row gap-3";
      // Image section
      const imgWrapper = document.createElement("div");
      imgWrapper.style.width = "100px";
      imgWrapper.style.height = "100px";
      imgWrapper.style.flexShrink = "0";
      
      const img = document.createElement("img");
      img.src = item.image;
      img.alt = item.name;
      img.className = "img-fluid rounded";
      img.style.height = "100%";
      img.style.objectFit = "cover";
      imgWrapper.appendChild(img);
      // Content section (name, description, price)
      const content = document.createElement("div");

      const title = document.createElement("h5");
      title.className = "mb-1";
      title.textContent = item.name;

      const badge = document.createElement("span");
      badge.className = "badge text-warning bg-opacity-25 ms-2";
      badge.textContent = item.label;
      title.appendChild(badge);

      const desc = document.createElement("p");
      desc.className = "mb-1";
      desc.textContent = item.description;

      const price = document.createElement("div");
      price.className = "text-warning fw-bold";
      price.textContent = `$${item.price}`;

      content.appendChild(title);
      content.appendChild(desc);
      content.appendChild(price);

      card.appendChild(imgWrapper);
      card.appendChild(content);
      col.appendChild(card);
      row.appendChild(col);
    });

    container.appendChild(row);


    // === Specials Section ===
    if (specials.length > 0) {
      const specialsWrapper = document.createElement("div");
      specialsWrapper.className = "mt-5  ";

      const header = document.createElement("div");
      header.className = "justify-content-between align-items-center mb-4 mt-4 ";

      const title = document.createElement("h4");
      title.className = "text-warning bg-black bg-opacity-30 py-2 rounded align-items-center d-flex gap-2 mb-0";
      title.innerHTML = `<i class="bi bi-award" me-2></i> Chef's Specials`;
      header.appendChild(title);

      // Centered button wrapper
      const btnWrapper = document.createElement("div");
      btnWrapper.className = "text-center w-100";  // Center align within full width

      const btn = document.createElement("a");
      btn.className = "btn btn-warning text-dark fw-semibold mb-5 ";
      btn.href = "#";
      btn.innerHTML = `<i class="bi bi-file-earmark-pdf-fill me-2"></i>Download Full Menu`;

      btnWrapper.appendChild(btn);
      specialsWrapper.appendChild(btnWrapper);


      specialsWrapper.appendChild(header);
      // Grid of Specials
      const specialsRow = document.createElement("div");
      specialsRow.className = "row row-cols-1 row-cols-md-2 g-4";

      specials.forEach(item => {
        const col = document.createElement("div");
        col.className = "col";
        col.appendChild(this.createSpecialCard(item));
        specialsRow.appendChild(col);
      });

      specialsWrapper.appendChild(specialsRow);
      container.appendChild(specialsWrapper);
    }

    section.appendChild(container);
    this.appendChild(section);
  }

  createSpecialCard(item) {
    const card = document.createElement("div");
    card.className = "card bg-secondary text-white overflow-hidden shadow";

    const img = document.createElement("img");
    img.src = item.image;
    img.alt = item.name;
    img.className = "card-img-top img-fluid";
    img.style.width = "100%";
    img.style.height = "300px";
    card.appendChild(img);

    const badgeContainer = document.createElement("div");
    badgeContainer.className = "position-absolute top-0 start-0 p-2 d-flex gap-2 flex-wrap";

    item.tags.forEach(tag => {
      const badge = document.createElement("span");
      badge.className = `badge text-uppercase fw-semibold ${this.getBadgeClass(tag)}`;
      badge.textContent = tag;
      badgeContainer.appendChild(badge);
    });

    card.appendChild(badgeContainer);

    const body = document.createElement("div");
    body.className = "card-body";

    const title = document.createElement("h5");
    title.className = "card-title text-white";
    title.textContent = item.name;

    const desc = document.createElement("p");
    desc.className = "card-text text-light small";
    desc.textContent = item.description;

    const price = document.createElement("div");
    price.className = "fw-bold text-warning";
    price.textContent = `$${item.price}`;

    body.appendChild(title);
    body.appendChild(desc);
    body.appendChild(price);
    card.appendChild(body);

    return card;
  }

  getBadgeClass(tag) {
    const classes = {
      "SPECIAL": "bg-light text-dark",
      "VEGAN": "bg-success",
      "SPICY": "bg-danger",
      "NEW": "bg-primary",
      "GLUTEN FREE": "bg-info text-dark",
    };
    return classes[tag.toUpperCase()] || "bg-secondary";
  }
}

customElements.define("menu-section", MenuSection);



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
        section.className = c.sectionClass || "bg-dark bg-opacity-25  text-white py-5 position-relative ";
        const container = document.createElement("div");
        container.className = c.containerWrapperClass || "container py-5";
        // Heading
        if (d.heading) {
            const h = document.createElement("h2");
            h.className = c.headingClass || "fw-bold text-center mb-3";
            h.textContent = d.heading;
            container.appendChild(h);
        }
        if (d.description) {
            const desc = document.createElement("p");
            desc.className = c.descriptionClass || "text-center text-muted mb-4";
            desc.textContent = d.description;
            container.appendChild(desc);
        }
        // Carousel
        if (Array.isArray(d.testimonials) && d.testimonials.length) {
            const carouselId = "testimonial-carousel-" + Math.random().toString(36).slice(4, 8);
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
                card.className = c.cardClass || "card h-500 bg-dark  text-white rounded-4";
                const body = document.createElement("div");
                body.className = c.cardBodyClass || "card-body text-center p-4";

                if (t.rating) {
                  const stars = document.createElement("div");
                  stars.className = c.testimonialStarsClass || "text-warning mb-2";
                  stars.innerHTML = "★".repeat(t.rating) + "☆".repeat(5 - t.rating);
                  body.appendChild(stars);
                }
                // Review
                const review = document.createElement("p");
                review.className = c.testimonialReviewClass || "text-center mx-auto mb-3";
                review.textContent = t.text || "";
                body.appendChild(review);
                // User
                if (t.User) {
                    const userWrap = document.createElement("div");
                    userWrap.className = c.testimonialUserWrapperClass || "d-flex justify-content-center align-items-center mt-4";
                    if (t.User.profilePicture) {
                        const img = document.createElement("img");
                        img.className = c.testimonialUserPictureClass || "rounded-pill mb-2";
                        img.src = t.User.profilePicture;
                        img.alt = t.User.name || "";
                        img.style.width = c.testimonialUserPictureSize || "80px";
                        img.style.height = c.testimonialUserPictureSize || "80px";
                        userWrap.appendChild(img);
                    }
                    const nameDiv = document.createElement("div");
                    nameDiv.className = c.testimonialUserNameWrapperClass || "";
                    const name = document.createElement("span");
                    name.className = c.testimonialUserNameClass || "";
                    name.textContent = t.User.name || "";
                    nameDiv.style.display = "flex";
                    nameDiv.style.flexDirection = "column";
                    nameDiv.style.alignItems = "center";
                    nameDiv.style.marginLeft = "10px";

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
                const cardWrapper = document.createElement("div");
                cardWrapper.className = "d-flex justify-content-center";
                card.style.maxWidth = "600px";
                cardWrapper.appendChild(card);
                item.appendChild(cardWrapper);

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
         const style = document.createElement("style");
         style.textContent = `
           .carousel .carousel-item {
           transition: transform 0.6s ease;
          }
           .carousel-indicators button {
           background-color: #ccc;
          }
          .carousel-indicators .active {
           background-color: #f0c36d;
          } 

          .carousel .card {
            border: none;
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
          }
         .carousel .card-body {
           padding: 2rem;
          }
          .carousel img.rounded-pill {
            object-fit: cover;
            border: 3px solid #f0c36d;
          }
        
        }`;

       this.appendChild(style);
        this.appendChild(section);
    }
}
customElements.define("testimonial-section", TestimonialSection);

// Chefs-section
class ChefTeam extends HTMLElement {
  static get observedAttributes() { return ["data", "config"]; }

  constructor() {
    super();
    this.data = {};
    this.config = {};
  }

  attributeChangedCallback(name, oldVal, newVal) {
    if (name === "data") this.data = JSON.parse(newVal || "{}");
    if (name === "config") this.config = JSON.parse(newVal || "{}");
    this.render();
  }

  connectedCallback() {
    this.render();
  }

  render() {
    this.innerHTML = ""; // clear existing
    const d = this.data || {}, c = this.config || {};
    const section = document.createElement("section");
    section.className = c.sectionClass || "py-5 text-white";
    const container = document.createElement("div");
    container.className = c.containerWrapperClass || "container py-5";

    // Heading
    if (d.heading) {
      const h = document.createElement("h2");
      h.className = "text-center mb-2 fw-bold";
      h.innerHTML = `<span class="border-bottom border-warning pb-1">${d.heading}</span>`;
      container.appendChild(h);
    }

    if (d.subHeading) {
      const sub = document.createElement("p");
      sub.className = "text-center text-muted mb-5";
      sub.textContent = d.subHeading;
      container.appendChild(sub);
    }

    // Layout Grid
    const row = document.createElement("div");
    row.className = "row";

    // Left column: Featured Chef
    const leftCol = document.createElement("div");
    leftCol.className = "col-md-6 mb-4";
    leftCol.appendChild(this.createFeaturedChefCard(d.featuredChef || {}));
    row.appendChild(leftCol);

    // Right column: Other Chefs Grid
    const rightCol = document.createElement("div");
    rightCol.className = "col-md-6";

    const subRow = document.createElement("div");
    subRow.className = "row row-cols-1 row-cols-md-2 g-4";

    (d.chefs || []).forEach(chef => {
      const col = document.createElement("div");
      col.className = "col";
      col.appendChild(this.createChefCard(chef));
      subRow.appendChild(col);
    });

    rightCol.appendChild(subRow);
    row.appendChild(rightCol);
    container.appendChild(row);
    section.appendChild(container);
    this.appendChild(section);
  }

  createFeaturedChefCard(chef) {
    const card = document.createElement("div");
    card.className = "card bg-dark text-white border-0 shadow-lg";

    const img = document.createElement("img");
    img.className = "card-img-top";
    img.src = chef.image;
    img.alt = chef.name;
    img.style.height = "500px";
    img.style.objectFit = "cover";
    card.appendChild(img);

    const body = document.createElement("div");
    body.className = "card-body";

    const title = document.createElement("p");
    title.className = "text-warning text-uppercase small mb-0";
    title.textContent = chef.title;

    const name = document.createElement("h4");
    name.textContent = chef.name;

    const awards = document.createElement("div");
    awards.className = "mb-2";
    (chef.awards || []).forEach(a => {
      const badge = document.createElement("span");
      badge.className = "badge bg-warning text-dark me-2";
      badge.textContent = a;
      awards.appendChild(badge);
    });

    const desc = document.createElement("p");
    desc.className = "small text-light";
    desc.textContent = chef.description;

    const sig = document.createElement("p");
    sig.className = "fst-italic text-white mt-4";
    sig.textContent = chef.signature;

    body.append(title, name, awards, desc, sig);
    card.appendChild(body);
    return card;
  }

  createChefCard(chef) {
    const card = document.createElement("div");
    card.className = "card h-100 bg-secondary text-white shadow-sm border-0";

    const img = document.createElement("img");
    img.className = "card-img-top";
    img.src = chef.image;
    img.alt = chef.name;
    img.style.height = "200px";
    img.style.objectFit = "cover";
    card.appendChild(img);

    const body = document.createElement("div");
    body.className = "card-body";

    const name = document.createElement("h5");
    name.className = "card-title";
    name.textContent = chef.name;

    const title = document.createElement("p");
    title.className = "text-warning small mb-2";
    title.textContent = chef.title;

    const desc = document.createElement("p");
    desc.className = "card-text text-light small";
    desc.textContent = chef.description;

    body.append(name, title, desc);
    card.appendChild(body);

    return card;
  }
}

customElements.define("chef-team", ChefTeam);


// 1.2 booktableSection
class BookTableSection extends HTMLElement {
  static get observedAttributes() {
    return ["data", "config"];
  }

  constructor() {
    super();
    this.data = {};
    this.config = {};
  }

  attributeChangedCallback(name, oldVal, newVal) {
    if (name === "data") this.data = JSON.parse(newVal);
    if (name === "config") this.config = JSON.parse(newVal);
    this.render();
  }

  connectedCallback() {
    this.render();
  }

  render() {
    this.innerHTML = ""; // Clear previous content

    const d = this.data || {};
    const c = this.config || {};

    const section = document.createElement("section");
    section.className = c.sectionClass || "py-5 bg-dark text-white";

    const container = document.createElement("div");
    container.className = c.containerClass || "container";

    // --- Row for content + image ---
    const contentRow = document.createElement("div");
    contentRow.className = "row align-items-center mb-5";

    // Left Column: Text Content
    const left = document.createElement("div");
    left.className = "col-lg-6";

    if (d.heading) {
      const h1 = document.createElement("h1");
      h1.className = "mb-3 fw-bold";
      h1.textContent = d.heading;
      left.appendChild(h1);
    }

    if (d.subHeading) {
      const p = document.createElement("p");
      p.className = "mb-4 text-muted";
      p.textContent = d.subHeading;
      left.appendChild(p);
    }

    if (Array.isArray(d.cards)) {
      d.cards.forEach(card => {
        const div = document.createElement("div");
        div.className = "mb-3";

        const heading = document.createElement("h6");
        heading.className = "fw-semibold";
        heading.textContent = card.heading;

        const sub = document.createElement("p");
        sub.className = "text-light small";
        sub.textContent = card.subHeading;

        div.appendChild(heading);
        div.appendChild(sub);
        left.appendChild(div);
      });
    }

    // Right Column: Image
    const right = document.createElement("div");
    right.className = "col-lg-6 text-center";

    if (Array.isArray(d.images) && d.images.length > 0) {
      const img = document.createElement("img");
      img.src = d.images[0];
      img.alt = "Booking Image";
      img.className = "img-fluid rounded";
      right.appendChild(img);
    }

    contentRow.appendChild(left);
    contentRow.appendChild(right);
    container.appendChild(contentRow);

    // --- Full Width Form Below ---
    if (d.form) {
      const formWrap = document.createElement("div");
      formWrap.className = "bg-secondary p-4 rounded";

      if (d.form.heading) {
        const formHeading = document.createElement("h2");
        formHeading.className = "text-white text-center";
        formHeading.textContent = d.form.heading;
        formWrap.appendChild(formHeading);
      }

      if (d.form.description) {
        const formDesc = document.createElement("p");
        formDesc.className = "text-center text-light";
        formDesc.textContent = d.form.description;
        formWrap.appendChild(formDesc);
      }

      const form = document.createElement("form");
      form.className = "row g-3";

      d.form.fields.forEach(field => {
        const col = document.createElement("div");
        col.className = field.type === "textarea" ? "col-12" : "col-md-6";

        if (field.type === "textarea") {
          const textarea = document.createElement("textarea");
          textarea.className = "form-control";
          textarea.placeholder = field.placeholder || "";
          textarea.required = !!field.required;
          textarea.rows = field.rows || 3;
          col.appendChild(textarea);
        } else if (field.type === "select") {
          const select = document.createElement("select");
          select.className = "form-select";
          select.required = !!field.required;

          const defaultOption = document.createElement("option");
          defaultOption.textContent = field.placeholder || "Select";
          defaultOption.value = "";
          defaultOption.disabled = true;
          defaultOption.selected = true;
          select.appendChild(defaultOption);

          field.options.forEach(opt => {
            const option = document.createElement("option");
            option.textContent = opt;
            option.value = opt;
            select.appendChild(option);
          });

          col.appendChild(select);
        } else {
          const input = document.createElement("input");
          input.type = field.type || "text";
          input.placeholder = field.placeholder || "";
          input.required = !!field.required;
          input.className = "form-control";
          col.appendChild(input);
        }

        form.appendChild(col);
      });

      // Submit button
      const submitWrap = document.createElement("div");
      submitWrap.className = "col-12 text-center mt-3";

      const submit = document.createElement("button");
      submit.type = "submit";
      submit.className = "btn btn-warning fw-bold px-4";
      submit.textContent = d.form.submitText || "Submit";

      submitWrap.appendChild(submit);
      form.appendChild(submitWrap);
      formWrap.appendChild(form);

      container.appendChild(formWrap);
    }

    section.appendChild(container);
    this.appendChild(section);
  }
}

customElements.define("book-table-section", BookTableSection);

// find-us section
class FindUsSection extends HTMLElement {
  static get observedAttributes() {
    return ["data"];
  }

  constructor() {
    super();
    this.data = {};
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (name === "data") {
      this.data = JSON.parse(newValue);
      this.render();
    }
  }

  connectedCallback() {
    this.render();
  }

  render() {
    this.innerHTML = "";

    const d = this.data;

    const section = document.createElement("section");
    section.className = "py-5";

    const container = document.createElement("div");
    container.className = "container";

    // Heading Section
    if (d.headingSection) {
      const headingWrap = document.createElement("div");
      headingWrap.className = "text-center mb-5";

      const title = document.createElement("h2");
      title.className = "fw-bold text-white position-relative d-inline-block";
      title.style.paddingBottom = "0.5rem";
      title.textContent = d.headingSection.title;

      const subtitle = document.createElement("p");
      subtitle.className = "text-white";
      subtitle.textContent = d.headingSection.subtitle;
  
      headingWrap.appendChild(title);
      headingWrap.appendChild(subtitle);
      container.appendChild(headingWrap);
    }


    const row = document.createElement("div");
    row.className = "row";

    // LEFT: MAP
    const left = document.createElement("div");
    left.className = "col-md-6 mb-4";

    const iframe = document.createElement("iframe");
    iframe.src = d.mapEmbedUrl;
    iframe.width = "100%";
    iframe.height = "400";
    iframe.style.border = "0";
    iframe.allowFullscreen = true;
    iframe.loading = "lazy";
    iframe.referrerPolicy = "no-referrer-when-downgrade";

    left.appendChild(iframe);

    // RIGHT: CONTENT
    const right = document.createElement("div");
    right.className = "col-md-6 bg-dark text-white p-4 rounded";

    const heading = document.createElement("h2");
    heading.className = "text-white text-center fw-bold";
    heading.textContent = d.heading;

    const sub = document.createElement("p");
    sub.className = "text-center text-white";
    sub.textContent = d.subHeading;

    right.appendChild(heading);
    right.appendChild(sub);

    // Info sections
    const sections = [
      { icon: d.location.icon, label: d.location.label, content: d.location.address },
      { icon: d.reservation.icon, label: d.reservation.label, content: d.reservation.phone, note: d.reservation.note },
      { icon: d.hours.icon, label: d.hours.label, content: d.hours.list }
    ];

    sections.forEach(info => {
      const wrapper = document.createElement("div");
      wrapper.className = "d-flex align-items-start my-4";

      const icon = document.createElement("i");
      icon.className = `bi bi-${info.icon} fs-4 me-3`;

      const details = document.createElement("div");

      const label = document.createElement("h5");
      label.className = "mb-1 text-white fw-semibold";
      label.textContent = info.label;

      details.appendChild(label);

      if (Array.isArray(info.content)) {
        info.content.forEach(item => {
          const row = document.createElement("div");
          row.className = "d-flex justify-content-between";
          const day = document.createElement("span");
          day.textContent = item.day;
          const time = document.createElement("span");
          time.textContent = item.time;
          row.appendChild(day);
          row.appendChild(time);
          details.appendChild(row);
        });
      } else {
        const content = document.createElement("p");
        content.className = "mb-0 text-light";
        content.textContent = info.content;
        details.appendChild(content);
      }

      if (info.note) {
        const note = document.createElement("p");
        note.className = "fst-italic small text-muted mt-1";
        note.textContent = info.note;
        details.appendChild(note);
      }

      wrapper.appendChild(icon);
      wrapper.appendChild(details);
      right.appendChild(wrapper);
    });

    // Buttons
    const btnGroup = document.createElement("div");
    btnGroup.className = "d-flex justify-content-center gap-3 mt-4";

    d.buttons.forEach(btn => {
      const button = document.createElement("a");
      button.href = btn.link;
      button.className = `btn btn-${btn.type === "primary" ? "warning" : "outline-light"} px-4`;
      button.textContent = btn.label;
      btnGroup.appendChild(button);
    });

    right.appendChild(btnGroup);

    row.appendChild(left);
    row.appendChild(right);
    container.appendChild(row);
    section.appendChild(container);
    this.appendChild(section);
  }
}

customElements.define("find-us-section", FindUsSection);

//Event section
class EventSection extends HTMLElement {
  static get observedAttributes() {
    return ["data", "config"];
  }

  constructor() {
    super();
    this.data = {};
    this.config = {};
  }

  attributeChangedCallback(name, oldVal, newVal) {
    if (name === "data") this.data = JSON.parse(newVal || "{}");
    if (name === "config") this.config = JSON.parse(newVal || "{}");
    this.render();
  }

  connectedCallback() {
    this.render();
  }

  render() {
    this.innerHTML = "";
    const d = this.data;
    const c = this.config;

    const section = document.createElement("section");
    section.className = c.sectionClass || "py-5 text-white";

    const container = document.createElement("div");
    container.className = c.containerClass || "container";

    // Title
    if (d.title) {
      const h2 = document.createElement("h2");
      h2.className = c.titleClass || "text-center fw-bold mb-3";
      h2.textContent = d.title;
      container.appendChild(h2);
    }

    // Subtitle
    if (d.subtitle) {
      const sub = document.createElement("p");
      sub.className = c.subtitleClass || "text-center text-muted mb-4";
      sub.textContent = d.subtitle;
      container.appendChild(sub);
    }

    // Cards
    if (Array.isArray(d.cards)) {
      const row = document.createElement("div");
      row.className = c.cardRowClass || "row justify-content-center g-4";

      d.cards.forEach(card => {
        const col = document.createElement("div");
        col.className = c.cardColClass || "col-md-4";

        const cardDiv = document.createElement("div");
        cardDiv.className = c.cardClass || "bg-secondary p-4 rounded text-center h-100";

        const icon = document.createElement("i");
        icon.className = card.icon || "bi bi-star";
        icon.style.fontSize = "2rem";
        cardDiv.appendChild(icon);

        const title = document.createElement("h5");
        title.className = "mt-3";
        title.textContent = card.title;
        cardDiv.appendChild(title);

        const desc = document.createElement("p");
        desc.className = "text-muted mb-2";
        desc.textContent = card.desc;
        cardDiv.appendChild(desc);

        const tag = document.createElement("div");
        tag.className = "badge bg-light text-dark";
        tag.textContent = card.tag;
        cardDiv.appendChild(tag);

        col.appendChild(cardDiv);
        row.appendChild(col);
      });

      container.appendChild(row);
    }

    // Image Grid
    if (Array.isArray(d.images) && d.images.length >= 3) {
      const gridRow = document.createElement("div");
      gridRow.className = "row mt-5 g-3";

      // Left Image
      const colLeft = document.createElement("div");
      colLeft.className = "col-md-6";
      const leftImg = document.createElement("img");
      leftImg.src = d.images[0];
      leftImg.alt = "Event image 1";
      leftImg.className = "img-fluid rounded w-100 h-100 object-fit-cover";
      colLeft.appendChild(leftImg);

      // Right Images (stacked vertically)
      const colRight = document.createElement("div");
      colRight.className = "col-md-6 d-flex flex-column gap-3";

      const topRightImg = document.createElement("img");
      topRightImg.src = d.images[1];
      topRightImg.alt = "Event image 2";
      topRightImg.className = "img-fluid rounded";

      const bottomRightImg = document.createElement("img");
      bottomRightImg.src = d.images[2];
      bottomRightImg.alt = "Event image 3";
      bottomRightImg.className = "img-fluid rounded";

      colRight.appendChild(topRightImg);
      colRight.appendChild(bottomRightImg);

      gridRow.appendChild(colLeft);
      gridRow.appendChild(colRight);
      container.appendChild(gridRow);
    }

    // CTA Block
    if (d.cta) {
      const cta = document.createElement("div");
      cta.className = c.ctaWrapperClass || "bg-light text-dark mt-5 p-4 rounded text-center";

      const ctaTitle = document.createElement("h4");
      ctaTitle.textContent = d.cta.title || "Call to Action";
      cta.appendChild(ctaTitle);

      if (d.cta.desc) {
        const ctaDesc = document.createElement("p");
        ctaDesc.textContent = d.cta.desc;
        cta.appendChild(ctaDesc);
      }

      if (d.cta.button) {
        const btn = document.createElement("a");
        btn.href = d.cta.button.link || "#";
        btn.textContent = d.cta.button.text || "Get Started";
        btn.className = d.cta.button.class || "btn btn-warning mt-2";
        cta.appendChild(btn);
      }

      container.appendChild(cta);
    }

    section.appendChild(container);
    this.appendChild(section);
  }
}

customElements.define("event-section", EventSection);

//Featured events section
class FeaturedEvents extends HTMLElement {
  static get observedAttributes() {
    return ["data"];
  }

  constructor() {
    super();
    this.data = {};
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (name === "data") {
      this.data = JSON.parse(newValue || "{}");
      this.render();
    }
  }

  connectedCallback() {
    this.render();
  }

  render() {
    this.innerHTML = "";

    const d = this.data;

    const section = document.createElement("section");
    section.className = "py-5 text-white";

    const container = document.createElement("div");
    container.className = "container";

    // Section Title
    if (d.heading) {
      const heading = document.createElement("h2");
      heading.className = "text-center fw-bold mb-2";
      heading.textContent = d.heading;
      container.appendChild(heading);

      const line = document.createElement("div");
      line.className = "mx-auto mb-5";
      line.style.width = "80px";
      line.style.height = "3px";
      line.style.backgroundColor = "#e0b973";
      container.appendChild(line);
    }

    // Cards
    const row = document.createElement("div");
    row.className = "row g-4";

    d.events.forEach(event => {
      const col = document.createElement("div");
      col.className = "col-md-6";

      const card = document.createElement("div");
      card.className = "d-flex rounded overflow-hidden bg-dark";

      // Left Image + Date
      const imgWrapper = document.createElement("div");
      imgWrapper.className = "position-relative";
      imgWrapper.style.width = "40%";

      const img = document.createElement("img");
      img.src = event.images;
      img.alt = event.heading;
      img.className = "img-fluid h-100";
      img.style.objectFit = "cover";

      const badge = document.createElement("div");
      badge.className = "position-absolute top-0 start-0 bg-warning text-white text-center px-2 py-1 rounded-bottom";
      badge.innerHTML = `<div style="font-weight:bold">${event.date.month}</div><div>${event.date.day}</div>`;

      imgWrapper.appendChild(img);
      imgWrapper.appendChild(badge);

      // Right Content
      const content = document.createElement("div");
      content.className = "p-4 d-flex flex-column justify-content-between";
      content.style.width = "40%";

      const heading = document.createElement("h5");
      heading.className = "fw-bold";
      heading.textContent = event.heading;

      const meta = document.createElement("div");
      meta.className = "text-muted mb-2 small";
      meta.innerHTML = `
        <i class="bi bi-clock me-1"></i>${event.time} &nbsp; 
        <i class="bi bi-geo-alt ms-3 me-1"></i>${event.location}`;

      const desc = document.createElement("p");
      desc.className = "mb-2";
      desc.textContent = event.description;

      const button = document.createElement("a");
      button.href = event.link || "#";
      button.className = "btn btn-outline-warning btn-sm w-fit";
      button.textContent = event.buttonText || "View Details";

      content.appendChild(heading);
      content.appendChild(meta);
      content.appendChild(desc);
      content.appendChild(button);

      card.appendChild(imgWrapper);
      card.appendChild(content);
      col.appendChild(card);
      row.appendChild(col);
    });

    container.appendChild(row);
    section.appendChild(container);
    this.appendChild(section);
  }
}

customElements.define("featured-events", FeaturedEvents);


//contact Section
class ContactSection extends HTMLElement {
  static get observedAttributes() {
    return ["data"];
  }

  constructor() {
    super();
    this.data = {};
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (name === "data") {
      this.data = JSON.parse(newValue || "{}");
      this.render();
    }
  }

  connectedCallback() {
    this.render();
  }

  render() {
    this.innerHTML = "";

    const d = this.data;
    if (!d.contact) return;

    const section = document.createElement("section");
    section.className = "py-5 text-white";

    const container = document.createElement("div");
    container.className = "container";

    // Heading
    if (d.heading) {
      const heading = document.createElement("h2");
      heading.className = "text-center fw-bold mb-2";
      heading.textContent = d.heading;
      container.appendChild(heading);

      const line = document.createElement("div");
      line.className = "mx-auto mb-4";
      line.style.width = "80px";
      line.style.height = "3px";
      line.style.backgroundColor = "#e0b973";
      container.appendChild(line);
    }

    // Subheading
    if (d.subHeading) {
      const sub = document.createElement("p");
      sub.className = "text-center mb-5";
      sub.textContent = d.subHeading;
      container.appendChild(sub);
    }

    // Contact Info Rows
    const row = document.createElement("div");
    row.className = "row g-4";

    const { address, email, hours } = d.contact;

    row.appendChild(this.createBox(address.title, address.icon, [
      address.location
    ]));

    row.appendChild(this.createBox(email.title, email.icon, email.emails));

    row.appendChild(this.createBox(hours.title, hours.icon, hours.times));

    container.appendChild(row);
    section.appendChild(container);
    this.appendChild(section);
  }

  createBox(title, iconClass, lines = []) {
    const col = document.createElement("div");
    col.className = "col-md-4";

    const box = document.createElement("div");
    box.className = "d-flex contact-box rounded p-4 h-100 align-items-start";
    box.style.backgroundColor = "#1e2327";

    const icon = document.createElement("div");
    icon.className = "icon-circle me-3 d-flex align-items-center justify-content-center";
    icon.style.width = "50px";
    icon.style.height = "50px";
    icon.style.backgroundColor = "#333";
    icon.style.borderRadius = "50%";

    const i = document.createElement("i");
    i.className = `bi ${iconClass} text-light fs-4`;
    icon.appendChild(i);

    const content = document.createElement("div");

    const h5 = document.createElement("h5");
    h5.className = "fw-bold mb-2";
    h5.textContent = title;

    content.appendChild(h5);
    lines.forEach(line => {
      const p = document.createElement("p");
      p.className = "mb-0";
      p.textContent = line;
      content.appendChild(p);
    });

    box.appendChild(icon);
    box.appendChild(content);
    col.appendChild(box);

    return col;
  }
}

customElements.define("contact-section", ContactSection);



// 4. FAQSection
class FaqSection extends HTMLElement {
    constructor() {
      super();

      const data = JSON.parse(this.getAttribute('data'));
      const config = JSON.parse(this.getAttribute('config'));

      const wrapper = document.createElement('div');
      wrapper.className = config.sectionClass || '';

      // Google Map
      const iframe = document.createElement('iframe');
      iframe.src = data.map.embedUrl;
      iframe.width = "100%";
      iframe.height = "600";
      iframe.className = "faq-map";
      iframe.setAttribute("loading", "lazy");
      iframe.setAttribute("allowfullscreen", "");
      iframe.setAttribute("referrerpolicy", "no-referrer-when-downgrade");
      wrapper.appendChild(iframe);

      // Contact Form Container
      const container = document.createElement('div');
      container.className = `contact-container ${config.containerClass || ''}`;

      const title = document.createElement('h2');
      title.className = "contact-title text-center mb-4";
      title.textContent = data.form.title;
      container.appendChild(title);

      const form = document.createElement('form');
      const row = document.createElement('div');
      row.className = "row";

      data.form.fields.forEach((field) => {
        const col = document.createElement('div');
        col.className = (field.type !== "textarea") ? "col-md-6 mb-3" : "col-12 mb-3";

        const inputGroup = document.createElement('div');
        inputGroup.className = "input-group";

        const iconSpan = document.createElement('span');
        iconSpan.className = "input-group-text";
        iconSpan.innerHTML = `<i class="bi bi-${field.icon}"></i>`;
        inputGroup.appendChild(iconSpan);

        let input;
        if (field.type === "textarea") {
          input = document.createElement('textarea');
          input.rows = 5;
        } else {
          input = document.createElement('input');
          input.type = field.type;
        }

        input.className = "form-control";
        input.placeholder = field.placeholder;
        input.name = field.name;
        input.required = true;

        inputGroup.appendChild(input);
        col.appendChild(inputGroup);
        row.appendChild(col);
      });

      form.appendChild(row);

      // Submit button
      const btnDiv = document.createElement('div');
      btnDiv.className = "text-center mt-3";
      const button = document.createElement('button');
      button.type = "submit";
      button.className = "btn btn-gold px-4";
      button.textContent = data.form.submitText || "Send";
      btnDiv.appendChild(button);
      form.appendChild(btnDiv);

      container.appendChild(form);
      wrapper.appendChild(container);
      this.appendChild(wrapper);
    }
  }

  customElements.define('faq-section', FaqSection);
// 5. FooterSection
class FooterSection extends HTMLElement {
  static get observedAttributes() {
    return ["data", "config"];
  }

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
      section.className = c.sectionClass || "footer-section text-light pt-5 pb-3";
      const container = document.createElement("div");
      container.className = c.containerClass || "container";

      const row = document.createElement("div");
      row.className = "row";

      // 1. Company Info
      const aboutCol = document.createElement("div");
      aboutCol.className = "col-md-3 mb-4";

      if (d.companyDetails?.name) {
          const name = document.createElement("div");
          name.className = c.companyNameClass || "h5 mb-2";
          name.textContent = d.companyDetails.name;
          aboutCol.appendChild(name);
      }

      if (d.companyDetails?.description) {
        const desc = document.createElement("p");
        desc.className =  c.descriptionClass || "text-light";
        desc.textContent = d.companyDetails?.description;
        aboutCol.appendChild(desc);
      }

      if (Array.isArray(d.companyDetails?.contactDetails?.socialLinks)) {
        const social = document.createElement("div");
        social.className = "d-flex gap-2 mt-2";

        d.companyDetails.contactDetails.socialLinks.forEach(link => {
          const a = document.createElement("a");
          a.href = link.url || "#";
          a.className = "btn btn-outline-light text-light btn-sm rounded-circle d-flex align-items-center justify-content-center";
          a.style.width = "32px";
          a.style.height = "32px";
          a.target = "_blank";
          a.rel = "noopener";

          const i = document.createElement("i");
          i.className = `bi bi-${link.type}`;
          a.appendChild(i);

          social.appendChild(a);
        });

        aboutCol.appendChild(social);
      }

      row.appendChild(aboutCol);

      // 2. Useful Links
      const linksCol = document.createElement("div");
      linksCol.className = "col-md-2 mb-4";

      const navTitle = document.createElement("h6");
      navTitle.textContent = "Useful Links";
      navTitle.className = "text-white mb-3";
      linksCol.appendChild(navTitle);

      if (Array.isArray(d.navItems)) {
        const ul = document.createElement("ul");
        ul.className = "list-unstyled";
        d.navItems.forEach(item => {
          const li = document.createElement("li");
          li.className = "mb-2";
          const a = document.createElement("a");
          a.href = item.url;
          a.className = "text-light text-decoration-none";
          a.textContent = item.menuName;
          li.appendChild(a);
          ul.appendChild(li);
        });
        linksCol.appendChild(ul);
      }

      row.appendChild(linksCol);

      // 3. Our Services
      const servicesCol = document.createElement("div");
      servicesCol.className = "col-md-3 mb-4";

      const servicesTitle = document.createElement("h6");
      servicesTitle.textContent = "Our Services";
      servicesTitle.className = "text-white mb-3";
      servicesCol.appendChild(servicesTitle);

      if (Array.isArray(d.services)) {
        const ul = document.createElement("ul");
        ul.className = "list-unstyled";
        d.services.forEach(service => {
          const li = document.createElement("li");
          li.className = "mb-2";
          const a = document.createElement("a");
          a.href = service.url;
          a.className = "text-light text-decoration-none";
          a.textContent = service.name;
          li.appendChild(a);
          ul.appendChild(li);
        });
        servicesCol.appendChild(ul);
      }

      row.appendChild(servicesCol);

      // 4. Contact Info
      const contactCol = document.createElement("div");
      contactCol.className = "col-md-4 mb-4";

      const contactTitle = document.createElement("h6");
      contactTitle.textContent = "Contact Us";
      contactTitle.className = "text-white mb-3";
      contactCol.appendChild(contactTitle);

      if (d.companyDetails?.address) {
        const addr = document.createElement("p");
        addr.className = "mb-2 small text-white";
        addr.textContent = [
          d.companyDetails.address.line1,
          d.companyDetails.address.city,
          d.companyDetails.address.state,
          d.companyDetails.address.pincode,
          d.companyDetails.address.country
        ].filter(Boolean).join(", ");
        contactCol.appendChild(addr);
      }

      if (d.companyDetails?.contactDetails?.phone) {
        const phone = document.createElement("p");
        phone.className = "mb-1 small";
        phone.textContent = "Phone: " + d.companyDetails.contactDetails.phone;
        contactCol.appendChild(phone);
      }

      if (d.companyDetails?.contactDetails?.email) {
        const email = document.createElement("p");
        email.className = "mb-1 small";
        email.textContent = "Email: " + d.companyDetails.contactDetails.email;
        contactCol.appendChild(email);
      }

      row.appendChild(contactCol);

      container.appendChild(row);

      // Footer bottom (copyright)
      const copy = document.createElement("div");
      copy.className = "text-center mt-4 small text-light";
      copy.innerHTML = `&copy; ${new Date().getFullYear()} <strong>${d.companyDetails?.name}</strong>. All Rights Reserved.`;
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
