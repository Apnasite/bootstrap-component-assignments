class SidebarComponent extends HTMLElement {
  static observedAttributes = ["config", "data"];

  defaultConfig = {
    menuButton: {
      showButton: true,
      buttonClasses: "btn btn-primary position-fixed top-0 start-0 m-3 d-md-none",
      iconClasses: "bi bi-list",
    },
    closeButton: {
      buttonClasses: "btn btn-secondary position-absolute top-0 end-0 m-3",
      iconClasses: "bi bi-x",
    },
  };

  defaultData = {
    heading: "Sidebar Heading",
    logo: {
      src: "./img/logo1.avif",
      alt: "Logo",
      classes: "img-fluid rounded-circle w-25 mb-4",
    },
    links: [
      { label: "Home", url: "#", iconClasses: "bi bi-house" },
      { label: "Profile", url: "#", iconClasses: "bi bi-person" },
      {
        label: "Settings",
        url: "#",
        iconClasses: "bi bi-gear",
        dropdown: [
          { label: "Account", url: "#" },
          { label: "Privacy", url: "#" },
        ],
      },
      { label: "Help", url: "#", iconClasses: "bi bi-question-circle" },
    ],
  };

  constructor() {
    super();
    this.config = { ...this.defaultConfig };
    this.data = { ...this.defaultData };
  }

  connectedCallback() {
    this.render();
    this.addEventListeners();
  }

  render() {
    this.innerHTML = "";

    const sidebar = document.createElement("div");
    sidebar.id = "sidebar";
    sidebar.className =
      "offcanvas-md offcanvas-start d-flex flex-column justify-content-start align-items-start p-3 bg-primary text-light w-md-25 vh-100 d-md-block";
    sidebar.style.width = "25%";
    
    this.appendChild(sidebar);

    if (this.data.logo.src) {
      const logoContainer = document.createElement("div");
      logoContainer.className = "d-flex justify-content-center align-items-center w-100 mb-4";

      const logo = document.createElement("img");
      logo.src = this.data.logo.src;
      logo.alt = this.data.logo.alt || "Logo";
      logo.className = this.data.logo.classes || "img-fluid mb-4";
      logoContainer.appendChild(logo);

      sidebar.appendChild(logoContainer);
    }

    const header = document.createElement("h1");
    header.textContent = this.data.heading;
    header.className = "text-start mb-4 w-100";
    sidebar.appendChild(header);

    const nav = document.createElement("nav");
    nav.className = "nav flex-column w-100";
    this.data.links.forEach((link) => {
      if (link.dropdown) {
        const dropdown = document.createElement("div");
        dropdown.className = "dropdown mb-3";

        const dropdownToggle = document.createElement("a");
        dropdownToggle.href = link.url;
        dropdownToggle.className = "nav-link dropdown-toggle text-light";
        dropdownToggle.setAttribute("data-bs-toggle", "dropdown");
        dropdownToggle.innerHTML = `<i class="${link.iconClasses} me-2"></i>${link.label}`;
        dropdown.appendChild(dropdownToggle);

        const dropdownMenu = document.createElement("ul");
        dropdownMenu.className = "dropdown-menu bg-primary text-light";
        link.dropdown.forEach((item) => {
          const dropdownItem = document.createElement("li");
          dropdownItem.innerHTML = `<a class="dropdown-item text-light" href="${item.url}">${item.label}</a>`;
          dropdownMenu.appendChild(dropdownItem);
        });

        dropdown.appendChild(dropdownMenu);
        nav.appendChild(dropdown);
      } else {
        const navItem = document.createElement("a");
        navItem.href = link.url;
        navItem.className = "nav-link text-light d-flex align-items-center mb-3";

        const icon = document.createElement("i");
        icon.className = `${link.iconClasses} me-2`;
        navItem.appendChild(icon);

        const label = document.createElement("span");
        label.textContent = link.label;
        navItem.appendChild(label);

        nav.appendChild(navItem);
      }
    });
    sidebar.appendChild(nav);

    const closeButton = document.createElement("button");
    closeButton.type = "button";
    closeButton.className = `${this.config.closeButton.buttonClasses} d-md-none`;
    closeButton.innerHTML = `<i class="${this.config.closeButton.iconClasses}"></i>`;
    closeButton.addEventListener("click", () => {
      sidebar.classList.remove("show");
      this.menuButton.classList.remove("d-none");
    });
    sidebar.appendChild(closeButton);

    const menuButton = document.createElement("button");
    menuButton.type = "button";
    menuButton.className = `${this.config.menuButton.buttonClasses}`;
    menuButton.setAttribute("data-bs-toggle", "offcanvas");
    menuButton.setAttribute("data-bs-target", "#sidebar");
    menuButton.setAttribute("aria-controls", "sidebar");
    menuButton.innerHTML = `<i class="${this.config.menuButton.iconClasses}"></i>`;
    menuButton.addEventListener("click", () => {
      sidebar.classList.add("show");
      menuButton.classList.add("d-none");
    });

    document.body.appendChild(menuButton);

    this.menuButton = menuButton;
    this.closeButton = closeButton;
    this.sidebar = sidebar;
  }
}

customElements.define("sidebar-component", SidebarComponent);