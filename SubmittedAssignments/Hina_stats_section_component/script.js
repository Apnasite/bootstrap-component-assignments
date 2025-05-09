class StatsComponent extends HTMLElement {
    static observedAttributes = ["config", "data"];

    defaultConfig = {
        statsContainerClass: "container p-5",
        headingClass: " fs-1 text-center  text-blue",
        subHeadingClass: " fs-2 text-center",
        descriptionClass: " fs-5 text-center ", 
        rowClass:"row justify-content-center",
        colClass: "col-lg-3 text-center",
        statsBodyClass: "card-body  border-end border-dark  border-3",
        iconClass: "",
        titleClass: "card-title fs-1 text-center",
       
       
    };

    defaultData = {
        heading:"Title",
        subHeading:"subtitle",
        description:"Description",
        

        stats: {
            stats1: {
                num: "500",
                subTitle: "Hospital Rooms",
                icon: ""
            },
            stats2: {
                num: "200 '+'",
                subTitle: "Specialist Doctors",
                icon: ""
            },
            stats3: {
                num: "100 '+'",
                subTitle: "Happy Patients",
                icon: ""
            },
            stats4: {
                num: "50 '+'",
                subTitle: "Year of Experience",
                icon: ""
            }
        }
    }
        animateNumbers(element, endValue) {
            const duration = 2000;
            const start = 0;
            const end = parseInt(endValue);
            
            let current = start;
            const increment = (end - start) / (duration / 16);
            const timer = setInterval(() => {
                current += increment;
                element.textContent = Math.round(current);
                if (current >= end) {
                    element.textContent = end;
                    clearInterval(timer);
                }
            }, 16);
        

    };

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

           .text-blue
                     {
           color: #2F3192;
            }
           
        `;
        this.appendChild(style);

        const wrapperElm = this.createElement("div", this.config.statsContainerClass);
        const heading = this.createElement("h1", this.config.headingClass, this.data.heading);
        const subHeading = this.createElement("h3", this.config.subHeadingClass, this.data.subHeading);
        const description = this.createElement("p", this.config.descriptionClass, this.data.description);
        wrapperElm.appendChild(heading);
        wrapperElm.appendChild(subHeading);
        wrapperElm.appendChild(description);
        
        const row = this.createElement("div", this.config.rowClass);
        Object.values(this.data.stats).forEach(item => {
            const col = this.createElement("div", this.config.colClass);
            const statsBody = this.createElement("div", this.config.statsBodyClass);
           if (item.icon) {
                
           
            const iconElement = this.createElement("i", this.config.iconClass);

            statsBody.addEventListener("mouseenter", () => {
                iconElement.classList.add("hover-active");
            });

            statsBody.addEventListener("mouseout", () => {
                iconElement.classList.remove("hover-active");
            });

            iconElement.className = this.config.iconClass + " " + item.icon;
            statsBody.appendChild(iconElement);
        }
            const num = this.createElement("h5", this.config.headingClass, item.num,"0");
            const description = this.createElement("p", this.config.descriptionClass, item.subTitle);

            statsBody.appendChild(num);
            requestAnimationFrame(() => {
                this.animateNumbers(num, item.num);
            });

            
            statsBody.appendChild(description);
            col.appendChild(statsBody);
            row.appendChild(col);
        });
        wrapperElm.appendChild(row);
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

customElements.define("stats-component", StatsComponent);

if (!window.customElementsList) window.customElementsList = [];
window.customElementsList.push({ component: "stats-component", componentClass: StatsComponent });