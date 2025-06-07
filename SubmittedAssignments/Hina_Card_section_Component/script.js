class CardComponent extends HTMLElement {
    static observedAttributes = ["config", "data"];

    defaultConfig = {
        headingClass:"text-center fs-1 mt-5 text-blue",
        subHeadingClass:"text-center fs-2",
        descriptionClass:"text-center fs-5",
        cardContainerClass: "row p-2 justify-content-center gx-5",
        colClass: "col-lg-3 col-sm-12 col-md-4 border border-dark  rounded-3 card m-3",
        cardBodyClass: "card-body p-2",
        iconClass: "bi fs-1 mb-3 text-center text-blue ",
        titleClass: "card-title fs-4 fw-bold text-right text-blue",
        textClass: "card-text fs-5 pb-5 text-right"
    };

    defaultData = {
        heading: "Our Services",
        subHeading: "We are the best in the world",
        description: "We are the best in the world",
        cards: {
            card1: {
                title: "Proven Expertise",
                description: "With over 12 years of experience, Prajapati Advertising, a leading advertising agency in Pune, has completed 500+ projects. We create campaigns that connect with audiences and deliver your message clearly. Additionally, our expertise in traditional marketing helps us achieve strong results.",
                icon: "bi bi-gear-fill "
            },
            card2: {
                title: "Nationwide Reach",
                description: "With over 12 years of experience, Prajapati Advertising, a leading advertising agency in Pune, has completed 500+ projects. We create campaigns that connect with audiences and deliver your message clearly. Additionally, our expertise in traditional marketing helps us achieve strong results.",
                icon: "bi bi-stack"
            }
           
        }
    }
        

    constructor() {
        super();
        this.data = { ...this.defaultData };
        this.config = { ...this.defaultConfig };
    }

    connectedCallback() {
        this.renderComponent();
    }

    attributeChangedCallback(name, oldValue, newValue) {
        try {
            if (name === "config" && typeof newValue === "string") {
                this.config = Object.assign(this.config, JSON.parse(newValue));
            }
            if (name === "data" && typeof newValue === "string") {
                this.data = JSON.parse(newValue);
            }
        } catch (e) {
            console.log(e);
        }

        this.renderComponent();
    }

    renderComponent() {
        this.innerHTML = "";

        const style = document.createElement("style");
        style.textContent = `
            @import url("https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css");
            @import url("https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.1/font/bootstrap-icons.css");

            .text-blue { color:#2F3192; }
            
        `;
        this.appendChild(style);

        const heading = this.createElement("h1", this.config.headingClass, this.data.heading);
        this.appendChild(heading);
        const subHeading = this.createElement("h2", this.config.subHeadingClass, this.data.subHeading);
        this.appendChild(subHeading);
        const description = this.createElement("p", this.config.descriptionClass, this.data.description);
        this.appendChild(description);
        const wrapperElm = this.createElement("div", this.config.cardContainerClass);

        Object.values(this.data.cards).forEach(item => {
            const col = this.createElement("div", this.config.colClass);
            const cardBody = this.createElement("div", this.config.cardBodyClass);
            const iconElement = this.createElement("i", this.config.iconClass);

            cardBody.addEventListener("mouseenter", () => {
                iconElement.classList.add("hover-active");
            });

            cardBody.addEventListener("mouseout", () => {
                iconElement.classList.remove("hover-active");
            });

            iconElement.className = this.config.iconClass + " " + item.icon;
            cardBody.appendChild(iconElement);

            const title = this.createElement("h5", this.config.titleClass, item.title,"0");
            const description = this.createElement("p", this.config.textClass, item.description);

            cardBody.appendChild(title);
            requestAnimationFrame(() => {
                this.animateNumbers(title, item.title);
            });

            if (item.subTitle) {
                const subTitle = this.createElement("h6", this.config.subTitleClass, item.subTitle);
                cardBody.appendChild(subTitle);
            }
            cardBody.appendChild(description);
            col.appendChild(cardBody);
            wrapperElm.appendChild(col);
        });

        this.appendChild(wrapperElm);
    }

    createElement(tag, className, content) {
        const elm = document.createElement(tag);
        elm.className = className;
        if (content) {
            elm.innerHTML = content;
        }
        return elm;
    }
}

customElements.define("card-component", CardComponent);

if (!window.customElementsList) window.customElementsList = [];
window.customElementsList.push({ component: "card-component", componentClass: CardComponent });