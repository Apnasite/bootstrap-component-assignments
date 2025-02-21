class ContentComponent extends HTMLElement {
    static observedAttributes = ["config", "data"];

    defaultConfig = {
        MainContainer: "container text-center p-5",
        HeadingClass: "text-blue fw-bold",
        ImageClass: "img-fluid img-overlay",
        descClass: "p-3 fs-5",
        subtitleClass: "p-3 fs-3 fw-bold text-center",
        ratingrowClass: " row text-center justify-content-center",
        colClass: "mt-5 mb-5 col-lg-3 border-1 border-dark border-end d-flex",
        col2Class: "mt-5 mb-5 col-lg-3 d-flex",
        ratingClass:"mt-4 me-3",
        img1Class: "w-25 h-100",
        imgIconClass: "bi bi-star-fill fs-1 pt-3 text-blue",
        iconClass: "bi fs-4 text-warning",
        ratingtitleClass: "fs-6 text-center",
        contentButtonWrapClass:" p-5 justify-content-center btn-toolbar gap-2 ",
        contentButton1Class:"btn btn-dark fs-4",
        contentButton2Class:"btn btn-primary fs-4",
        contentButton3Class:"btn btn-danger fs-4",
        embedContainerClass:"col-lg-12",
        videoWrapClass:"row",
        videoClass:"rounded-5"
        
       
        
    };

    defaultData = {
        heading: "Welcome to Prajapati Advertising",
        image: "",
        desc: "At Prajapati Advertising...",
        subtitle: "12+ Years of Excellence in Transforming Brands Across India",
        ratingimage: "img/pa.webp",
        ratingtitle: "5 of 5 (100+ reviews)",
        
        rating2title: "4.9 of 5 (100+ reviews)",
        buttons: [
            {
                url: "",
                label: "<i class='bi bi-instagram'></i> ",
                className: "btn-instagram",
                type: "insta"
            },
            {
                url: "",
                label: "<i class='bi bi-facebook'></i>",
                className: "btn-facebook",
                type: "facebook"
            },
            {
                url: "",
                label: "<i class='bi bi-youtube'></i>",
                className: "btn-youtube",
                type: "youtube"
            },
            {
                url: "",
                label: "<i class='bi bi-twitter-x'></i>",
                className: "btn-twitter-x",
                type: "twitter"
            }
            
        ],
        
        video:"https://www.youtube.com/embed/TzhQ_iWqsOI",
        videoType:"youtube"
    
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
            if (name === "config" || name === "data") {
                this[name] = JSON.parse(newValue);
            }
        } catch (e) {
            console.log(e);
        }
        this.renderComponent();
    }

    createElement(tag, className, content) {
        const elm = document.createElement(tag);
        elm.className = className;
        if (content) elm.innerHTML = content;
        return elm;
    }

    createStarIcons(container) {
        Array(5).fill().forEach(() => {
            container.appendChild(this.createElement("i", this.config.iconClass + " bi bi-star-fill"));
        });
    }

    createRatingColumn(isFirst = true) {
        const col = this.createElement("div", isFirst ? this.config.colClass : this.config.col2Class);
        const ratingDiv = this.createElement("div", this.config.ratingClass);
        
        if (isFirst) {
            const img = this.createElement("img", this.config.img1Class);
            img.src = this.data.ratingimage;
            img.alt = "ratingImage";
            col.appendChild(img);
        } else {
            col.appendChild(this.createElement("i", this.config.imgIconClass, this.data.imgIcon));
        }

        this.createStarIcons(ratingDiv);
        ratingDiv.appendChild(this.createElement("h3", this.config.ratingtitleClass, 
            isFirst ? this.data.ratingtitle : this.data.rating2title));
        col.appendChild(ratingDiv);
        return col;
    }

    createSocialButton(buttonData) {
        const button = this.createElement("button", `btn ${buttonData.className}`);
        // Parse label for icon tags and render them
        if (buttonData.label.includes('<i')) {
            button.innerHTML = buttonData.label;
        } else {
            button.textContent = buttonData.label;
        }
        return button;
    }

    renderComponent() {
        this.innerHTML = `
            <style>
                @import url("https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css");
                @import url("https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.1/font/bootstrap-icons.css");
                .text-blue { color:#2F3192; }
            </style>
        `;

        const maindiv = this.createElement("div", this.config.MainContainer);
        
        maindiv.appendChild(this.createElement("h1", this.config.HeadingClass, this.data.heading));
        maindiv.appendChild(this.createElement("p", this.config.descClass, this.data.desc));
        maindiv.appendChild(this.createElement("h2", this.config.subtitleClass, this.data.subtitle));

        if (this.data.image) {
            const img = this.createElement('img', this.config.ImageClass);
            img.src = this.data.image;
            maindiv.appendChild(img);
        }

        const ratingrow = this.createElement("div", this.config.ratingrowClass);
        
        ratingrow.appendChild(this.createRatingColumn(true));
        ratingrow.appendChild(this.createRatingColumn(false));
        maindiv.appendChild(ratingrow);

        const buttonwrap = this.createElement("div", this.config.contentButtonWrapClass);
    
        this.data.buttons.forEach(item => {
            const contentButton = this.createElement("button", 
                item.type === "insta" ? this.config.contentButton1Class :
                item.type === "facebook" ? this.config.contentButton2Class :
                item.type === "youtube" ? this.config.contentButton3Class :
                this.config.contentButton1Class
            );
            
            // Parse and set label with icon
            contentButton.innerHTML = item.label; // This will render HTML in label including icons
            buttonwrap.appendChild(contentButton);
        });
          maindiv.appendChild(buttonwrap);

          if (this.data.video) {
            const videoWrap = this.createElement("div", this.config.videoWrapClass);
            if (this.data.videoType === "youtube") {
                const embedContainer = this.createElement('div', this.config.embedContainerClass);
                const embed = this.createElement('iframe', this.config.videoClass);
                embed.src = `${this.data.video}`;
                embed.width = "75%";
                embed.height = "515";
                embed.setAttribute('allowfullscreen', '');
                embedContainer.appendChild(embed);
                videoWrap.appendChild(embedContainer);
            }
            maindiv.appendChild(videoWrap);
        }
    
        this.appendChild(maindiv);
    }
}

customElements.define("content-component", ContentComponent);
if (!window.customElementsList) window.customElementsList = [];
window.customElementsList.push({ component: "content-component", componentClass: ContentComponent });
